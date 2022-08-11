/*
    circuit.cpp  -  by Don Cross   http://cosinekitty.com
*/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#include "circuit.h"

//-------------------------------------------------------------------------------------------------

void TrimWhiteSpace (char *string)
{
    // chop off string at ';', if found.  this is a line comment...
    char *comment = strchr (string, ';');
    if (comment) {
        *comment = '\0';
    }

    // trim leftward whitespace...
    int i = 0;
    while (isspace(string[i])) {
        ++i;
    }
    strcpy (string, string+i);

    // trim any whitespace on the right...
    i = strlen(string) - 1;
    while (i>=0 && isspace(string[i])) {
        string[i--] = '\0';
    }
}

//-------------------------------------------------------------------------------------------------

/*
    numnodes 3
    nodecapacitance 1.0e-6
    resistorinductance 1.0e-3
    
    ; "fixednode" nodeindex fixedvoltage
    fixednode  0  1.0
    fixednode  2  0.0
    
    ; "resistor" ohms leftnodeindex rightnodeindex
    resistor 100 0 1
    resistor 200 1 2
*/

void Circuit::loadFromFile (const char *filename)
{
    int     i;
    char    line [256];
    double  NodeCapacitance = 1.0e-6;       // 1 uF by default
    double  ResistorInductance = 1.0e-3;    // 1 mH by default
    bool    happy = true;
    bool    defined_resistor_inductance = false;
    bool    defined_node_capacitance   = false;
    bool    defined_dt = false;

    dt = DEFAULT_CIRCUIT_TIME_INCREMENT;    // reset time increment to default value, in case not specified

    FILE *infile = fopen (filename, "rt");
    if (!infile) {
        throw "Circuit::loadFromFile - cannot open file for read.";
    } else {
        try {
            int lineNumber = 0;
            while (fgets(line,sizeof(line),infile)) {
                ++lineNumber;
                TrimWhiteSpace (line);
                if (line[0]) {
                    const char *verb  = line;             // alias name, just to make code clearer
                    char *parms = strchr (line, ' ');     // skip over verb to find parms
                    if (parms) {
                        *parms++ = '\0';    // patch verb with null terminator, and skip to next character
                    } else {
                        parms = "";         // allows code below to safely sscanf for parms, finding none
                    }

                    if (0 == strcmp(verb,"numnodes")) {
                        int numnodes = -1;
                        if (1 == sscanf(parms,"%d",&numnodes) && (numnodes >= 2)) {
                            for (i=0; i < numnodes; ++i) {
                                Node *x = new Node (NodeCapacitance, i);
                                node.append (x);
                            }
                        } else {
                            fprintf (stderr, "Expected integer >= 2 after 'numnodes' in %s line %d.\n", filename, lineNumber);
                            throw "";
                        }
                    } else if (0 == strcmp(verb,"fixednode")) {
                        int     n;
                        double  voltage;
                        if (2 == sscanf(parms,"%d %lf", &n, &voltage)) {
                            if (!node.isValidIndex(n)) {
                                fprintf (stderr, "Node index %d is not valid in %s line %d.\n", n, filename, lineNumber);
                                throw "";
                            }

                            node[n].setFixedVoltage (voltage);
                        }
                    } else if (0 == strcmp(verb,"resistor")) {
                        double  ohms;
                        int     n1, n2;
                        if (3 == sscanf(parms,"%lf %d %d", &ohms, &n1, &n2)) {
                            if (ohms <= 0) {
                                fprintf (stderr, "Resistance is not valid in %s line %d.\n", filename, lineNumber);
                                happy = false;
                            }

                            if (!node.isValidIndex(n1)) {
                                fprintf (stderr, "Left index %d is not valid in %s line %d.\n", n1, filename, lineNumber);
                                happy = false;
                            }

                            if (!node.isValidIndex(n2)) {
                                fprintf (stderr, "Right index %d is not valid in %s line %d.\n", n2, filename, lineNumber);
                                happy = false;
                            }

                            if (happy) {
                                Resistor *r = new Resistor (ohms, ResistorInductance, node[n1], node[n2], component.getNumItems());
                                component.append (r);
                            } else {
                                throw "";
                            }
                        } else {
                            fprintf (stderr, "Expected <ohms node1 node2> after 'resistor' in %s line %d.\n", filename, lineNumber);
                            throw "";
                        }
                    } else if (0 == strcmp(verb,"resistorinductance")) {
                        if (defined_resistor_inductance) {
                            fprintf (stderr, "Attempt to define resistor inductance more than once in %s line %d.\n", filename, lineNumber);
                            throw "";
                        } else {
                            if (1 == sscanf(parms,"%lf",&ResistorInductance) && (ResistorInductance > 0)) {
                                if (component.getNumItems() > 0) {
                                    fprintf (stderr, "Attempt to define resistor inductance after creating resistor(s) in %s line %d.\n", filename, lineNumber);
                                    throw "";
                                } else {
                                    defined_resistor_inductance = true;   // happy
                                }
                            } else {
                                fprintf (stderr, "Expected positive value after 'resistorinductance' in %s line %d.\n", filename, lineNumber);
                                throw "";
                            }
                        }
                    } else if (0 == strcmp(verb,"nodecapacitance")) {
                        if (defined_node_capacitance) {
                            fprintf (stderr, "Attempt to define node capacitance more than once in %s line %d.\n", filename, lineNumber);
                            throw "";
                        } else {
                            if (1 == sscanf(parms,"%lf",&NodeCapacitance) && (NodeCapacitance > 0)) {
                                if (node.getNumItems() > 0) {
                                    fprintf (stderr, "Attempt to define node capacitance after creating nodes(s) in %s line %d.\n", filename, lineNumber);
                                    throw "";
                                } else {
                                    defined_node_capacitance = true;  // happy
                                }
                            } else {
                                fprintf (stderr, "Expected positive value after 'nodecapacitance' in %s line %d.\n", filename, lineNumber);
                                throw "";
                            }
                        }
                    } else if (0 == strcmp(verb,"dt")) {
                        if (defined_node_capacitance) {
                            fprintf (stderr, "Attempt to define time increment 'dt' more than once in %s line %d.\n", filename, lineNumber);
                            throw "";
                        } else {
                            if (1 == sscanf(parms,"%lf",&dt) && (dt > 0)) {
                                defined_dt = true;  // happy
                            } else {
                                fprintf (stderr, "Expected positive value after 'dt' in %s line %d.\n", filename, lineNumber);
                                throw "";
                            }
                        }
                    } else {
                        fprintf (stderr, "Unknown verb '%s' in %s line %d.\n", verb, filename, lineNumber);
                        throw "";
                    }
                }
            }
        } catch (...) {
            fclose (infile);
            throw;
        }
    }
    fclose (infile);
}

//-------------------------------------------------------------------------------------------------


double Node::update (double dt)
{
    double dv;      // change in voltage during this update

    if (fixed) {
        dv = 0;     // no voltage change, because this node has fixed voltage
        net_current = injected_charge / dt;
    } else {
        dv = injected_charge / capacitance;
        net_current = 0;    // current leaving through capacitor cancels out all current entering from attached components.
        voltage += dv;

        if (voltage < -MAX_VOLTAGE || voltage > MAX_VOLTAGE) {
            throw "Node voltage is out of bounds!";
        }
    }

    // Now that voltage has been updated, need to reset injected charge to zero so it can be tallied on next iteration...
    injected_charge = 0;

    return dv;      // return voltage shift, so Circuit object can tell whether simulation is converging.
}


//-------------------------------------------------------------------------------------------------


void Resistor::update (double dt)
{
    /*
        We are simulating an inductor L in series with a resistor R.
        Arbitrarily, we say that the inductor is on the "left" and the resistor on the "right".
        The left node and right node have voltages V1 and V2 at any moment in time.
    
        (V1)________[L]___(Vx)___[R]_________(V2)
        
                            i
                         ------>
        
        i = (Vx - V2) / R       ===>    Vx = i*R + V2
        
        di/dt = (V1 - Vx) / L
        di/dt = (V1 - (V2 + i*R)) / L
        di/dt = (V1 - V2 - i*R) / L
        
        di = (dt/L) * (V1 - V2 - i*R)
    */

    // Figure out how much the current changes in this time increment, 
    // due to voltage across the inductor L.

    const double V1 = leftnode .getVoltage();
    const double V2 = rightnode.getVoltage();

    double di = (dt/inductance) * (V1 - V2 - current*resistance);

    // Update the current flowing through both L and R...
    current += di;

    // Transport charge from leftnode to rightnode based on updated current...
    double charge = current * dt;
    leftnode .injectCharge (-charge);
    rightnode.injectCharge (+charge);

    //printf (">>> Resistor::update (%2d) - V1=%lg  V2=%lg  di=%lg  current=%lg  charge=%lg\n", getTag(), V1, V2, di, current, charge);
}


//-------------------------------------------------------------------------------------------------


double Circuit::update()
{
    int     i;

    const int numComponents = component.getNumItems();
    for (i=0; i < numComponents; ++i) {
        component[i].update (dt);
    }

    double  max_dv = 0;
    const int numnodes = node.getNumItems();
    for (i=0; i < numnodes; ++i) {
        double dv = node[i].update (dt);
        if (dv < 0) {
            dv = -dv;   // take absolute value
        }
        if (dv > max_dv) {
            max_dv = dv;
        }
    }

    return max_dv;
}


//-------------------------------------------------------------------------------------------------


void Circuit::csvHeader (FILE *outfile)     // prints header line to CSV file
{
    int     i;

    int numNodes = node.getNumItems();
    for (i=0; i < numNodes; ++i) {
        if (i > 0) {
            fprintf (outfile, ",");
        }
        fprintf (outfile, "\"V%d\"", i);
    }

    int numComponents = component.getNumItems();
    for (i=0; i < numComponents; ++i) {
        fprintf (outfile, ",\"i%d\"", i);
    }

    fprintf (outfile, "\n");
}


void Circuit::csvState (FILE *outfile)     // prints current state on a line into CSV file
{
    int     i;

    int numNodes = node.getNumItems();
    for (i=0; i < numNodes; ++i) {
        if (i > 0) {
            fprintf (outfile, ",");
        }
        fprintf (outfile, "%0.15lg", node[i].getVoltage());
    }

    int numComponents = component.getNumItems();
    for (i=0; i < numComponents; ++i) {
        fprintf (outfile, ",%0.15lg", component[i].getCurrent());
    }

    fprintf (outfile, "\n");
}


void Circuit::dumpFixedNodeCurrents (FILE *outfile)
{
    int     i;

    int numNodes = node.getNumItems();
    for (i=0; i < numNodes; ++i) {
        double current = node[i].getNetCurrent();
        if (current != 0) {
            printf("node %3d current = %14.10lg milliamps.\n", i, (1000.0 * current));
        }
    }
}


void Circuit::listing (FILE *outfile)
{
    int i;

    fprintf (outfile, "Circuit listing:\n");
    for (i=0; i < node.getNumItems(); ++i) {
        fprintf (outfile, "    Node %2d voltage = %0.12lg\n", i, node[i].getVoltage());
    }

    fprintf (outfile, "\n");
    for (i=0; i < component.getNumItems(); ++i) {
        fprintf (outfile, "    Component %2d current = %0.12lg\n", i, component[i].getCurrent());
    }

    // Dump fixed node currents...
    fprintf (outfile, "\n");
    int    fixedNodeIndex[2];
    int    numFixedNodes = 0;
    for (i=0; i < node.getNumItems(); ++i) {
        double current = node[i].getNetCurrent();
        if (current != 0) {
            fprintf (outfile, "fixed node %2d current = %0.12lg\n", i, current);
            if (numFixedNodes < 2) {
                fixedNodeIndex[numFixedNodes] = i;
            }
            ++numFixedNodes;
        }
    }

    // if there are exactly 2 distinct fixed nodes, calculate equivalent resistance...
    if (numFixedNodes == 2) {
        double voltageDrop = node[fixedNodeIndex[1]].getVoltage() - node[fixedNodeIndex[0]].getVoltage();
        if (voltageDrop < 0) {
            voltageDrop = -voltageDrop;
        }

        double current = node[fixedNodeIndex[0]].getNetCurrent();
        if (current < 0) {
            current = -current;
        }
        // V = iR   --->   R = V/i
        if (current > 0) {
            fprintf (outfile, "Equivalent circuit resistance = %0.12lg ohms\n", (voltageDrop / current));
        }
    }
}


//-------------------------------------------------------------------------------------------------


/*
    $Log: circuit.cpp,v $
    Revision 1.5  2006/10/26 19:33:03  dcross
    Reduced precision of displayed circuit values in Circuit::listing from 15 to 12 digits,
    because it is a lot easier to see patterns that way.

    Revision 1.4  2006/10/25 21:13:05  dcross
    Got rid of extremely verbose output while trying to converge simulation.
    Added more human-friendly output when simulation is done.

    Revision 1.3  2006/10/23 18:56:20  dcross
    Still having problems getting solution to converge, but thought I would go ahead and check in changes:
    1. Reworked Resistor::update to get rid of the concept of maintaining between_voltage.
    2. Now dt (time increment) can be defined in the input file.  This required moving dt into the class Circuit.
    3. Now Node and Component objects have a unique tag, which is simply a copy of their array index
       inside the Circuit class.  This allows for helpful debug prints more than anything else.

    Revision 1.2  2006/10/20 18:26:58  dcross
    1. Fixed bug in Node::update - formula for net_current was wrong.
    2. Now detect convergence and quit then.
    3. Now display net currents of fixed nodes.
    4. Set more reasonable defaults for node capacitance and resistor inductance.

    Revision 1.1  2006/10/20 17:55:57  dcross
    Looks like iterative solver is working correctly for simple test 'series.circuit'.

*/

