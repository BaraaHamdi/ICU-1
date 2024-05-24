var HospitalLogoUrl = '';
var UpdatedHospitalLogoUrl = '';
$(document).ready(function () {
    GetAllHospital();

})
var HospitalTable = '';
function GetAllHospital() {
    HospitalTable = $("#divHospitalTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/Hospital/GetAll",
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
                dataField: "HospitalLogoUrl",
                caption: "شعار المستشفى",
                allowFiltering: false,
                width: 75,
                cellTemplate: function (element, info) {
                    element.append('<img style="width: 100%;" src="' + urlRoot + (info.data.HospitalLogoUrl != null && info.data.HospitalLogoUrl != "" ? info.data.HospitalLogoUrl.replace('~', '') : '/assets-custom/images/logo-white.png') + '" class="img-thumbnail" alt="' + info.data.HospitalName + '">')
                }
            }, {
                dataField: "HospitalName",
                caption: "اسم المستشفى",

            },
            {
                dataField: "HospitalAddress",
                caption: "العنوان",
            },

            {
                dataField: "Latitude",
                caption: "خط الطول",
            },
            {
                dataField: "Longitude",
                caption: "خط العرض",
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnUpdateHospital"><i class="fa fa-edit"></i> تعديل</a>'
                        + '<a htef="javascript:;" class="btn red btn-xs" data-id="' + info.data.ID + '" name="btnDeleteHospital"><i class="fa fa-ban"></i>حذف</a>')
                }
            }
        ],
    }).dxDataGrid("instance");
}

$("#divHospitalTable").on("click", 'a[name="btnDeleteHospital"]', function () {
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
        $.post(urlRoot + "/api/Hospital/Delete", data, function (result) {
            if (result == "ok") {
                HospitalTable.refresh();
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });

})
$("#divHospitalTable").on("click", 'a[name="btnUpdateHospital"]', function () {
    $("#fuHospitalLogoUrl").fileinput('destroy');
    var ID = $(this).data("id");
    $("#divmodalHospitalTitle").text(" تعديل المستشفى ");
    $("#modal-AddnewHospital").modal("show");
    $('#btnSaveHospital').data('id', ID);
    $.get(urlRoot + '/api/Hospital/GetByID/' + ID, function (response) {
        $('#txtHospitalName').val(response.HospitalName);
        $('#txtHospitalAddress').val(response.HospitalAddress);
        $("#fuHospitalLogoUrl").fileinput('destroy');
        $("#fuHospitalLogoUrl").unbind("filebatchuploadsuccess");
        $("#fuHospitalLogoUrl").fileinput({
            dataType: 'json',
            uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
            uploadAsync: false,
            autoUpload: false,
            browseLabel: "Hospital Photo",
            browseIcon: '<i class="fa fa-camera"></i>',
            browseClass: 'btn btn-primary',
            showCaption: true,
            showPreview: true,
            initialPreviewAsData: true,
            overwriteInitial: true,
            showRemove: false,
            layoutTemplates: {
                actions: '<div class="file-actions" >\n' +
                    '    <div class="file-footer-buttons">\n' +
                    '        {zoom} {other}' +
                    '    </div>\n' +
                    '    {drag}\n' +
                    '    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n' +
                    '    <div class="clearfix"></div>\n' +
                    '</div>'
            },
            showCancel: false,
            showClose: false,
            showUploadedThumbs: false,
            allowedFileExtensions: ['jpg', 'png', 'jpeg'],
            showUpload: false, // hide upload button
            minFileCount: 1,
            language: 'en',
            mainClass: "input-group",
            uploadExtraData: { FilePath: '~/uploads/Hospitals/Logo/' },
            initialPreview: initialPreview(response.HospitalLogoUrl != null ? response.HospitalLogoUrl : ""),
        }).on('filebatchuploadsuccess', function (event, data, previewId, index) {
            //SaveNewStudent(data.response.name);
            HospitalLogoUrl = data.response.name;
        }).on('filebatchselected', function (event) {
            $('#fuHospitalLogoUrl').fileinput('upload');
        });
    });
})

function initialPreview(imageArray) {
    var array = [];
    if (imageArray.length > 0) array.push(imageArray.replace("~/", urlRoot + "/"));
    return array;
}

$("#btnAddNewHospitals").click(function () {
    fuHospitalLogoUrl = '';
    ClearHospital();
    $("#divmodalHospitalTitle").text(" إضافة مستشفى ");
    $("#modal-AddnewHospital").modal("show");
    initMap();
})

function ValidNewHospital() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtHospitalName").require();
    return $.validity.end();
}

$("#btnSaveHospital").click(function () {
    var result = ValidNewHospital();
    if (result.valid) {
        AddNewHospital();
    }

})
function AddNewHospital() {
    var data = {
        ID: $('#btnSaveHospital').data('id'),
        HospitalName: $("#txtHospitalName").val(),
        HospitalAddress: $("#txtHospitalAddress").val(),
        HospitalLogoUrl: HospitalLogoUrl,
        Longitude: $("#txtLongitude").val(),
        Latitude: $("#txtLatitude").val(),
    }
    $.post(urlRoot + "/api/Hospital/Post", data, function (result) {
        if (result == "ok") {
            HospitalTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewHospital").modal("hide");
            ClearHospital();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearHospital() {
    $.validity.formReset();
    HospitalLogoUrl = '';
    $("#fuHospitalLogoUrl").fileinput('clear');
    $('#btnSaveHospital').data('id', 0);
    $("#txtHospitalName").val('');
    $("#txtHospitalAddress").val('');
    $("#txtLongitude").val('');
    $("#txtLatitude").val('');
}
$('#btnCancelHospital').click(function () {
    ClearHospital()
})

var fileUpload = $("#fuHospitalLogoUrl").fileinput({
    uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
    uploadAsync: false,
    showPreview: false,
    browseIcon: '<i class="fa fa-camera"></i>',
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    minFileCount: 1,
    language: 'ar',
    uploadExtraData: { FilePath: '~/uploads/Hospitals/Logo/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    HospitalLogoUrl = data.response.name;
}).on('filebatchselected', function (event) {
    $('#fuHospitalLogoUrl').fileinput('upload');
});

let map;
let markers = [];
var initMap = function () {
    map = new GMaps({
        div: '#map',
        lat: 29.995514877746214,
        lng: 30.963233117968734,
        click: function (e) {
            var latlng = e.latLng;
            $("#txtLongitude").val(latlng.lng())
            $("#txtLatitude").val(latlng.lat())
            map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng()
            });
        },
    });

    var handleAction = function () {
        var text = $.trim($('#txtHopitalAddress').val());
        GMaps.geocode({
            address: text,
            callback: function (results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    map.setCenter(latlng.lat(), latlng.lng());
                    map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    }

    $('#btnAddresSearch').click(function (e) {
        e.preventDefault();
        handleAction();
    });

    $("#txtHopitalAddress").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            e.preventDefault();
            handleAction();
        }
    });
}