

function GetPatientVisitMedicalRecord(patientVisitID) {
    var data = CustomAjax(urlRoot + "/api/PatientVisitMedicalRecord/GetPatientVisitMedicalRecord/" + patientVisitID, '', 'GET');
    if (data.length == 0) {
        var Html = "";
        Html += ' <div class="col-lg-12 text-center"><p style=" font-size: 15px;" class="bold"></p></div>';
        $("#PatientVisitMedicalRecordCard").html(Html);
    } else {
        var Html = "";
        Html += '<div class="owl-carousel owl-theme">';
        for (var i = 0; i < data.length; i++) {
            Html += '<div class="portlet light portlet-fit bordered" style="width: 225px; height: auto">';
            Html += '<div class="portlet-body" style="    padding: 5px !important;">';
            Html += '<div class="mt-element-overlay">';
            Html += '<div class="row">';
            Html += '<div class="col-md-12">';
            Html += '<div>';
            Html += '<a class="example1" href="' + data[i].MedicalFileUrl+'">';
            Html += '<img src="' + data[i].MedicalFileUrl + '" style="height: 210px">';
            Html += '</a>';
            //Html += '<div class="mt-overlay">';
            //Html += '<h2 style="margin-top: 50px;word-wrap: break-word;height: 139px;overflow: hidden;">' + data[i].MedicalDescription + '</h2>';
            //Html += '</div>';
            Html += '<br/>';
            Html += '<span style="color:blue;"><strong>' + data[i].PatientState + '</strong></span>';
            Html += '<span style="color:green;"><strong>' + ' || ' + ' O2 = ' + data[i].OxygenLevel +'</strong></span>';
            Html += '<br/>';
            Html += '<span><strong>' + data[i].InsertionDate + '</strong></span>';
            Html += '</div>';
            Html += '</div>';
            Html += '</div>';
            Html += '</div>';
            Html += '</div>';
            Html += '</div>';

        }
        Html += '</div>';
        $("#PatientVisitMedicalRecordCard").html(Html);
        $('.owl-carousel').owlCarousel({
            loop: false,
            items: 1,
            rtl: true,
            nav: true,
            //center: true,
            rewind: true,
            singleItem: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoWidth: true,
            autoplayHoverPause: true,

            mouseDrag: true,
            //navText: [
            //    "<i class='fa fa-caret-left'></i>",
            //    "<i class='fa fa-caret-right'></i>"
            //],

            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 5,
                }
            }
        });

       
    }
}
$('body').find("a.example1").fancybox({
    'transitionIn': 'elastic',
    'transitionOut': 'elastic',
    'speedIn': 600,
    'speedOut': 200,
    'overlayShow': true
});
$("#btnAddNewMedicalRecord").click(function () {
    clearPatientVisitMedicalRecord();
    var data = CustomAjax(urlRoot + "/api/PatientVisit/GetPatientVisitLastStateData/" + patientVisitID, '', 'GET');
    if (data != null) {
        $('#ddlPatientStateID').val(data.PatientStateID).trigger("change");
        $("#txtEditOxygenLevel").val((data.OxygenLevel == null ? "100" : data.OxygenLevel));
    }
    $("#modal-medicalRecord").modal('show');
})
$("#btnAddNewAttachment").click(function () {
    $("#modal-medicalVisitAttachment").modal('show');
})