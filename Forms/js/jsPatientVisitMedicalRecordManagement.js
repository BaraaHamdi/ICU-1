var patientVisitID = 2;
$(document).ready(function () {
    //ddlSelectApi2($("#ddlPatientStateID"), urlRoot + "/api/PatientVisitMedicalRecord/GetPatientStates", "اختر الحالة الطبية", 0);
    drowDropdownListSelect2($("#ddlPatientStateID"), urlRoot + "/api/PatientVisitMedicalRecord/GetPatientStates", "", "GET", "اختر الحالة الطبية");

    $("#txtEditOxygenLevel").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 100,
        max: 100,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    });
})
var divPatientVisitMedicalRecordTable = '';
function getAllPatientVisitMedicalRecord() {
    divPatientVisitMedicalRecordTable = $("#divPatientVisitMedicalRecordTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/PatientVisitMedicalRecord/GetAll/" + patientVisitID,
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
        groupPanel: {
            visible: false,
        },
        grouping: {
            autoExpandAll: false
        },
        paging: {
            pageSize: 10
        }, headerFilter: {
            visible: true
        },
        columns: [
            {
                dataField: "Title",
                caption: 'الحالة',
            },
            {
                dataField: "MedicalDescription",
                caption: 'ملاحظات',
            },
            {
                dataField: "ID",
                caption: 'الاجراء',
                sortOrder: "desc",
                width: "160",
                allowHeaderFiltering: false,
                allowSearch: false,
                allowFiltering: false,
                cellTemplate: function (container, options) {
                    var html = "";
                    if (options.data.MedicalFileUrl == null) {
                        html = '<div class="btn-group btn-group-justified">' +
                            '<a href="javascript:;" class="btn btn-xs dark" data-id="' + options.data.ID + '"  > <i class="fa fa-ban"></i>لايوجد </a>' +
                            '<a href="javascript:;" class="btn btn-danger" data-id="' + options.data.ID + '" onClick=deletePatientVisitMedicalRecord("' + options.data.ID + '")> <i class="fa fa-trash-o"></i> حذف  </a>' +
                            '</div>';

                    } else {
                        html = '<div class="btn-group btn-group-justified">' +
                            '<a href="javascript:;" class="btn btn-success" data-id="' + options.data.ID + '" onClick=btnview("' + options.data.ID + '") > <i class="fa fa-eye-slash"></i> عرض </a>' +
                            '<a href="javascript:;" class="btn btn-danger" data-id="' + options.data.ID + '" onClick=deletePatientVisitMedicalRecord("' + options.data.ID + '")> <i class="fa fa-trash-o"></i> حذف  </a>' +
                            '</div>';
                    }

                    $(container).html(html);
                }
            }
        ],
        rtlEnabled: true,
    }).dxDataGrid("instance");
};
function deletePatientVisitMedicalRecord(id) {
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
        $.get(urlRoot + '/api/PatientVisitMedicalRecord/Delete/' + id, function (result) {
            if (result === 'ok') {
                Notifyonsuccess('ar', 'تم الحذف بنجاح');
                getAllPatientVisitMedicalRecord();
            } else if (result === 'Error') {
                Notifyonerror('ar', 'خطاء فى حفظ البيانات');
            }
            else {
                Notifyonerror('ar');
            }
        })
    });
}
function btnview(id) {
    $.get(urlRoot + '/api/PatientVisitMedicalRecord/GetFileUrlPatientVisitMedicalRecords/' + id, function (data) {
        $.fancybox({
            maxWidth: 800,
            fitToView: false,
            width: '70%',
            height: '70%',
            autoSize: false,
            closeClick: false,
            openEffect: 'elastic',
            closeEffect: 'elastic',
            'type': (data != null ? (data.split('.').pop() == 'pdf' ? "iframe" : '') : ''),
            'href': (urlRoot + (data != null ? data.replace('~', '') : ""))
        });
    });
}

$("a.buttonl").fancybox({
    maxWidth: 800,
    fitToView: false,
    width: '70%',
    height: '70%',
    autoSize: false,
    closeClick: false,
    openEffect: 'elastic',
    closeEffect: 'elastic',
    afterLoad: function () {
        if (this.type == "iframe") {
            $.extend(this, {
                iframe: {
                    preload: false
                }
            })
        }
    }
});

var fuMedicalFile2 = '';
var fileUploadMedicalFile2 = $("#fuMedicalFile2").fileinput({
    uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
    uploadAsync: false,
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    // showUpload: false, // hide upload button
    resizeImage: true,
    maxImageWidth: 500,
    showClose: false,
    showCaption: false,
    maxImageHeight: 500,
    resizeImageQuality: '1.0',
    resizeIfSizeMoreThan: "1024",
    minFileCount: 1,
    removeLabel: '',
    browseLabel: '',
    browseIcon: '<i class="fa fa-camera"></i>',
    browseClass: 'btn btn-primary btn-block',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-2',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/assets-custom/images/ticket.png" style="width: 100%;" alt="Your File">',
    layoutTemplates: { main2: '{preview}  {remove} {browse}' },
    language: 'ar',
    uploadExtraData: { FilePath: '~/uploads/Patient/MedicalFile/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    fuMedicalFile2 = data.response.name;
}).on('filebatchselected', function (event) {
    fileUploadMedicalFile2.fileinput('upload');
});

function ValidPatientVisitMedicalRecord() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $('#ddlPatientStateID').require('برجاء اختيار الحالة الطبية');
    return $.validity.end();
}
$('#btnSavePatientVisitMedicalRecord').click(function () {
    if (fuMedicalFile2 != '') {
        var result = ValidPatientVisitMedicalRecord();
        if (result.valid) {
            var patientVisitMedicalRecord = {
                MedicalDescription: $('#txtMedicalDescription').val(),
                PatientStateID: $('#ddlPatientStateID').val(),
                PatientVisitID: patientVisitID,
                MedicalFileUrl: fuMedicalFile2,
                OxygenLevel: $("#txtEditOxygenLevel").val()
            };
            $.post(urlRoot + '/api/PatientVisitMedicalRecord/Post', patientVisitMedicalRecord, function (response) {
                if (response == "ok") {
                    Notifyonsuccess("ar", 'تم الحفظ بنجاح');
                    GetPatientVisitMedicalRecord(patientVisitID)
                    $("#modal-medicalRecord").modal('hide');
                    if (IsICUPage) {
                        PatientTableHospital.refresh();
                        PatientTableOtherHospital.refresh();
                        PatientTableICUHospital.refresh();
                    } else PatientTable.refresh();
                    clearPatientVisitMedicalRecord();
                }
                else if (response == "NotAllowed") {
                    Notifyonerror("ar", 'لايمكن الاضافة لعدم وجود صلاحية للدكتور');
                }
                else if (response == "Error") {
                    Notifyonerror("ar", 'لم يتم الحفظ برجاء الاتصال بالدعم الفنى');
                }
            });
        }
    } else {
        Notifyonerror("ar", 'يجب رفع ملف طبى');
    }
});
$('#btnClearPatientVisitMedicalRecord').click(function () {
    clearPatientVisitMedicalRecord();
});
function clearPatientVisitMedicalRecord() {
    fileUploadMedicalFile2.fileinput('clear');
    $.validity.formReset();
    //$('#ddlPatientStateID').val('').trigger('change');
    $("#txtEditOxygenLevel").val("100");
    $('#txtPatientVisitMedicalRecord').val('');
    $('#txtMedicalDescription').val('');
    $('#fuMedicalFile2').fileinput('clear');
}


