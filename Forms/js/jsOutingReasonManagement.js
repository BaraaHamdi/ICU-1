$(document).ready(function () {
    GetAllOutingReason()
})
var OutingReasonTable = '';
function GetAllOutingReason() {
    OutingReasonTable = $("#divOutingReasonTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/OutingReason/GetAll",
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
        groupPanel: { visible: true },
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
                dataField: "ReasonTitle",
                caption: "السبب"
            },
            {
                dataField: "ReceptionAllowed",
                caption: "استقبال",
                cellTemplate: function (element, info) {
                    element.append((info.data.ReceptionAllowed ? "نعم" : "لا"))
                }
            }, {
                dataField: "ICUAllowed",
                caption: "رعاية",
                cellTemplate: function (element, info) {
                    element.append((info.data.ICUAllowed ? "نعم" : "لا"))
                }
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                width: 150,
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateOutingReason"><i class="fa fa-edit"></i> تعديل</a>' +
                        '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteOutingReason"><i class="fa fa-ban"></i>حذف</a>'
                    )
                }
            }
        ],
    }).dxDataGrid("instance");
}
$('#divOutingReasonTable').on('click', 'a[name="btnUpdateOutingReason"]', function myfunction() {
    var ID = $(this).data('id');
    $("#divmodalOutingReasonTitle").text("تعديل سبب الخروج");
    //$('#ckContainer').hide();
    $("#modal-AddnewOutingReason").modal("show");
    $("#btnSaveOutingReason").data('id', ID);
    $.get(urlRoot + '/api/OutingReason/GetbyID/' + ID, function (respnose) {
        $('#txtReasonTitle').val(respnose.ReasonTitle);
        $("#CkReceptionAllowed").bootstrapSwitch('state', respnose.ReceptionAllowed)
        $("#CkICUAllowed").bootstrapSwitch('state', respnose.ICUAllowed);
    })
})
$("#divOutingReasonTable").on("click", 'a[name="btnDeleteOutingReason"]', function () {
    var ID = $(this).data("id");
    var data = {
        ID: ID
    }
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
        $.post(urlRoot + "/api/OutingReason/Delete", data, function (result) {
            if (result == "ok") {
                OutingReasonTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
})

$("#btnAddNewOutingReason").click(function () {
    $("#modal-AddnewOutingReason").modal("show");
})

function ValidNewOutingReason() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtReasonTitle").require();
    return $.validity.end();
}

$("#btnSaveOutingReason").click(function () {
    var result = ValidNewOutingReason();
    if (result.valid) {
        AddNewOutingReason();
    }

})
function AddNewOutingReason() {
    var data = {
        ID: $("#btnSaveOutingReason").data('id'),
        ReasonTitle: $("#txtReasonTitle").val(),
        ICUAllowed: $("#CkICUAllowed").bootstrapSwitch('state'),
        ReceptionAllowed: $("#CkReceptionAllowed").bootstrapSwitch('state')
    }
    $.post(urlRoot + "/api/OutingReason/Post", data, function (result) {
        if (result == "ok") {
            OutingReasonTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewOutingReason").modal("hide");
            ClearOutingReason();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearOutingReason() {
    $("#txtReasonTitle").val('');
    $("#btnSaveOutingReason").data('id', 0)
}
$('#btnCancelOutingReason').click(function () {
    ClearOutingReason()
})
