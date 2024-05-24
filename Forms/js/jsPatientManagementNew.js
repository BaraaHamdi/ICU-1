var patientVisitID = '';
$(document).ready(function () {
    var searchtext = '0';
    if ($("#txtKeyword").val() != '') { searchtext = $("#txtKeyword").val() };
    SearchPagging(searchtext, 1);

    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        ddlSelectApi2($("#ddlHospital"), urlRoot + "/api/HospitalRoom/GetHospitals", "اختر المستشفى", 0);
    } else {
        $(".Hospital").hide();
    }
    BindMedicalCare();
    BindDiagnoseTree();

    var ddlPatientVisitState = CustomAjax(urlRoot + "/api/PatientVisitMedicalRecord/GetPatientEntryStates", '', "GET");
    $("#ddlPatientVisitState").html(drowDropdownList(ddlPatientVisitState, null));
    $("#ddlPatientVisitState").select2({ placeholder: null, allowClear: false });

    var to = false;
    $('#DiagnoseFilter').keyup(function () {
        if (to) { clearTimeout(to); }
        to = setTimeout(function () {
            var v = $('#DiagnoseFilter').val();
            $('#DiagnoseTree').jstree(true).search(v);
            $("#containerDiagnose").animate({
                scrollTop: $(".jstree-search").length > 0 ? ($(".jstree-search").offset().top - $("#containerDiagnose").offset().top + $("#containerDiagnose").scrollTop()) : 0
            });
        }, 250);
    });

    var OutingReason = CustomAjax(urlRoot + "/api/PatientManagement/BindReceptionOutingReason", '', "GET");
    $("#ddlReason").html(drowDropdownList(OutingReason, "اختر سبب الخروج"));

    $("#txtAge").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 0,
        max: 100,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
    });
    $("#txtOxygenLevel").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 100,
        max: 100,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    });

    BindrepeaterRelative();
});

//$(window).load(function () {
//    var elements = document.getElementsByClassName('lightgallery');
//    for (let item of elements) {
//        lightGallery(item, {
//            selector: 'this',
//        })
//    }
//});

$("#hospitaltitleelement").click(function () {
    var searchtext = '0';
    if ($("#txtKeyword").val() != '') { searchtext = $("#txtKeyword").val() };
    SearchPagging(searchtext, 1);
});
$("#btnRefreshPatientList").click(function () {
    var searchtext = '0';
    if ($("#txtKeyword").val() != '') { searchtext = $("#txtKeyword").val() };
    SearchPagging(searchtext, 1);
});
$("#btnAddNewPatients").click(function (e) {
    e.preventDefault();
    ClearPatient();
    $("#modal-AddnewPatient").modal("show");
});

function GetHospitalID() {
    var HospitalId = $("#HideHospitalID").val();
    return HospitalId;
}

function BindrepeaterRelative() {
    var Data = CustomAjax(urlRoot + "/api/RelativeType/GetRelativeType", '', 'GET');
    $('#ddlRelativeType').html(drowDropdownList(Data, "اختر سلة القرابة"));

    $('#mt-repeater-Relative').repeater({
        show: function () {
            $(this).slideDown();
        },
        isFirstItemUndeletable: true,
        repeatervalidation: function () {
            var result = validNewRelative();
            return result.valid;
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
            //if ($('a[data-count="deleterelative"]').length > 1) {
            //    swal({
            //        title: 'تاكيد الحذف',
            //        text: 'هل تريد حذف البيانات',
            //        type: 'info',
            //        allowOutsideClick: false,
            //        showConfirmButton: true,
            //        showCancelButton: true,
            //        closeOnConfirm: false,
            //        closeOnCancel: false,
            //        confirmButtonText: 'نعم',
            //        cancelButtonText: 'الغاء',
            //    },
            //        function (isConfirm) {
            //            if (isConfirm) {
            //                swal('تم الحذف بنجاح', 'لقد تم حذف البيانات بنجاح', "success");
            //                $(this).slideUp(deleteElement);
            //            } else {
            //                swal('خطأ', 'لم يتم الحذف', "error");
            //            }
            //        });
            //}
            //else {
            //    swal({
            //        title: 'خطأ',
            //        text: 'لا يمكن الحذف',
            //        type: "error",
            //        allowOutsideClick: true,
            //        showConfirmButton: true,
            //        confirmButtonClass: 'btn-danger',
            //        confirmButtonText: 'الغاء'
            //    });
            //}
        },
        ready: function (setIndexes) {
        }
    });

}

function validNewRelative() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $('select[data-valid="Relative"]').each(function () { $(this).require(); });
    $('input[data-valid="Relative"]').each(function () { $(this).require() });
    return $.validity.end();
}


function BindDiagnoseTree() {
    var data = GetDiagnoseTree();
    $("#DiagnoseTree").jstree('destroy');
    $('#DiagnoseTree').jstree({
        'core': {
            'data': data,
            "multiple": true
        },
        "plugins": ["wholerow", "search", "types", 'checkbox'],//"state",

    });
}

function GetDiagnoseTree() {
    var data = '';
    $.ajax({
        async: false,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: urlRoot + "/api/Diagnose/BindDiagnoseTree",
        success: function (jsonData) {
            data = $.map(jsonData, function (n) {
                return {
                    id: n.ID,
                    parent: n.Parent,
                    text: n.Text,
                    state: {
                        opened: true,
                    },
                }
            });
        }
    });
    return data;
}

function BindMedicalCare() {
    var data = CustomAjax(urlRoot + "/api/RelativeType/BindMedicalCare", '', 'GET');
    var html = '<div class="mt-checkbox-list">';
    for (var i = 0; i < data.length; i++) {
        html += '<label class="mt-checkbox">' +
            '<input type="checkbox"  name="ckMedicalCare" id="ckMedicalCare' + data[i].ID + '" value="' + data[i].ID + '"> ' + data[i].Title + '' +
            '<span></span>' +
            '</label>'
    }
    html += '</div>';
    $('#divMedicalCare').html(html);
}


var fuMedicalFile = '';
var fuMedicalFilex = $("#fuMedicalFile").fileinput({
    uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
    uploadAsync: false,
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    minFileCount: 1,
    language: 'ar',
    resizeImage: true,
    maxImageWidth: 500,
    showClose: false,
    showCaption: false,
    removeLabel: '',
    browseLabel: '',
    browseIcon: '<i class="fa fa-camera"></i>',
    browseClass: 'btn btn-primary btn-block',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-2',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/assets-custom/images/ticket.png" style="width: 90%;" alt="Your File">',
    layoutTemplates: { main2: '{preview} {remove} {browse}' },
    // maxImageHeight: 500,
    resizeImageQuality: '0.92',
    resizeIfSizeMoreThan: "1024",
    browseIcon: '<i class="fa fa-camera"></i>',
    uploadExtraData: { FilePath: '~/uploads/Patient/MedicalFile/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    fuMedicalFile = data.response.name;
}).on('filebatchselected', function (event) {
    fuMedicalFilex.fileinput('upload');
});


var AttachFileUrlAdd = [];
var AttachFileUrlx = $("#AttachFileUrl").fileinput({
    uploadUrl: urlRoot + '/Forms/UploadAttach.ashx/ProcessRequest',
    uploadAsync: false,
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    minFileCount: 1,
    language: 'ar',
    resizeImage: true,
    showClose: false,
    showCaption: false,
    removeLabel: '',
    browseLabel: '',
    browseIcon: '<i class="fa fa-camera"></i>',
    browseClass: 'btn btn-primary btn-block',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-2',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/assets-custom/images/medicalfiles.png" style="width: 90%;" alt="Your File">',
    layoutTemplates: { main2: '{preview} {remove} {browse}' },
    maxImageWidth: 500,
    maxImageHeight: 500,
    resizeImageQuality: '0.92',
    resizeIfSizeMoreThan: "1024",
    browseIcon: '<i class="fa fa-camera"></i>',
    uploadExtraData: { FilePath: '~/uploads/Patient/MedicalAttachments/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    $.map(data.response, function (n) {
        AttachFileUrlAdd.push(n);
    })
}).on('filebatchselected', function (event) {
    //$('#AttachFileUrl').fileinput('upload');
    AttachFileUrlx.fileinput('upload');
});





function validAddNewPatient() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    // $("#txtFullName").require();
    $("#ddlPatientVisitState").require();
    if (!(GetHospitalID() > 0))
        $("#ddlHospital").require();
    return $.validity.end();
}

$("#btnSavePatient2").click(function () {
    $("#btnSavePatient").click();
});

$("#btnSavePatient").click(function () {
    var result = validAddNewPatient();
    if (result.valid) {
        AddNewPatient();
    }
});
function AddNewPatient() {
    //if (!(fuMedicalFile == "")) {
        var data = {
            FullName: $("#txtFullName").val(),
            //BirthDate: $("#txtBirthDate").val(),
            NationalID: $("#txtNationalID").val(),
            InsuranceNo: $("#txtInsuranceNo").val(),
            Mobile1: $("#txtMobile1").val(),
            Mobile2: $("#txtMobile2").val(),
            Sex: $("#CkSex").bootstrapSwitch('state'),
            HospitalID: (GetHospitalID() > 0) ? GetHospitalID() : $("#ddlHospital").val(),
            Age: $("#txtAge").val(),
            IsVentilatorNeeded: $("#CkVentilatorNeed").bootstrapSwitch('state'),
            Diagnoses: $.map($('#DiagnoseTree').jstree('get_selected', true), function (n, i) { return { DiagnoseID: n.id } }),
            Activity: $.map($('input[name="ckMedicalCare"]:checked'), function (n, i) { return { HospitalCareTypeID: $(n).val() } }),
            Relatives: ($('#mt-repeater-Relative').repeaterVal()['group-a'][0].RelativeTypeID != "" ? $('#mt-repeater-Relative').repeaterVal()['group-a'] : null),
            MedicalFileUrl: fuMedicalFile,
            AttachFileUrl: AttachFileUrlAdd,
            PatientStateID: $("#ddlPatientVisitState").val(),
            OxygenLevel: $("#txtOxygenLevel").val()
            // MedicalDescription: $("#txtDescription").val(),
        }
        $.post(urlRoot + "/api/PatientManagement/Post", data, function (result) {
            if (result == "ok") {
                PatientTable.refresh();
                Notifyonsuccess("ar");
                $("#modal-AddnewPatient").modal("hide");
                ClearPatient();
            } else {
                Notifyonerror("ar", result);
            }
        })

    //}
//    else
        //Notifyonerror("ar", "يجب رفع التقرير الطبي");
}
function returnrepeaterVal(elem) {
    var array = [];
    var pppp = $.map(elem, function (val, index) { var yyyy = $.map(val, function (val2, indexs) { if (val2['select-input'] != "") array.push({ ID: val2['select-input'], Value: val2['text-input'] }) }); });
    return array;
}
function ClearPatient() {
    fuMedicalFilex.fileinput('clear');
    AttachFileUrlx.fileinput('clear');
    $('.help-block').remove()
    $('.has-error').removeClass()
    $('.mt-repeater-delete').click();
    HospitalLogoUrl = '';
    fuMedicalFile = "";
    AttachFileUrlAdd = [];
    $("#AttachFileUrl").fileinput('clear');
    $("#fuMedicalFile").fileinput('clear');
    $("#txtAge").val("");
    $("#txtFullName").val('');
    $("#txtBirthDate").val('');
    $("#txtNationalID").val('');
    $("#txtInsuranceNo").val('');
    $("#txtMobile1").val('');
    $("#txtMobile2").val('');
    $('input[type="text"]').val("");
    $("#txtOxygenLevel").val('100');
    $('input[name="ckMedicalCare"]').iCheck("uncheck");
    $('#DiagnoseTree').jstree(true).deselect_all();
    //$("#ddlPatientVisitState").val('').trigger('change');
    $("#ddlHospital").val('').trigger('change');
    $("#txtRegistratioDate").val('');
    $("#CkVentilatorNeed").bootstrapSwitch('state', false);
    $("#CkSex").bootstrapSwitch('state', true);
    $("#txtDescription").val('')
}

var TotalCount = 0;
$("#btnSearch").click(function () {
    SearchPagging($("#txtKeyword").val(), 1)
    TotalCount = Math.ceil(TotalCount / 20);
    if (TotalCount > 0) {
        $('#page-selection').show();
        $('#page-selection').bootpag({
            total: TotalCount,
            maxVisible: 6,
            paginationClass: 'pagination pagination-sm',
            paginationClass: 'pagination pagination-sm',
            next: '<i class="fa fa-angle-left"></i>',
            prev: '<i class="fa fa-angle-right"></i>',
            leaps: false,
            firstLastUse: true,
            first: '→',
            last: '←',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        }).on("page", function (event, num) {
            SearchPagging($("#txtKeyword").val(), num);
        });
    } else
        $('#page-selection').hide();

});

function SearchPagging(SearchText, pageIndex) {
    $.get(urlRoot + '/api/Patient/GetReceptionPatientNew/' + pageIndex + '/' + SearchText,
        function (data) {
            var Html = "";
            Html += '<div class="row">';
            for (var i = 0; i < data.length; i++) {
                Html += '<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">'
                Html += '<div class="card">';
                Html += '<div class="m-grid">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-10  m-grid-col-xs-10">';

                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<span id="lblPatientNo" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">' + data[i].PatientNo + '</span>';
                Html += '<span id="lblPatientFullName" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">' + data[i].FullName + '</span>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';

                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<span id="lblPatientVisitDuration" style="color: #e7505a !important;font-weight: bold; font-size: 100%;">الوقت :' + FormatDate(data[i].PatientVisitInsertionDate) + '</span>';
                Html += '<span id="lblSex" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">:' + (data[i].Sex ? "ذكر" : "انثى") + '</span>';
                Html += '<span id="lblAge" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">:' + data[i].Age + ' عام</span>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';


                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<span id="lblMedicalRecordDoctor" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الطبيب :' + data[i].LastPatientVisitMedicalRecordDoctorFullName + '</span>';
                Html += '<span id="lblMedicalState" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">الحالة : <span style="color: green">' + data[i].LastPatientVisitMedicalRecordStateTitle + '</span></span>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';


                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<span id="lblMedicalRecordOxygen" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الأكسجين:' + data[i].LastPatientVisitMedicalRecordOxygenLevel + '%</span>';
                Html += '<span id="lblMedicalCare" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">الرعاية:' + data[i].MedicalCare + '</span></span>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';



                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<span id="lblPatientDiagnose" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">التشخيص :' + data[i].Diagnose + '</span></span>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';

                Html += '</div>';

                Html += '<div class="m-grid-col m-grid-col-md-2 m-grid-col-xs-2">';
                Html += '<button type="button" id="btnPatientVisitContact-' + data[i].PatientVisitID + '" name="btnPatientVisitContact" data-id="' + data[i].PatientVisitID + '"  style="width: 100%;height:30px!important;" class="btn blue-hoki"><i class="fa fa-phone"></i></button>';
                //Html += '<button type="button" id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" name="btnPatientVisitMedical" data-id="' + data[i].PatientVisitID + '" data-url="' + data[i].LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;" class="btn green"><i class="fa fa-file"></i></button>';
                //'<button type="button" id="btnPatientVisitMedical-' + data.PatientVisitID + '" name="btnPatientVisitMedical" data-id="' + data.PatientVisitID + '" data-url="' + data.LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;" class="btn green"><i class="fa fa-file"></i></button>' +
                Html += '<button type="button" id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" data-id="btnPatientVisitMedical-' + data[i].PatientVisitID + '"name="btnPatientVisitMedical" href="' + data[i].LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;height:30px!important;" class="btn green lightgallery"><i class="fa fa-file"></i></button>';

                Html += '<button type="button" id="btnPatientVisitDetails-' + data[i].PatientVisitID + '" name="btnPatientVisitDetails" data-id="' + data[i].PatientVisitID + '" style="width: 100%;height:30px!important;" class="btn blue"><i class="fa fa-list-alt"></i></button>';
                Html += (data[i].IsRegisted == true && data[i].IsConfirmed == false && data[i].IsCanceled == false && data[i].IsApproved == null ?
                    '<button type="button" onClick="acceptResidence(' + data[i].PatientVisitID + ')" id="btnPatientVisitAccept-' + data[i].PatientVisitID + '" name="btnPatientVisitAccept" data-id="' + data[i].PatientVisitID + '" title="موافقة النقل" style="width: 100%;height:30px!important;" class="btn green" too><i class="fa fa-check"></i></button>'
                    : '');
                Html += (data[i].IsRegisted == true && data[i].IsConfirmed == false && data[i].IsCanceled == false && data[i].IsApproved == null ?
                    '<button type="button" onClick="rejectResidence(' + data[i].PatientVisitID + ')" id="btnPatientVisitReject-' + data[i].PatientVisitID + '" name="btnPatientVisitReject" data-id="' + data[i].PatientVisitID + '" title="رفض النقل" style="width: 100%;height:30px!important;" class="btn red" too><i class="fa fa-times"></i></button>'
                    : '');
                Html += (data[i].IsRegisted == true && data[i].IsConfirmed == false && data[i].IsCanceled == false && data[i].IsApproved != null ?
                    '<button type="button" onClick="cancelResidence(' + data[i].PatientVisitID + ')" id="btnPatientVisitCancel-' + data[i].PatientVisitID + '" name="btnPatientVisitCancel" data-id="' + data[i].PatientVisitID + '" title="الغاء الحجز" style="width: 100%;height:30px!important;" class="btn light" too><i class="fa fa-times"></i></button>'
                    : '');
                Html += '<button type="button" onClick="patientVisitDischarge(' + data[i].PatientVisitID + ')" id="btnPatientVisitDischarge-' + data[i].PatientVisitID + '" name="btnPatientVisitDischarge" data-id="' + data[i].PatientVisitID + '" title="خروج المريض" style="width: 100%;height:30px!important;" class="btn purple"><i class="fa fa-sign-out"></i></button>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';
                Html += (data[i].IsVentilatorNeeded ? '<div class="VentilatorYes">يحتاج Vent</div>' : '<div class="VentilatorNo">لا يحتاج Vent</div>');
                Html += '</div>';
                Html += '</div>';
            }
            Html += '</div>';
            $("#Container").html(Html);
            TotalCount = data[0].TotalCount;
        });

}

function ReturnImage(Url) {
    if (Url !== "") {
        return Url.replace("~/uploads/", urlRoot + "/uploads/");
    } else {
        return urlRoot + '/assets/custom/images/img/Avatar-512.png';
    }
}
function SearchTotal(SearchText) {
    var Total = 0;
    $.ajax({
        type: "POST",
        url: urlRoot + "/hr/ws/EmployeeContractManagement.asmx/SearchTotal",
        data: JSON.stringify({ SearchText: SearchText }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            Total = JSON.parse(response.d);

        },
        failure: function (response) {
            alert(response.d);
        }
    });
    return Total;
}
$("#form1").find("#txtKeyword").keydown(function (event) {
    if (event.keyCode == 13) {
        $("#btnSearch").click();
        return false;
    }
});



function FormatDate(date) {
    var result = '';

    var startdate = new Date(date); var enddate = new Date();
    // get total seconds between the times
    var delta = Math.abs(startdate - enddate) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;  // in theory the modulus is not required
    if (days > 1)
        result += days + " ي"
    if (hours > 1)
        result += hours + " س"
    if (minutes > 1)
        result += minutes + " د"
    if (days < 1 && hours < 1 && minutes < 1)
        result = "اقل من دقيقة"
    return result;
}


var PatientVisitResidenceID = null;
var IsICUPage = false;
var IsICU = false;
FirstTimeCountValidVen = 0;
FirstTimeCountValidVenNeed = 0;
$("#Container").on("click", 'button[name="btnPatientVisitDetails"]', function () {
    var ID = $(this).data("id");
    IsVentilatorUpdateAllowed = false;
    patientVisitID = ID;
    GetPatientVisitMedicalRecord(patientVisitID);
    GetPatientVisitAttachment(patientVisitID);
    GetPatientVisitDiagnose(patientVisitID);
    GetPatientVisitCare(patientVisitID);
    FirstTimeCountValidVen = 0;
    FirstTimeCountValidVenNeed = 0;

    $(".DivEditVentilatorResidence").hide();
    var patientVisitDetail = CustomAjax(urlRoot + "/api/PatientManagement/GetPatientVisitInfo/" + patientVisitID, '', 'GET');
    if (patientVisitDetail != null) {
        $("#CkEditVentilatorNeed").bootstrapSwitch('state', patientVisitDetail.IsVentilatorNeeded);
        if (patientVisitDetail.IsRegisted && !patientVisitDetail.IsCanceled) {
            PatientVisitResidenceID = patientVisitDetail.PatientVisitResidenceID;
        } else {
            PatientVisitResidenceID = null;
        }
        IsVentilatorUpdateAllowed = true;
    } else $(".DivEditVentilatorResidence").hide();


    $('#modal-actions').modal('show');
})


$("#Container").on("click", 'button[name="btnPatientVisitMedical"]', function () {
    var ID = $(this).data("id");
    var url = $(this).data("url");
    $.fancybox({
        maxWidth: 800,
        fitToView: true,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'elastic',
        closeEffect: 'elastic',
        'type': (url != null ? (url.split('.').pop() == 'pdf' ? "iframe" : '') : ''),
        'href': url
    });
})

$("#Container").on("click", 'button[name="btnPatientVisitContact"]', function () {
    var ID = $(this).data("id");
    patientVisitID = ID;
    GetPatientVisitRelative(patientVisitID);
    $('#modal-PatientContactRelative').modal('show');
})
function GetPatientVisitRelative() {
    $("#DivPatientRelative").generateTable({
        translate: true,
        tablelanguage: 'ar',
        datatable: {
            responsive: true,
        },
        enabledatatable: false,
        enableajaxcall: true,
        ajaxType: "api",
        ajax: {
            url: urlRoot + '/api/PatientContact/GetPatientContacts/' + patientVisitID,
            type: "GET"
        },
        datatableprint: {
            allow: false
        },
        hidden: ['ID', 'NationalID'],
        tableclass: "table table-bordered table-striped table-condensed "

    });
    if ($('#DivPatientRelativetable').find("tbody").children().length == 0) {
        $('#DivPatientRelativetable').html('<label class="text-center alert col-md-12 col-xs-12" style="margin-bottom: 0px;font-weight: bold;">لا يوجد بيانات .</label>');
    }
}

function acceptResidence(id) {
    var arr = {
        PatientVisitID: id
    }
    swal({
        title: "تحذير",
        text: "سوف يتم الموافقة على النقل!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        animation: "slide-from-top",
        closeOnConfirm: true
    }, function () {
        $.post(urlRoot + '/api/PatientManagement/AcceptPatientVisitResidince', arr, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تمت الموافقة على النقل بنجاح');
                //GetAllPatient();
                SearchPagging($("#txtKeyword").val(), 1);
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى الموافقة على النقل');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
}

function rejectResidence(id) {
    var arr = {
        PatientVisitID: id
    }
    swal({
        title: "تحذير",
        text: "سوف يتم رفض والغاء النقل",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        animation: "slide-from-top",
        closeOnConfirm: true
    }, function () {
        $.post(urlRoot + '/api/PatientManagement/RejectPatientVisitResidince', arr, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تم رفض النقل بنجاح');
                //GetAllPatient();
                SearchPagging($("#txtKeyword").val(), 1);
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى عملية النقل');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
}
function cancelResidence(id) {
    var arr = {
        PatientVisitID: id
    }
    swal({
        title: "تحذير",
        text: "سوف يتم الغاء الحجز!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        animation: "slide-from-top",
        closeOnConfirm: true
    }, function () {
        $.post(urlRoot + '/api/PatientManagement/CancelPatientVisitResidince', arr, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تم الغاء الحجز بنجاح');
                //GetAllPatient();
                SearchPagging($("#txtKeyword").val(), 1);
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى الغاء الحجز');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
}
function OutReasoningValidation() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#ddlReason").require("من فضلك قم باختيار سبب الخروج");
    return $.validity.end();
}
function patientVisitDischarge(id) {
    $("#modal-DischargePatientVisit").modal("show");
    patientVisitID = id;
}
$("#btnCancelDischarg").on("click", function () {
    $.validity.formReset();
})
$("#btnSaveDischarge").on("click", function () {
    var result = OutReasoningValidation();
    if (result.valid) {
        var arr = {
            PatientVisitID: patientVisitID,
            OutingReasonID: $("#ddlReason").val()
        }
        $.post(urlRoot + "/api/PatientManagement/DischargePatientVisit", arr, function (data) {
            if (data == "ok") {
                Notifyonsuccess('ar', 'تم حفظ  البيانات');
                //GetAllPatient();
                SearchPagging($("#txtKeyword").val(), 1);
                $("#modal-DischargePatientVisit").modal("hide");
            } else if (data == "Error") { Notifyonerror('ar', 'خطاء فى حفظ البيانات'); } else {
                Notifyonerror('ar');
            }
        })
    }
})

