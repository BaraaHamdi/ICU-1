/*Table*/
function CreateTable(header, body, className) {
    var html = '<table class="' + className + '">';

    if (header) {
        html += '<thead>' + addRow(header, 'th') + '</thead>';
    }

    html += '<tbody>';
    for (var i = 0; i < body.length ; i++) {
        html += addRow(body[i], 'td');
    }
    html += '</tbody>';

    //if (!isNaN(footer)) {
    //    html += '<thead>' + addRow(footer, 'th') + '</thead>';
    //}

    return html;
}

var addRow = function (d, tag) {
    var str = '<tr>';
    for (var key in d) {
        if (d.hasOwnProperty(key)) {
            if (d.length - 1 == key)
                str += '<' + tag + ' class="' + d[key][2] + '" style="' + d[key][1] + '">' + d[key][0] + '</' + tag + '>';
            else
                str += '<' + tag + '>' + d[key] + '</' + tag + '>';
        }
    }

    return str + '</tr>';
};

function CreateTableNormal(header, body, className) {
    var html = '<table class="' + className + '">';

    if (header) {
        html += '<thead>' + addRowNormal(header, 'th') + '</thead>';
    }

    html += '<tbody>';
    for (var i = 0; i < body.length ; i++) {
        html += addRowNormal(body[i], 'td');
    }
    html += '</tbody>';

    //if (!isNaN(footer)) {
    //    html += '<thead>' + addRow(footer, 'th') + '</thead>';
    //}

    return html;
}

function addRowNormal(d, tag) {
    var str = '<tr>';
    for (var key in d) {
        if (d.hasOwnProperty(key)) {
            str += '<' + tag + '>' + d[key] + '</' + tag + '>';
        }
    }

    return str + '</tr>';
};
/*End Table*/
/*DDL*/
function drowDDl(Data, message) {
    var ddlHtml = '<option value="">' + message + '</option>'
    for (var i = 0; i < Data.length; i++) {
        ddlHtml += '<option value="' + Data[i].ID + '">' + Data[i].Name + '</option>'
    }
    return ddlHtml;
}

function drowDDlNormal(Data) {
    var ddlHtml = '';
    for (var i = 0; i < Data.length; i++) {
        ddlHtml += '<option value="' + Data[i].ID + '">' + Data[i].Name + '</option>'
    }
    return ddlHtml;
}
/*End DDl*/
/*Form Validation*/
function FormValidation(FormID, ErrorClass, SuccessClass) {
    var validator = FormID.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: ".ignore", // validate all fields including form hidden input
        errorPlacement: function (error, element) { // render error placement for each input type

            if (element.parent(".input-group").size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else if (element.attr("data-error-container")) {
                error.appendTo(element.attr("data-error-container"));
            }
            else if (element.parents('.checkbox-list').size() > 0) {
                error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
            } else if (element.parents('.icheck-inline').size() > 0) {
                error.appendTo(element.parents('.icheck-inline').attr("data-error-container"));
            } else {
                error.insertAfter(element); // for other inputs, just perform default behavior
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit   
            SuccessClass.hide();
            ErrorClass.show();
            App.scrollTo(ErrorClass, -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element)
                 .closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change done by hightlight
            $(element)
                .closest('.form-group').removeClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label
                .closest('.form-group').removeClass('has-error'); // set success class to the control group
        },
        submitHandler: function (form) { }
    });
}
function validationrule(inputid, ruletype, value) {
    switch (ruletype) {
        case 'required':
            inputid.rules("add", 'required');
            break;
        case 'minstring':
            inputid.rules("add", {
                required: true,
                minlength: value
            });
            break;
        case 'maxstring':
            inputid.rules("add", {
                required: true,
                maxlength: value
            });
            break;
        case 'rangestring':
            inputid.rules("add", {
                required: true,
                rangelength: value
            });
            break;
        case 'minnumber':
            inputid.rules("add", {
                required: true,
                min: value
            });
            break;
        case 'maxnumber':
            inputid.rules("add", {
                required: true,
                min: value
            });
            break;
        case 'rangenumber':
            inputid.rules("add", {
                required: true,
                range: value
            });
            break;
        case 'email':
            inputid.rules("add", {
                required: true,
                email: true
            });
            break;
        case 'url':
            inputid.rules("add", {
                required: true,
                url: true
            });
            break;
        case 'date':
            inputid.rules("add", {
                required: true,
                date: true
            });
            break;
        case 'number':
            inputid.rules("add", {
                required: true,
                number: true
            });
            break;
        case 'digits':
            inputid.rules("add", {
                required: true,
                digits: true
            });
            break;
        case 'confirmpassword':
            inputid.rules("add", {
                required: true,
                equalTo: value
            });
            break;
        case 'custom':
            inputid.rules("add", value);
            break;
        default:

    }

}
function resetFormglobal(FormID) {
    var validator = FormID.validate({});
    validator.resetForm();
    $('.alert-danger').hide();
    $('.alert-success').hide();
    $(".form-group").removeClass("has-error");
    addclassignore($('select,input[type="text"]:not(.select2-focusser)'))
}
function resetForm(FormID, ErrorClass, SuccessClass) {
    var validator = FormID.validate({});
    validator.resetForm();
    ErrorClass.hide();
    SuccessClass.hide();
    $(".form-group").removeClass("has-error");
    addclassignore($('select,input[type="text"]:not(.select2-focusser)'))

}
function addclassignore(selector) {
    selector.each(function () {
        $(this).addClass('ignore');
    });
}
function removeclassignore(selector) {
    selector.each(function () {
        $(this).removeClass("ignore");
    });
}
function validateelement(FormID, selector) {
    selector.change(function () {
        FormID.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });
}
function validateelementwithouaction(FormID, selector) {
    FormID.validate().element(selector); //revalidate the chosen dropdown value and show error or success message for the input
}
function ValidateCustom(FormID, methodname, returnvalue, message) {
    var validator = FormID.validate({});
    $.validator.addMethod(methodname, function (value) {
        return returnvalue;
    }, message);
}

/*End Form Validation*/
/*Notification*/

function onsuccess(lang, message, title) {
    if (title === undefined) {
        if (message === undefined) {
            if (lang.toLowerCase() == 'en') {
                toastr.success('Data saved successfully', {
                    timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut'
                });
            } else
                toastr.success('تم حفظ البيانات بنجاح', {
                    timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut'
                });
        }
        else {
            $(function () {
                toastr.success(message, {
                    timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut'
                });
            });
        }
    }
    else {
        $(function () {
            toastr.success(message, title, {
                timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut'
            });
        });
    }
}

function onerror(lang, message, title) {
    if (title === undefined) {
        if (message === undefined) {
            if (lang.toLowerCase() == 'en') {
                $(function () {
                    toastr.error('Error .... contact technical support', { timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut' });
                });
            } else
                $(function () {
                    toastr.error('خطأ .... اتصل بالدعم الفني', { timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut' });
                });
        }
        else {
            $(function () {
                toastr.error(message, { timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut' });
            });
        }
    }
    else {
        $(function () {
            toastr.error(message, title, { timeOut: 5000, closeButton: true, positionClass: 'toast-top-right', showDuration: 1000, hideDuration: 1000, timeOut: 5000, extendedTimeOut: 1000, showEasing: 'swing', hideEasing: 'linear', showMethod: 'fadeIn', hideMethod: 'fadeOut' });
        });
    }
}

/*End Notification*/
