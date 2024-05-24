

$(document).ready(function () {
    ddlSelectApi2($("#ddlDiagnoseID"), urlRoot + "/api/PatientVisitDiagnose/GetDiagnoses", "اختر التشخيص الطبى", 0);
});
var divPatientVisitDiagnoseTable = '';
function getAllPatientVisitDiagnose() {
    divPatientVisitDiagnoseTable = $("#divPatientVisitDiagnoseTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/PatientVisitDiagnose/GetAll/" + patientVisitID,
        }),
        remoteOperations: true,
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
                caption: 'التشخيص ',
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
                        '<a href="javascript:;" class="btn btn-danger" data-id="' + options.data.id + '" onClick=deletePatientVisitDiagnose("' + options.data.ID + '")> <i class="fa fa-trash-o"></i> حذف  </a>' +
                        '</div>';
                    $(container).html(html);
                }
            }
        ],
        rtlEnabled: true,
    }).dxDataGrid("instance");
};
function deletePatientVisitDiagnose(id) {
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
        $.get(urlRoot + '/api/PatientVisitDiagnose/Delete/' + id, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تم الحذف بنجاح');
                getAllPatientVisitDiagnose();
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى حفظ البيانات');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
}
function ValidPatientVisitDiagnose() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $('#ddlDiagnoseID').require('برجاء اختيار التشخيص');
    return $.validity.end();
}
$('#btnSavePatientVisitDiagnose').click(function () {
    var result = ValidPatientVisitDiagnose();
    if (result.valid) {
        var PatientVisitDiagnose = {
            DiagnoseID: $('#ddlDiagnoseID').val(),
            PatientVisitID: patientVisitID
        };
        $.post(urlRoot + '/api/PatientVisitDiagnose/Post', PatientVisitDiagnose, function (response) {
            if (response == "ok") {
                Notifyonsuccess("ar", 'تم الحفظ بنجاح');
                getAllPatientVisitDiagnose();
                clearPatientVisitDiagnose();
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
$('#btnClearPatientVisitDiagnose').click(function () {
    clearPatientVisitDiagnose();
});
function clearPatientVisitDiagnose() {
    $.validity.formReset();
    $('#ddlDiagnoseID').val('').trigger('change');
}