





function GetPatientVisitDiagnose(patientVisitID) {
    var data = CustomAjax(urlRoot + "/api/PatientVisitDiagnose/GetPatientVisitDiagnose/" + patientVisitID, '', 'GET');
    var Html = '';
    for (var i = 0; i < data.length; i++) {
        Html += '<div class="col-md-4">';
        Html += ' <label><input type="checkbox" name="checkdiagnose" id="input-' + data[i].ID + '" ' + (data[i].IsChecked ? "checked" : "") + ' class="icheck icheckbox_minimal-blue" data-id="' + data[i].ID + '" /><span class="margin-left-10">' + data[i].DiagnoseTitle + '</span></label>';
        Html += '</div>';
    }
    $("#PatientVisitDiagnoseChecked").html(Html);
    //$('.icheck').iCheck({
    //    checkboxClass: 'icheckbox_minimal-blue',
    //    increaseArea: '20%' // optional
    //});
}

$("body").on("click", 'input[name="checkdiagnose"]', function () {
    if ($(this)[0].checked) {
        var value = {
            DiagnoseID: $(this).data('id'),
            PatientVisitID: patientVisitID
        }
        $.post(urlRoot + "/api/PatientVisitDiagnose/Post", value, function (data) {
            if (data == "ok") {
                GetPatientVisitDiagnose(patientVisitID);
                GetPatientTableICUHospital();
                GetAllPatient();
            }
        })
    } else {
        $.get(urlRoot + "/api/PatientVisitDiagnose/Delete2/" + patientVisitID + "/" + $(this).data('id'), function (data) {
            if (data == "ok") {
                GetPatientVisitDiagnose(patientVisitID);
                GetPatientTableICUHospital();
                GetAllPatient();
            }
        })
    }

})