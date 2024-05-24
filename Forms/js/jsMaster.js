var CurrentMode = false;
$(document).ready(function () {
    ShowAttendanceLogText();
});

function ShowAttendanceLogText() {
    getLastAttendanceType();
    if (CurrentMode) {
        $("#btnAttendanceLogText").text('انهاء الحضور');
    }
    else {
        $("#btnAttendanceLogText").text('بدء الحضور');
    }
}

function getLastAttendanceType() {
    $.get(urlRoot + '/api/AttendanceLog/GetLastAttendanceType',
        function (data) {
            CurrentMode = data.AttendanceType;
        });
}

$("#btnAttendanceLog").on("click", function () {
    DoctorAttendanceTransaction();
})

function DoctorAttendanceTransaction() {
    var data = {
        AttendanceType: !CurrentMode
    }
    $.post(urlRoot + "/api/AttendanceLog/Post", data, function (result) {
        if (result == "ok") {
            CurrentMode = !CurrentMode;
            ShowAttendanceLogText();
            Notifyonsuccess("ar");
        } else {
            Notifyonerror("ar", result);
        }
    })
}

//function RemoveDoctorShift(DoctorId) {
//    var data = {
//        ID: DoctorId
//    }
//    swal({
//        title: "تحذير",
//        text: "سوف يتم حذف البيانات!",
//        type: "warning",
//        showCancelButton: true,
//        confirmButtonColor: "#DD6B55",
//        confirmButtonText: "نعم",
//        cancelButtonText: "إلغاء",
//        animation: "slide-from-top",
//        closeOnConfirm: true
//    }, function () {
//        $.post(urlRoot + "/api/DoctorShift/Delete/", data, function (result) {
//            if (result == "ok") {
//                getHospitalDoctorList(0);
//                Notifyonsuccess("ar");
//            } else {
//                Notifyonerror("ar", result);
//            }
//        })
//    });
//}

