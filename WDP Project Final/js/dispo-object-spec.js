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
        this.head =  {
            customer: null,
            contact: null,
            summaryWeight: 0,
            notificationNumer: "",
            supplierNumber: ""
        };
        this.positions = [];
        this.notificationNumber = "";
        this.supplierNumber = "";
        this.deliveryAddress = null;
        this.pickupAddress = null;
    }
    ,
    DispoPosition = function () {
        this.comment = "\<Ihr Kommentar zu dieser Position\>";
        this.itemNo = "\<Die Artikelnummer\>";
        this.itemDesc = "\<Ihre Artikelbeschreibung\>";
        this.qty = 0;
        this.weight = 0;
    };

/* Prototype chain */
Address.prototype.formattedHtmlAddress = function () {
    return this.street + " " + this.number + "<br>" + this.countryCode + "-" + this.postalCode + " " + this.city + "<br>" + this.countryName.toUpperCase();
}

Contact.prototype.optionVal = function () {
    return this.lastName + ", " + this.firstName;
}

Customer.prototype.optionVal = function () {
    return this.name;
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