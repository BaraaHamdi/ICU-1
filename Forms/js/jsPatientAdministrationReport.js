var patientVisitID = '';
$(document).ready(function () {
    GetPatientTableOtherHospital();
    GetPatientTableICUHospital();
    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        ddlSelectApi2($("#ddlHospital"), urlRoot + "/api/HospitalRoom/GetHospitals", "اختر المستشفى", 0);
    } else {
        $(".Hospital").hide();
    }
    BindMedicalCare()
    BindrepeaterRelative();
    BindDiagnoseTree();
    ddlSelectApi2($("#ddlPatientVisitState"), urlRoot + "/api/PatientVisitMedicalRecord/GetPatientStates", "اختر سجل الزيارة للمريض", 0);
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
    var OutingReason = CustomAjax(urlRoot + "/api/PatientManagement/BindICUOutingReason", '', "GET");
    $("#ddlReason").html(drowDropdownList(OutingReason, "اختر سبب الخروج"));
})
$("#btnAddNewPatients").click(function () {
    $("#modal-AddnewPatient").modal("show");
});

function GetHospitalID() {
    var HospitalId = $("#HideHospitalID").val();
    return HospitalId;
}

function BindrepeaterRelative() {
    var Data = CustomAjax(urlRoot + "/api/RelativeType/GetRelativeType", '', 'GET');
    $('#ddlRelativeType').html(drowDropdownList(Data, "اختر سلة القرابة"));
    $('#mt-repeater-Relative').each(function () {
        $(this).repeater({
            show: function () {
                $(this).slideDown();
            },
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






$("body").on("click", 'button[name="btnPatientVisitRegisted"]', function () {
    var ID = $(this).data("id");
    patientVisitID = ID;
    BindHospitalBed()
    BindHospitalVentilator()
    clearPatientVisitRegisted();
    $('#modal-ResidenceAdd').modal('show');
});
function clearPatientVisitRegisted() {
    $.validity.formReset();
    $("#ddlHospitalBedID").val('').trigger('change');
    $("#ddlHospitalVentilatorID").val('').trigger('change');
}
$("body").on("click", 'button[name="btnPatientVisitMedical"]', function () {
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

var PatientVisitResidenceID = null;
var HospitalVentilatorID = null;
var IsICUPage = false;
var IsICU = false;
$("body").on("click", 'button[name="btnPatientVisitDetails"]', function () {
    var ID = $(this).data("id");
    patientVisitID = ID;
    GetPatientVisitMedicalRecord(patientVisitID);
    GetPatientVisitAttachment(patientVisitID);
    GetPatientVisitDiagnose(patientVisitID);
    GetPatientVisitCare(patientVisitID);
    if ($(this).data("isicu") === 1) IsICU = true;
    else IsICU = false;

 

    var patientVisitDetail = CustomAjax(urlRoot + "/api/PatientManagement/GetPatientVisitInfo/" + patientVisitID, '', 'GET');
    if (patientVisitDetail != null) {
        $("#CkEditVentilatorNeed").bootstrapSwitch('state', patientVisitDetail.IsVentilatorNeeded);
        if (patientVisitDetail.IsRegisted && !patientVisitDetail.IsCanceled) {
            PatientVisitResidenceID = patientVisitDetail.PatientVisitResidenceID;
            HospitalVentilatorID = patientVisitDetail.HospitalVentilatorID;
            if (patientVisitDetail.IsVentilatorNeeded) {
                drowDropdownList2($("#ddlEditHospitalVentilatorID"), urlRoot + "/api/PatientVisitResidence/GetPatientVentilator/" + patientVisitDetail.HospitalVentilatorID, "", "GET", "اختر جهاز التنفس", "لا يوجد جهاز تنفس متاحة");
                $("#ddlEditHospitalVentilatorID").val(patientVisitDetail.HospitalVentilatorID);
                $(".DivEditVentilatorResidence").show();
            }
        } else {
            PatientVisitResidenceID = null;
            HospitalVentilatorID = null;
            $("#ddlEditHospitalVentilatorID").val("");
            $(".DivEditVentilatorResidence").hide();
        }
    } else $(".DivEditVentilatorResidence").hide();
    $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', false);
    $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", false);

    if (Boolean($(this).data("ismyhospital"))) {
        $(".ShowAddMedicalRecordCard").show();
        $(".ShowAddMedicalAttachmentCard").show();
        $("body").find('input[name="checkdiagnose"]').attr("disabled", false);
        $("body").find('input[name="checkcare"]').attr("disabled", false);
        $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', false);
        $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", false);
    } else {
        $(".ShowAddMedicalRecordCard").hide();
        $(".ShowAddMedicalAttachmentCard").hide();
        $("body").find('input[name="checkdiagnose"]').attr("disabled", true);
        $("body").find('input[name="checkcare"]').attr("disabled", true);
        $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', true);
        $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", true);
    }


    $('#modal-actions').modal('show');
})


var PatientTableOtherHospital = '';
function GetPatientTableOtherHospital() {
    PatientTableOtherHospital = $("#divPatientTableOtherHospital").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "PatientVisitID",
            loadUrl: urlRoot + "/api/Patient/GetOtherHospitalPatient",
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
                    '<h5 style="white-space: nowrap;">' + (data.IsVentilatorNeeded ? "يحتاج" : "لا يحتاج") + '  جهاز تنفس</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid-col m-grid-col-middle  m-grid-col-lg-9 m-grid-col-md-9 m-grid-col-md-8 m-grid-col-xs-8">' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الرقم الطبي :' + data.PatientNo + '</h4></div>' +
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
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الحالة :<span style="color: green">' + data.LastPatientVisitMedicalRecordStateTitle + '</span></label></div>' +
                    '</div>' +
                    '</div>' +
                    (data.LastPatientVisitResidenceHospitalID == false ?
                        '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                        '<div class="m-grid-row">' +
                        '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الطبيب :' + data.LastRegisterDoctor + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">المستشفي :' + data.LastPatientVisitResidenceHospital + '</h4></div>' +
                        '</div>' +
                        '</div>' : "") +

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
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-12"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">المستشفي :' + data.HospitalName + '</h4></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-lg-1 m-grid-col-lg-1 m-grid-col-sm-2 m-grid-col-xs-2">' +
                    '<div class="m-grid m-grid-responsive-xs">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-12">' +
                    '<div class="btn-group-vertical" style="width: 100%;">' +
                    //'<button type="button"  style="width: 100%;" class="btn red"><h4 style="font-weight: bold; font-size: 100%;text-align: center;">' + FormatDate(data.PatientVisitInsertionDate) + '</h4></button>' +
                    '<button type="button" id="btnPatientVisitContact-' + data.PatientVisitID + '" name="btnPatientVisitContact" data-id="' + data.PatientVisitID + '"  style="width: 100%;" class="btn blue-hoki"><i class="fa fa-phone"></i></button>' +
                    '<button type="button" id="btnPatientVisitMedical-' + data.PatientVisitID + '" name="btnPatientVisitMedical" data-id="' + data.PatientVisitID + '" data-url="' + data.LastMedicalFile + '" style="width: 100%;" class="btn green"><i class="fa fa-file"></i></button>' +
                    '<button type="button" id="btnPatientVisitDetails-' + data.PatientVisitID + '" name="btnPatientVisitDetails" data-id="' + data.PatientVisitID + '"  data-ismyhospital="0" style="width: 100%;" class="btn blue"><i class="fa fa-list-alt"></i></button>' +
                    //(((data.IsRegisted == true && data.IsCanceled == true) || (data.IsRegisted == false && data.IsCanceled == false)) && data.IsConfirmed == false ?
                    //    '<button type="button" id="btnPatientVisitRegisted-' + data.PatientVisitID + '" name="btnPatientVisitRegisted" data-id="' + data.PatientVisitID + '" title="حجز مريض" style="width: 100%;" class="btn purple"><i class="fa fa-bed"></i></button>'
                    //    : '') +
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
                caption: "انتظار مستشفيات اخري",
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


var PatientTableICUHospital = '';
function GetPatientTableICUHospital() {
    PatientTableICUHospital = $("#divPatientTableICUHospital").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "PatientVisitID",
            loadUrl: urlRoot + "/api/Patient/GetICUHospitalPatient",
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
                    //'<div class="m-grid-col m-grid-col-middle  m-grid-col-lg-1 m-grid-col-md-1 m-grid-col-md-1 m-grid-col-xs-1 ' + ((item.rowIndex % 2) ? 'bg-dark' : 'bg-red') + '" style="text-align: center;">' +
                    //'<div class="m-grid m-grid-responsive-xs ">' +
                    //'<div class="m-grid-row  font-white ">' +
                    //'<h4 style="white-space: nowrap;"><i class="fa fa-bed"></i> ' + data.BedNo + '</h4>' +
                    //'<h4 style="white-space: nowrap;"><i class="fa fa-home"></i> ' + data.RoomNo + '</h4>' +
                    //(data.VentilatorNo != null ?
                    //    '<h4 style="white-space: nowrap;"><i class="fa fa-heartbeat"></i> ' + data.VentilatorNo + '</h4>' : "") +
                    //'</div>' +
                    //'</div>' +
                    //'</div>' +
                    '<div class="m-grid-col m-grid-col-middle  m-grid-col-lg-9 m-grid-col-md-9 m-grid-col-md-8 m-grid-col-xs-8">' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-12 text-center">' +
                    '<h4 style="white-space: nowrap;direction:ltr;"><i class="fa fa-bed"></i> ' + data.BedNo + '  <i class="fa fa-home"></i> ' + data.RoomNo + (data.VentilatorNo != null ? ' <i class="fa fa-heartbeat"></i> ' + data.VentilatorNo  : "") + '</h4>' +
                    '</div> ' +
                    //'<div class="m-grid-col m-grid-col-middle m-grid-col-md-3"><h4 style="white-space: nowrap;"><i class="fa fa-home"></i> ' + data.RoomNo + '</h4></div>' +
                    //(data.VentilatorNo != null ? '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="white-space: nowrap;"><i class="fa fa-heartbeat"></i> ' + data.VentilatorNo + '</h4></div>' : "") +
                    '</div>' +
                    '</div>' +
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
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10"><div class="m-grid-row">' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">المستشفي :' + data.HospitalName + '</label></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label style="color: red !important;font-weight: bold; font-size: 100%;"> الطبيب التسجيل :' + data.LastRegisterDoctor + '</label></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">الرعاية الطبية :' + data.MedicalCare + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-4"><label style="color: red !important;font-weight: bold; font-size: 100%;"> المستشفي التسجيل :' + data.LastPatientVisitResidenceHospital + '</label></div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="m-grid m-grid-responsive-xs  margin-left-10">' +
                    '<div class="m-grid-row">' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">التشخيص :' + data.Diagnose + '</h4></div>' +
                    '<div class="m-grid-col m-grid-col-middle m-grid-col-md-6"><h4 style="color: #3379b7 !important;font-weight: bold; font-size: 100%;">نسبة الاوكسجين :' + data.LastPatientVisitMedicalRecordOxygenLevel + '</h4></div>' +
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
                    '<button type="button" id="btnPatientVisitMedical-' + data.PatientVisitID + '" name="btnPatientVisitMedical" data-id="' + data.PatientVisitID + '" data-url="' + data.LastMedicalFile + '" style="width: 100%;" class="btn green"><i class="fa fa-file"></i></button>' +
                    '<button type="button" id="btnPatientVisitDetails-' + data.PatientVisitID + '" name="btnPatientVisitDetails" data-id="' + data.PatientVisitID + '" data-ismyhospital="0" data-isicu="0" style="width: 100%;" class="btn blue"><i class="fa fa-list-alt"></i></button>' +

                    
                    (data.IsRegisted == true && data.IsConfirmed == false && data.IsCanceled == false ?
                        '<button type="button" id="btnPatientVisitCancel-' + data.PatientVisitID + '" name="btnPatientVisitCancel" data-id="' + data.PatientVisitID + '" title="الغاء الحجز" style="width: 100%;" class="btn dark"><i class="fa fa-times"></i></button>' +
                        '<button type="button" id="btnPatientVisitConfirm-' + data.PatientVisitID + '" name="btnPatientVisitConfirm" data-id="' + data.PatientVisitID + '" title="تأكيد الحجز" style="width: 100%;" class="btn default"><i class="fa fa-check"></i></button>'
                        : "") +

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
                caption: "مرضي ICU",
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



$("#divPatientTableICUHospital").on("click", 'button[name="btnPatientVisitCancel"]', function () {
    var arr = {
        PatientVisitID: $(this).data("id")
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
                GetPatientTableICUHospital();
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى الغاء الحجز');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
});


$("#divPatientTableICUHospital").on("click", 'button[name="btnPatientVisitConfirm"]', function () {
    var arr = {
        PatientVisitID: $(this).data("id")
    }
    swal({
        title: "تحذير",
        text: "سوف يتم تأكيد الحجز!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        animation: "slide-from-top",
        closeOnConfirm: true
    }, function () {
        $.post(urlRoot + '/api/PatientManagement/ConfirmPatientVisitResidince', arr, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تم تأكيد الحجز بنجاح');
                GetPatientTableICUHospital();
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى تأكيد الحجز');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
});



$("body").on("click", '#tabOtherHospital', function () {
    PatientTableOtherHospital.refresh();
});


$("body").on("click", '#tabICUHospital', function () {
    PatientTableICUHospital.refresh();
});



$("body").on("click", 'button[name="btnPatientVisitContact"]', function () {
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
                GetPatientTableICUHospital();
                $("#modal-DischargePatientVisit").modal("hide");
            } else if (data == "Error") { Notifyonerror('ar', 'خطاء فى حفظ البيانات'); } else {
                Notifyonerror('ar');
            }
        })
    }
})

