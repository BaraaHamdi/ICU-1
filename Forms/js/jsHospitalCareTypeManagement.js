$(document).ready(function () {
    //GetAllHospitalCareType();
    BindHospitalCareType();
})
var HospitalCareTypeTable = '';
function GetAllHospitalCareType() {
    HospitalCareTypeTable = $("#divHospitalCareTypeTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalCareType/GetAll",
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
                caption: 'نوع الرعاية'
            },

            //{
            //    dataField: "ID",
            //    caption: "Actions",
            //    allowFiltering: false,
            //    cellTemplate: function (element, info) {
            //        element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
            //            '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteHospitalCareType"><i class="fa fa-ban"></i> Delete</a>')
            //    }
            //}
            {
                dataField: "ID",
                width: "120",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateHospitalCareType"><i class="fa fa-edit"></i> تعديل</a>')
                }
            }
        ],
    }).dxDataGrid("instance");
}

function BindHospitalCareType() {
    $("#divHospitalCareTypeTable2").generateTable({
        enabledatatable: true,
        enableajaxcall: true,
        translate: true,
        ajaxType: "api",
        ajax: {
            url: urlRoot + '/api/HospitalCareType/GetAll2/',
            type: "GET"
        },
        datatableprint: {
            allow: false
        },
        reporttitle: 'Medical Care Report',
        hidden: ['id', 'isDeleted'],
        tableclass: "table table-bordered table-striped table-condensed",
        actionstitle: "الاجراءات",
        actionswidth: "15%",
        createAction: {
            allowAction: true,
            key: 'id',
            actions: [{
                title: '',
                name: 'EditHospitalCareType',
                "class": 'btn-xs blue',
                method: EditHospitalCareType,
                icon: 'fa-edit',
                tooltip: 'Edit'
            },
            {
                twBtn: true,
                title: ['', ''],
                name: ['btnDelete', 'btnNotDelete'],
                "class": ['btn-xs red-thunderbird', 'btn-xs dark'],
                method: [DeleteHospitalCareType, null],
                icon: ['fa-trash-o', 'fa-ban'],
                tooltip: ['Delete', 'No Action'],
                fildName: 'isDeleted'
            }]
        }
    });
}

function EditHospitalCareType(id) {
    $("#divmodalHospitalCareTypeTitle").text("تعديل نوع الرعاية الطبية");
    $("#modal-AddnewHospitalCareType").modal("show");
    $('#btnSaveHospitalCareType').data('id', id);
    $.get(urlRoot + '/api/HospitalCareType/GetByID/' + id, function (response) {
        $('#txtTitle').val(response);
    });
}

function DeleteHospitalCareType(id) {
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
        var data = CustomAjax(urlRoot + "/api/HospitalCareType/Delete/" + id, "", "PUT");
        if (data === "ok") {
            BindHospitalCareType();
            Notifyonsuccess("ar");
        }
        else Notifyonerror('en', data);
    });
}

$("#divHospitalCareTypeTable").on("click", 'a[name="btnDeleteHospitalCareType"]', function () {
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
        $.post(urlRoot + "/api/HospitalCareType/Delete", data, function (result) {
            if (result == "ok") {
                HospitalCareTypeTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
})
$("#divHospitalCareTypeTable").on("click", 'a[name="btnUpdateHospitalCareType"]', function () {
    var ID = $(this).data("id");
    $("#divmodalHospitalCareTypeTitle").text("تعديل نوع الرعاية الطبية");
    $("#modal-AddnewHospitalCareType").modal("show");
    $('#btnSaveHospitalCareType').data('id', ID);
    $.get(urlRoot + '/api/HospitalCareType/GetByID/' + ID, function (response) {
        $('#txtTitle').val(response);
    });
})

$("#btnAddNewHospitalCareType").click(function () {
    ClearHospitalCareType();
    $("#divmodalHospitalCareTypeTitle").text(" إضافة نوع الرعاية الطبية");
    $("#modal-AddnewHospitalCareType").modal("show");
})

function ValidNewHospitalCareType() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtTitle").require();
    return $.validity.end();
}

$("#btnSaveHospitalCareType").click(function () {
    var result = ValidNewHospitalCareType();
    if (result.valid) {
        AddNewHospitalCareType();
    }

})

$('#btnCancelHospitalCareType').click(function () {
    ClearHospitalCareType();
})

function AddNewHospitalCareType() {
    var data = {
        ID: $('#btnSaveHospitalCareType').data('id'),
        Title: $("#txtTitle").val(),
    }
    $.post(urlRoot + "/api/HospitalCareType/Post", data, function (result) {
        if (result == "ok") {
            //HospitalCareTypeTable.refresh();
            BindHospitalCareType();
            Notifyonsuccess("ar");
            $("#modal-AddnewHospitalCareType").modal("hide");
            ClearHospitalCareType();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalCareType() {
    $("#txtTitle").val('');
    $('#btnSaveHospitalCareType').data('id', 0);
    $.validity.formReset();
}

