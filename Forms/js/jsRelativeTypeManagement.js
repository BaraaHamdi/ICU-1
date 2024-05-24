$(document).ready(function () {
    GetAllRelativeType()
})
var RelativeTypeTable = '';
function GetAllRelativeType() {
    RelativeTypeTable = $("#divRelativeTypeTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/RelativeType/GetAll",
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
                dataField: "Title",
                caption: "النوع",
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                width: "100",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteRelativeType"><i class="fa fa-ban"></i> حذف</a>')
                }
            }
        ],
    }).dxDataGrid("instance");
}

$("#divRelativeTypeTable").on("click", 'a[name="btnDeleteRelativeType"]', function () {
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
        $.post(urlRoot + "/api/RelativeType/Delete", data, function (result) {
            if (result == "ok") {
                RelativeTypeTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })

    });
})

$("#btnAddNewRelativeType").click(function () {
    $("#modal-AddnewRelativeType").modal("show");
})

function ValidNewRelativeType() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtTitle").require();
    return $.validity.end();
}

$("#btnSaveRelativeType").click(function () {
    var result = ValidNewRelativeType();
    if (result.valid) {
        AddNewRelativeType();
    }

})
function AddNewRelativeType() {
    var data = {
        Title: $("#txtTitle").val(),
    }
    $.post(urlRoot + "/api/RelativeType/Post", data, function (result) {
        if (result == "ok") {
            RelativeTypeTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewRelativeType").modal("hide");
            ClearRelativeType();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearRelativeType() {
    $("#txtTitle").val('');
}
$('#btnCancelRelativeType').click(function () {
    ClearRelativeType()
})
