
//Create Table
var fnCreateTableN = function (header, body, className, hasAction) {
    var html = '<table class="' + className + '">';

    if (header) {
        html += '<thead>' + fnaddRowN(header, 'th') + '</thead>';
    }

    html += '<tbody>';
    for (var i = 0; i < body.length; i++) {
        html += fnaddRowN(body[i], 'td', hasAction);
    }
    html += '</tbody>';

    //if (!isNaN(footer)) {
    //    html += '<thead>' + fnaddRowN(footer, 'th') + '</thead>';
    //}

    return html;
}
//Add Rows To Table
var fnaddRowN = function (d, tag, hasAction) {
    var str = '<tr>';
    for (var key in d) {
        if (d.hasOwnProperty(key)) {
            if (hasAction) {
                if (d.length - 1 == key)
                    str += '<' + tag + ' class="' + d[key][2] + '" style="' + d[key][1] + '">' + d[key][0] + '</' + tag + '>';
                else
                    str += '<' + tag + '>' + d[key] + '</' + tag + '>';
            } else {
                str += '<' + tag + '>' + d[key] + '</' + tag + '>';
            }
        }
    }

    return str + '</tr>';
};

//Create Dropdown
var drowDropdownList = function (drowDropdownData, Message) {
    var ddlHtml = '';
    if (Message)
        ddlHtml = '<option value="">' + Message + '</option>';
    for (var i = 0; i < drowDropdownData.length; i++) {
        var keys = Object.keys(drowDropdownData[i]);
        ddlHtml += '<option value="' + drowDropdownData[i][keys[0]] + '">' + drowDropdownData[i][keys[1]] + '</option>'
    }
    return ddlHtml;
}

var drowDropdownListSelect2 = function (selector, url, data, type, Message) {
    if (selector.length > 0) {
        var data = CustomAjax(url, data, type);

        var ddlHtml = '';
        if (Message)
            ddlHtml = '<option value="">' + Message + '</option>';
        for (var i = 0; i < data.length; i++) {
            var keys = Object.keys(data[i]);
            ddlHtml += '<option value="' + data[i][keys[0]] + '">' + data[i][keys[1]] + '</option>'
        }
        selector.html(ddlHtml);
        selector.select2({ placeholder: Message, allowClear: true })
    }

}

var drowDropdownList2 = function (selector, url, data, type, Message, Message2) {
    if (selector.length > 0) {
        var data = CustomAjax(url, data, type);
        var ddlHtml = '';
        if (data.length > 0) {
            if (Message)
                ddlHtml = '<option value="">' + Message + '</option>';
            for (var i = 0; i < data.length; i++) {
                var keys = Object.keys(data[i]);
                ddlHtml += '<option ' + (i == 0 ? "selected='selected'" : "") + ' value="' + data[i][keys[0]] + '">' + data[i][keys[1]] + '</option>'
            }
        }
        else {
            ddlHtml = '<option value="">' + Message2+'</option>'
        }

        selector.html(ddlHtml)
    }
}

var drowDropdownListSelect3 = function (selector, url, data, type, Message) {
    if (selector.length > 0) {
        var data = CustomAjax(url, data, type);

        var ddlHtml = '';
        if (Message)
            ddlHtml = '<option value="">' + Message + '</option>';
        for (var i = 0; i < data.length; i++) {
            var keys = Object.keys(data[i]);
            ddlHtml += '<option  data-isserviceclinic="' + data[i][keys[2]] + '"  data-discount="' + data[i][keys[2]] + '" value="' + data[i][keys[0]] + '">' + data[i][keys[1]] + '</option>'
        }
        selector.html(ddlHtml);
        selector.select2({ placeholder: Message, allowClear: true })
    }

}

//Notification
var Notifyonsuccess = function (lang, message, title) {
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

var Notifyonerror = function (lang, message, title) {
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

//Ajax Call
var CustomAjax = function (url, data, type) {
    var elem = '';
    $.ajax({
        url: url,
        data: data,
        dataType: "json",
        type: type === undefined ? "POST" : type,
        async: false,
        contentType: "application/json; charset=utf-8",
        success:
            function (response) {
                if (response.d === undefined)
                    elem = response;
                else
                    elem = response.d;
            },
        failure: function (response) {
            alert(response.d);
        }
    });
    return elem;
}


/*Form Validation*/
var InitFormValidation = function () {

}
var FormValidation = function (Form, alertError, alertSuccess) {
    var validator = Form.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: ".ignore", // validate all fields including form hidden input

        errorPlacement: function (error, element) { // render error placement for each input type
            if (element.parent('.input-group').size() > 0) {
                error.insertAfter(element.parent(".input-group"));
            } else if (element.attr("data-error-container")) {
                error.appendTo(element.attr("data-error-container"));
            } else if (element.parents('.radio-list').size() > 0) {
                error.appendTo(element.parents('.radio-list').attr("data-error-container"));
            } else if (element.parents('.radio-inline').size() > 0) {
                error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
            } else if (element.parents('.checkbox-list').size() > 0) {
                error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
            } else if (element.parents('.checkbox-inline').size() > 0) {
                error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
            }
            else if (element.hasClass(".file-caption")) {
                error.appendTo(element.parent());
            } else if (element.is("input[type='file']")) {
                error.appendTo(element.parent().parent().parent().find('.file-caption'));
            }
            else {
                error.insertAfter(element); // for other inputs, just perform default behavior
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit   
            alertSuccess.hide();
            alertError.show();
            App.scrollTo(alertError, -200);
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
    });
};
var validationrule = function (inputid, ruletype, value) {
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
function resetFormglobal(Form) {
    var validator = Form.validate({});
    validator.resetForm();
    $('.alert-danger').hide();
    $('.alert-success').hide();
    $(".form-group").removeClass("has-error");
    addclassignore($('select,input[type="text"]:not(.select2-focusser)'))
}
function resetForm(Form, alertError, alertSuccess) {
    var validator = Form.validate({});
    validator.resetForm();
    alertError.hide();
    alertSuccess.hide();
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
function validateelement(Form, selector) {
    selector.change(function () {
        Form.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
    });
}
function validateelementwithouaction(Form, selector) {
    Form.validate().element(selector); //revalidate the chosen dropdown value and show error or success message for the input
}
function ValidateCustom(Form, methodname, returnvalue, message) {
    var validator = Form.validate({});
    $.validator.addMethod(methodname, function (value) {
        return returnvalue;
    }, message);
}

/*End Form Validation*/
function EditSelect2(selector, url, id) {
    var element = selector;
    $.ajax({
        type: 'GET',
        url: url + '/' + id
    }).then(function (data) {
        // create the option and append to Select2
        var keys = Object.keys(data);
        var option = new Option(data[keys[1]], data[keys[0]], true, true);
        element.append(option).trigger('change');

        // manually trigger the `select2:select` event
        element.trigger({
            type: 'select2:select',
            params: {
                data: data
            }
        });
    });
}

/*Select2 dropdownlist*/
/*  Webservice type void   wih string term                 */
/*  Return json                                            */
/*  Context.Response.Write(serializer.Serialize(object));  */
function ddlSelect2(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term // search term

                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]] };
                    })
                };
            }
        }

    });
}
function ddlSelect3(selector, url, placeholder, minimumInputLength, id) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term, // search term
                    nestedID: id
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]] };
                    })
                };
            },
        },

    });
}
function ddlSelect4(selector, url, placeholder, minimumInputLength, id, id2) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "Post",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term, // search term
                    nestedID: id,
                    nestedID2: id2
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]] };
                    })
                };
            },
        },

    });
}
function ddlSelectEmployee(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term === undefined ? "" : params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], EmployeeImage: obj[keys[2]], Department: obj[keys[3]], JobPosition: obj[keys[4]] };
                    }),
                    pagination: {
                        more: (params.page * 30) < (data != null ? data.length : 0)
                    }
                };

            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page


    });
}
function ddlSelectEmployeeReplacer(selector, url, placeholder, minimumInputLength, id, EmployeeID) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term === undefined ? "" : params.term, // search term
                    nestedID: id,
                    EmployeeID: EmployeeID,
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], EmployeeImage: obj[keys[2]], Department: obj[keys[3]], JobPosition: obj[keys[4]] };
                    }),
                    pagination: {
                        more: (params.page * 30) < (data != null ? data.length : 0)
                    }
                };

            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page


    });
}
function ddlSelectEmployeeReplacer2(selector, url, placeholder, minimumInputLength, id) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term === undefined ? "" : params.term, // search term
                    nestedID: id,
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], EmployeeImage: obj[keys[2]], Department: obj[keys[3]], JobPosition: obj[keys[4]] };
                    }),
                    pagination: {
                        more: (params.page * 30) < (data != null ? data.length : 0)
                    }
                };

            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page


    });
}
function formatRepo(repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__avatar'><img src='" + (repo.EmployeeImage != null ? repo.EmployeeImage.replace("~", urlRoot) : urlRoot + "/assets/custom/images/img/avatar.png") + "' /></div>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.text + "</div>";

    if (repo.description) {
        markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
    }

    markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-building'></i>القسم " + repo.Department + " </div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-arrow-circle-left'></i>الوظيفة " + repo.JobPosition + " </div>" +
        //"<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
        "</div>" +
        "</div></div>";

    return markup;
}
function formatRepoSelection(repo) {
    return repo.text || repo.text;
}

function ddlSelectUsersAPI(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: 'GET',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], Department: obj[keys[2]] };
                    }),
                    pagination: {
                        more: (params.page * 30) < (data != null ? data.length : 0)
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepoUser, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });
}
function formatRepoUser(repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__title'>" + repo.text + "</div>";
    markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-building'></i>القسم " + repo.Department + " </div>" +
        "</div></div>";

    return markup;
}

//////////////////////////// API //////////////////////////
//// Medicine DDl
function formatMedicineRepo(repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix' style='text-align:left;'  dir='ltr'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.text + "</div>" +
        "<div class='select2-result-repository__description'>" + ((repo.genericName != "" && repo.genericName != null) ? repo.genericName : "Not Entered") + "</div>";
    markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-arrow-circle-right'></i> Dose : " + ((repo.dose != "" && repo.dose != null) ? repo.dose : "Not Entered") + " </div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-arrow-circle-right'></i> Concentration : " + ((repo.concentration != "" && repo.concentration != null) ? repo.concentration : "Not Entered") + " </div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-arrow-circle-right'></i> FormName : " + ((repo.formName != "" && repo.formName != null) ? repo.formName : "Not Entered") + " </div>" +
        //"<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
        "</div>" +
        "</div></div>";

    return markup;
}
function ddlSelectApiMedicine(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "en",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term // search term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], genericName: obj[keys[2]], formName: obj[keys[3]], dose: obj[keys[4]], concentration: obj[keys[5]] };
                    })
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatMedicineRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });
}
//// Items DDl
function formatItemsRepo(repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix' style='text-align:right;'  dir='rtl'>" +
        "<div class='select2-result-repository__meta' style='margin-right: 15px;'>" +
        "<div class='select2-result-repository__title'>" + repo.text + "</div>";
    if (repo.englishDesc != "" && repo.englishDesc != null) markup += "<div class='select2-result-repository__description'>" + repo.englishDesc + "</div>";
    markup += "<div class='select2-result-repository__statistics' dir='ltr' style='text-align:left;'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-arrow-circle-right'></i> Category : " + ((repo.categoryName != "" && repo.categoryName != null) ? repo.categoryName : "Not Entered") + " </div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-arrow-circle-right'></i> Made in : " + ((repo.madein != "" && repo.madein != null) ? repo.madein : "Not Entered") + " </div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-arrow-circle-right'></i> Unit : " + ((repo.iPack != "" && repo.iPack != null) ? repo.iPack : "Not Entered") + " </div>" +
        //"<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
        "</div>" +
        "</div></div>";

    return markup;
}
function ddlSelectApiItems(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "en",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term // search term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], englishDesc: obj[keys[2]], categoryName: obj[keys[3]], madein: obj[keys[4]], iPack: obj[keys[5]] };
                    })
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatItemsRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });
}

function formatProcRepo(repo) {
    if (repo.loading) return repo.text;
    var markup = "<div class='select2-result-repository clearfix' style='text-align:right;'  dir='rtl'>" +
        "<div class='select2-result-repository__meta' style='margin-right: 15px;'>" +
        "<div class='select2-result-repository__title'>" + repo.text + "</div>";
    markup += "<div class='select2-result-repository__description'> التكلفة : " + repo.val1 + "</div></div></div>";

    return markup;
}
function ddlSelectApiDataProc(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term // search term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], val1: obj[keys[2]], val2: obj[keys[3]], val3: obj[keys[4]] };
                    })
                };
            }
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatProcRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });
}
function ddlSelectApiData4(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term // search term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], val1: obj[keys[2]], val2: obj[keys[3]] };
                    })
                };
            }
        }
    });
}
function ddlSelectApi2(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term // search term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]] };
                    })
                };
            }
        }
    });
}
function ddlSelectApi3(selector, url, placeholder, minimumInputLength, id) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    nestedId: id,
                    term: params.term === undefined ? "" : params.term // search term
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]] };
                    })
                };
            }
        }
    });
}

function ddlSelectApi4(selector, url, placeholder, minimumInputLength, id, id2) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: "GET",
            dataType: 'json',
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term, // search term
                    nestedId: id,
                    nestedId2: id2,
                };
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]] };
                    })
                };
            }
        }
    });
}

function ddlSelectEmployeeApi(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: 'GET',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], EmployeeImage: obj[keys[2]], Department: obj[keys[3]], JobPosition: obj[keys[4]] };
                    }),
                    pagination: {
                        more: (params.page * 30) < (data != null ? data.length : 0)
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });
}

function ddlSelectEmployeeApiUsers(selector, url, placeholder, minimumInputLength) {
    selector.select2({
        placeholder: placeholder,
        minimumInputLength: minimumInputLength === undefined ? 0 : minimumInputLength,
        width: 'resolve',
        allowClear: true,
        language: "ar",
        ajax: {
            url: url,
            type: 'GET',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    term: params.term === undefined ? "" : params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
                params.page = params.page || 1;
                return {
                    results: $.map(data, function (obj) {
                        var keys = Object.keys(obj);
                        return { id: obj[keys[0]], text: obj[keys[1]], EmployeeImage: (obj[keys[2]] != null ? obj[keys[2]].replace("~", "http://human.must.edu.eg/Human") : ""), Department: obj[keys[3]], JobPosition: obj[keys[4]] };
                    }),
                    pagination: {
                        more: (params.page * 30) < (data != null ? data.length : 0)
                    }
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) { return markup; },
        templateResult: formatRepo, // omitted for brevity, see the source of this page
        templateSelection: formatRepoSelectionUser // omitted for brevity, see the source of this page
    });
}

function formatRepoSelectionUser(repo) {
    return '<span class="userimg"  data-url="' + repo.EmployeeImage + '">' + repo.text + '</span>';
}