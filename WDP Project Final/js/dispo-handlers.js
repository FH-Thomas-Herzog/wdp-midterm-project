/**
 * Created by cchet on 1/3/2015.
 */
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

        this.create = function () {
            if (dispoHandler != null) {
                return dispoHandler;
            } else {
                return (dispoHandler = (function () {
                    var
                    /* Conserved instances */
                        _self = this
                        ,
                        _$ = $
                        ,
                        _renderer = rendererHelperSingletonFactory.get();

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
                        handleAddContact = function (evt) {
                            // TODO: validate data before instance creation
                            contacts.push(createContact($("#firstName"), $("#lastName"), $("#email"), $("#phone")));
                            _renderer.renderContactsOptions(currentDisposition.contacts);
                        }
                        ,
                        handleRemoveContact = function (evt) {
                            var option = _$(this);
                            currentDisposition.contacts.slice(option.val());
                            _renderer.removeContactOption(option);
                        }
                        ,
                        handleContactSelect = function () {
                            var option = $(this);
                            if (option.val() < 0) {
                                _renderer.clearContactForm();
                            } else {
                                _renderer.fillContactForm(currentDisposition.contacts, (option.val()));
                            }
                        };

                    /* Customer Event Listener functions */
                    var
                        handleCustomerSelect = function (evt) {
                            var option = $(this);
                            if (option.val() < 0) {
                                currentDisposition.customer = null;
                            } else {
                                currentDisposition.customer = customers[option.val()];
                            }
                        }

                    /**
                     * ############################################################
                     * initializes this instance
                     * ############################################################
                     */
                    _self.initStateFromStorage();
                    // TODO: Register all event listeners
                }()))
            }
        }
    }()

var
    handler = null;

$(function () {
    handler = dispoSingletonHandlerFactory.get();
});