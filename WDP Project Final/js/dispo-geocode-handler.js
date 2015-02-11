/**
 * Created by Tom on 03.01.15.
 */
var
    geoHandlerSingletonFactory = new (function () {
        var
            instance = null;

        this.get = function () {
            if (instance != null) {
                return instance;
            } else {
                return (instance = new (function () {


                }
                )());
            }
        }
    })();

