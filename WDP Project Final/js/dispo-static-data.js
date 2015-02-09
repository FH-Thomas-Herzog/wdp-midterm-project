/**
 * Created by cchet on 1/3/2015.
 */
var
/* the static customers for the selection */
    customers = []
    ,
    /**
     * Test Contacts
     * @type {Array}
     */
    contacts = [];

/* create static data for customer selection */
customers.push(new Customer("Curecomp", new Address("Hafenstrasse", "49-51", "4020", "Linz", "AT", "Austria")));
customers.push(new Customer("ZF-Passau", new Address("Donaustrasse", "25", "94034", "Passau", "DE", "Germany")));

contacts.push(new Contact("Thomas", "Herzog", "herzog.thomas81@gmail.com", "+43664123456789"));

var customerSelection = (function () {
    var
        _handler = this
        ,
        _$ = $;

    this.init = function () {
        for (var i = 0; i < customers.length; i++) {
            $('<option/>', {
                'value': customers[i].name,
                'text': customers[i].name
            }).appendTo('custSel');
        }//for
    }();


}());

