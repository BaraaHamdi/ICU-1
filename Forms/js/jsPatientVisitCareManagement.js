
$(document).ready(function () {
    ddlSelectApi2($("#ddlHospitalCareTypeID"), urlRoot + "/api/PatientVisitCare/GetHospitalCareTypes", "اختر الرعاية الطبية", 0);
  
});
var divPatientVisitCareTable = '';
function getAllPatientVisitCare() {
    divPatientVisitCareTable = $("#divPatientVisitCareTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/PatientVisitCare/GetAll/" + patientVisitID,
        }),
        remoteOperations: false,
        allowFiltering: true,
        allowSorting: true,
        wordWrapEnabled: true,
        showColumnLines: false,
        showRowLines: true,
        rowAlternationEnabled: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            highlightCaseSensitive: true
        },
        groupPanel: { visible: false },
        grouping: {
            autoExpandAll: false
        },
        paging: {
            pageSize: 10
        }, headerFilter: {
            visible: true
        },
        columns: [
            {
                dataField: "Title",
                caption: 'الرعاية الطبية',
            },
            {
                dataField: "HospitalCareRemark",
                caption: 'ملاحظات',
            },
            {
                dataField: "ID",
                caption: 'الاجراء',
                sortOrder: "desc",
                width: "100",
                allowHeaderFiltering: false,
                allowSearch: false,
                allowFiltering: false,
                cellTemplate: function (container, options) {
                    var html = '<div class="btn-group btn-group-justified">' +
                        '<a href="javascript:;" class="btn btn-danger" data-id="' + options.data.id + '" onClick=deletePatientVisitCare("' + options.data.ID + '")> <i class="fa fa-trash-o"></i> حذف  </a>' +
                        '</div>';
                    $(container).html(html);
                }
            }
        ],
        rtlEnabled: true,
    }).dxDataGrid("instance");
};
function deletePatientVisitCare(id) {
    swal({
        title: "تحذير",
        text: "سوف يتم حذف البيانات!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "نعم",
        cancelButtonText: "إلغاء",
        animation: "slide-from-top",
        closeOnConfirm: true
    }, function () {
        $.get(urlRoot + '/api/PatientVisitCare/Delete/' + id, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تم الحذف بنجاح');
                getAllPatientVisitCare();
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى حفظ البيانات');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
}
function ValidPatientVisitCare() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $('#ddlHospitalCareTypeID').require('برجاء اختيار الرعاية الطبية');
    return $.validity.end();
}
$('#btnSavePatientVisitCare').click(function () {
    var result = ValidPatientVisitCare();
    if (result.valid) {
        var patientVisitCare = {
            HospitalCareRemark: $('#txtHospitalCareRemark').val(),
            HospitalCareTypeID: $('#ddlHospitalCareTypeID').val(),
            PatientVisitID: patientVisitID
        };
        $.post(urlRoot + '/api/PatientVisitCare/Post', patientVisitCare, function (response) {
            if (response == "ok") {
                Notifyonsuccess("ar", 'تم الحفظ بنجاح');
                getAllPatientVisitCare();
                clearPatientVisitCare();
            }
            else if (response == "NotAllowed") {
                Notifyonerror("ar", 'لايمكن الاضافة لعدم وجود صلاحية للدكتور');
            }
            else if (response == "Error") {
                Notifyonerror("ar", 'لم يتم الحفظ برجاء الاتصال بالدعم الفنى');
            }
        });
    }
});
$('#btnClearPatientVisitCare').click(function () {
    clearPatientVisitCare();
});
function clearPatientVisitCare() {
    $.validity.formReset();
    $('#ddlHospitalCareTypeID').val('').trigger('change');
    $('#txtHospitalCareRemark').val('');
}