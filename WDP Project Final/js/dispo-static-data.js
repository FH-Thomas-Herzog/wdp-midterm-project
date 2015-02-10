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
/**
 * Test Positions
 * @type {Array}
 */
positions = [];

/* create static data for customer selection */
customers.push(new Customer("Curecomp", new Address("Hafenstrasse", "49-51", "4020", "Linz", "AT", "Austria")));
customers.push(new Customer("ZF-Passau", new Address("Donaustrasse", "25", "94034", "Passau", "DE", "Germany")));

contacts.push(new Contact("Thomas", "Herzog", "herzog.thomas81@gmail.com", "+43664123456789"));

positions.push(new DispoPosition("0000", "Item No 1", "3", "2"));
positions.push(new DispoPosition("0001", "Item No 2", "1", "8"));
positions.push(new DispoPosition("0002", "Item No 3", "5", "9"));

$(function () {
    var renderer = rendererHelperSingletonFactory.get();
});
