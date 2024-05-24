

function GetPatientVisitCare(patientVisitID) {
    var data = CustomAjax(urlRoot + "/api/PatientVisitCare/GetPatientVisitCare/" + patientVisitID, '', 'GET');
    var Html = '';
    for (var i = 0; i < data.length; i++) {
        Html += '<div class="col-md-4">';
        Html += ' <label><input type="checkbox" name="checkcare" id="input-' + data[i].ID + '" ' + (data[i].IsChecked ? "checked" : "") + ' class="icheck icheckbox_minimal-blue" data-id="' + data[i].ID + '" /><span class="margin-left-10">' + data[i].Title + '</span></label>';
        Html += '</div>';
    }
    $("#PatientVisitCareChecked").html(Html);
    //$('.icheck').iCheck({
    //    checkboxClass: 'icheckbox_minimal-blue',
    //    increaseArea: '20%' // optional
    //});
}

$("body").on("click", 'input[name="checkcare"]', function () {
    if ($(this)[0].checked) {
        var value = {
            HospitalCareTypeID: $(this).data('id'),
            PatientVisitID: patientVisitID
        }
        $.post(urlRoot + "/api/PatientVisitCare/Post", value, function (data) {
            if (data == "ok") {
                GetPatientVisitCare(patientVisitID);
                GetPatientTableICUHospital();
                GetAllPatient();
            }
        })
    } else {
        $.get(urlRoot + "/api/PatientVisitCare/Delete2/" + patientVisitID + "/" + $(this).data('id'), function (data) {
            if (data == "ok") {
                GetPatientVisitCare(patientVisitID);
                GetPatientTableICUHospital();
                GetAllPatient();
            }
        })
    }

})