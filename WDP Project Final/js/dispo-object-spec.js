/**
 * Created by cchet on 1/2/2015.
 */
/**
 * This object holds contact information of a natural person.
 * @param firstName the persons first name
 * @param lastName the persons last name
 * @param email the persons email
 * @param phone the persons phone
 * @constructor (firstName, lastName, email, phone)
 */
var Contact = function (firstName, lastName, email, phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;

    /* Place any useful functions for this object here */
};

/**
 * This object holds address information.
 * @param street the street
 * @param number the street number
 * @param postalCode the postal code
 * @param city the city
 * @param countryCode the iso country code
 * @param countryName the iso country name
 * @constructor (street, number, postalCode, city, countryCode, countryName)
 */
var Address = function (street, number, postalCode, city, countryCode, countryName) {
    this.street = street;
    this.number = number;
    this.postalCode = postalCode;
    this.city = city;
    this.countryCode = countryCode;
    this.countryName = countryName;

    this.formattedHtmlAddress = function () {
        return this.street + " " + this.number + "<br>" + this.countryCode + "-" + this.postalCode + " " + this.city + "<br>" + this.countryName.toUpperCase()
    }
}

/**
 * This object represents the disposition which holds all necessary information of a disposition
 * plus utilities for handling the disposition positions and necessary information.
 * @constructor ()
 */
var Disposition = function () {
    var
        /**
         * The array holding all positions of this disposition
         * @type {Array}
         */
        positions = []
        ,
        /**
         * The sum of the weight over all positions
         * @type {number}
         */
        sumWeight = 0
        ,
    /* #################################### */
    /* static section                       */
    /* #################################### */
        POSITION_ID_PREFIX = "pos_";

    /**
     * The delivery Address of the customer where the delivery goes to
     * @type {null}
     */
    this.delivewryAddress = null;
    /**
     * The pickup address of the supplier where the delivery is picked up from
     * @type {null}
     */
    this.pickupAddress = null;
    /**
     * This is the customer which gets the delivery
     * @type {null}
     */
    this.customer = null;

    /**
     * Adds a position to the disposition and performs validation to ensure that the added position is valid
     * and that the whole disposition keeps valid.
     * @param position the position to be added (instanceof DispoPosition)
     */
    this.addPosition = function (position) {
        if ((position != null) && (position.isValid())) {
            sumWeight += position.weight;
            position.position = POSITION_ID_PREFIX + positionCount;
            positions.push(position);
        } else {
            errorHandler.handle(Error.INVALID_POSITION);
        }
    }

    /**
     * Removes the position from the backed array if it could be found there.
     * @param positionId the id of the position in the array
     */
    this.removePosition = function (positionId) {
        var idx = getPositionIdxByPositionId(positionId);
        if (idx >= 0) {
            positions.splice(i, 1);
        } else {
            errorHandler.handle(Error.POSITION_NOT_FOUND);
        }
    }

    this.splitPosition = function (oldPositionId, newPositions) {
        var idx = getPositionIdxByPositionId(oldPositionId);
        if (idx >= 0) {
            /* Check if split positions are valid */
            var
                qty = 0,
                weight = 0,
                oldPos = positions[idx];
            for (var i = 0; i < newPositions.length; i++) {
                qty += newPositions[i].qty;
                weight += newPositions[i].weight;
            }
            /* Split position does not cover old pos specified qty and weight */
            if ((qty != oldPos.qty) && (oldPos.weight != weight)) {
                errorHandler.handle(Error.INVALID_POSITION_SPLIT);
                return;
            }
            /* Remove old pos and add new ones */
            positions.splice(idx, 1, newPositions);
        } else {
            errorHandler.handle(Error.INVALID_POSITION);
        }
    }

    /* #################################### */
    /* private section                      */
    /* #################################### */
    /**
     * Finds a position within the hold position array.
     * @param id the id of the position
     * @returns the found position, null otherwise.
     */
    function getPositionIdxByPositionId(id) {
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].position.eq(id)) {
                return i;
            }
        }
        return -1;
    }
}

/**
 * This object represents a position within a disposition.
 * @param position the position within the other positions
 * @param comment the comment to this positions
 * @param qty the quantity of this position
 * @param weight the weight of this position
 * @constructor (position, comment, qty, weight)
 */
var DispoPosition = function (position, comment, qty, weight) {
    this.position = position;
    this.comment = comment;
    this.qty = qty;
    this.weight = weight;

    this.isValid = function () {
        return ((weight > 0) && (qty > 0));
    }
}