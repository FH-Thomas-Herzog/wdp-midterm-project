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
                            _renderer = this;

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
                            $("#contactFirstName").empty();
                            $("#contactLastName").empty();
                            $("#contactEmail").empty();
                            $("#contactPhone").empty();
                            $('#contSel').find(":selected").empty();
                        }

                        this.renderContactsOptions = function (contacts) {
                            var contactSelection = _$("#contSel");
                            contactSelection.append(_$('<option/>', {
                                'value': -1,
                                'text': "Bitte wählen"
                            }));
                            _$.each(contacts, function (idx, val) {
                                contactSelection.append(_$('<option/>', {
                                    'value': idx,
                                    'text': val.fullName()
                                }));
                            });
                        }

                        this.fillContactForm = function (contacts, idx) {
                            var option = _$('#custSel option[value="' + idx + '"]');
                            this.clearContactForm();
                            this.renderContactsOptions(contacts);
                            if (option != null) {
                                option.attr("selected", true);
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
                                }));
                            });
                        }

                    }()))
            }
        }
    }