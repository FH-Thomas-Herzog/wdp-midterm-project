/**
 * Created by cchet on 1/2/2015.
 */
var
    /**
     * This object specifies the global error codes which can be referenced from the javascript code.
     * @type {{INVALID_POSITION: number, INVALID_CUSTOMER: number, POSITION_NOT_FOUND: number, INVALID_POSITION_SPLIT: number}}
     */
    Errors = {
        INVALID_POSITION: new ErrorInstance(0, "Position is invalid and cannot be added to the disposition")
        ,
        INVALID_CUSTOMER: new ErrorInstance(1, "Chosen customer is not valid and cannot be used for the disposition")
        ,
        POSITION_NOT_FOUND: new ErrorInstance(2, "The intended id could not be found")
        ,
        INVALID_POSITION_SPLIT: new ErrorInstance(3, "The split positions are invalid and cannot replace the intended id")
        ,
        MAP_ENTRY_INVALID_TYPE: new ErrorInstance(4, "Map can only handle MapEntry instances")
    }
    ,
    /**
     * This is the singleton error handler which is used to populate the messages to the view.
     * Additionally a pre and post handler function can be defined which will be invoked before and
     * after this error handle has handled the error.
     * @constructor ()
     */
    ErrorHandlerSingleton = function () {

        var
            instance = null
            ,
            getInstance = function () {
                if (instance == null) {
                    return {
                        handle: function (error, preInvokeHandle, postInvokeHandle, customData) {
                            /* Custom function called before handler handled error */
                            if (preInvokeHandle != null) {
                                preInvokeHandle(error, customData);
                            }

                            /* populate message to user */
                            this.populateMessage(error);

                            /* Custom function called after handler handled error */
                            if (postInvokeHandle != null) {
                                postInvokeHandle(error, customData);
                            }
                        },
                        populateMessage: function (error) {
                            alert(error.msg + " (" + error.code + ")");
                        }
                    }
                }
                else {
                    return instance;
                }
            };

        return getInstance();
    };