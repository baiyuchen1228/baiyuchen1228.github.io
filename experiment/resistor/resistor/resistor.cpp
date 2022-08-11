/*
    resistor.cpp  -  by Don Cross   http://cosinekitty.com

    This program simulates an arbitrary network of resistors,
    and determines the equivalent resistance of the network.
    It does so by applying a voltage across the pair of nodes
    in the network whose equivalent resistance is to be measured,
    and performing a finite difference simulation of all node
    voltages and resistor currents.  To make this simulation
    work with Kirchoff's Laws, each resistor is modeled as
    an ideal resistor in series with an ideal inductor,
    so that currents do not change instantly in response to
    a voltage difference.  Likewise, each floating node
    (i.e. any node not directly connected to the simulated battery)
    has an implicit connection to ground via a capacitor, so that
    current can  be "jammed" into the node (or "borrowed", in the
    case of negative "jamming"), as required by updates to the
    total resistor currents at each time increment.  The battery-
    connected (non-floating) nodes allow arbitrary current changes
    with a fixed voltage level, because we model the battery
    as an ideal device having zero internal resistance.
*/

#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "circuit.h"

//-------------------------------------------------------------------------------------------------
// Circuit class methods

//-------------------------------------------------------------------------------------------------
const long double Double_ERR = 1e-15;

int main(int argc, const char *argv[]) {
  int rc = 1;  // assume failure unless everything goes well

  if (argc == 2) {
    const char *filename = argv[1];

    int loopcount = 0;
    int notify = 1;

    try {
      Circuit circuit;
      circuit.loadFromFile(filename);

      double max_dv = -1;
      do {
        max_dv = circuit.update();
        if (loopcount % notify == 0) {
          printf("loop %d:  max_dv = %0.15lg\n", loopcount, max_dv);
          if (loopcount >= 10 * notify) {
            notify *= 10;
          }
        }
        ++loopcount;
      } while (max_dv > Double_ERR);
      //               (loopcount <= 16000000 && max_dv > 0.000001) &&&&
      //               loopcount <= 30000000
      printf("\nCompleted after %d loops.  (max_dv = %0.15lg)\n\n", loopcount,
             max_dv);
      circuit.listing(stdout);

      rc = 0;  // success
    } catch (const char *error) {
      rc = 2;
      if (error[0]) {  // do not display blank error messages; this happens when
                       // caller printed error before throwing exception.
        fprintf(stderr, "\n!!! ERROR (loop %d):  %s\n\n", loopcount, error);
      }
    }
  } else {
    fprintf(stderr, "Use:  resistor filename\n\n");
    rc = 3;
  }

  return rc;
}

//-------------------------------------------------------------------------------------------------

/*
    $Log: resistor.cpp,v $
    Revision 1.6  2006/10/26 20:11:37  dcross
    1. Removed arbitrary cutoff of number of loops the simulation is allowed to
   last.
    2. Cleaned up old garbage that was commented out.

    Revision 1.5  2006/10/26 16:28:06  dcross
    Now display loop count and max_dv in ever-increasing intervals based on
   powers of 10. Also display both exactly at the moment the convergence loop
   exits.

    Revision 1.4  2006/10/25 21:13:05  dcross
    Got rid of extremely verbose output while trying to converge simulation.
    Added more human-friendly output when simulation is done.

    Revision 1.3  2006/10/23 18:56:20  dcross
    Still having problems getting solution to converge, but thought I would go
   ahead and check in changes:
    1. Reworked Resistor::update to get rid of the concept of maintaining
   between_voltage.
    2. Now dt (time increment) can be defined in the input file.  This required
   moving dt into the class Circuit.
    3. Now Node and Component objects have a unique tag, which is simply a copy
   of their array index inside the Circuit class.  This allows for helpful debug
   prints more than anything else.

    Revision 1.2  2006/10/20 18:26:58  dcross
    1. Fixed bug in Node::update - formula for net_current was wrong.
    2. Now detect convergence and quit then.
    3. Now display net currents of fixed nodes.
    4. Set more reasonable defaults for node capacitance and resistor
   inductance.

    Revision 1.1  2006/10/20 17:55:58  dcross
    Looks like iterative solver is working correctly for simple test
   'series.circuit'.

*/