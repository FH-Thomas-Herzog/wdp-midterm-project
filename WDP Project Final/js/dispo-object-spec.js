/**
 * Created by Thomas Herzog on 1/2/2015.
 *
 * This file specifies all of the used objects in this application.
 */
var
    /**
     * This object specifies the structure of a error instance
     * @param code the code of the error
     * @param msg the message for this error
     * @constructor (code, msg)
     */
    ErrorInstance = function (code, msg) {
        this.code = code;
        this.msg = msg;
    }
    ,
    /**
     * This object holds contact information of a natural person.
     * @param firstName the persons first name
     * @param lastName the persons last name
     * @param email the persons email
     * @param phone the persons phone
     * @constructor (firstName, lastName, email, phone)
     */
    Contact = function (firstName, lastName, email, phone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;

        /* Place any useful functions for this object here */
    }
    ,
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
    Address = function (street, number, postalCode, city, countryCode, countryName) {
        this.street = street;
        this.number = number;
        this.postalCode = postalCode;
        this.city = city;
        this.countryCode = countryCode;
        this.countryName = countryName;
    }
    ,
    Customer = function (name, address) {
        this.name = name;
        this.address = address;
    }
    ,
    /**
     * This object represents the disposition which holds all necessary information of a disposition
     * plus utilities for handling the disposition positions and necessary information.
     * @constructor ()
     */
    Disposition = function () {
        /* #################################### */
        /* public section                      */
        /* #################################### */
        this.contacts = [];
        this.customer = null;
        this.head = {};
        this.positions = [];
        this.positionCount = 0;
        this.summaryWeight = 0;
        this.notificationNumber = "";
        this.supplierNumber = "";
        this.deliveryAddress = null;
        this.pickupAddress = null;


        /* #################################### */
        /* static section                       */
        /* #################################### */
        var
            _self = this
            ,
            _$ = $
            ,
            POSITION_ID_PREFIX = "pos_";

        /**
         * Finds a id within the hold id array.
         * @param id the id of the id
         * @returns the found id, null otherwise.
         */
        function getIdxForPositionId(id) {
            var foundIdx = -1;
            $.each(_self.positions, function (idx, value) {
                return (foundIdx = (value.id === id) ? idx : -1) == -1;
            });
            return foundIdx;
        }

        /**
         * Adds a id to the disposition and performs validation to ensure that the added id is valid
         * and that the whole disposition keeps valid.
         * @param position the id to be added (instanceof DispoPosition)
         */
        this.addPosition = function (position) {
            if ((position != null) && (position.isValid())) {
                _self.sumWeight += position.weight;
                position.id = POSITION_ID_PREFIX + (_self.positions.length + 1);
                _self.positions.push(position);
            } else {
                errorHandler.handle(Errors.INVALID_POSITION);
            }
        }

        /**
         * Removes the id from the backed array if it could be found there.
         * @param positionId the id of the id in the array
         */
        this.removePosition = function (positionId) {
            var idx = getIdxForPositionId(positionId);
            if (idx >= 0) {
                _self.positions.splice(idx, 1);
                /* redefine id id */
                $.each(_self.positions, function (idx, value) {
                    value.id = POSITION_ID_PREFIX + (idx + 1);
                });
            } else {
                errorHandler.handle(Errors.POSITION_NOT_FOUND);
            }
        }

        this.splitPosition = function (oldPositionId, newPositions) {
            var idx = getIdxForPositionId(oldPositionId);
            if (idx >= 0) {
                /* Check if split positions are valid */
                var
                    qty = 0,
                    weight = 0,
                    oldPos = positions[idx];
                $.each(_self.positions, function (idx, value) {
                    qty += newPositions[i].qty;
                    weight += newPositions[i].weight;
                });
                /* Split id does not cover old pos specified qty and weight */
                if ((qty != oldPos.qty) && (oldPos.weight != weight)) {
                    errorHandler.handle(Errors.INVALID_POSITION_SPLIT);
                    return;
                }
                /* Remove old pos and add new ones */
                _self.positions.splice(idx, 1, newPositions);
            } else {
                errorHandler.handle(Errors.INVALID_POSITION);
            }
        }

        this.getPositions = function () {
            return _self.positions.slice(0);
        }
    }
    ,
    DispoPosition = function (itemNo, itemDescr, qty, weight) {
        this.itemNo = itemNo;
        this.itemDescr = itemDescr;
        this.qty = qty;
        this.weight = weight;
    };

/* Prototype chain */
Address.prototype.formattedHtmlAddress = function () {
    return this.street + " " + this.number + "<br>" + this.countryCode + "-" + this.postalCode + " " + this.city + "<br>" + this.countryName.toUpperCase();
}

Contact.prototype.fullName = function () {
    return this.lastName + ", " + this.firstName;
}

Disposition.prototype.buildSummary = function () {
    var sum = 0;
    $.each(this.positions, function (idx, val) {
        sum += val.weight;
    });
    this.summaryWeight = sum;
}

DispoPosition.prototype.isValid = function () {
    return ((this.weight > 0) && (this.qty > 0));
}

/* create methods */
function createContact(firstName, lastName, email, phone) {
    return new Customer(firstName, lastName, phone);
}