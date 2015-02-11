/**
 * Created by cchet on 1/3/2015.
 */
var
    handler = null;
var
    STORAGE_KEY_SAVE_POINTS_ARRAY = "SAFE_POINT_ARRAY"
    ,
    STORAGE_KEY_OPEN_DISPOS = "OPEN_DISPOS"
    ,
    STORAGE_KEY_CONTACTS = "CONTACTS"
    ,
    STORAGE_KEY_CUSTOMERS = "CUSTOMERS"
    ,
    savePoints = 0;


var
    dispoSingletonHandlerFactory = new function () {
        var
            dispoHandler = null;

        this.get = function () {
            if (dispoHandler != null) {
                return dispoHandler;
            } else {
                return (dispoHandler = (new function () {
                    var
                    /* Conserved instances */
                        _self = this
                        ,
                        _$ = $
                        ,
                        _renderer = rendererHelperSingletonFactory.get()
                        ,
                        _geoCodeHandler = geoHandlerSingletonFactory.get();

                    /* Private members */
                    var
                        currentDisposition = new Disposition()
                        ,
                        openDispositions = []
                        ,
                        customers = [];

                    var
                        renderContacts = function () {

                        };

                    this.initStateFromStorage = function (step) {
                        /* If invalid safe point */
                        if (step >= (savePoints - 1)) {
                            return;
                        }

                        var storage, item;
                        /**
                         * ###########################################################
                         * Initializes the state out of the local storage if present
                         * ###########################################################
                         */
                        if (((storage = localStorage.getItem(STORAGE_KEY_SAVE_POINTS_ARRAY)) != null) && (storage.size > 0)) {
                            savePoints = storage.size;
                            item = storage[savePoints - 1];
                            customers = item.customers;
                            currentDisposition.contacts = item.contacts;
                            openDispositions = item.openDispositions;
                            // TODO: Display message about returned save point
                            _renderer.renderCustomerOptions();
                            _renderer.renderContactsOptions();
                            _renderer.renderPositions(currentDisposition.positions);
                        } else {
                            savePoints = 0;
                            localStorage.setItem(STORAGE_KEY_SAVE_POINTS_ARRAY, []);
                        }
                    }

                    /**
                     * Saves the current state to the storage
                     */
                    this.saveStateToStorage = function () {
                        localStorage.getItem(STORAGE_KEY_SAVE_POINTS_ARRAY).push({
                            currentDisposition: currentDisposition,
                            customers: customers,
                            contacts: currentDisposition.contacts,
                            openDispositions: openDispositions
                        });
                    }

                    /* Contact Event Listener functions */
                    var
                        handleAddContact = function (evt) {
                            var idx = -1;
                            var contact = null;

                            // TODO: validate data before instance creation

                            var option = _$("#contSel").find(":selected");
                            if (option != null) {
                                idx = contacts[option.val()];
                            }
                            var contact = createContact(_$("#firstName"), _$("#lastName"), _$("#email"), _$("#phone"));
                            if (idx >= 0) {
                                contacts.splice(idx, 1, contact);
                            } else {
                                contacts.push(contact);
                            }

                            _renderer.renderContactsOptions(currentDisposition.contacts);
                        }
                        ,
                        handleRemoveContact = function (evt) {
                            var option = _$("#contSel").find(":selected");
                            if (option != null) {
                                currentDisposition.contacts.slice(option.val());
                                _renderer.removeContactOption(option);
                            }
                        }
                        ,
                        handleContactSelect = function () {
                            var option = $(this);
                            if (option.val() < 0) {
                                _renderer.clearContactForm();
                            } else {
                                _renderer.fillContactForm(currentDisposition.contacts, (option.val()));
                            }
                        };

                    /* Customer Event Listener functions */
                    var
                        handleCustomerSelect = function (evt) {
                            var option = _$(this);
                            if (option.val() < 0) {
                                currentDisposition.customer = null;
                                _renderer.clearCustomerForm();
                                // TODO: Remove gmaps from view
                            } else {
                                currentDisposition.customer = customers[option.val()];
                                _renderer.fillCustomerForm(customers, option.val());
                                // TODO: Add gmaps handling
                            }
                        }

                    var
                        collectHeadData = function () {
                            currentDisposition.head = {
                                notificationNumer: _$("#notificationNumber").val(),
                                supplierNumber: _$("#supplierNumber").val()
                            }
                        }

                    /**
                     * ###########################################################
                     * position event listeners
                     * ###########################################################
                     */
                    var
                        startIdx
                        ,
                        endIdx
                        ,
                        collectionPositionData = function () {
                            var positions = [];
                            // TODO: Get positions and set on disposition
                            currentDisposition.positions = positions;
                            currentDisposition.buildSummary();
                        }
                        ,
                        handleAddPosition = function (evt) {
                            console.log("add position");
                            currentDisposition.positions.push(new DispoPosition());
                            _renderer.clearPositions();
                            _renderer.renderPositions(currentDisposition.positions);
                        }
                        ,
                        handlePositionDrag = function (evt, ui) {
                            endIdx = -1;
                            startIdx = (_$(ui.item).index());
                        }
                        ,
                        handlePositionDrop = function (evt, ui) {
                            endIdx = (_$(ui.item).index());

                            var tmpStart = currentDisposition.positions[startIdx];
                            currentDisposition.positions.splice(startIdx, 1, currentDisposition.positions[endIdx]);
                            currentDisposition.positions.splice(endIdx, 1, tmpStart);

                            _renderer.clearPositions();
                            _renderer.renderPositions(currentDisposition.positions);
                            startIdx = -1;
                            endIdx = -1;
                        }
                        ,
                        handleEditPosition = function() {
                            console.log("hello selector");
                        }

                    /**
                     * ###########################################################
                     * global event handlers (save, reset,..)
                     * ###########################################################
                     */
                    var
                        handleReset = function (evt) {
                            currentDisposition = new Disposition();
                            _renderer.clearAll();
                        }
                        ,
                        handleSave = function (evt) {
                            collectHeadData();
                            collectionPositionData();
                            console.log(currentDisposition);
                        }

                    /**
                     * ############################################################
                     * initializes this instance
                     * ############################################################
                     */
                    this.init = function () {
                        customers.push(new Customer("Curecomp", new Address("Hafenstrasse", "49-51", "4020", "Linz", "AT", "Austria")));
                        customers.push(new Customer("ZF-Passau", new Address("Donaustrasse", "25", "94034", "Passau", "DE", "Germany")));

                        _self.initStateFromStorage();
                        _$.each(_$(".panel-item"), function (idx, val) {
                            val.click(function () {
                                handleEditPosition();
                            });
                        });

                        currentDisposition.contacts = contacts;
                        _renderer.renderContactsOptions(currentDisposition.contacts);
                        _renderer.renderCustomerOptions(customers);

                        /* selection events */
                        _$("#contSel").change(handleContactSelect);
                        _$("#custSel").change(handleCustomerSelect);

                        /* Button events */
                        _$("#saveButton").click(handleSave);
                        _$("#resetButton").click(handleReset);
                        _$("#addPositionButton").click(handleAddPosition);

                        $('#positionList').sortable({
                            // Only make the .panel-heading child elements support dragging.
                            handle: '.panel-item-header',
                            start: handlePositionDrag,
                            stop: handlePositionDrop
                        });
                    }
                    // TODO: Register all event listeners
                }
                ()
                ))
            }
        }
    }
    ()

$(function () {
    handler = dispoSingletonHandlerFactory.get();
    handler.init();
});