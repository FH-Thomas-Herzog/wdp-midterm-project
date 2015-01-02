/**
 * Created by Tom on 02.01.15.
 */

/* Detail position with values:
 positionNumber
 positionTitle
 positionQuantity
 positionWeight
 */


var DetailPos = function (posNo, posTitle, posQty, posWeight) {
    this.getPosNo = function () {
        return posNo
    }

    this.getPosTitle = function () {
        return posTitle
    }

    this.getPosQty = function () {
        return posQty
    }

    this.getPosWeight = function () {
        return posWeight
    }

    this.getGrossWeight = function () {
        return posWeight * posQty
    }
}
