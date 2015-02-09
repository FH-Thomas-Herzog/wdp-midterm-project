/**
 * Created by cchet on 2/9/2015.
 */
var
    rendererHelperSingletonFactory = function () {
        var
            rendererHandler = null;

        this.create = function () {
            if (rendererHandler != null) {
                return rendererHandler;
            } else {
                return (rendererHandler =
                    (function () {
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

                        this.clearContactForm = function () {

                        }

                        this.renderContactsOption = function (contacts) {
                            $.each(contacts, function (idx, val) {
                                $("#custSel").append($('<option/>', {
                                    'value': idx,
                                    'text': val.name
                                }));
                            });
                        }

                        this.fillContactForm = function (contacts, idx) {
                            var option = _$('#custSel option[value="' + idx + '"]');
                            this.clearContactForm();
                            this.renderContactsOption(contacts);
                            if (option != null) {
                                option.attr("selected", true);
                            }
                        }
                    }()))
            }
        }
    }