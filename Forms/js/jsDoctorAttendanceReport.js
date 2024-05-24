$(document).ready(function () {
    getDoctorShiftAttendance(0);
    getDoctorScheduledShifts(0);
});

$("#tab_1_1_1").on("click", function () {
    getDoctorShiftAttendance(0);
})
$("#tab_1_1_2").on("click", function () {
    getDoctorScheduledShifts(0);
})

var hospitalId = $('#HideHospitalID').val();
function getDoctorShiftAttendance(index) {
    $.get(urlRoot + '/api/DoctorShift/GetDoctorAttendanceShiftList',
        function (data) {
            var li = '';
            for (var i = 0; i < data.length; i++) {
                li += '<div class="m-grid-row">';
                li += '<div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;width:22%;">';
                li += '<span class="mt-action-author">' + data[i].DoctorShiftState + '</span><br />';
                li += '<span class="mt-action-author">' + data[i].HospitalShiftName + '</span>';
                li += '</div>';
                li += '<div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;font-size:9pt;">';
                li += '<span class="mt-action-author ">' + data[i].DoctorAttendanceRange + '</span><br />';
                li += '<span class="mt-action-author ">' + data[i].HospitalShiftRange + '</span>';
                li += '</div>';
                li += '<div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;width:26%;">';
                if (data[i].ShiftStartAllowed) {
                    li += '<a class="mt-action-author bold" style="color: green;" onclick="DoctorShiftAttendance(' + data[i].DoctorShiftID + ','+true+')" data-id="' + data[i].DoctorShiftID +'">ابدأ الوردية</a><br />';
                }
                else if (data[i].ShiftEndAllowed) {
                    li += '<a class="mt-action-author bold" style="color: red;"  onclick="DoctorShiftAttendance(' + data[i].DoctorShiftID + ',' + false +')" data-id="' + data[i].DoctorShiftID +'">انهاء الوردية</a><br />';
                }
                else {
                    li += '<span class="mt-action-author bold" style="color: ' + data[i].ShiftConfirmationStateColor + ';">' + data[i].ShiftConfirmationState + '</span><br />';
                }

                li += '<span class="mt-action-author">' + data[i].AttendanceDate + '</span>';
                li += '</div>';
                li += '</div>';
            }
            $("#pnlDoctorShiftAttendance").html(li);
        });
}

function getDoctorScheduledShifts(index) {
    $.get(urlRoot + '/api/DoctorShift/GetDoctorScheduledShiftList',
        function (data) {
            var li = '';
            for (var i = 0; i < data.length; i++) {
                li += '<div class="m-grid-row">';
                li += '<div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;    width: 22%;">';
                li += '<span class="mt-action-author">' + data[i].HospitalShiftName + '</span><br />';
                li += '</div>';
                li += '<div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;font-size:9pt;">';
                li += '<span class="mt-action-author ">' + data[i].HospitalShiftRange + '</span><br />';
                li += '</div>';
                li += '<div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;    width: 26%;">';
                li += '<span class="mt-action-author bold" style="color: red;">' + data[i].AttendanceDate + '</span><br />';
                li += '</div>';
                li += '</div>';
            }
            $("#pnlDoctorScheduledShifts").html(li);
        });
}

function DoctorShiftAttendance(id,type) {
    var data = {
        DoctorShiftID: id,
        AttendanceType: type
    }
    $.post(urlRoot + "/api/ShiftAttendanceLog/Post", data, function (result) {
        if (result == "ok") {
            getDoctorShiftAttendance(0);
            ShowDoctorAttendanceState();
            Notifyonsuccess("ar");
        } else {
            Notifyonerror("ar", result);
        }
    })
}
