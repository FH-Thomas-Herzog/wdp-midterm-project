/**
 * Created by cchet on 2/11/2015.
 */
var
    REQUIRED_MESSAGE = "Eingabe erforderlich",
    MAX_LENGTH_EXCEEDED = "Maximale Länge überschritten ";

var
    formValidationSingleTonFactory = new function () {
        var
            instance = null;

        this.get = function () {
            if (instance != null) {
                return instance;
            } else {
                return (instance = (new function () {
                    var
                        contactFormRules = {};

                    this.getContactFormRules = function (submitCallBack) {
                        return {
                            submitHandler: submitCallBack,
                            debug: true,
                            rules: {
                                contactFfirstName: {
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
                }()));
            }
        }
    }();