/**
 * Created by Thomas Herzog on 1/2/2015.
 * <thomas.herzog@students.fh-hagenberg.at>
 *
 *     This javascript file contains the javascript code for the dispo application.
 */
var
    ObjectSpecTest = function () {
        var
            dispo = new Disposition();
        this.testAddDisposition = function () {
            var pos = new DispoPosition("I am a pos 1", 10, 10);
            dispo.addPosition(pos);
            var pos = new DispoPosition("I am a pos 2", 10, 10);
            dispo.addPosition(pos);
            var pos = new DispoPosition("I am a pos 3", 10, 10);
            dispo.addPosition(pos);
            return dispo;
        }

        this.testRemovePos = function () {
            dispo.removePosition("pos_2");
            return dispo.getPositions();
        }
    }
test = new ObjectSpecTest();
console.log(test.testAddDisposition());
console.log(test.testRemovePos());

