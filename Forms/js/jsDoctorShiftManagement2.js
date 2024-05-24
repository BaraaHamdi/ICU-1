var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
$(document).ready(function () {
    $("#lblCurrentDate").text(date);
    getHospitalDoctorList(0);
});

$("#btnDateLeft").on("click", function () {
    DecrementDate();
    getHospitalDoctorList(0);
})

$("#btnDateRigth").on("click", function () {
    IncrementDate();
    getHospitalDoctorList(0);
})

function IncrementDate() {
    var tomorrow = today;
    tomorrow.setDate(today.getDate() + 1);
    $("#lblCurrentDate").text(tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate());
}
function DecrementDate() {
    var yesterday = today;
    yesterday.setDate(today.getDate() - 1);
    $("#lblCurrentDate").text(yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate());
}


var hospitalId = $('#HideHospitalID').val();
function getHospitalDoctorList(index) {
    $.get(urlRoot + '/api/DoctorShift/GetAllHospitalDoctor/' + hospitalId + '/' + today.toDateString(),
        function (data) {
            $('#lblUpcomingShiftCount').html('الورديات القادمة ( ' + data[0].UpcomingShiftCount + ' )');
            $('#lblStartedShiftCount').html('الورديات الحـالية ( ' + data[0].StartedShiftAttendace + ' / ' + data[0].StartedShiftCount + ' )');
            var li1 = '';
            var li2 = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].IsShiftStarted) {
                    li1 += '<div class="mt-action">';
                    li1 += '<div class="mt-action-img"><img src="' + data[i].DoctorImageUrl + '" width="41" height="41"/></div>';
                    li1 += '<div class="mt-action-body"><div class="mt-action-row"><div class="mt-action-info ">';
                    li1 += '<div class="mt-action-details "><span class="mt-action-author">' + data[i].DoctorName + '</span>';

                    if (data[i].HospitalShiftPrefix != null) li1 += '<p class="mt-action-desc"> ' + data[i].DoctorShiftState + ' - ' + data[i].DoctorAttendanceRange + '';
                    li1 += '</p >';

                    if (data[i].HospitalShiftName != null) li1 += '<p class="mt-action-desc">' + data[i].HospitalShiftName + ' - ' + data[i].HospitalShiftRange + '';
                    if (data[i].RemoveShiftAllowed) li1 += ' <a id="btnRemoveDoctorShift" onclick="RemoveDoctorShift(' + data[i].DoctorShiftID + ')"><i class="icon-trash" style="color:red;"></i></a>';
                    if (data[i].HospitalShiftName != null) li1 += '</p>';

                    li1 += '</div></div>';
                    li1 += '<div class="mt-action-buttons " style="position: absolute; bottom: 50%; left: 12%;"><div class="btn-group btn-group-circle">';

                    if (data[i].ConfirmationTime == null || data[i].ConfirmationTime == '') {
                        if (data[i].ShiftConfirmationAllowed) li1 += '<a id="btnShowShiftConfirmationModal" onclick="ShowShiftConfirmationData(' + data[i].DoctorShiftID + ')" style="font-size: 17px; color: green">تأكيد</a>';
                    }
                    else li1 += '<p style="font-size: 17px; color:blue;">تم التأكيد</p>';


                    li1 += '</div ></div >';
                    if (data[i].AddShiftAllowed) li1 += ' <a id="btnShowAddDoctorShiftModal1" onclick="ShowDoctorData(' + data[i].DoctorId + ')" style="position: absolute; bottom: 20%; left: 8%; font-size: 18px;"><i class="icon-plus"></i></a>';
                    //li2 += '<div class="mt-action-icon " style="position: absolute; bottom: 20%; left: 8%; font-size: 18px;"><a href=""><i class="icon-arrow-left"></i></a></div>';
                    li1 += '</div ></div ></div >';
                }
                else {
                    li2 += '<div class="mt-action">';
                    li2 += '<div class="mt-action-img"><img src="' + data[i].DoctorImageUrl + '" width="41" height="41"/></div>';
                    li2 += '<div class="mt-action-body"><div class="mt-action-row"><div class="mt-action-info ">';
                    li2 += '<div class="mt-action-details "><span class="mt-action-author">' + data[i].DoctorName + '</span>';

                    if (data[i].HospitalShiftPrefix != null) li2 += '<p class="mt-action-desc"> ' + data[i].DoctorShiftState + ' - ' + data[i].DoctorAttendanceRange + '';
                    
                    li2 += '</p >';

                    if (data[i].HospitalShiftName != null) li2 += '<p class="mt-action-desc">' + data[i].HospitalShiftName + ' - ' + data[i].HospitalShiftRange + '';
                    if (data[i].RemoveShiftAllowed) li2 += ' <a id="btnRemoveDoctorShift" onclick="RemoveDoctorShift(' + data[i].DoctorShiftID + ')"><i class="icon-trash" style="color:red;"></i></a>';
                    if (data[i].HospitalShiftName != null) li2 += '</p>';
                    li2 += '</div></div>';
                    li2 += '<div class="mt-action-buttons " style="position: absolute; bottom: 50%; left: 12%;"><div class="btn-group btn-group-circle">';

                    if (data[i].ConfirmationTime == null || data[i].ConfirmationTime == '') {
                        if (data[i].ShiftConfirmationAllowed) li2 += '<a id="btnShowShiftConfirmationModal" onclick="ShowShiftConfirmationData(' + data[i].DoctorShiftID + ')" style="font-size: 17px; color: green">تأكيد</a>';
                    }
                    else li2 += '<p style="font-size: 17px; color:blue;">تم التأكيد</p>';

                    li2 += '</div ></div >';
                    if (data[i].AddShiftAllowed) li2 += ' <a id="btnShowAddDoctorShiftModal2" onclick="ShowDoctorData(' + data[i].DoctorId + ')" data-id="' + data[i].DoctorId + '" style="position: absolute; bottom: 20%; left: 8%; font-size: 18px;"><i class="icon-plus"></i></a>';
                    //li2 += '<div class="mt-action-icon " style="position: absolute; bottom: 20%; left: 8%; font-size: 18px;"><a href=""><i class="icon-arrow-left"></i></a></div>';
                    li2 += '</div ></div ></div >';
                }

            }
            $("#pnlStartedShiftList").html(li1);
            $("#pnlUpcomingShiftList").html(li2);
        });
}

$("#btnShowAddDoctorShiftModal").on("click", function () {
    var DoctorId = $(this).data('id');
    ShowDoctorData(DoctorId);
})
function ShowDoctorData(DoctorId) {
    drowDropdownListSelect3($("#ddlHospitalShift"), urlRoot + "/api/DoctorShift/GetDoctorAllowedShiftList/" + DoctorId, "", "GET", "اختر الورديـة");
    $.get(urlRoot + '/api/DoctorShift/GetDoctorData/' + DoctorId,
        function (data) {
            $("#imgDoctorImage").attr("src", data.DoctorImageUrl);
            $("#lblDoctorName").html(data.DoctorName);
            $("#lblJobTitle").html(data.JobTitle);
            $('#btnAddDoctorShift').data('id', DoctorId);
            $('#AddDoctorShiftModal').modal('show');
        });
}

function RemoveDoctorShift(DoctorId) {
    var data = {
        ID: DoctorId
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
        $.post(urlRoot + "/api/DoctorShift/Delete/", data, function (result) {
            if (result == "ok") {
                getHospitalDoctorList(0);
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
}


function ValidNewDoctorShift() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#ddlHospitalShift").require();
    return $.validity.end();
}

$("#btnAddDoctorShift").on("click", function () {
    var result = ValidNewDoctorShift();
    if (result.valid) {
        AddDoctorShift($(this).data('id'));
    }
})


function AddDoctorShift(id) {
    var date = new Date(today);
    var _currentdate = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
    var data = {
        DoctorID: id,
        HospitalShiftID: $("#ddlHospitalShift").val(),
        AttendanceDate: _currentdate
    }
    $.post(urlRoot + "/api/DoctorShift/Post", data, function (result) {
        if (result == "ok") {
            getHospitalDoctorList(0);
            $("#AddDoctorShiftModal").modal("hide");
            Notifyonsuccess("ar");
            ClearDoctorShift();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearDoctorShift() {
    $("#ddlHospitalShift").val('اختر الورديـة').trigger('change');
    $('#btnAddDoctorShift').data('id', 0);
}
$('#btnCancelDoctorShift').click(function () {
    ClearDoctorShift();
    $("#AddDoctorShiftModal").modal("hide");
})


function ShowShiftConfirmationData(DoctorShiftID) {
    $.get(urlRoot + '/api/DoctorShift/GetDoctorShiftData/' + DoctorShiftID,
        function (data) {
            $("#imgDoctorShiftImage").attr("src", data.DoctorImageUrl);
            $("#lblDoctorShiftName").html(data.DoctorName);
            $("#lblDoctorShiftJobTitle").html(data.JobTitle);

            $('#ddlAttendanceState').val(data.AttendanceState);
            $('#lblShiftName').html(data.ShiftName);
            $('#lblTimeFrom').html(data.ShiftTimeFrom);
            $('#lblTimeTo').html(data.ShiftTimeTo);
            $('#txtTimeFrom').timepicker('setTime', data.AttendanceTimeFrom);
            $('#txtTimeTo').timepicker('setTime', data.AttendanceTimeTo);
            if (data.AttendanceState == "False") {
                $('#pnlTimeFrom').hide();
                $('#pnlTimeTo').hide();
            }
            else {
                $('#pnlTimeFrom').show();
                $('#pnlTimeTo').show();
            }
            $('#btnConfirmShift').data('id', data.ID);
            $('#ShiftConfirmationModal').modal('show');
        });
}

function ShowShiftTimeData(DoctorShiftID) {
    $.get(urlRoot + '/api/DoctorShift/GetDoctorShiftData/' + DoctorShiftID,
        function (data) {
            $('#btnConfirmShift').data('id', data.ID);
            $('#txtTimeFrom').timepicker('setTime', data.AttendanceTimeFrom);
            $('#txtTimeTo').timepicker('setTime', data.AttendanceTimeTo);
        });
}

$('#ddlAttendanceState').on("change", function () {
    if ($('#ddlAttendanceState').val() == "False") {
        $('#txtTimeFrom').val('');
        $('#txtTimeTo').val('');
        $('#pnlTimeFrom').hide();
        $('#pnlTimeTo').hide();
    }
    else {
        ShowShiftTimeData($('#btnConfirmShift').data('id'));
        $('#pnlTimeFrom').show();
        $('#pnlTimeTo').show();
    }
})

function ValidNewDoctorShiftConfirmation() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    if ($('#ddlAttendanceState').val() == "True") {
        $("#txtTimeFrom").require();
        $("#txtTimeTo").require();
    }
    return $.validity.end();
}

$("#btnConfirmShift").on("click", function () {
    var result = ValidNewDoctorShiftConfirmation();
    if (result.valid) {
        AddDoctorShiftConfirmation($(this).data('id'));
    }
})


function AddDoctorShiftConfirmation(id) {
    var data = {
        ID: id,
        ConfirmationState: $('#ddlAttendanceState').val(),
        ConfirmationTimeFrom: $("#txtTimeFrom").val(),
        ConfirmationTimeTo: $("#txtTimeTo").val()
    }
    $.post(urlRoot + "/api/DoctorShiftConfirmation/Post", data, function (result) {
        if (result == "ok") {
            getHospitalDoctorList(0);
            $("#ShiftConfirmationModal").modal("hide");
            Notifyonsuccess("ar");
            ClearDoctorShiftConfirmation();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearDoctorShiftConfirmation() {
    $('#ddlAttendanceState').val('0');
    $('#lblShiftName').html('');
    $('#lblTimeFrom').html('');
    $('#lblTimeTo').html('');
    $('#txtTimeFrom').val('');
    $('#txtTimeTo').val('');
    $('#btnConfirmShift').data('id', 0);
}
$('#btnCancelDoctorShift').click(function () {
    ClearDoctorShiftConfirmation();
    $("#ShiftConfirmationModal").modal("hide");
})
