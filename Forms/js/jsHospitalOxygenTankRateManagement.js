$(document).ready(function () {
    $("#txtOxygenTankRate").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 0,
        max: 1000000,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
    });
    GetAllHospitalOxygenTank()
})
var HospitalOxygenTankTable = '';
function GetAllHospitalOxygenTank() {
    HospitalOxygenTankTable = $("#divHospitalOxygenTank").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/OxygenTankRate/GetHospitalOxygenTankLastRateAll",
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
        groupPanel: { visible: true },
        grouping: {
            autoExpandAll: false
        },
        headerFilter: {
            visible: true
        },
        paging: {
            pageSize: 10
        },
        rtlEnabled: true,
        columns: [
            {
                dataField: "OxygenTankTitle",
                caption: "الخزان"
            },
            //{
            //    dataField: "OxygenMinCapacity",
            //    caption: "الحد الادنى"
            //},
            //{
            //    dataField: "OxygenMaxCapacity",
            //    caption: "الحد الاقصى"
            //},
            //{
            //    dataField: "OxygenTankTypeTitle",
            //    caption: "نوع خزان الاكسجين"
            //},
            //{
            //    dataField: "HospitalName",
            //    caption: "المستشفى"
            //},
            {
                dataField: "LastReadingValue",
                caption: "اخر قراءة"
            },
            {
                dataField: "LastOxygenRatio",
                caption: "معدل استهلاك"
            },
            {
                dataField: "TimeRemainingPerHour",
                caption: "الوقت المتبقي"
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">'
                        + '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnHospitalOxygenTankRate"><i class="fa fa-list"></i> القراءات</a>'
                        + '</div>'
                    )
                }
            }
        ],
    }).dxDataGrid("instance");
}

var HospitalOxygenTankRateTable = '';
function GetAllHospitalOxygenTankRate(id) {
    HospitalOxygenTankRateTable = $("#divHospitalOxygenTankRateTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/OxygenTankRate/GetHospitalOxygenTankRateListByTankID/" + id,
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
        groupPanel: { visible: true },
        grouping: {
            autoExpandAll: false
        },
        headerFilter: {
            visible: true
        },
        paging: {
            pageSize: 10
        },
        rtlEnabled: true,
        columns: [
            //{
            //    dataField: "OxygenTankTitle",
            //    caption: "خزان الاكسجين"
            //},
            {
                dataField: "InsertionDate",
                caption: "توقيت قراءة الخزان"
            },
            {
                dataField: "OxygenReadingValue",
                caption: "قراءة الخزان"
            },
            {
                dataField: "OxygenRatio",
                caption: "معدل الاستهلاك"
            },
            //{
            //    dataField: "OxygenFileUrl ",
            //    caption: "ملف القراءة"
            //},
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">'
                        + '<a htef="javascript:;" class="btn green btn-xs" id="btnOxygenRate-' + info.data.ID + '" name="btnOxygenRate" data-url="' + info.data.OxygenFileUrl + '"><i class="fa fa-file"></i></a>'
                        + '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteHospitalOxygenTankRate"><i class="fa fa-trash"></i> </a>'
                        + '</div>'
                    )
                }
            }
        ],
    }).dxDataGrid("instance");
}

$("#divHospitalOxygenTankRateTable").on("click", 'a[name="btnOxygenRate"]', function () {
    var ID = $(this).data("id");
    var url = $(this).data("url");
    $.fancybox({
        maxWidth: 800,
        fitToView: true,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'elastic',
        closeEffect: 'elastic',
        'type': (url != null ? (url.split('.').pop() == 'pdf' ? "iframe" : '') : ''),
        'href': url
    });
})
$("#divHospitalOxygenTankRateTable").on("click", 'a[name="btnDeleteHospitalOxygenTankRate"]', function () {
    var ID = $(this).data("id");
    var data = {
        ID: ID
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
        $.post(urlRoot + "/api/OxygenTankRate/Delete", data, function (result) {
            if (result == "ok") {
                HospitalOxygenTankRateTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
})


$("#divHospitalOxygenTank").on("click", 'a[name="btnHospitalOxygenTankRate"]', function () {
    var ID = $(this).data("id");
    $("#divmodalHospitalOxygenTankTitle").text("اضافة قراءة خزان اكسجين");
    $("#modal-AddNewHospitalOxygenTankRate").modal("show");

    $.get(urlRoot + '/api/OxygenTankRate/GetOxygenTankLastRateByTankID/' + ID, function (respnose) {
        $('#txtOxygenTankRate').val(respnose.OxygenReadingValue);
        $("#btnSaveHospitalOxygenTankRate").data('id', respnose.HospitalOxygenTankID);
        GetAllHospitalOxygenTankRate(respnose.HospitalOxygenTankID);
        /*$('#ddlHospitalOxygenTankType').attr('disabled', 'disabled')*/
    })
})


function ValidNewHospitalOxygenTankRate() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtOxygenTankRate").require();
    return $.validity.end();
}

var OxygenTankFile = '';
var fuOxygenTankFile = $("#fuOxygenTankFile").fileinput({
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
    defaultPreviewContent: '<img src="/assets-custom/images/OxygenTank.png" style="width: 100%;" alt="Your File">',
    layoutTemplates: { main2: '{preview}  {remove} {browse}' },
    language: 'ar',
    uploadExtraData: { FilePath: '~/Uploads/OxygenTank/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    OxygenTankFile = data.response.name;
}).on('filebatchselected', function (event) {
    fuOxygenTankFile.fileinput('upload');
});

$("#btnSaveHospitalOxygenTankRate").click(function () {
    if (OxygenTankFile != '') {
        var result = ValidNewHospitalOxygenTankRate();
        if (result.valid) {
            AddNewHospitalOxygenTankRate();
        }
    } else {
        Notifyonerror("ar", 'يجب رفع ملف طبى');
    }
})

function AddNewHospitalOxygenTankRate() {
    var data = {
        HospitalOxygenTankID: $("#btnSaveHospitalOxygenTankRate").data('id'),
        OxygenReadingValue: $("#txtOxygenTankRate").val(),
        OxygenFileUrl: OxygenTankFile,
    }
    $.post(urlRoot + "/api/OxygenTankRate/Post", data, function (result) {
        if (result == "ok") {
            HospitalOxygenTankTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddNewHospitalOxygenTankRate").modal("hide");
            ClearHospitalOxygenTankRate();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospitalOxygenTankRate() {
    fuOxygenTankFile.fileinput('clear');
    fuOxygenTankFile.fileinput('refresh');
    fuOxygenTankFile.unbind("fileuploaded");

    $("#txtOxygenTankRate").val('');
    $("#btnSaveHospitalOxygenTankRate").data('id', 0);
    $.validity.formReset();
}
$('#btnCancelHospitalOxygenTankRate').click(function () {
    ClearHospitalOxygenTankRate();
})

