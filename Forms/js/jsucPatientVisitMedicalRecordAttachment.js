
var fuAttachmentFile = [];
var $fileUploadAttach = $("#fuAttachmentFile");
$fileUploadAttach.fileinput({
    uploadUrl: urlRoot + '/Forms/UploadAttach.ashx/ProcessRequest',
    uploadAsync: false,
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    minFileCount: 1,
    browseIcon: '<i class="fa fa-camera"></i>',
    language: 'ar',
    removeLabel: '',
    browseLabel: '',
    showClose: false,
    showCaption: false,
    removeIcon: '<i class="fa fa-trash"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-2',
    msgErrorClass: 'alert alert-block alert-danger',
    browseClass: 'btn btn-primary btn-block',
    removeClass: 'btn btn-danger btn-block',
    defaultPreviewContent: '<img src="/assets-custom/images/medicalfiles.png" style="width: 100%;" alt="Your File">',
    overwriteInitial: true,
    layoutTemplates: { main2: '{preview}  {remove} {browse}' },
    browseOnZoneClick: true,
    uploadExtraData: {
        FilePath: '~/uploads/Patient/MedicalAttachments/',
    }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    console.log(data);
    $.map(data.response, function (n) {
        fuAttachmentFile.push(n);
    })
}).on('filebatchselected', function (event) {
    //$('#fuAttachmentFile').fileinput('upload');
    $fileUploadAttach.fileinput("upload");
}).on('fileremoved', function (event, id, index) {
    fuAttachmentFile = [];
});
$('#btnSavePatientVisitAttachment').click(function () {
    if (fuAttachmentFile.length > 0) {
        var patientVisitAttachment = {
            MedicalDescription: $('#txtAttachmentDescription').val(),
            PatientVisitID: patientVisitID,
            AttachFileUrl: fuAttachmentFile,
        };
        $.post(urlRoot + '/api/PatientVisitAttachment/Post', patientVisitAttachment, function (response) {
            if (response == "ok") {
                Notifyonsuccess("ar", 'تم الحفظ بنجاح');
               // $("#modal-medicalRecord").modal('hide')
                GetPatientVisitAttachment(patientVisitID)
                clearPatientVisitAttachment();
            }
            else if (response == "NotAllowed") {
                Notifyonerror("ar", 'لايمكن الاضافة لعدم وجود صلاحية للدكتور');
            }
            else if (response == "Error") {
                Notifyonerror("ar", 'لم يتم الحفظ برجاء الاتصال بالدعم الفنى');
            }
        });
    } else {
        Notifyonerror("ar", 'يجب رفع ملف طبى');
    }
});
function clearPatientVisitAttachment() {

    $fileUploadAttach.fileinput('clear');
    $.validity.formReset();
    fuAttachmentFile = [];
    $('#txtAttachmentDescription').val('');
    $('#fuAttachmentFile').fileinput('clear');
}


