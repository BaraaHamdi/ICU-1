$(document).ready(function () {
    if (!(GetHospitalID() > 0)) {
        $(".Hospital").show();
        ddlSelectApi2($("#ddlHospital"), urlRoot + "/api/HospitalRoom/GetHospitals", "اختر المستشفى", 0);
    } else {
        $(".Hospital").hide();
    }

    //ddlSelectApi2($("#ddlHospitalCareTypeID"), urlRoot + "/api/HospitalRoom/GetHospitalCareType", "اختر نوع الرعاية بالمستشفى", 0);

    $("#ddlHospitalCareTypeID").html(drowDropdownList(CustomAjax(urlRoot + "/api/HospitalRoom/GetHospitalCareType", '', 'GET'), "اختر نوع الرعاية بالمستشفى"));
    $("#ddlHospitalCareTypeID").select2({ placeholder: "اختر نوع الرعاية بالمستشفى" });
    GetAllHospitalRoom()
})
var HospitalRoomTable = '';
function GetAllHospitalRoom() {
    HospitalRoomTable = $("#divHospitalRoomTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/HospitalRoom/GetAll",
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
                dataField: "RoomNo",
                caption: "رقم الغرقة"
            },
            {
                dataField: "RoomTitle",
                caption: "الغرفة"
            },

            {
                dataField: "HospitalName",
                caption: "المستشفى"
            },
            {
                dataField: "HospitalBeds",
                caption: "عدد أسرة المستشفى"
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateHospitalRoom"><i class="fa fa-edit"></i> تعديل</a>'
                        + '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteHospitalRoom"><i class="fa fa-ban"></i> حذف</a>'
                    )
                }
            }
        ],
    }).dxDataGrid("instance");
}

$("#divHospitalRoomTable").on("click", 'a[name="btnDeleteHospitalRoom"]', function () {
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
        $.post(urlRoot + "/api/HospitalRoom/Delete", data, function (result) {
            if (result == "ok") {
                HospitalRoomTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
})
$("#divHospitalRoomTable").on("click", 'a[name="btnUpdateHospitalRoom"]', function () {
    var ID = $(this).data("id");
    $("#divmodalHospitalRoomTitle").text("تعديل الغرفة بالمستشفى");
    $("#modal-AddnewHospitalRoom").modal("show");
    $("#btnSaveHospitalRoom").data('id', ID);
    $.get(urlRoot + '/api/HospitalRoom/GetByID/' + ID, function (respnose) {
        $('#txtRoomNo').val(respnose.RoomNo);
        $('#txtRoomTitle').val(respnose.RoomTitle);
        $("#ddlHospitalCareTypeID").val(respnose.HospitalCareTypeID).trigger("change");

        $('#ddlHospitalCareTypeID').attr('disabled', 'disabled')
    })
})

$("#btnAddNewHospitalRoom").click(function () {
    $("#divmodalHospitalRoomTitle").text("إضافة غرفة بالمستشفى");
    $("#modal-AddnewHospitalRoom").modal("show");
    ClearHospitalRoom();
})

function ValidNewHospitalRoom() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtRoomNo").require();
    $("#txtRoomTitle").require();
    if (!(GetHospitalID() > 0))
        $("#ddlHospital").require();
    return $.validity.end();
}

$("#btnSaveHospitalRoom").click(function () {
    var result = ValidNewHospitalRoom();
    if (result.valid) {
        AddNewHospitalRoom();
    }

})


function GetHospitalID() {
    var HospitalId = $("#HideHospitalID").val();
    return HospitalId;
}

var HospitalRoomLogoUrl = '';
function AddNewHospitalRoom() {
    var data = {
        ID: $("#btnSaveHospitalRoom").data('id'),
        RoomNo: $("#txtRoomNo").val(),
        RoomTitle: $("#txtRoomTitle").val(),
        HospitalID: (GetHospitalID() > 0) ? GetHospitalID() : $("#ddlHospital").val(),
        HospitalCareTypeID: $("#ddlHospitalCareTypeID").val(),
    }
    $.post(urlRoot + "/api/HospitalRoom/Post", data, function (result) {
        if (result == "ok") {
            HospitalRoomTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewHospitalRoom").modal("hide");
            ClearHospitalRoom();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalRoom() {
    HospitalRoomLogoUrl = '';
    $("#txtRoomNo").val('');
    $("#txtRoomTitle").val('');
    $("#ddlHospital").val('All').trigger('change');
    $("#ddlHospitalCareTypeID").val('All').trigger('change');
    $("#btnSaveHospitalRoom").data('id', 0);
    $('#ddlHospitalCareTypeID').removeAttr('disabled');
    $.validity.formReset();
}
$('#btnCancelHospitalRoom').click(function () {
    ClearHospitalRoom()
})

