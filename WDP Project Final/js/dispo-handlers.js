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
                        _geoCodeHandler = geoHandlerSingletonFactory.get()
                        ,
                        _validationHandler = formValidationSingleTonFactory.get();

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
                        handleSaveContact = function (evt) {
                            _$("#contactEditForm").validate(_validationHandler.getContactFormRules());
                            var idx = -1;
                            var contact = null;

                            // TODO: validate data before instance creation

                            var option = _$("#contSel").find(":selected");
                            if (option != null) {
                                idx = contacts[option.val()];
                            }
                            var contact = new Contact(_$("#contactFirstName").val(), _$("#contactLastName").val(), _$("#contactEmail").val(), _$("#contactPhone").val());
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
                        handleSaveCompany = function (evt) {
                            _$("#companyEditForm").validate(_validationHandler.getCompanyFormRules());
                            var idx = -1;
                            var cust = null;

                            // TODO: validate data before instance creation

                            var option = _$("#custSel").find(":selected");
                            if (option != null) {
                                idx = currentDisposition.customers[option.val()];
                            }
                            var cust = new Customer(_$("#compName").val(), new Address(_$("#compStreet").val(), _$("#compStreetNo").val(), _$("#compZipCode").val(), _$("#compCity").val(), _$("#compCountryIso").val(), _$("#compCountry").val()));
                            if (idx >= 0) {
                                currentDisposition.customers.splice(idx, 1, cust);
                            } else {
                                currentDisposition.customers.push(cust);
                            }

                            _renderer.renderCustomerOptions(currentDisposition.customer);
                        }
                        ,
                        handleCustomerSelect = function (evt) {
                            var option = _$(this);
                            if (option.val() < 0) {
                                customer = [];
                                _renderer.clearCustomerForm();
                                // TODO: Remove gmaps from view
                            } else {
                                customer = customers[option.val()];
                                _renderer.fillCustomerForm(customers, option.val());
                                // TODO: Add gmaps handling
                                var tmp_adr = customers[option.val()].address.street;
                                tmp_adr = tmp_adr + " " + customers[option.val()].address.number;
                                tmp_adr = tmp_adr + ", " + customers[option.val()].address.postalCode;
                                tmp_adr = tmp_adr + " " + customers[option.val()].address.city;
                                _geoCodeHandler.addMarkerAddress(tmp_adr);
                                _$("#gMaps").dialog("option", "height", 400);
                                _$("#gMaps").dialog("option", "width", 400);
                                _$("#gMaps").dialog({autoOpen: true});

                            }
                        };


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
                        refreshPositions = function () {
                            _renderer.renderPositions(currentDisposition.positions);
                            $("#position-accordion").accordion("refresh");
                        }
                        ,
                        handleAddPosition = function (evt) {
                            console.log("add position");
                            currentDisposition.positions.push(new DispoPosition());
                            _renderer.clearPositions();
                            refreshPositions();
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
                            refreshPositions();
                            startIdx = -1;
                            endIdx = -1;

                            /* Jquery fixes */
                            // IE doesn't register the blur when sorting
                            // so trigger focusout handlers to remove .ui-state-focus
                            ui.item.children("h3").triggerHandler("focusout");
                            // Refresh accordion to handle new order
                            _$(this).accordion("refresh");
                        }
                        ,
                        handleEditPosition = function (evt) {
                            _renderer.renderPositionForm(id, currentDisposition.positions[extractIndexFromId(_$(this).attr("id"))]);
                        }

                    /**
                     * ###########################################################
                     * accordion event handler
                     * ###########################################################
                     */
                    var
                        handleOpenAccordion = function (evt, ui) {
                            var
                                id, panel;

                            /* formerly collapsed */
                            if (ui.newHeader[0] == null) {
                                panel = ui.oldPanel;
                            } else {
                                panel = ui.newPanel;
                            }
                            id = panel[0].id;

                            _renderer.removePositionForm(id);
                            _renderer.renderPositionForm(id, currentDisposition.positions[extractIndexFromId(id)]);
                            _$("#position-accordion").accordion("refresh");

                            //_$("#dispositionForm").validate(_validationHandler.getDispoFormRules(handleSave));

                        }

                    var
                        extractIndexFromId = function (id) {
                            var
                                idArr = id.split("-");

                            return idArr[idArr.length - 1];
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

                        $("#position-accordion")
                            .accordion({
                                header: "> div > h3",
                                activate: handleOpenAccordion,
                                beforeActivate: false,
                                active: false,
                                alwaysOpen: false,
                                collapsible: true
                            })
                            .sortable({
                                axis: "y",
                                handle: "h3",
                                start: handlePositionDrag,
                                stop: handlePositionDrop
                            });

                        _$("#contactEditForm").validate(_validationHandler.getContactFormRules(handleSaveContact));
                        _$("#companyEditForm").validate(_validationHandler.getCompanyFormRules(handleSaveCompany));
                        //_$("#position-accordion").validate(_validationHandler.getPositionFormRules(handleAddPosition));
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