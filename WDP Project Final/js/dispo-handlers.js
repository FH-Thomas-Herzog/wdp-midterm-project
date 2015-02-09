/**
 * Created by cchet on 1/3/2015.
 */
var
    ContactHandler = function () {
        var
            contacts = [];

        this.addContact = function (contact) {
            contacts.push(contact);
        }
    }