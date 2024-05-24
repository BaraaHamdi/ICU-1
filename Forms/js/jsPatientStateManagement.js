$(document).ready(function () {
    GetAllPatientState();
})
var PatientStateTable = '';
function GetAllPatientState() {
    PatientStateTable = $("#divPatientStateTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/PatientState/GetAll",
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
        rtlEnabled: true,
        columns: [
            {
                dataField: "Title",
                caption:"الحالة"
            },
            {
                dataField: "IsReceptionState",
                caption:"حالة الاستقبال",
                cellTemplate: function (element, info) {
                    element.append((info.data.IsReceptionState ? "نعم" : "لا"))
                }
            },
            {
                dataField: "IsIntensiveCareState",
                caption:"حالة عناية مركزة",
                cellTemplate: function (element, info) {
                    element.append((info.data.IsIntensiveCareState ? "نعم" : "لا"))
                }
            }
        ],
    }).dxDataGrid("instance");
}

//$("#divPatientStateTable").on("click", 'a[name="btnDeletePatientState"]', function () {
//    var ID = $(this).data("id");
//    var data = {
//        ID: ID
//    }
//    $.post(urlRoot + "/api/PatientState/Delete", data, function (result) {
//        if (result == "ok") {
//            PatientStateTable.refresh();
//            Notifyonsuccess("en");
//        } else {
//            Notifyonerror("en", result);
//        }
//    })

//})

$("#btnAddNewPatientState").click(function () {
    ClearPatientState();
    $("#modal-AddnewPatientState").modal("show");
})

function ValidNewPatientState() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtTitle").require();
    return $.validity.end();
}

$("#btnSavePatientState").click(function () {
    var result = ValidNewPatientState();
    if (result.valid) {
        AddNewPatientState();
    }

})
function AddNewPatientState() {
    var data = {
        Title: $("#txtTitle").val(),
        IsReceptionState: $("#CkIsReceptionState").bootstrapSwitch('state'),
        IsIntensiveCareState: $("#CkIsIntensiveCareState").bootstrapSwitch('state')
    }
    $.post(urlRoot + "/api/PatientState/Post", data, function (result) {
        if (result == "ok") {
            GetAllPatientState();
            Notifyonsuccess("en");
            $("#modal-AddnewPatientState").modal("hide");
            ClearPatientState();
        } else {
            Notifyonerror("en", result);
        }
    })
}

function ClearPatientState() {
    $.validity.formReset();
    $("#txtTitle").val('');
    $("#CkIsReceptionState").bootstrapSwitch('state', false);
    $("#CkIsIntensiveCareState").bootstrapSwitch('state', false);
}
$('#btnCancelPatientState').click(function () {
    ClearPatientState()
})
