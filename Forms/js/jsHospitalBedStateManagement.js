$(document).ready(function () {
    $("#txtMaintenanceCost").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 50,
        max: 1000000,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    });
    $("#pnlMaintenanceCost").hide();
    ddlSelectApi2($("#ddlHospitalEquipmentState"), urlRoot + "/api/HospitalBed/HospitalEquipmentStates", "اختر الحالة", 0);
    GetAllHospitalBed()
})
var HospitalBedTable = '';
function GetAllHospitalBed() {
    HospitalBedTable = $("#divHospitalBedTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalBed/GetAll",
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
        headerFilter: {
            visible: true
        },
        paging: {
            pageSize: 10
        },
        rtlEnabled: true,
        columns: [
            {
                dataField: "BedNo",
                caption: "رقم السرير"
            },
            {
                dataField: "RoomTitle",
                caption: "الغرفة"
            },
            //{
            //    dataField: "HospitalCareTypeList",
            //},
            {
                dataField: "Title",
                caption: "Currant State",
                caption: "الوضع الحالي"
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn blue btn-xs" data-id="' + info.data.ID + '" name="btnAddHospitalBedState"><i class="fa fa-plus"></i> اضافة حالة</a>')
                }
            }
        ],
    }).dxDataGrid("instance");
}

var hospitalBed
$("#divHospitalBedTable").on("click", 'a[name="btnAddHospitalBedState"]', function () {
    $("#StateHistory").show();
    hospitalBed = $(this).data("id");
    GetHospitalBedStateHistoryTable(hospitalBed);
    $('#btnChangeHospitalBedState').data('id', $(this).data("id"));
    $("#modal-AddnewHospitalBedState").modal("show");

});

$('#ddlHospitalEquipmentState').change(function () {

    var ID = $('#ddlHospitalEquipmentState').val();
    $.get(urlRoot + '/api/HospitalEquipmentState/GetbyID/' + ID, function (respnose) {
        if (respnose.HospitalCostAllowed) {
            $("#pnlMaintenanceCost").show();
            $("#txtMaintenanceCost").attr("required", "true");
            $("#txtMaintenanceCost").require("* Required");
        }
        else {
            $("#pnlMaintenanceCost").hide();
            $("#txtMaintenanceCost").attr("required", "false");
        }
    })
});


$("#divHospitalBedTable").on("click", 'a[name="btnEditHospitalBed"]', function () {
    $('#btnSaveHospitalBed').data('id', $(this).data("id"))
    $("#DivlHospitalEquipmentState").hide();
    var data = CustomAjax(urlRoot + "/api/HospitalBed/GetAllHospitalBedByID/" + $(this).data("id"), '', 'GET');
    $("#txtBedNo").val(data.BedNo);
    $("#ddlHospitalRoom").val(data.HospitalRoomID).trigger('change');
    //$("#ddlHospitalCareTypeList").val(data.HospitalCareTypeList).trigger('change')
    console.log(data.HospitalCareTypeList)
    var x = JSON.parse(data.HospitalCareTypeList)
    $("#modal-AddnewHospitalBed").modal("show");
    $("#ddlHospitalCareTypeList").val(x).trigger('change')

});

$('#btnChangeHospitalBedState').click(function () {
    var ID = $(this).data("id");
    var data = {
        ID: ID,
        HospitalEquipmentStateID: $("#ddlHospitalEquipmentState").val()
    }
    $.post(urlRoot + "/api/HospitalBed/ChangeState", data, function (result) {
        if (result == "ok") {
            HospitalBedTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-ChangeHospitalBedState").modal("hide");
        } else {
            Notifyonerror("ar", result);
        }
    })
})


function ValidNewHospitalBedState() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#HospitalBedID").require();
    $("#HospitalEquipmentStateID").require();
    if ($('#pnlMaintenanceCost').css('display') == "block") $("#pnlMaintenanceCost").require("* Required");
    return $.validity.end();
}

$("#btnSaveHospitalBedState").click(function () {
    var result = ValidNewHospitalBedState();
    if (result.valid) {
        AddNewHospitalBedState();
    }
})

function AddNewHospitalBedState() {
    var cost = 0;
    if ($('#pnlMaintenanceCost').css('display') == "block") cost = $('#txtMaintenanceCost').val();
    var data = {
        HospitalBedID: hospitalBed,
        HospitalEquipmentStateID: $("#ddlHospitalEquipmentState").val(),
        HospitalBedStateRemark: $("#txtHospitalBedRemarks").val(),
        HospitalEquipmentCost: cost,
    }
    $.post(urlRoot + "/api/HospitalBed/PostHospitalBedState", data, function (result) {
        if (result == "ok") {
            HospitalBedTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewHospitalBedState").modal("hide");
            ClearHospitalBedState();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalBedState() {
    $("#txtBedNo").val('');
    $("#ddlHospitalEquipmentState").val('All').trigger('change');
    $("#txtHospitalBedRemarks").val('');
    $('#txtMaintenanceCost').val('0.00');
    $('#btnSaveHospitalBedState').data('id', 0);
}

var HospitalBedStateHistoryTable = '';
function GetHospitalBedStateHistoryTable(id) {
    HospitalBedStateHistoryTable = $("#divHospitalBedStateHistoryTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalBed/GetHospitalBedStateHistoryByID/" + id,
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
                caption: "الحالة",
            }, {
                dataField: "InsertionDate",
                caption: "تاريخ الادخال",
                dataType: "date",
            },

        ],
    }).dxDataGrid("instance");
}