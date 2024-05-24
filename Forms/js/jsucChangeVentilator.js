function BindddlEditHospitalVentilator(selectedid) {
    //drowDropdownList2($("#ddlEditHospitalVentilatorID"), urlRoot + "/api/PatientVisitResidence/GetPatientVentilator/" + null, "", "GET", "اختر جهاز التنفس", "لا يوجد جهاز تنفس متاحة");
    drowDropdownListSelect3($("#ddlEditHospitalVentilatorID"), urlRoot + "/api/PatientVisitResidence/GetPatientVentilator/" + selectedid, "", "GET", "اختر جهاز التنفس");
    if (IsVentilatorUpdateAllowed) {
        IsVentilatorUpdateAllowed = false;
        $("#ddlEditHospitalVentilatorID").val(selectedid).trigger('change');
    }
    else {
        $("#ddlEditHospitalVentilatorID").val(selectedid).trigger('change');
    }
}

var IsVentilatorUpdateAllowed = false;
$("#ddlEditHospitalVentilatorID").change(function () {
    if (IsICU && IsVentilatorUpdateAllowed) {
        UpdateVentilatorNeedICU(true);
    }
});


$('#CkEditVentilatorNeed').on('change.bootstrapSwitch', function (e) { 
    var ckVal = e.target.checked;
    if (ckVal != $("#CkEditVentilatorNeed").bootstrapSwitch('state')) {
        if (IsICU) {
            if (ckVal) {
                BindddlEditHospitalVentilator(null);
                $(".DivEditVentilatorResidence").show();
                IsVentilatorUpdateAllowed = true;
            }
            else {
                $("#ddlEditHospitalVentilatorID").val("");
                $(".DivEditVentilatorResidence").hide();
                if (IsVentilatorUpdateAllowed) {
                    UpdateVentilatorNeedICU(ckVal);
                }
            }
        }
        else {
            if (IsVentilatorUpdateAllowed) {
                UpdateVentilatorNeedER(ckVal);
            }
        }
    }
});

function UpdateVentilatorNeedICU(IsNeeded) {
    var value = {
        PatientVisitID: patientVisitID,
        HospitalVentilatorID: $("#ddlEditHospitalVentilatorID").val(),
        IsVentilatorNeeded: IsNeeded,
    }
    $.post(urlRoot + "/api/PatientVisitVentilatorNeedChange/Post", value, function (data) {
        if (data == "ok") {
            if (IsICUPage) {
                PatientTableHospital.refresh();
                PatientTableOtherHospital.refresh();
                PatientTableICUHospital.refresh();
            } else PatientTable.refresh();
            Notifyonsuccess('ar', 'تم التغيير بنجاح');
        }
        else Notifyonsuccess('ar', data);
    });
}


function UpdateVentilatorNeedER(IsNeeded) {
    var value = {
        PatientVisitID: patientVisitID,
        IsVentilatorNeeded: IsNeeded,
    }
    $.post(urlRoot + "/api/PatientVisitVentilatorNeedChangeER/Post", value, function (data) {
        if (data == "ok") {
            if (IsICUPage) {
                PatientTableHospital.refresh();
                PatientTableOtherHospital.refresh();
                PatientTableICUHospital.refresh();
            } else PatientTable.refresh();
            Notifyonsuccess('ar', 'تم التغيير بنجاح');
        }
        else Notifyonsuccess('ar', data);
    });
}