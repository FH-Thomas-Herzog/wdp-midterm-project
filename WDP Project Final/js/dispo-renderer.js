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
                            _self = this;

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
                                _self.clearCompanyForm();
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
                            var positionList = _$("#positionList");
                            _$.each(positions, function (idx, val) {
                                positionList.append(
                                    _$("<li></li>").attr("class", "panel-item").append(
                                        _$("<div></div>").attr("class", "panel-item-header").text("header")  // TODO: Append content here
                                    ).append(
                                        _$("<div></div>").attr("class", "panel-item-body").text("body") // TODO: Append content here
                                    )
                                );
                            });
                        }

                        this.clearPositions = function () {
                            var liArray = _$("position-list").find("li");
                            _$.each(liArray, function (idx, val) {
                                val.remove();
                            });
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
                    }()))
            }
        }
    }