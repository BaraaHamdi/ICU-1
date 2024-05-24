(function ($) {
    "use strict";

    var TypeInfo = function (options) {
        this.sourceData = options.source;
        this.init('TypeInfo', options, TypeInfo.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(TypeInfo, $.fn.editabletypes.abstractinput);

    $.extend(TypeInfo.prototype, {

        render: function () {
            this.$list = this.$tpl.find('select');
            this.$input = this.$tpl.find('input');


            this.$list.empty();

            var fillItems = function ($el, data) {
                if ($.isArray(data)) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].children) {
                            $el.append(fillItems($('<optgroup>', {
                                label: data[i].text
                            }), data[i].children));
                        } else {
                            $el.append($('<option>', {
                                value: data[i].value
                            }).text(data[i].text));
                        }
                    }
                }
                return $el;
            };

            fillItems(this.$list, this.sourceData);


        },

        value2html: function (value, element) {
            if (!value) {
                $(element).empty();
                return;
            }
            var selecttype = value.typeselect;
            $.each(this.sourceData, function (i, v) {
                if (v.value == selecttype) {
                    selecttype = v.text.toUpperCase();
                }
            });
            var html = $('<div>').text(selecttype).html() + " - " + $('<div>').text(value.textinfo).html();
            $(element).html(html);
        },

        html2value: function (html) {
            return null;
        },

        value2str: function (value) {
            var str = '';
            if (value) {
                for (var k in value) {
                    str = str + k + ':' + value[k] + ';';
                }
            }
            return str;
        },

        str2value: function (str) {
            return str;
        },

        value2input: function (value) {
            if (!value) {
                return;
            }
            this.$input.filter('[name="textinfo"]').val(value.textinfo);
            this.$list.val(value.typeselect);
        },

        input2value: function () {
            return {
                textinfo: this.$input.filter('[name="textinfo"]').val(),
                typeselect: this.$list.val()
            };
        },

        activate: function () {
            this.$input.filter('[name="textinfo"]').focus();
        },

        autosubmit: function () {
            this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    TypeInfo.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '' +
            '<div class="editable-TypeInfo">' +
            '<label><span>Select Type: </span><select name="typeselect" class="form-control"></select> </span><input type="text" name="textinfo" class="form-control"> </label>' +
            '</div>',
       
        inputclass: '',
        showbuttons: 'right', //WHY ISN'T THIS WORKING!!!
        source: []
    });

    $.fn.editabletypes.TypeInfo = TypeInfo;

}(window.$));