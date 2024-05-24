$(document).ready(function () {
    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        /*ddlSelectApi2($("#ddlHospital"), urlRoot + "/api/OxygenTank/GetHospitalList", "اختر المستشفى", 0);*/
        $("#ddlHospital").html(drowDropdownList(CustomAjax(urlRoot + "/api/OxygenTank/GetHospitalList", '', 'GET'), "اختر المستشفى"));
        $("#ddlHospital").select2({ placeholder: "اختر المستشفى" });
    } else {
        $(".Hospital").hide();
    }

    $("#txtOxygenMinCapacity").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 0,
        max: 1000000,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
    });
    $("#txtOxygenMaxCapacity").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 0,
        max: 1000000,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
    });

    $("#ddlHospitalOxygenTankType").html(drowDropdownList(CustomAjax(urlRoot + "/api/OxygenTank/GetOxygenTankType", '', 'GET'), "اختر نوع خزان الاكسجين بالمستشفى"));
    $("#ddlHospitalOxygenTankType").select2({ placeholder: "اختر نوع خزان الاكسجين بالمستشفى" });
    GetAllHospitalOxygenTank()
})
var HospitalOxygenTankTable = '';
function GetAllHospitalOxygenTank() {
    HospitalOxygenTankTable = $("#divHospitalOxygenTank").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/OxygenTankRate/GetHospitalOxygenTankLastRateAll",
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
                dataField: "OxygenTankTitle",
                caption: "خزان الاكسجين"
            },
            {
                dataField: "OxygenMinCapacity",
                caption: "الحد الادنى"
            },

            {
                dataField: "OxygenMaxCapacity",
                caption: "الحد الاقصى"
            },
            {
                dataField: "OxygenTankTypeTitle",
                caption: "نوع خزان الاكسجين"
            },
            {
                dataField: "HospitalName",
                caption: "المستشفى"
            },
            {
                dataField: "LastReadingValue",
                caption: "اخر قراءة"
            },
            {
                dataField: "LastOxygenRatio",
                caption: "اخر معدل استهلاك"
            },
            {
                dataField: "TimeRemainingPerHour",
                caption: "الوقت المتبقي"
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">'
                        + '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateHospitalOxygenTank"><i class="fa fa-edit"></i> تعديل</a>'
                        + '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteHospitalOxygenTank"><i class="fa fa-ban"></i> حذف</a>'
                        + '</div>'
                    )
                }
            }
        ],
    }).dxDataGrid("instance");
}

$("#divHospitalOxygenTank").on("click", 'a[name="btnDeleteHospitalOxygenTank"]', function () {
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
            $.post(urlRoot + "/api/OxygenTank/Delete", data, function (result) {
            if (result == "ok") {
                HospitalOxygenTankTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
})
$("#divHospitalOxygenTank").on("click", 'a[name="btnUpdateHospitalOxygenTank"]', function () {
    var ID = $(this).data("id");
    $("#divmodalHospitalOxygenTankTitle").text("تعديل خزان اكسجين بالمستشفى");
    $("#modal-AddNewHospitalOxygenTank").modal("show");
    $("#btnSaveHospitalOxygenTank").data('id', ID);

    $.get(urlRoot + '/api/OxygenTank/GetByID/' + ID, function (respnose) {
        $('#txtOxygenTankTitle').val(respnose.OxygenTankTitle);
        $('#txtOxygenMinCapacity').val(respnose.OxygenMinCapacity);
        $('#txtOxygenMaxCapacity').val(respnose.OxygenMaxCapacity);
        $("#ddlHospitalOxygenTankType").val(respnose.OxygenTankTypeID).trigger("change");
        $("#ddlHospital").val(respnose.HospitalID).trigger("change");

        /*$('#ddlHospitalOxygenTankType').attr('disabled', 'disabled')*/
    })
})

$("#btnAddNewHospitalOxygenTank").click(function () {
    $("#divmodalHospitalOxygenTankTitle").text("إضافة خزان اكسجين بالمستشفى");
    $("#modal-AddNewHospitalOxygenTank").modal("show");
    $("#btnSaveHospitalOxygenTank").data('id', 0);
    ClearHospitalOxygenTank();
})

function ValidNewHospitalOxygenTank() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtOxygenTankTitle").require();
    $("#txtOxygenMinCapacity").require();
    $("#txtOxygenMaxCapacity").require();
    $("#ddlHospitalOxygenTankType").require();
    if (!(GetHospitalID() > 0))
        $("#ddlHospital").require();
    return $.validity.end();
}

$("#btnSaveHospitalOxygenTank").click(function () {
    var result = ValidNewHospitalOxygenTank();
    if (result.valid) {
        AddNewHospitalOxygenTank();
    }

})

function GetHospitalID() {
    var HospitalId = $("#HideHospitalID").val();
    return HospitalId;
}

function AddNewHospitalOxygenTank() {
    var data = {
        ID: $("#btnSaveHospitalOxygenTank").data('id'),
        OxygenTankTitle: $("#txtOxygenTankTitle").val(),
        OxygenMinCapacity: $("#txtOxygenMinCapacity").val(),
        OxygenMaxCapacity: $("#txtOxygenMaxCapacity").val(),
        OxygenTankTypeID: $("#ddlHospitalOxygenTankType").val(),
        HospitalID: (GetHospitalID() > 0) ? GetHospitalID() : $("#ddlHospital").val(),
    }
    $.post(urlRoot + "/api/OxygenTank/Post", data, function (result) {
        if (result == "ok") {
            HospitalOxygenTankTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddNewHospitalOxygenTank").modal("hide");
            ClearHospitalOxygenTank();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalOxygenTank() {
    $("#txtOxygenTankTitle").val('');
    $("#txtOxygenMinCapacity").val(0);
    $("#txtOxygenMaxCapacity").val(0);
    $("#ddlHospital").val('All').trigger('change');
    $("#ddlHospitalOxygenTankType").val('All').trigger('change');
    $("#btnSaveHospitalOxygenTank").data('id', 0);
    /*$('#ddlHospitalCareTypeID').removeAttr('disabled');*/
    $.validity.formReset();
}
$('#btnCancelHospitalOxygenTank').click(function () {
    ClearHospitalOxygenTank()
})

