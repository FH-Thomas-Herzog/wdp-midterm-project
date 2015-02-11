/**
 * Created by cchet on 2/9/2015.
 */
var
    rendererHelperSingletonFactory = new function () {
        var
            rendererHandler = null;

        this.get = function () {
            if (rendererHandler != null) {
                return rendererHandler;
            } else {
                return (rendererHandler =
                    (new function () {
                        var
                            _$ = $
                            ,
                            _self = this
                            ;

                        this.removeContactOption = function (option) {
                            /* if selected one */
                            if (option.attr("selected")) {
                                this.clearContactForm();
                            }

                            /* option remove */
                            option.remove();
                        }

                        /**
                         * ####################################################################
                         * Contact rendering
                         * ####################################################################
                         */
                        this.clearContactForm = function () {
                            _$("#contactEditForm")[0].reset();
                            _$('#contSel').find(":selected").prop("selected", false);
                        }

                        this.renderContactsOptions = function (contacts) {
                            var contactSelection = _$("#contSel");
                            contactSelection.empty();
                            contactSelection.append(_$('<option/>', {
                                'value': -1,
                                'text': "Bitte wählen"
                            }));
                            _$.each(contacts, function (idx, val) {
                                contactSelection.append(_$('<option/>', {
                                    'value': idx,
                                    'text': val.fullName()
                                }))
                            });
                        }

                        this.fillContactForm = function (contacts, idx) {
                            var option = _$('#contSel').find(":selected");
                            if ((option != null) && (option.val() >= 0)) {
                                var contact = contacts[idx];
                                option.attr("selected", "selected");
                                _$("#contactFirstName").val(contact.firstName);
                                _$("#contactLastName").val(contact.lastName);
                                _$("#contactEmail").val(contact.email);
                                _$("#contactPhone").val(contact.phone);
                            } else {
                                _self.clearContactForm();
                            }
                        }

                        /**
                         * ####################################################################
                         * Customer rendering
                         * ####################################################################
                         */
                        this.renderCustomerOptions = function (customers) {
                            var customerSelection = _$("#custSel");
                            customerSelection.append(_$('<option/>', {
                                'value': -1,
                                'text': "Bitte wählen"
                            }));
                            _$.each(customers, function (idx, val) {
                                customerSelection.append(_$('<option/>', {
                                    'value': idx,
                                    'text': val.name
                                })).selectmenu();
                            });
                        }


                        this.renderCustomerOptions = function (customers) {
                            var customerSelection = _$("#custSel");
                            customerSelection.append(_$('<option/>', {
                                'value': -1,
                                'text': "Bitte wählen"
                            }));
                            _$.each(customers, function (idx, val) {
                                customerSelection.append(_$('<option/>', {
                                    'value': idx,
                                    'text': val.name
                                }));
                            });
                        }

                        this.clearCustomerForm = function () {
                            _$("#companyEditForm")[0].reset();
                            _$('#custSel').find(":selected").prop("selected", false);
                        }

                        this.fillCustomerForm = function (customers, idx) {
                            var option = _$('#custSel').find(":selected");
                            if ((option != null) && (option.val() >= 0)) {
                                var company = customers[idx];
                                option.attr("selected", "selected");
                                _$("#compName").val(company.name);
                                _$("#compStreet").val(company.address.street + " " + company.address.number);
                                _$("#compZipCode").val(company.address.postalCode + "-" + company.address.city);
                                _$("#compCountry").val(company.address.countryName);
                            } else {
                                _self.clearCustomerForm();
                            }
                        }

                        /**
                         * ####################################################################
                         * Disposition head rendering
                         * ####################################################################
                         */
                        this.fillDispositionHead = function (head) {
                            _$("#notificationNumber").val(head.notificationNumber);
                            _$("#supplierNumber").val(head.supplierNumber);
                            _$("#sumWeight").val(head.summaryWeight);
                            _$("#countPositions").val(head.positionCount);
                        }

                        this.renderPositions = function (positions) {
                            var accordion = _$("#position-accordion");
                            _$.each(positions, function (idx, val) {
                                accordion.append(
                                    _$("<div></div>").attr("class", "item").attr("id", ("item-" + idx)).append(
                                        _$("<h3></h3>").attr("class", "item-header").attr("id", ("item-header-" + idx)).text("Position " + (idx + 1))
                                    ).append(
                                        _$("<div></div>").attr("class", "item-body").attr("id", ("item-body-" + idx))
                                    )
                                );
                            });
                        }

                        this.renderPositionForm = function (id, position) {
                            _$("#" + id).append(
                                createLabelElement("comment", "Kommentar:").attr("class", "ui-widget")
                            ).append(
                                createInputElement("comment", "text").val(position.comment).attr("class", "ui-widget")
                            ).append(
                                createLabelElement("article-desc", "Artikelbeschreibung:").attr("class", "ui-widget")
                            ).append(
                                createInputElement("article-desc", "text").val(position.itemDescr).attr("class", "ui-widget")
                            ).append(
                                createLabelElement("article-nr", "Artikel-Nummer:").attr("class", "ui-widget")
                            ).append(
                                createInputElement("article-nr", "text").val(position.itemNo).attr("class", "ui-widget")
                            ).append(
                                createLabelElement("article-count", "Anzahl:").attr("class", "ui-widget")
                            ).append(
                                createInputElement("article-count", "number").val(position.qty).attr("class", "ui-widget")
                            ).append(
                                createLabelElement("position-weight", "Gewicht").attr("class", "ui-widget")
                            ).append(
                                createInputElement("position-weight", "number").attr("step", "0.1").val(position.weight)
                            ).append(
                                createButtonElement("save", "Speichern").attr("class", "ui-widget")
                            ).append(
                                createButtonElement("delete", "Löschen").attr("class", "ui-widget")
                            )
                            ;
                        }

                        this.removePositionForm = function (id) {
                            _$("#" + id).empty();
                        }

                        this.clearPositions = function () {
                            _$("#position-accordion").empty();
                        }

                        this.clearDispositionForm = function () {
                            _$("#dispositionForm")[0].reset();
                            this.clearPositions();
                        }

                        this.clearAll = function () {
                            _self.clearContactForm();
                            _self.clearCustomerForm();
                            _self.clearDispositionForm();
                        }

                        /**
                         * ####################################################################
                         * Helper for rendering
                         * ####################################################################
                         */
                        var
                            createSpanElement = function (id, text) {
                                return _$("<span></span>").attr("id", id).text(text);
                            }
                            ,
                            createLabelElement = function (id, label) {
                                return _$("<label></label>").attr("id", "label-" + id).text(label);
                            }
                            ,
                            createInputElement = function (id, type) {
                                return _$("<input></input>").attr("id", id).attr("type", type);
                            }
                            ,
                            createButtonElement = function (id, text) {
                                return _$("<button></button>").attr("id", id).text(text);
                            }
                    }()))
            }
        }
    }