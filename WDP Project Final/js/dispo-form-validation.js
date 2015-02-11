/**
 * Created by cchet on 2/11/2015.
 */
var
    REQUIRED_MESSAGE = "Eingabe erforderlich",
    MAX_LENGTH_EXCEEDED = "Maximale Länge überschritten ";

var
    formValidationSingleTonFactory = new (function () {
        var
            instance = null;

        this.get = function () {
            if (instance != null) {
                return instance;
            } else {
                return (instance = (new (function () {
                    var
                        contactFormRules = {};

                    this.getContactFormRules = function () {
                        return contactFormRules;
                    }

                    contactFormRules = {
                        debug: true,
                        rules: {
                            firstName: {
                                required: true,
                                maxLength: 100
                            },
                            lastName: {
                                required: true,
                                maxLength: 100
                            },
                            email: {
                                required: true,
                                email: true,
                                maxLength: 100
                            },
                            phone: {
                                required: true,
                                maxLength: 100
                            }
                        },
                        messages: {
                            firstName: {
                                required: REQUIRED_MESSAGE,
                                maxLength: MAX_LENGTH_EXCEEDED
                            }, lastName: {
                                required: REQUIRED_MESSAGE,
                                maxLength: MAX_LENGTH_EXCEEDED
                            }, email: {
                                required: REQUIRED_MESSAGE,
                                maxLength: MAX_LENGTH_EXCEEDED,
                                email: "Ungültige Email"
                            }, phone: {
                                required: REQUIRED_MESSAGE,
                                maxLength: MAX_LENGTH_EXCEEDED
                            }
                        }
                    }
                }())));
            }
        }
    })();