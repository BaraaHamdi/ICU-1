var patientVisitID = '';
$(document).ready(function () {
    GetAllPatient();
    //setInterval(GetAllPatient, 6000);

    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        ddlSelectApi2($("#ddlHospital"), urlRoot + "/api/HospitalRoom/GetHospitals", "اختر المستشفى", 0);
    } else {
        $(".Hospital").hide();
    }
    BindMedicalCare();
    BindDiagnoseTree();
    //ddlSelectApi2($("#ddlPatientVisitState"), urlRoot + "/api/PatientVisitMedicalRecord/GetPatientEntryStates", "اختر سجل الزيارة للمريض", 0);
    //drowDropdownListSelect2($("#ddlPatientVisitState"), urlRoot + "/api/PatientVisitMedicalRecord/GetPatientEntryStates", "", "GET", "اختر سجل الزيارة للمريض");
    //$("#ddlPatientVisitState").select2({ placeholder: "اختر سجل الزيارة للمريض", allowClear: false });

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

    BindrepeaterRelative()
})
$("#hospitaltitleelement").click(function () {
    GetAllPatient();
});
$("#btnRefreshPatientList").click(function () {
    GetAllPatient();
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
   // if (!(fuMedicalFile == "")) {
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
    //else
      //  Notifyonerror("ar", "يجب رفع التقرير الطبي");
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


var PatientTable = '';
function GetAllPatient() {
    PatientTable = $("#divPatientTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "PatientVisitID",
            loadUrl: urlRoot + "/api/Patient/GetReceptionPatient",
        }),
        remoteOperations: true,
        allowFiltering: false,
        allowSorting: false,
        wordWrapEnabled: true,
        showColumnLines: false,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        searchPanel: {
            visible: false,
            highlightCaseSensitive: true
        },
        onContentReady: function (e) {
            var elements = document.getElementsByClassName('lightgallery');
            for (let item of elements) {
                lightGallery(item, {
                    selector: 'this',
                })
            }
        },
        columnHidingEnabled: true,
        rowTemplate: function (container, item) {
            var data = item.data,
                markup = "<tbody class='" + ((item.rowIndex % 2) ? 'dx-row-alt' : '') + "'>" +
                    "<tr class='main-row'>" +
                    "<td>" +
                    '<div class="row">' +
                    '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">' +

                    '<div>' +
                    '<div class="m-grid">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle  m-grid-col-lg-1 m-grid-col-md-1 m-grid-col-md-1 m-grid-col-xs-1 btn ' + (!data.IsVentilatorNeeded ? "bg-green" : "bg-red") + '">' +
                    '<div class="m-grid m-grid-responsive-xs rotate">' +
                    '<div class="m-grid-row  font-white fix-rotate">' +
                    '<h5 style="white-space: nowrap;">' + (data.IsVentilatorNeeded ? "يحتاج" : "لا يحتاج") + ' جهاز تنفس</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid-col m-grid-col-middle  m-grid-col-lg-9 m-grid-col-md-9 m-grid-col-md-8 m-grid-col-xs-8">' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-3"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الرقم الطبي :' + data.PatientNo + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-3"><h4 style="color: #e7505a !important;font-weight: bold; font-size: 100%;">الوقت :' + FormatDate(data.PatientVisitInsertionDate) + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #246396 !important;font-weight: bold; font-size: 13px;">إسم المريض :' + data.FullName + '</h4></div>' +

                    '</div>' +
                    '</div>' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الجنس :' + (data.Sex ? "ذكر" : "انثي") + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">السن :' + data.Age + '</h4></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10"><div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الطبيب :' + data.LastPatientVisitMedicalRecordDoctorFullName + '</label></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الحالة : <span style="color: green">' + data.LastPatientVisitMedicalRecordStateTitle + '</span></label></div>' +
                    '</div>' +
                    '</div>' +
                    (data.LastPatientVisitResidenceHospitalID ?
                        '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                        '<div class="m-grid-row">' +
                        '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: red !important;font-weight: bold; font-size: 100%;">الطبيب :' + data.LastRegisterDoctor + '</h4></div>' +
                        '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: red !important;font-weight: bold; font-size: 100%;">المستشفي :' + data.LastPatientVisitResidenceHospital + '</h4></div>' +
                        '</div>' +
                        '</div>'
                        : "") +

                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">التشخيص :' + data.Diagnose + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">نسبة الاوكسجين :' + data.LastPatientVisitMedicalRecordOxygenLevel + '</h4></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-12"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الرعاية الطبية :' + data.MedicalCare + '</h4></div>' +
                    '</div>' +
                    '</div>' +

                    '</div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-lg-1 m-grid-col-lg-1 m-grid-col-sm-2 m-grid-col-xs-2">' +
                    '<div class="m-grid m-grid-responsive-xs">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-12">' +
                    '<div class="btn-group-vertical" style="width: 100%;">' +
                    //'<button type="button"  style="width: 100%;" class="btn red"><span style="font-weight: bold; font-size: 100%;text-align: center;">' + FormatDate(data.PatientVisitInsertionDate) + '</span></button>' +
                    '<button type="button" id="btnPatientVisitContact-' + data.PatientVisitID + '" name="btnPatientVisitContact" data-id="' + data.PatientVisitID + '"  style="width: 100%;" class="btn blue-hoki"><i class="fa fa-phone"></i></button>' +
                    //'<button type="button" id="btnPatientVisitMedical-' + data.PatientVisitID + '" name="btnPatientVisitMedical" data-id="' + data.PatientVisitID + '" data-url="' + data.LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;" class="btn green"><i class="fa fa-file"></i></button>' +
                    '<button type="button" id="btnPatientVisitMedical-' + data.PatientVisitID + '" data-id="btnPatientVisitMedical-' + data.PatientVisitID + '"name="btnPatientVisitMedical" href="' + data.LastPatientVisitMedicalRecordFileUrl + '" class="btn green lightgallery"><i class="fa fa-file"></i></button>' +
                    //'<button type="button" id="btnPatientVisitMedicall-' + data.PatientVisitID + '" name="btnPatientVisitMedicall" data-id="' + data.PatientVisitID + '" data-url="' + data.LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;" class="btn green"><i class="fa fa-file"></i></button>' +
                    '<button type="button" id="btnPatientVisitDetails-' + data.PatientVisitID + '" name="btnPatientVisitDetails" data-id="' + data.PatientVisitID + '" style="width: 100%;" class="btn blue"><i class="fa fa-list-alt"></i></button>' +
                    (data.IsRegisted == true && data.IsConfirmed == false && data.IsCanceled == false && data.IsApproved == null ?
                        '<button type="button" onClick="acceptResidence(' + data.PatientVisitID + ')" id="btnPatientVisitAccept-' + data.PatientVisitID + '" name="btnPatientVisitAccept" data-id="' + data.PatientVisitID + '" title="موافقة النقل" style="width: 100%;" class="btn green" too><i class="fa fa-check"></i></button>'
                        : '') +
                    (data.IsRegisted == true && data.IsConfirmed == false && data.IsCanceled == false && data.IsApproved == null ?
                        '<button type="button" onClick="rejectResidence(' + data.PatientVisitID + ')" id="btnPatientVisitReject-' + data.PatientVisitID + '" name="btnPatientVisitReject" data-id="' + data.PatientVisitID + '" title="رفض النقل" style="width: 100%;" class="btn red" too><i class="fa fa-times"></i></button>'
                        : '') +
                    (data.IsRegisted == true && data.IsConfirmed == false && data.IsCanceled == false && data.IsApproved != null ?
                        '<button type="button" onClick="cancelResidence(' + data.PatientVisitID + ')" id="btnPatientVisitCancel-' + data.PatientVisitID + '" name="btnPatientVisitCancel" data-id="' + data.PatientVisitID + '" title="الغاء الحجز" style="width: 100%;" class="btn light" too><i class="fa fa-times"></i></button>'
                        : '') +
                    '<button type="button" onClick="patientVisitDischarge(' + data.PatientVisitID + ')" id="btnPatientVisitDischarge-' + data.PatientVisitID + '" name="btnPatientVisitDischarge" data-id="' + data.PatientVisitID + '" title="خروج المريض" style="width: 100%;" class="btn purple"><i class="fa fa-sign-out"></i></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +


                    '</div>' +
                    '</div>' +
                    '</div>' +
                    "</td>" +
                    "</tr>" +
                    "</tbody>";
            //'<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label id="patientcode" class="bold" style="font-size: 100%;">' + data.Diagnose + '</label></div>' +
            //    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label id="patientcode" class="bold" style="font-size: 100%;">' + data.MedicalCare + '</label></div>' +
            //    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label id="patientcode" class="bold" style="font-size: 100%;">' + data. + '</label></div>' +
            //    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label id="patientcode" class="bold" style="font-size: 100%;">' + data.LastMedicalFile + '</label></div>' +

            //    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label id="patientcode" class="bold" style="font-size: 100%;">' + data. + '</label></div>' +

            container.append(markup);
        },
        columnAutoWidth: true,
        groupPanel: { visible: false },
        grouping: {
            autoExpandAll: false
        },
        headerFilter: {
            visible: false
        },
        scrolling: {
            mode: "virtual",
            rowRenderingMode: "virtual"
        },
        //scrolling: {
        //    useNative: true,
        //    rowRenderingMode: "virtual",
        //    mode: "virtual",
        //},
        paging: {
            pageSize: 20
        },
        loadPanel: {
            enabled: false
        },

        rtlEnabled: true,
        columns: [
            {
                dataField: "PatientNo",
                caption: "قائمة الانتظار",
                visible: false,
            },
            {
                dataField: "PatientVisitInsertionDate",
                visible: false,
                sortOrder: "desc"
            },
            //{
            //    dataField: "Sex",
            //    cellTemplate: function (element, info) {
            //        element.append('<span>' + (info.data.Sex ? "Male" : "Female") + '</span>')
            //    }
            //},

            //{
            //    dataField: "Age",
            //},
            //{
            //    dataField: "Doctor",
            //},
            //{
            //    dataField: "HospitalName",
            //},
            //{
            //    dataField: "Diagnose",
            //},
            //{
            //    dataField: "DischargeDate",
            //},
            //{
            //    dataField: "State",
            //    cellTemplate: function (element, info) {
            //        element.append('<span>' + (info.data.State ? "Out Hospital" : "In Hospital") + '</span>')
            //    }
            //},
            //{
            //    dataField: "PatientVisitID",
            //    caption: "Actions",
            //    allowFiltering: false,
            //    cellTemplate: function (element, info) {
            //        element.append('<div class="btn-group-vertical  btn-group-sm">' +
            //            '<a htef="javascript:;" class="btn blue btn-xs" data-id="' + info.data.PatientVisitID + '" name="btnMedicalInformation"><i class="fa fa-edit"></i> Medical Information</a>' +
            //            '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.PatientVisitID + '" name="btnPatientContacts"><i class="fa fa-user"></i> Contacts</a>' +
            //            '<a htef="javascript:;" class="btn green btn-xs" data-id="' + info.data.PatientVisitID + '" name="btnPatientUpdate"><i class="fa fa-edit"></i> Update</a>'
            //        )

            //    }
            //}
        ],
    }).dxDataGrid("instance");

}


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


$("#divPatientTable").on("click", 'button[name="btnPatientVisitMedical"]', function () {
    var ID = $(this).data("id");
    var url = $(this).data("url");

    lightGallery(document.getElementById(ID), {
        selector: 'this',
    });
    //$.fancybox({
    //    maxWidth: 800,
    //    fitToView: true,
    //    width: '70%',
    //    height: '70%',
    //    autoSize: false,
    //    closeClick: false,
    //    openEffect: 'elastic',
    //    closeEffect: 'elastic',
    //    'type': (url != null ? (url.split('.').pop() == 'pdf' ? "iframe" : '') : ''),
    //    'href': url
    //});
})
var PatientVisitResidenceID = null;
var IsICUPage = false;
var IsICU = false;
FirstTimeCountValidVen = 0;
FirstTimeCountValidVenNeed = 0;
$("#divPatientTable").on("click", 'button[name="btnPatientVisitDetails"]', function () {
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
$("#divPatientTable").on("click", 'button[name="btnPatientVisitContact"]', function () {
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
                GetAllPatient();
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
                GetAllPatient();
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
                GetAllPatient();
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
                GetAllPatient();
                $("#modal-DischargePatientVisit").modal("hide");
            } else if (data == "Error") { Notifyonerror('ar', 'خطاء فى حفظ البيانات'); } else {
                Notifyonerror('ar');
            }
        })
    }
})

