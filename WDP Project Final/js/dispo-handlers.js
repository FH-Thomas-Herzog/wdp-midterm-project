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
                            currentDisposition.head.contact = item.contact;
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
                            contact: currentDisposition.head.contact,
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
                                    contacts.splice(option.val(), 1, contact);
                                } else {
                                    contacts.push(contact);
                                }
                                _$("#contSel").empty();
                                _$("#dispoContSel").empty();
                                _renderer.renderSelectOptions("contSel", contacts);
                                _renderer.renderSelectOptions("dispoContSel", contacts);

                                if (dispoOption == null) {
                                    _$('#dispoContSel option[value=-1]').attr('selected', 'selected');
                                } else {
                                    _$('#dispoContSel option[value=' + option.val() + ']').attr('selected', 'selected');
                                }
                                _$('#contSel option[value=' + (contacts.length - 1) + ']').attr('selected', 'selected');
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
                                contacts.splice(option.val(), 1);
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
                                _renderer.fillContactForm(contacts, (option.val()));
                                _$("#deleteContact").show();
                            }
                        }
                        ,
                        handleContactSelectHead = function () {
                            var option = _$(this);
                            var customer = null;
                            if ((option != null) && (option.val() >= 0)) {
                                currentDisposition.head.contact = contacts[option.val()];
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

                                _$('#dispoCustSel option[value=-1]').attr('selected', 'selected');
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
                        }
                        ,
                        handleCustomerSelectHead = function () {
                            var option = _$(this);
                            var customer = null;
                            if ((option != null) && (option.val() >= 0)) {
                                currentDisposition.head.customer = customers[option.val()];
                            }
                        };


                    var
                        collectHeadData = function () {
                            currentDisposition.head.customer = customers[_$("#dispoCustSel").find(":selected").val()];
                            currentDisposition.head.contact = customers[_$("#dispoContSel").find(":selected").val()];
                            currentDisposition.head.notificationNumer = _$("#notificationNumber").val()
                            currentDisposition.head.supplierNumber = _$("#supplierNumber").val()
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
                            _$("#position-accordion").empty();
                            _renderer.renderPositions(currentDisposition.positions);
                            $("#position-accordion").accordion("refresh");
                        }
                        ,
                        refreshPositionForm = function (idx) {
                            _renderer.renderPositionForm("item-body-" + idx, currentDisposition.positions[idx]);
                            _$("#positionForm").validate(_validationHandler.getPositionFormRules(handleSavePosition));
                            _$("#deletePosition").click(handleDeletePosition);
                        }
                        ,
                        handleAddPosition = function (evt) {
                            console.log("add position");
                            currentDisposition.positions.push(new DispoPosition());

                            var idx = (currentDisposition.positions.length - 1);
                            _$("position-accordion").empty();
                            refreshPositions();
                            _$("#item-header-" + idx).click();

                            if (currentDisposition.positions.length > 0) {
                                _$("#saveButton").show();
                            }
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
                            var
                                idx = _$("#position-idx").val()
                                ,
                                position = currentDisposition.positions[idx] = new DispoPosition();

                            position.comment = _$("#comment").val();
                            position.itemNo = _$("#article-nr").val();
                            position.itemDesc = _$("#article-desc").val();
                            position.qty = _$("#article-count").val();
                            position.weight = _$("#position-weight").val();
                            currentDisposition.head.summaryWeight = 0;
                            _$.each(currentDisposition.positions, function (idx, val) {
                                currentDisposition.head.summaryWeight += parseFloat(val.weight);
                            });
                            _$("#countPositions").val(currentDisposition.positions.length);
                        }
                        ,
                        handleDeletePosition = function (evt) {
                            var idx = _$("#position-idx").val();
                            currentDisposition.positions.splice(idx, 1);
                            refreshPositions();
                            if (currentDisposition.positions.length > 0) {
                                refreshPositionForm(currentDisposition.positions.length - 1);
                            }

                            _$("#countPositions").val(currentDisposition.positions.length);
                            if (currentDisposition.positions.length == 0) {
                                _$("#saveButton").hide();
                            }
                        }

                    /**
                     * ###########################################################
                     * accordion event handler
                     * ###########################################################
                     */
                    var
                        handleOpenDefaultAccordion = function (evt, ui) {
                            var
                                id, panel;

                            /* formerly collapsed */
                            if (ui.newHeader[0] == null) {
                                panel = ui.oldPanel;
                            } else {
                                panel = ui.newPanel;
                            }
                            id = panel[0].id;
                        }
                        ,
                        handleOpenPositionAccordion = function (evt, ui) {
                            var
                                id, panel;

                            /* formerly collapsed */
                            $("[id^=item-body]").empty();
                            if (ui.newHeader[0] == null) {
                                panel = ui.oldPanel;
                            } else {
                                panel = ui.newPanel;
                            }

                            if (ui.newHeader[0] != null) {
                                refreshPositionForm(extractIndexFromId(panel[0].id));
                            }
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
                        _renderer.renderSelectOptions("contSel", contacts);
                        _renderer.renderSelectOptions("dispoCustSel", customers);
                        _renderer.renderSelectOptions("dispoContSel", contacts);
                        _renderer.renderPositions(currentDisposition.positions);

                        /* selection events */
                        _$("#contSel").change(handleContactSelect);
                        _$("#custSel").change(handleCustomerSelect);
                        _$("#dispoCustSel").change(handleCustomerSelectHead);
                        _$("#dispoContSel").change(handleContactSelectHead);

                        /* Button events */
                        _$("#saveButton").hide();
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
                                activate: handleOpenPositionAccordion,
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
                        _$("#dispositionForm").validate(_validationHandler.getDispositionFormRules(handleSave));

                        _$("#panel-dispo-header").click();
                        _$("#panel-customer-header").click();

                        _renderer.fillDispositionHead(currentDisposition, customers.indexOf(currentDisposition.head.customer), contacts.indexOf(currentDisposition.head.customer));
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