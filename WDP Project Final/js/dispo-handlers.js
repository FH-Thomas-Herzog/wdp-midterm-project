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
                        _validationHandler = formValidationSingleTonFactory.get(_$);

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
                        } else {
                            currentDisposition.contacts = contacts;
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
                            var
                                option = _$("#contSel").find(":selected")
                                ,
                                dispoOption = _$("#dispoContSel").find(":selected")
                                ,
                                contact = new Contact(_$("#contactFirstName").val(), _$("#contactLastName").val(), _$("#contactEmail").val(), _$("#contactPhone").val());

                            if (option != null) {
                                if (option.val() != -1) {
                                    currentDisposition.contacts.splice(option.val(), 1, contact);
                                } else {
                                    currentDisposition.contacts.push(contact);
                                }
                                _$("#contSel").empty();
                                _$("#dispoContSel").empty();
                                _renderer.renderSelectOptions("contSel", currentDisposition.contacts);
                                _renderer.renderSelectOptions("dispoContSel", currentDisposition.contacts);

                                if (dispoOption == null) {
                                    _$('#dispoContSel option[value=-1]').attr('selected', 'selected');
                                } else {
                                    _$('#dispoContSel option[value=' + option.val() + ']').attr('selected', 'selected');
                                }
                                _$('#contSel option[value=' + (currentDisposition.contacts.length - 1) + ']').attr('selected', 'selected');
                                _$("#deleteContact").show();
                            }
                        }
                        ,
                        handleDeleteContact = function (evt) {
                            var
                                option = _$("#contSel").find(":selected")
                                ,
                                dispoOption = _$("#dispoContSel").find(":selected");

                            if ((option != null) && (option.val() != -1)) {
                                _$("#contactEditForm").trigger('reset');
                                currentDisposition.contacts.splice(option.val(), 1);
                                _$("#contSel").empty();
                                _$("#dispoContSel").empty();
                                _renderer.renderSelectOptions("contSel", contacts);
                                _renderer.renderSelectOptions("dispoContSel", contacts);
                                _$('#contSel option[value=-1]').attr('selected', 'selected');
                                _$("#deleteContact").hide();
                            }
                        }
                        ,
                        handleContactSelect = function () {
                            var option = $(this);
                            if (option.val() < 0) {
                                _renderer.clearContactForm();
                                _$("#deleteContact").hide();
                            } else {
                                _renderer.fillContactForm(currentDisposition.contacts, (option.val()));
                                _$("#deleteContact").show();
                            }
                        };

                    /* Customer Event Listener functions */
                    var
                        handleSaveCompany = function (form) {
                            var
                                cust = null
                                ,
                                option = _$("#custSel").find(":selected")
                                ,
                                dispoOption = _$("#dispoCustSel").find(":selected")
                                ,
                                cust = new Customer(_$("#compName").val(), new Address(_$("#compStreet").val(), _$("#compStreetNo").val(), _$("#compZipCode").val(), _$("#compCity").val(), _$("#compCountryIso").val(), _$("#compCountry").val()));

                            if (option != null) {
                                if (option.val() != -1) {
                                    customers.splice(option.val(), 1, cust);
                                } else {
                                    customers.push(cust);
                                }
                                _$('#custSel').empty();
                                _$('#dispoCustSel').empty();
                                _renderer.renderSelectOptions("custSel", customers);
                                _renderer.renderSelectOptions("dispoCustSel", customers);

                                if (dispoOption != null) {
                                    _$('#dispoCcustSel option[value=' + dispoOption.val() + ']').attr('selected', 'selected');
                                }
                                _$('#custSel option[value=' + (customers.length - 1) + ']').attr('selected', 'selected');
                                _$("#deleteCustomer").show();
                            }

                        }
                        ,
                        handleCustomerDelete = function (evt) {
                            var
                                option = _$("#custSel").find(":selected")
                                ,
                                dispoOption = _$('#dispoCustSel').find(":selected");

                            if ((option != null) && (option.val() != -1)) {
                                _$("#companyEditForm").trigger('reset');
                                customers.splice(option.val(), 1);

                                _$('#custSel').empty();
                                _$('#dispoCustSel').empty();
                                _renderer.renderSelectOptions("custSel", customers);
                                _renderer.renderSelectOptions("dispoCustSel", customers);
                                _$('#custSel option[value=-1]').attr('selected', 'selected');
                                _$("#gMaps").dialog("close");
                                _$("#deleteCustomer").hide();
                            }
                        }
                        ,
                        handleCustomerSelect = function (evt) {
                            var option = _$(this);
                            var customer = null;
                            if (option.val() < 0) {
                                _renderer.clearCustomerForm();
                                _$("#deleteCustomer").hide();
                                _$("#gMaps").dialog("close");
                            } else {
                                customer = customers[option.val()];
                                _renderer.fillCustomerForm(customers, option.val());
                                var tmp_adr = customers[option.val()].address.street;
                                tmp_adr = tmp_adr + " " + customers[option.val()].address.number;
                                tmp_adr = tmp_adr + ", " + customers[option.val()].address.postalCode;
                                tmp_adr = tmp_adr + " " + customers[option.val()].address.city;
                                _geoCodeHandler.addMarkerAddress(tmp_adr);
                                _$("#gMaps").dialog("option", "height", 400);
                                _$("#gMaps").dialog("option", "width", 400);
                                _$("#gMaps").dialog({autoOpen: true});
                                _$("#deleteCustomer").show();
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
                            _$("#item-header-" + (currentDisposition.positions.length - 1)).click();
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
                        handleSavePosition = function (evt) {
                            _renderer.renderPositionForm(currentDisposition.positions[extractIndexFromId(_$(this).attr("id"))]);
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
                            _$("#positionForm").validate(_validationHandler.getPositionFormRules(handleSavePosition));
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

                        _renderer.renderSelectOptions("custSel", customers);
                        _renderer.renderSelectOptions("contSel", currentDisposition.contacts);
                        _renderer.renderSelectOptions("dispoCustSel", customers);
                        _renderer.renderSelectOptions("dispoContSel", currentDisposition.contacts);
                        _renderer.renderPositions(currentDisposition.positions);

                        /* selection events */
                        _$("#contSel").change(handleContactSelect);
                        _$("#custSel").change(handleCustomerSelect);

                        /* Button events */
                        _$("#deleteCustomer").click(handleCustomerDelete).hide();
                        _$("#deleteContact").click(handleDeleteContact).hide();
                        _$("#resetButton").click(handleReset);
                        _$("#addPositionButton").click(handleAddPosition);

                        $("#accordion").accordion({
                            beforeActivate: false,
                            active: false,
                            alwaysOpen: false,
                            collapsible: true,
                            heightStyle: "content"
                        });
                        $("#accordion-dispo").accordion({
                            beforeActivate: false,
                            active: false,
                            alwaysOpen: false,
                            collapsible: true,
                            heightStyle: "content"
                        });
                        $("#position-accordion")
                            .accordion({
                                header: "> div > h3",
                                activate: handleOpenAccordion,
                                beforeActivate: false,
                                active: false,
                                alwaysOpen: false,
                                collapsible: true,
                                heightStyle: "content"
                            })
                            .sortable({
                                axis: "y",
                                handle: "h3",
                                start: handlePositionDrag,
                                stop: handlePositionDrop
                            });

                        $("#gMaps").dialog({autoOpen: false});
                        $("#gMaps").dialog("option", "height", 400);
                        $("#gMaps").dialog("option", "width", 400);

                        _$("#contactEditForm").validate(_validationHandler.getContactFormRules(handleSaveContact));
                        _$("#companyEditForm").validate(_validationHandler.getCompanyFormRules(handleSaveCompany));
                        _$("#dispositionForm").validate(_validationHandler.getDispoFormRules(handleSave));

                        _$("#panel-dipso-header").click();
                        _$("#panel-customer-header").click();

                        if (currentDisposition.customer != null) {
                            _$('#dispoCcustSel option[value=' + customers.indexOf(currentDisposition.customer) + ']').attr("selected", "selected");
                        }
                    }
                    // TODO: Register all event listeners
                }
                ()
                ))
            }
        }
    }
    ()

/* bootsrap causes twice evaluation of the script tags therefore $(document).ready(...) did not work */
window.onload = function (evt) {
    handler = dispoSingletonHandlerFactory.get();
    handler.init();
};