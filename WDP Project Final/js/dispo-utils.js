/**
 * Created by cchet on 1/2/2015.
 */
var
    /**
     * This object specifies the global error codes which can be referenced from the javascript code.
     * @type {{INVALID_POSITION: number, INVALID_CUSTOMER: number, POSITION_NOT_FOUND: number, INVALID_POSITION_SPLIT: number}}
     */
    Errors = {
        INVALID_POSITION: 0,
        INVALID_CUSTOMER: 1,
        POSITION_NOT_FOUND: 2,
        INVALID_POSITION_SPLIT: 3
    }
    ,
    /**
     * This is the singleton error handler which is used to populate the messages to the view.
     * Additionally a pre and post handler function can be defined which will be invoked before and
     * after this error handle has handled the error.
     * @constructor ()
     */
    ErrorHandler = (function () {


        this.handle = function (error, preInvokeHandle, postInvokeHandle, customData) {
            /* Custom function called before handler handled error */
            if (preInvokeHandle != null) {
                preInvokeHandle(error, customData);
            }

            switch (error) {
                case 0:
                    populateMessage("Position is invalid and cannot be added to the disposition");
                    break;
                case 1:
                    populateMessage("Chosen customer is not valid and cannot be used for the disposition");
                    break;
                case 2:
                    populateMessage("The intended position could not be found");
                    break;
                case 3:
                    populateMessage("The split positions are invalid and cannot replace the intended position");
                    break;
                default:
                    alert("Error unknown !!! error:" + error);
                    break;
            }

            /* Custom function called after handler handled error */
            if (postInvokeHandle != null) {
                postInvokeHandle(error, customData);
            }
        }

        function populateMessage(msg) {
            alert(msg);
        }
    })();