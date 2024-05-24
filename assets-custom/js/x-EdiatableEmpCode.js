(function ($) {
   // "use strict";

    var EmpCode = function (options) {
        this.sourceData = options.source;
        this.init('EmpCode', options, EmpCode.defaults);
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(EmpCode, $.fn.editabletypes.abstractinput);

    $.extend(EmpCode.prototype, {

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
            var selectcode = value.codeselect;
            $.each(this.sourceData, function (i, v) {
                if (v.value == selectcode) {
                    selectcode = v.text.toUpperCase();
                }
            });
            var html = $('<div>').text(selectcode).html() + $('<div>').text(value.textcode).html();
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
            this.$input.filter('[name="textcode"]').val(value.textcode);
            this.$list.val(value.codeselect);
        },

        input2value: function () {
            return {
                textcode: this.$input.filter('[name="textcode"]').val(),
                codeselect: this.$list.val()
            };
        },

        activate: function () {
            this.$input.filter('[name="textcode"]').focus();
        },

        autosubmit: function () {
            this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    EmpCode.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '' +
            '<div class="editable-EmpCode">' +
            '<label><span>Code: </span><select name="codeselect" class="form-control"></select> <input type="text" name="textcode" class="form-control"></label>' +
            '</div>' +
            '</div>',
       
        inputclass: '',
        showbuttons: 'right', //WHY ISN'T THIS WORKING!!!
        source: []
    });

    $.fn.editabletypes.EmpCode = EmpCode;

}(window.$));