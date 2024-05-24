var patientVisitID = '';
$(document).ready(function () {
    GetMyHospitalPatientTable();
    GetICUHospitalPatientTable();
    GetOtherHospitalPatientTable();

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

$("#hospitaltitleelement").click(function () {
    GetMyHospitalPatientTable();
    GetICUHospitalPatientTable();
    GetOtherHospitalPatientTable();
});
$("#btnRefreshPatientList").click(function () {
    GetMyHospitalPatientTable();
    GetICUHospitalPatientTable();
    GetOtherHospitalPatientTable();
});
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
var IsICUPage = true;
var IsICU = true;
$("body").on("click", 'button[name="btnPatientVisitDetails"]', function () {
    var ID = $(this).data("id");
    IsVentilatorUpdateAllowed = false;
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
        //if (patientVisitDetail.IsRegisted && !patientVisitDetail.IsCanceled) {
            
        //} 
        if (patientVisitDetail.IsVentilatorNeeded) {
            PatientVisitResidenceID = patientVisitDetail.PatientVisitResidenceID;
            HospitalVentilatorID = patientVisitDetail.HospitalVentilatorID;
            BindddlEditHospitalVentilator(patientVisitDetail.HospitalVentilatorID);
            $(".DivEditVentilatorResidence").show();
            IsVentilatorUpdateAllowed = true;
        } else {
            HospitalVentilatorID = null;
            PatientVisitResidenceID = null;
            $("#ddlEditHospitalVentilatorID").val("");
            $(".DivEditVentilatorResidence").hide();
        }
    } else $(".DivEditVentilatorResidence").hide();


    if (Boolean($(this).data("ismyhospital")) && IsICU) {
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


function GetMyHospitalPatientTable() {
    var MyHospitalKeyword = '0';
    if ($("#txtMyHospitalKeyword").val() != '') { MyHospitalKeyword = $("#txtMyHospitalKeyword").val() };
    MyHospitalSearchPagging(MyHospitalKeyword, 1);
}

var MyHospitalTotalCount = 0;
$("#btnMyHospitalSearch").click(function () {
    var MyHospitalKeyword = '0';
    if ($("#txtMyHospitalKeyword").val() != '') { MyHospitalKeyword = $("#txtMyHospitalKeyword").val() };
    MyHospitalSearchPagging(MyHospitalKeyword, 1);
    MyHospitalTotalCount = Math.ceil(MyHospitalTotalCount / 20);
    if (MyHospitalTotalCount > 0) {
        $('#page-selection').show();
        $('#page-selection').bootpag({
            total: MyHospitalTotalCount,
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
            MyHospitalSearchPagging(MyHospitalKeyword, num);
        });
    } else
        $('#page-selection').hide();

});

function MyHospitalSearchPagging(SearchText, pageIndex) {
    $.get(urlRoot + '/api/Patient/GetHospitalPatientNew/' + pageIndex + '/' + SearchText,
        function (data) {
            var Html = "";
            Html += '<div class="row" style="padding-top: 5px !important;margin-right: -10px;margin-left: -10px;">';
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
                Html += '<span id="lblMedicalRecordState" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">الحالة : <span style="color: green">' + data[i].LastPatientVisitMedicalRecordStateTitle + '</span></span>';
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
                Html += '<button type="button" id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" name="btnPatientVisitMedical" data-id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" href="' + data[i].LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;height:30px!important;" class="btn green lightgallery"><i class="fa fa-file"></i></button>';
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
            $("#divPatientTableHospital").html(Html);
            //MyHospitalTotalCount = data[0].MyHospitalTotalCount;
        });
}


function GetOtherHospitalPatientTable() {
    var OtherHospitalKeyword = '0';
    if ($("#txtOtherHospitalKeyword").val() != '') { OtherHospitalKeyword = $("#txtOtherHospitalKeyword").val() };
    OtherHospitalSearchPagging(OtherHospitalKeyword, 1);
}

var OtherHospitalTotalCount = 0;
$("#btnOtherHospitalSearch").click(function () {
    var OtherHospitalKeyword = '0';
    if ($("#txtOtherHospitalKeyword").val() != '') { OtherHospitalKeyword = $("#txtOtherHospitalKeyword").val() };
    OtherHospitalSearchPagging(OtherHospitalKeyword, 1);
    OtherHospitalTotalCount = Math.ceil(OtherHospitalTotalCount / 20);
    if (OtherHospitalTotalCount > 0) {
        $('#page-selection').show();
        $('#page-selection').bootpag({
            total: OtherHospitalTotalCount,
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
            OtherHospitalSearchPagging(OtherHospitalKeyword, num);
        });
    } else
        $('#page-selection').hide();

});

function OtherHospitalSearchPagging(SearchText, pageIndex) {
    $.get(urlRoot + '/api/Patient/GetOtherHospitalPatientNew/' + pageIndex + '/' + SearchText,
        function (data) {
            var Html = "";
            Html += '<div class="row" style="padding-top: 5px !important;margin-right: -10px;margin-left: -10px;">';
            for (var i = 0; i < data.length; i++) {
                Html += '<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">'
                Html += '<div class="card">';
                Html += '<div class="m-grid">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-10  m-grid-col-xs-10">';

                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<span id="lblHospitalName" style="color: #3379b7 !important;font-weight: bolder; font-size: 100%;">المستشفى : ' + data[i].HospitalName + '</span>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';

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
                Html += '<span id="lblMedicalRecordState" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">الحالة : <span style="color: green">' + data[i].LastPatientVisitMedicalRecordStateTitle + '</span></span>';
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
                Html += '<button type="button" id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" name="btnPatientVisitMedical" data-id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" href="' + data[i].LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;height:30px!important;" class="btn green lightgallery"><i class="fa fa-file"></i></button>';
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
            $("#divPatientTableOtherHospital").html(Html);
            //OtherHospitalTotalCount = data[0].OtherHospitalTotalCount;
        });
}


function GetICUHospitalPatientTable() {
    var ICUHospitalKeyword = '0';
    if ($("#txtICUHospitalKeyword").val() != '') { ICUHospitalKeyword = $("#txtICUHospitalKeyword").val() };
    ICUHospitalSearchPagging(ICUHospitalKeyword, 1);
}

var ICUHospitalTotalCount = 0;
$("#btnICUHospitalSearch").click(function () {
    var ICUHospitalKeyword = '0';
    if ($("#txtICUHospitalKeyword").val() != '') { ICUHospitalKeyword = $("#txtICUHospitalKeyword").val() };
    ICUHospitalSearchPagging(ICUHospitalKeyword, 1);
    ICUHospitalTotalCount = Math.ceil(ICUHospitalTotalCount / 20);
    if (ICUHospitalTotalCount > 0) {
        $('#page-selection').show();
        $('#page-selection').bootpag({
            total: ICUHospitalTotalCount,
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
            ICUHospitalSearchPagging(ICUHospitalKeyword, num);
        });
    } else
        $('#page-selection').hide();

});

function ICUHospitalSearchPagging(SearchText, pageIndex) {
    $.get(urlRoot + '/api/Patient/GetICUHospitalPatientNew/' + pageIndex + '/' + SearchText,
        function (data) {
            var Html = "";
            Html += '<div class="row" style="padding-top: 5px !important;margin-right: -10px;margin-left: -10px;">';
            for (var i = 0; i < data.length; i++) {
                Html += '<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">'
                Html += '<div class="card">';
                Html += '<div class="m-grid">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-10  m-grid-col-xs-10">';

                Html += '<div class="m-grid m-grid-responsive-xs  margin-left-10">';
                Html += '<div class="m-grid-row">';

                Html += '<div class="m-grid-col m-grid-col-md-3">';
                Html += '<h4 style="white-space: nowrap;direction:ltr;margin-top: 0px;"><i class="fa fa-bed"></i> ' + data[i].BedNo + '  <i class="fa fa-home"></i> ' + data[i].RoomNo + (data[i].VentilatorNo != null ? ' <i class="fa fa-heartbeat"></i> ' + data[i].VentilatorNo : "") + '</h4>';
                Html += '</div>';

                Html += '</div>';
                Html += '</div>';

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
                Html += '<span id="lblMedicalRecordState" style="color: #3379b7 !important;font-weight: bold; font-size: 100%;margin-right:10px;">الحالة : <span style="color: green">' + data[i].LastPatientVisitMedicalRecordStateTitle + '</span></span>';
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

                Html += '<button type="button" id="btnPatientVisitContact-' + data[i].PatientVisitID + '" name="btnPatientVisitContact" data-id="' + data[i].PatientVisitID + '"  style="width: 100%;" class="btn blue-hoki"><i class="fa fa-phone"></i></button>';
                Html += '<button type="button" id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" name="btnPatientVisitMedical" data-id="btnPatientVisitMedical-' + data[i].PatientVisitID + '" href="' + data[i].LastPatientVisitMedicalRecordFileUrl + '" style="width: 100%;height:30px!important;" class="btn green lightgallery"><i class="fa fa-file"></i></button>';
                Html += '<button type="button" id="btnPatientVisitDetails-' + data[i].PatientVisitID + '" name="btnPatientVisitDetails" data-id="' + data[i].PatientVisitID + '" data-ismyhospital="1" data-isicu="1" style="width:100%; height:30px!important;" class="btn blue"><i class="fa fa-list-alt"></i></button>';

                Html += (data[i].IsConfirmed == true && data[i].IsCanceled == false ?
                    '<button type="button" id="btnPatientVisitDischarge-' + data[i].PatientVisitID + '" onClick="patientVisitDischarge(' + data[i].PatientVisitID + ')" name="btnPatientVisitDischarge" data-id="' + data[i].PatientVisitID + '" title="خروج المريض" style="width: 100%;" class="btn red"><i class="fa fa-sign-out"></i></button>'
                    : "");

                Html += (data[i].IsRegisted == true && data[i].IsConfirmed == false && data[i].IsCanceled == false ?
                    (data[i].IsApproved != null ? '<button type="button" id="btnPatientVisitConfirm-' + data[i].PatientVisitID + '" name="btnPatientVisitConfirm" data-id="' + data[i].PatientVisitID + '" title="تأكيد الحجز" style="width: 100%;" class="btn default"><i class="fa fa-check"></i></button>'
                        : '<button type="button" title="انتظار النقل" style="width: 100%;" class="btn default">انتظار</button>')
                    : '');

                Html += (data[i].IsRegisted == true && data[i].IsConfirmed == false && data[i].IsCanceled == false ?
                    '<button type="button" id="btnPatientVisitCancel-' + data[i].PatientVisitID + '" name="btnPatientVisitCancel" data-id="' + data[i].PatientVisitID + '" title="الغاء الحجز" style="width: 100%;" class="btn dark"><i class="fa fa-times"></i></button>'
                    : "");

                Html += '</div>';

                Html += '</div>';
                Html += '</div>';
                Html += (data[i].IsVentilatorNeeded ? '<div class="VentilatorYes">يحتاج Vent</div>' : '<div class="VentilatorNo">لا يحتاج Vent</div>');
                Html += '</div>';
                Html += '</div>';
            }
            Html += '</div>';
            $("#divPatientTableICUHospital").html(Html);
            //ICUHospitalTotalCount = data[0].ICUHospitalTotalCount;
        });
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

$("body").on("click", '#tabMyHospital', function () {
    GetMyHospitalPatientTable();
});

$("body").on("click", '#tabOtherHospital', function () {
    GetOtherHospitalPatientTable();
});

$("body").on("click", '#tabICUHospital', function () {
    GetICUHospitalPatientTable();
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

