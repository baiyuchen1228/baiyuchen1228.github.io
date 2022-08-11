/*
    circuit.h  -  by Don Cross   http://cosinekitty.com
*/

//-------------------------------------------------------------------------------------------------
#include <stdio.h>

template <class T>
class PointerArray      // implements dynamic array of pointers to T
{
public:
    PointerArray()
    {
        array = new T * [arraysize = 1];
        numitems = 0;
        owns_contents = true;
    }

    ~PointerArray()
    {
        if (array) {
            if (owns_contents) {
                for (int i=0; i < numitems; ++i) {
                    delete array[i];
                }
            }

            delete[] array;
            array = 0;
        }

        arraysize = numitems = 0;
    }

    void disableOwnershipOfContents()
    {
        owns_contents = false;
    }

    int getNumItems() const
    {
        return numitems;
    }

    bool isValidIndex (int index) const 
    {
        return (index >= 0) && (index < numitems);
    }

    void append (T *item)
    {
        if (!item) {
            throw "PointerArray::append - tried to insert a NULL item!";
        }

        if (numitems == arraysize) {
            // time to double the size of the array...
            arraysize *= 2;
            T **biggerarray = new T * [arraysize];
            for (int i=0; i < numitems; ++i) {
                biggerarray[i] = array[i];
            }
            delete[] array;
            array = biggerarray;
        }

        array[numitems++] = item;
    }

    T & operator[] (int index) const
    {
        if (isValidIndex(index)) {
            return *array[index];
        } else {
            throw "PointerArray::operator[] - index out of bounds!";
        }
    }

private:
    T     **array;
    int     arraysize;
    int     numitems;
    bool    owns_contents;      // whether to delete items pointed to upon PointerArray destruction
};

//-------------------------------------------------------------------------------------------------

const double  MAX_VOLTAGE = 1000000;

class Node {
public:
    Node (double _capacitance, int _tag):
        fixed (false),
        voltage (0),
        capacitance (_capacitance),
        injected_charge (0),
        net_current (0),
        tag (_tag)
    {
    }

    void setFixedVoltage (double _voltage)
    {
        voltage = _voltage;
        fixed = true;
    }

    void injectCharge (double charge)
    {
        injected_charge += charge;
    }

    double getVoltage() const
    {
        return voltage;
    }

    double getNetCurrent() const
    {
        return net_current;
    }

    int getTag() const
    {
        return tag;
    }

    double update (double dt);        // dt = time increment in seconds;  returns voltage shift in this update (helps detect convergence)

private:
    bool    fixed;              // does this node have a fixed voltage?
    double  voltage;            // current potential relative to ground, in Volts
    double  capacitance;        // capacitance with respect to ground, in farads
    double  injected_charge;    // net charge injected into node, in coulombs
    double  net_current;        // nonzero only for fixed nodes
    int     tag;                // unique identifier for this node in the circuit
};

//-------------------------------------------------------------------------------------------------

class Component {
public:
    Component (int _tag):
        tag (_tag)
    {
    }

    virtual void update (double dt) = 0;
    virtual double getCurrent() const = 0;      // Hmmmm... this implies that there is a single current, i.e. this is a 2-pin device.

    int getTag() const 
    {
        return tag;
    }

private:
    int     tag;
};


class Resistor: public Component {
public:
    Resistor (double _resistance, double _inductance, Node &_leftnode, Node &_rightnode, int _tag):
        Component  (_tag),
        resistance (_resistance),
        inductance (_inductance),
        leftnode   (_leftnode),
        rightnode  (_rightnode),
        current    (0)
    {
    }

    virtual void update (double dt);        // dt = time increment in seconds

    virtual double getCurrent() const
    {
        return current;
    }

private:
    double  resistance;         // ohms
    double  inductance;         // henries
    Node   &leftnode;
    Node   &rightnode;
    double  current;            // amps
};

//-------------------------------------------------------------------------------------------------

const double DEFAULT_CIRCUIT_TIME_INCREMENT = 1.0e-6;       // 1 microsecond

class Circuit {
public:
    Circuit():
        dt (DEFAULT_CIRCUIT_TIME_INCREMENT)
    {
    }

    void loadFromFile (const char *filename);
    double update();        // returns max node voltage change (absolute value)

    void csvHeader (FILE *outfile);     // prints header line to CSV file
    void csvState  (FILE *outfile);     // prints current state on a line into CSV file
    void dumpFixedNodeCurrents (FILE *outfile);
    void listing   (FILE *outfile);

private:
    double                      dt;         // simulation time increment, in seconds
    PointerArray<Node>          node;
    PointerArray<Component>     component;
};

//-------------------------------------------------------------------------------------------------


/*
    $Log: circuit.h,v $
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

    Revision 1.1  2006/10/20 17:55:58  dcross
    Looks like iterative solver is working correctly for simple test 'series.circuit'.

*/
