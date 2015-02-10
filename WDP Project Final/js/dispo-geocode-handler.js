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
                    var pos;
                    if (status == google.maps.GeocoderStatus.OK) {
                        pos = results[0].geometry.location
                        map.setCenter(pos)
                        this.addMarker(pos, results[0].formatted_address)
                    } else {
                        alert("Geocode was not successful for the following reason: " + status)
                        navigator.geolocation.getCurrentPosition(this.addMarker, this.error)
                    }

                    this.addMarker = function (pos, title) {
                        var marker = new google.maps.Marker({
                            map: map,
                            draggable: false,
                            title: title,
                            icon: {path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW, scale: 4, strokeColor: 'red'},
                            position: pos
                        });

                        this.addInfoWindow(marker, pos, title)
                    }

                    this.addInfoWindow = function (marker, pos, title) {
                        var infoWindow = new google.maps.InfoWindow({
                            position: pos,
                            map: map,
                            content: title //maps api: address with street, postal code, city
                        });

                        google.maps.event.addListener(marker, 'click', function () {
                            infoWindow.open(map, marker);
                        });
                    }

                    this.init = function () {
                        var mapOptions = {
                            zoom: 14,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        // create necessary google objects
                        map = new google.maps.Map(document.getElementById("gMaps"), mapOptions)
                        var geocoder = new google.maps.Geocoder()

                        geocoder.geocode({'address': address}, geoCodeHandler);

                        new google.maps.TrafficLayer().setMap(map)
                    }


                    this.showRoute = function () {

                    }


                    this.getMap = function () {
                        return map
                    }

                    this.showMap = function () {
                        $(document).ready(function () {
                            $(window).resize(function () {
                                google.maps.event.trigger(map, 'resize');
                            });
                            google.maps.event.trigger(map, 'resize');
                        });

                        $("#gMaps").show()
                    }

                    this.hideMap = function () {
                        $("#gMaps").hide()
                    }

                }
                )());
            }
        }
    })();

