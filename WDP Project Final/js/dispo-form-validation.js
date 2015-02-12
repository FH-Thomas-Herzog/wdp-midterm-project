/**
 * Created by cchet on 2/11/2015.
 */
var
    REQUIRED_MESSAGE = "Eingabe erforderlich",
    MAX_LENGTH_EXCEEDED = "Maximale Länge überschritten ";

var
    formValidationSingleTonFactory = new function (jquery) {
        var
            instance = null;

        this.get = function () {
            if (instance != null) {
                return instance;
            } else {
                return (instance = (new function (jquery) {
                    var
                        _$ = jquery;
                    contactFormRules = {}
                        ,
                        companyFormRules = {}
                        ,
                        DispoFormRules = {};

                    /* register additional assert functions */
                    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
                        return arg != value;
                    }, "Value must not equal arg.");

                    this.getContactFormRules = function (submitCallBack) {
                        return {
                            submitHandler: submitCallBack,
                            debug: true,
                            errorClass: "ui-state-error ui-corner-all",
                            rules: {
                                contactFirstName: {
                                    required: true,
                                    maxlength: 100
                                },
                                contactLastName: {
                                    required: true,
                                    maxlength: 100
                                },
                                contactEmail: {
                                    required: true,
                                    email: true,
                                    maxlength: 100
                                },
                                contactPhone: {
                                    required: true,
                                    maxlength: 100
                                }
                            },
                            messages: {
                                contactFirstName: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                contactLastName: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                contactEmail: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED,
                                    email: "Ungültige Email"
                                },
                                contactPhone: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                }
                            }
                        }
                    }

                    this.getCompanyFormRules = function (submitCallBack) {
                        return {
                            submitHandler: submitCallBack,
                            debug: true,
                            errorClass: "ui-state-error ui-corner-all",
                            rules: {
                                compName: {
                                    required: true,
                                    maxlength: 100
                                },
                                compStreet: {
                                    required: true,
                                    maxlength: 100
                                },
                                compStreetNo: {
                                    required: true,
                                    maxlength: 5
                                },
                                compCountryIso: {
                                    required: true,
                                    maxlength: 2
                                },
                                compZipCode: {
                                    required: true,
                                    maxlength: 100
                                },
                                compCity: {
                                    required: true,
                                    maxlength: 100
                                },
                                compCountry: {
                                    required: true,
                                    maxlength: 100
                                }
                            },
                            messages: {
                                compName: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                compStreet: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                compStreetNo: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                compCountryIso: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                compZipCode: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                compCity: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                compCountry: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                }
                            }
                        }
                    }

                    this.getDispoFormRules = function (submitCallBack) {
                        return {
                            submitHandler: submitCallBack,
                            debug: true,
                            errorClass: "ui-state-error ui-corner-all",
                            rules: {
                                supplierNumber: {
                                    required: true,
                                    maxlength: 20
                                },
                                notificationNumber: {
                                    required: true,
                                    maxlength: 35
                                },
                                sumWeight: {
                                    required: true,
                                    minlength: 1,
                                    maxlength: 5
                                },
                                countPositions: {
                                    required: true,
                                    minlength: 1,
                                    maxlength: 5
                                }
                            },
                            messages: {
                                supplierNumber: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                notificationNumber: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                sumWeight: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                countPositions: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                }
                            }
                        }
                    }

                    this.getDispositionFormRules = function (submitCallBack) {
                        return {
                            submitHandler: submitCallBack,
                            debug: true,
                            errorClass: "ui-state-error ui-corner-all",
                            rules: {
                                dispoCustSel: {
                                    required: true,
                                    valueNotEquals: "-1"
                                },
                                dispoContSel: {
                                    required: true,
                                    valueNotEquals: "-1"
                                },
                                notficationNumber: {
                                    required: true,
                                    maxlength: 50
                                },
                                supplierNumber: {
                                    required: true,
                                    maxlength: 50
                                }
                            },
                            messages: {
                                notficationNumber: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                supplierNumber: {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                }
                                ,
                                dispoCustSel: {
                                    required: REQUIRED_MESSAGE,
                                    valueNotEquals: "Bitte wählen Sie einen Kunde aus"
                                }
                                ,
                                dispoContSel: {
                                    required: REQUIRED_MESSAGE,
                                    valueNotEquals: "Bitte wählen Sie einen Kontakt aus"
                                }
                            }
                        }
                    }
                    this.getPositionFormRules = function (submitCallBack) {
                        return {
                            submitHandler: submitCallBack,
                            debug: true,
                            errorClass: "ui-state-error ui-corner-all",
                            rules: {
                                "article-desc": {
                                    required: true,
                                    maxlength: 50
                                },
                                "article-nr": {
                                    required: true,
                                    maxlength: 35
                                },
                                "article-cnt": {
                                    required: true,
                                    minlength: 1,
                                    maxlength: 5
                                },
                                "position-weight": {
                                    required: true,
                                    minlength: 1,
                                    maxlength: 5
                                }
                            },
                            messages: {
                                "article-desc": {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                "article-nr": {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                "article-cnt": {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                },
                                "position-weight": {
                                    required: REQUIRED_MESSAGE,
                                    maxlength: MAX_LENGTH_EXCEEDED
                                }
                            }
                        }
                    }
                }()));
            }
        }
    }();