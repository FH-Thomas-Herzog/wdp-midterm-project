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
                            _$("#contactFirstName").val("");
                            _$("#contactLastName").val("");
                            _$("#contactEmail").val("");
                            _$("#contactPhone").val("");
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
                            }else{
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

                    }()))
            }
        }
    }