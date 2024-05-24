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
    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        drowDropdownListSelect3($("#ddlHospital"), urlRoot + "/api/HospitalRoom/GetHospitals", "", "GET", "اختر المستشفى");
    } else {
        $(".Hospital").hide();
    }
    $("#pnlMaintenanceCost").hide();
    drowDropdownListSelect3($("#ddlHospitalEquipmentState"), urlRoot + "/api/HospitalVentilatorState/HospitalEquipmentStates", "", "GET", "اختر الحالة");
    GetAllHospitalVentilator()
})
var HospitalVentilatorTable = '';
function GetAllHospitalVentilator() {
    HospitalVentilatorTable = $("#divHospitalVentilatorTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalVentilator/GetAll",
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
                dataField: "VentilatorNo",
                caption: "رقم جهاز التنفس الصناعى",
            },
            {
                dataField: "VentilatorSerialNo",
                caption: "الرقم التسلسلي",
            },
            {
                dataField: "Title",
                caption: "الوضع الحالى",
            },
            {
                dataField: "ID",
                caption: "الاحراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn blue btn-xs" data-id="' + info.data.ID + '" name="btnSaveHospitalVentilatorState"><i class="fa fa-plus"></i> اضافة حالة </a>')
                }
            }
        ],
    }).dxDataGrid("instance");
}

var HospitalVentilatorID;
$("#divHospitalVentilatorTable").on("click", 'a[name="btnSaveHospitalVentilatorState"]', function () {
    HospitalVentilatorID = $(this).data("id");
    GetHospitalVentilatorStateHistoryTable(HospitalVentilatorID)
    $('#btnSaveHospitalVentilator').data('id', $(this).data("id"));
    $("#modal-AddnewHospitalVentilatorState").modal("show");
    $("#StateHistory").show();
})


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

$("#divHospitalVentilatorTable").on("click", 'a[name="btnEditHospitalVentilatorstat"]', function () {
    $('#btnSaveHospitalVentilator').data('id', $(this).data("id"));
    var data = CustomAjax(urlRoot + "/api/HospitalVentilator/GetHospitalVentilatorByID/" + $(this).data("id"), '', 'GET');
    $("#txtVentilatorNo").val(data.VentilatorNo);
    $("#txtVentilatorSerialNo").val(data.VentilatorSerialNo);
    $("#ddlHospital").val(data.HospitalID);
    $("#DivddlHospitalEquipmentState").hide();
    $("#modal-AddnewHospitalVentilator").modal("show");
})

$('#btnChangeHospitalVentilatorState').click(function () {
    var ID = $(this).data("id");
    var data = {
        ID: ID,
        HospitalEquipmentStateID: $("#ddlHospitalEquipmentState").val()
    }
    $.post(urlRoot + "/api/HospitalVentilator/ChangeState", data, function (result) {
        if (result == "ok") {
            HospitalVentilatorTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-ChangeHospitalVentilatorState").modal("hide");
        } else {
            Notifyonerror("ar", result);
        }
    })
})


function GetHospitalID() {
    var HospitalId = $("#HideHospitalID").val();
    return HospitalId;
}


function ValidNewHospitalVentilatorState() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#HospitalVentilatorID").require();
    $("#HospitalEquipmentStateID").require();
    return $.validity.end();
}
$("#btnSaveHospitalVentilatorState").click(function () {
    var result = ValidNewHospitalVentilatorState();
    if (result.valid) {
        AddNewHospitalVentilatorState();
    }

})

function AddNewHospitalVentilatorState() {
    var cost = 0;
    if ($('#pnlMaintenanceCost').css('display') == "block") cost = $('#txtMaintenanceCost').val();
    var data = {
        HospitalVentilatorID: HospitalVentilatorID,
        HospitalEquipmentStateID: $("#ddlHospitalEquipmentState").val(),
        HospitalVentilatorRemarks: $("#txtHospitalVentilatorRemarks").val(),
        HospitalEquipmentCost: cost
    }
    $.post(urlRoot + "/api/HospitalVentilatorState/Post", data, function (result) {
        if (result == "ok") {
            HospitalVentilatorTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewHospitalVentilatorState").modal("hide");
            ClearHospitalVentilatorState();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalVentilatorState() {
    $("#txtBedNo").val('');
    $("#ddlHospitalEquipmentState").val('All').trigger('change');
    $("#txtHospitalVentilatorRemarks").val('');
    $('#txtMaintenanceCost').val('0.00');
    $('#btnSaveHospitalVentilatorState').data('id', 0);
}

var HospitalVentilatorStateHistoryTable = '';
function GetHospitalVentilatorStateHistoryTable(id) {
    HospitalVentilatorStateHistoryTable = $("#divHospitalVentilatorStateHistoryTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalVentilator/GetHospitalVentilatorStateHistoryByID/" + id,
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