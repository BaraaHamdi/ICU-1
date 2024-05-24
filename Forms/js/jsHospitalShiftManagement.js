$(document).ready(function () {
    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        $("#ddlHospital").html(drowDropdownList(CustomAjax(urlRoot + "/api/OxygenTank/GetHospitalList", '', 'GET'), "اختر المستشفى"));
        $("#ddlHospital").select2({ placeholder: "اختر المستشفى" });
    } else {
        $(".Hospital").hide();
    }

    GetAllHospitalShift();
});

var HospitalShiftTable = '';
function GetAllHospitalShift() {
    HospitalShiftTable = $("#divHospitalShift").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalShift/GetHospitalShiftAll",
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
                dataField: "Prefix",
                caption: "كود الوردية"
            },
            {
                dataField: "Name",
                caption: "اسم الوردية"
            },
            {
                dataField: "TimeFrom",
                caption: "بداية الوردية"
            },

            {
                dataField: "TimeTo",
                caption: "نهاية الوردية"
            },
            {
                dataField: "HospitalName",
                caption: "المستشفى"
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">'
                        + '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateHospitalShift"><i class="fa fa-edit"></i> تعديل</a>'
                        + '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteHospitalShift"><i class="fa fa-ban"></i> حذف</a>'
                        + '</div>'
                    )
                }
            }
        ],
    }).dxDataGrid("instance");
}

$("#divHospitalShift").on("click", 'a[name="btnDeleteHospitalShift"]', function () {
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
        $.post(urlRoot + "/api/HospitalShift/Delete", data, function (result) {
            if (result == "ok") {
                HospitalShiftTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
})
$("#divHospitalShift").on("click", 'a[name="btnUpdateHospitalShift"]', function () {
    var ID = $(this).data("id");
    $("#divmodalHospitalShiftTitle").text("تعديل وردية مستشفى");
    $("#modal-AddNewHospitalShift").modal("show");
    $("#btnSaveHospitalShift").data('id', ID);

    $.get(urlRoot + '/api/HospitalShift/GetByID/' + ID, function (respnose) {
        $('#txtShiftTitle').val(respnose.Name);
        $('#txtShiftPrefix').val(respnose.Prefix);
        $('#txtTimeFrom').timepicker('setTime', respnose.TimeFrom);
        $('#txtTimeTo').timepicker('setTime', respnose.TimeTo);
        $("#ddlHospital").val(respnose.HospitalID).trigger("change");
    })
})

$("#btnAddNewHospitalShift").click(function () {
    $("#divmodalHospitalShiftTitle").text("إضافة وردية مستشفى");
    $("#modal-AddNewHospitalShift").modal("show");
    //$("#txtTimeFrom").timepicker("setTime", "12:45 AM");
    //$("#txtTimeTo").timepicker("setTime", "12:57:15 AM");

    $("#DivDetailsShiftHoursShow").modal("hide");
    ClearHospitalShift();
})

function ValidNewHospitalShift() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtShiftTitle").require();
    $("#txtShiftPrefix").require();
    $("#txtTimeFrom").require();
    $("#txtTimeTo").require();
    if (!(GetHospitalID() > 0))
        $("#ddlHospital").require();
    return $.validity.end();
}

$("#btnSaveHospitalShift").click(function () {
    var result = ValidNewHospitalShift();
    if (result.valid) {
        AddNewHospitalShift();
    }

})

function GetHospitalID() {
    var HospitalId = $("#HideHospitalID").val();
    return HospitalId;
}

function AddNewHospitalShift() {
    var data = {
        ID: $("#btnSaveHospitalShift").data('id'),
        Name: $("#txtShiftTitle").val(),
        Prefix: $("#txtShiftPrefix").val(),
        TimeFrom: $("#txtTimeFrom").val(),
        TimeTo: $("#txtTimeTo").val(),
        HospitalID: (GetHospitalID() > 0) ? GetHospitalID() : $("#ddlHospital").val(),
    }
    $.post(urlRoot + "/api/HospitalShift/Post", data, function (result) {
        if (result == "ok") {
            HospitalShiftTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddNewHospitalShift").modal("hide");
            ClearHospitalShift();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalShift() {
    $("#txtShiftTitle").val('');
    $("#txtShiftPrefix").val('');
    $("#txtTimeFrom").val(0);
    $("#txtTimeTo").val(0);
    $("#ddlHospital").val('All').trigger('change');
    $("#btnSaveHospitalShift").data('id', 0);
    $.validity.formReset();
}
$('#btnCancelHospitalShift').click(function () {
    ClearHospitalShift()
})

