$(document).ready(function () {
    GetAllHospitalEquipmentState()
})
var HospitalEquipmentStateTable = '';
function GetAllHospitalEquipmentState() {
    HospitalEquipmentStateTable = $("#divHospitalEquipmentStateTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalEquipmentState/GetAll",
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
                caption: "حالة المعدة"
            },
            {
                dataField: "HospitalBedAllowed",
                caption: "متاح سرير",
                cellTemplate: function (element, info) {
                    element.append((info.data.HospitalBedAllowed ? "نعم" : "لا"))
                }
            },
            {
                dataField: "HospitalVentilatorAllowed",
                caption: "متاح جهاز التنفس الصناعي",
                cellTemplate: function (element, info) {
                    element.append((info.data.HospitalVentilatorAllowed ? "نعم" : "لا"))
                }
            },
            {
                dataField: "HospitalUsingAllowed",
                caption: "يسمح بالاستخــدام",
                cellTemplate: function (element, info) {
                    element.append((info.data.HospitalUsingAllowed ? "نعم" : "لا"))
                }
            },
            {
                dataField: "HospitalCostAllowed",
                caption: "يسمح بتحديد التكاليف",
                cellTemplate: function (element, info) {
                    element.append((info.data.HospitalCostAllowed ? "نعم" : "لا"))
                }
            },
            {
                dataField: "ID",
                width: "200",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateHospitalEquipmentState"><i class="fa fa-edit"></i> تعديل</a>' +
                        '<a htef="javascript:;" class="btn btn-xs red" data-id="' + info.data.ID + '" name="btnDeleteHospitalEquipmentState"><i class="fa fa-ban"></i> حذف</a>'
                    )
                }
            }

        ],
    }).dxDataGrid("instance");
}
$('#divHospitalEquipmentStateTable').on('click', 'a[name="btnUpdateHospitalEquipmentState"]', function myfunction() {
    var ID = $(this).data('id');
    ClearHospitalEquipmentState();
    $("#divmodalHospitalEquipmentStateTitle").text("تعديل حالة معدات مستشفى");
    //$('#ckContainer').hide();
    $("#modal-AddnewHospitalEquipmentState").modal("show");
    $("#btnSaveHospitalEquipmentState").data('id', ID);
    $.get(urlRoot + '/api/HospitalEquipmentState/GetbyID/' + ID, function (respnose) {
        $('#txtTitle').val(respnose.Title);
        $("#CkHospitalBedAllowed").bootstrapSwitch('state', respnose.HospitalBedAllowed);
        $("#CkHospitalVentilatorAllowed").bootstrapSwitch('state', respnose.HospitalVentilatorAllowed);
        $("#CkHospitalUsingAllowed").bootstrapSwitch('state', respnose.HospitalUsingAllowed);
        $("#CkHospitalCostAllowed").bootstrapSwitch('state', respnose.HospitalCostAllowed);
    })
})
$("#divHospitalEquipmentStateTable").on("click", 'a[name="btnDeleteHospitalEquipmentState"]', function () {
    var ID = $(this).data("id");
    swal({
        title: "تحذير",
        text: "سوف يتم حذف البيانات!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "تعم",
        cancelButtonText: "إلغاء",
        animation: "slide-from-top",
        closeOnConfirm: true
    }, function () {
        var data = {
            ID: ID
        }
        $.post(urlRoot + "/api/HospitalEquipmentState/DeleteHospitalEquipmentState", data, function (result) {
            if (result == "ok") {
                HospitalEquipmentStateTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar");
            }
        })
    });
})

$("#btnAddNewHospitalEquipmentState").click(function () {
    ClearHospitalEquipmentState();
    $("#divmodalHospitalEquipmentStateTitle").text("إضافة حالة معدات مستشفى");
    $('#ckContainer').show();
    $("#modal-AddnewHospitalEquipmentState").modal("show");
})

function ValidNewHospitalEquipmentState() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtTitle").require();
    return $.validity.end();
}

$("#btnSaveHospitalEquipmentState").click(function () {
    var result = ValidNewHospitalEquipmentState();
    if (result.valid) {
        AddNewHospitalEquipmentState();
    }

})
function AddNewHospitalEquipmentState() {
    var data = {
        ID: $("#btnSaveHospitalEquipmentState").data('id'),
        Title: $("#txtTitle").val(),
        HospitalBedAllowed: $("#CkHospitalBedAllowed").bootstrapSwitch('state'),
        HospitalVentilatorAllowed: $("#CkHospitalVentilatorAllowed").bootstrapSwitch('state'),
        HospitalUsingAllowed: $("#CkHospitalUsingAllowed").bootstrapSwitch('state'),
        HospitalCostAllowed: $("#CkHospitalCostAllowed").bootstrapSwitch('state')
    }
    $.post(urlRoot + "/api/HospitalEquipmentState/Post", data, function (result) {
        if (result == "ok") {
            HospitalEquipmentStateTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewHospitalEquipmentState").modal("hide");
            ClearHospitalEquipmentState();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalEquipmentState() {
    $("#txtTitle").val('');
    $.validity.formReset();
    $("#btnSaveHospitalEquipmentState").data('id', 0);

    $("#CkHospitalBedAllowed").bootstrapSwitch('state', 'false');
    $("#CkHospitalVentilatorAllowed").bootstrapSwitch('state', 'false');
    $("#CkHospitalUsingAllowed").bootstrapSwitch('state', 'false');
    $("#CkHospitalCostAllowed").bootstrapSwitch('state', 'false');
}
$('#btnCancelHospitalEquipmentState').click(function () {
    ClearHospitalEquipmentState()
})
