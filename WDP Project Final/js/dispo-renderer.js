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

                        /**
                         * ####################################################################
                         * Contact rendering
                         * ####################################################################
                         */
                        this.clearContactForm = function () {
                            _$("#contactEditForm")[0].reset();
                            _$('#contSel').find(":selected").prop("selected", false);
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
                                _$("#compStreet").val(company.address.street);
                                _$("#compStreetNo").val(company.address.number);
                                _$("#compCountryIso").val(company.address.countryCode);
                                _$("#compZipCode").val(company.address.postalCode);
                                _$("#compCity").val(company.address.city);
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
                        this.fillDispositionHead = function (disposition, custIdx, contIdx) {
                            _$("#countPositions").val(disposition.positions.length);
                            _$("#sumWeight").val(disposition.head.summaryWeight);
                            _$("#notificationNumber").val(disposition.head.notificationNumber);
                            _$("#supplierNumber").val(disposition.head.supplierNumber);
                            if (disposition.head.customer != null) {
                                _$('#dispoCustSel option[value=' + custIdx + ']').attr("selected", "selected");
                            }
                            if (disposition.head.contact != null) {
                                _$('#dispoContSel option[value=' + contIdx + ']').attr("selected", "selected");
                            }
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
                            var
                                idArr = id.split("-")
                                ,
                                idx = idArr[idArr.length - 1];
                            _$("#" + id).append(
                                _$("<form></form>").attr("method", "post").attr("id", "positionForm").append(
                                    createLabelElement("comment", "Kommentar:")
                                ).append(
                                    createInputElement("comment", "text").val(position.comment)
                                ).append(
                                    createLabelElement("article-desc", "Artikelbeschreibung:")
                                ).append(
                                    createInputElement("article-desc", "text").val(position.itemDesc)
                                ).append(
                                    createLabelElement("article-nr", "Artikel-Nummer:")
                                ).append(
                                    createInputElement("article-nr", "text").val(position.itemNo)
                                ).append(
                                    createLabelElement("article-count", "Anzahl")
                                ).append(
                                    createInputElement("article-count", "number").attr("step", "0.1").attr("min", "0").attr("max", "9999999999999999999999999").val(position.qty)
                                ).append(
                                    createLabelElement("position-weight", "Gewicht")
                                ).append(
                                    createInputElement("position-weight", "number").attr("step", "0.1").attr("min", "0").attr("max", "9999999999999999999999999").val(position.weight)
                                ).append(
                                    createInputButtonElement("savePosition", "Speichern", "submit")
                                ).append(
                                    createInputButtonElement("deletePosition", "Löschen", "button")
                                ).append(
                                    createInputElement("position-idx", "hidden").val(idx)
                                )
                            )
                            ;
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
                        this.renderSelectOptions = function (id, elements) {
                            var customerSelection = _$("#" + id);
                            customerSelection.append(_$('<option/>', {
                                'value': -1,
                                'text': "Bitte wählen"
                            })).attr("selected", "selected");

                            _$.each(elements, function (idx, val) {
                                customerSelection.append(_$('<option/>', {
                                    'value': idx,
                                    'text': val.optionVal()
                                }));
                            });
                        }

                        this.removeSelectOptions = function (id) {
                            _$("#id").empty();
                        }

                        var
                            createSpanElement = function (id, text) {
                                return _$("<span></span><br>")
                                    .attr("id", id)
                                    .attr("class", "ui-widget")
                                    .text(text);
                            }
                            ,
                            createErrorSpanElement = function (id, text) {
                                return _$("<span></span><br>")
                                    .attr("id", id)
                                    .attr("class", "ui-icon ui-icon-info")
                                    .attr("style", "float: left; margin-right: .3em;")
                            }
                            ,
                            createLabelElement = function (id, label) {
                                return _$("<label></label><br>")
                                    .attr("id", "label-" + id)
                                    .attr("class", "col-sm-4 control-label")
                                    .attr("for", id).text(label);
                            }
                            ,
                            createInputElement = function (id, type) {
                                return _$("<input></input><br>")
                                    .attr("id", id).attr("name", id)
                                    .attr("name", id)
                                    .attr("class", "form-control")
                                    .attr("type", type);
                            }
                            ,
                            createInputButtonElement = function (id, value, type) {
                                return _$("<input></input>")
                                    .attr("id", id).attr("value", value)
                                    .attr("name", id)
                                    .attr("class", "btn btn-default")
                                    .attr("type", type);
                            },
                            createButtonElement = function (id, type, text) {
                                return _$("<button></button>")
                                    .attr("id", id)
                                    .attr("name", id)
                                    .attr("type", type)
                                    .text(text);
                            }
                    }()))
            }
        }
    }