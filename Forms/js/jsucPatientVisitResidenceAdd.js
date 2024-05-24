
function BindHospitalBed() {
    drowDropdownList2($("#ddlHospitalBedID"), urlRoot + "/api/PatientVisitResidence/GetHospitalBed", "", "GET", "اختر السرير", "لا يوجد اسرة رعاية متاحة");
}
function BindHospitalVentilator() {
    drowDropdownList2($("#ddlHospitalVentilatorID"), urlRoot + "/api/PatientVisitResidence/GetHospitalVentilator", "", "GET", "اختر جهاز التنفس", "لا يوجد جهاز تنفس متاحة");
}
function validAddRegisterPatient() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#ddlHospitalBedID").require();
    return $.validity.end();
}

$("#btnRegisterPatient").click(function () {
    var result = validAddRegisterPatient();
    if (result.valid) {
        var value = {
            HospitalBedID: $("#ddlHospitalBedID").val(),
            HospitalVentilatorID: $("#ddlHospitalVentilatorID").val(),
            PatientVisitID: patientVisitID
        }
        $.post(urlRoot + "/api/PatientVisitResidence/Post", value, function (data) {
            if (data == "ok") {
                PatientTableHospital.refresh();
                PatientTableOtherHospital.refresh();
                $('#modal-ResidenceAdd').modal('hide');
                Notifyonsuccess('ar', 'تم الحجز بنجاح');
            } else {
                Notifyonerror('ar', 'خطاء <br />' + data);
            }
        })
    }
});