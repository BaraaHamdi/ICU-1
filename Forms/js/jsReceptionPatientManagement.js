$(document).ready(function () {
    BindPatientVisitData();
    BindDiagnoseTree();
    BindrepeaterRelative();
    BindMedicalCare();
    var Data = CustomAjax(urlRoot + "/api/RelativeType/GetRelativeType", '', 'GET');
    $('#ddlRelativeType').html(drowDropdownList(Data, "اختر سلة القرابة"));
    ddlSelectApi2($("#ddlPatientVisitState"), urlRoot + "/api/PatientVisitMedicalRecord/GetPatientStates", "اختر سجل الزيارة للمريض", 0);
    var to = false;
    $('#DiagnoseFilter').keyup(function () {
        if (to) { clearTimeout(to); }
        to = setTimeout(function () {
            var v = $('#DiagnoseFilter').val();
            $('#DiagnoseTree').jstree(true).search(v);
            $("#containerDiagnose").animate({
                scrollTop: $(".jstree-search").length > 0 ? ($(".jstree-search").offset().top - $("#containerDiagnose").offset().top + $("#containerDiagnose").scrollTop()) : 0
            });
        }, 250);
    });

    $("#txtAge").TouchSpin({
        decimals: 0,
        forcestepdivisibility: 'none',
        min: 0,
        initval: 0,
        max: 100,
        mousewheel: true,
        buttondown_class: "btn blue",
        buttonup_class: "btn red",
        step: 1,
        boostat: 5,
        maxboostedstep: 10,
    });
    $("#txtOxygenLevel").TouchSpin({
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

function BindrepeaterRelative() {
    var Data = CustomAjax(urlRoot + "/api/RelativeType/GetRelativeType", '', 'GET');
    $('#ddlRelativeType').html(drowDropdownList(Data, "اختر سلة القرابة"));
    $('#mt-repeater-Relative').repeater({
        show: function () {
            $(this).slideDown();
        },
        isFirstItemUndeletable: true,
        repeatervalidation: function () {
            var result = validNewRelative();
            return result.valid;
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
            //if ($('a[data-count="deleterelative"]').length > 1) {
            //    swal({
            //        title: 'تاكيد الحذف',
            //        text: 'هل تريد حذف البيانات',
            //        type: 'info',
            //        allowOutsideClick: false,
            //        showConfirmButton: true,
            //        showCancelButton: true,
            //        closeOnConfirm: false,
            //        closeOnCancel: false,
            //        confirmButtonText: 'نعم',
            //        cancelButtonText: 'الغاء',
            //    },
            //        function (isConfirm) {
            //            if (isConfirm) {
            //                swal('تم الحذف بنجاح', 'لقد تم حذف البيانات بنجاح', "success");
            //                $(this).slideUp(deleteElement);
            //            } else {
            //                swal('خطأ', 'لم يتم الحذف', "error");
            //            }
            //        });
            //}
            //else {
            //    swal({
            //        title: 'خطأ',
            //        text: 'لا يمكن الحذف',
            //        type: "error",
            //        allowOutsideClick: true,
            //        showConfirmButton: true,
            //        confirmButtonClass: 'btn-danger',
            //        confirmButtonText: 'الغاء'
            //    });
            //}
        },
        ready: function (setIndexes) {
        }
    });
}
function validNewRelative() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $('select[data-valid="Relative"]').each(function () { $(this).require(); });
    $('input[data-valid="Relative"]').each(function () { $(this).require() });
    return $.validity.end();
}
var PatientVisitTable = '';
function BindPatientVisitData() {
    PatientVisitTable = $("#PatientVisitDataTableID").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "PatientID",
            loadUrl: urlRoot + "/api/ReceptionPatientManagement/BindAllReceptionPatient",
        }),
        onContentReady: function (e, c) {
            $("#DataCount").text($("#PatientVisitDataTableID").dxDataGrid("instance").totalCount());
        },
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
        columnChooser: {
            enabled: true
        },
        export: {
            enabled: true
        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        onRowPrepared(e) {
            if (e.rowType == 'data' && e.data.DischargeDate != null ) {
                e.rowElement.css("background-color", "hsl(6deg 86% 65% / 30%)");  
                e.rowElement.removeClass("dx-row-alt");
            }
        }  ,
        columns: [
            {
                dataField: "FullName",
                caption: "الاسم",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.FullName == null ? "UnKown" : info.data.FullName) + '</span>')
                },
                width: 250

            }, {
                dataField: "PatienInsertionDate",
                caption: "تاريخ الادخال",
                sortIndex: 1,
                sortOrder: "desc",
                cellTemplate: function (element, info) {
                    element.append('<span style="color:#e7505a !important;font-weight:bold">' + FormatDate(info.data.PatienInsertionDate) + '</span>')
                }

            },
            {
                dataField: "BirthDate",
                dataType: "date",
                caption: "تاريخ الميلاد",
                visible: false
                //cellTemplate: function (element, info) {
                //    element.append('<span>' + (info.data.BirthDate == null ? "UnKown" : info.data.BirthDate) + '</span>')
                //}
            },

            {
                dataField: "Age",
                caption: "العمر",
                visible: true
            },
            {
                dataField: "NationalID",
                caption: "الرقم القومي",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.NationalID == null ? "UnKown" : info.data.NationalID) + '</span>')
                },
                visible: false
            },
            {
                dataField: "InsuranceNo",
                caption: "رقم التامين",
                visible: false
            },
            {
                dataField: "Mobile1",
                caption: "رقم التليفون 1",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.Mobile1 == null ? "UnKown" : info.data.Mobile1) + '</span>')
                }
            },
            //{
            //    dataField: "Mobile2",
            //    caption: "رقم التليفون 2",
            //    cellTemplate: function (element, info) {
            //        element.append('<span>' + (info.data.Mobile2 == null ? "UnKown" : info.data.Mobile2) + '</span>')
            //    }
            //},
            {
                dataField: "Sex",
                visible: false,
                caption: "هل طبيب ام لا",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.Sex ? "ذكر" : "انثي") + '</span>')
                }
            }, {
                dataField: "RegistrationDate",
                dataType: "date",
                caption: "تاريخ التسجيل",
                visible: false
            }, {
                dataField: "IsVentilatorNeeded",
                visible: false,
                caption: "جهاز تنفس صناعي ام لا",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.IsVentilatorNeeded ? "نعم" : "لا") + '</span>')
                }
            }, {
                dataField: "HospitalName",
                caption: "اسم المستشفي",
                visible: true//info.data.HospitalVisibility
            }, {
                dataField: "ResidanceData",
                caption: "الرعاية",

            }, {
                dataField: "VentilatorNeeded",
                caption: "التنفس الصناعي",

            }, {
                dataField: "Diagnose",
                caption: "التشخيص",
            }, {
                dataField: "BedNo",
                caption: "رقم السرير",
                visible: false
            }, {
                dataField: "RoomNo",
                caption: "رقم الغرفة",
                visible: false
            }, {
                dataField: "RoomTitle",
                caption: "اسم الغرفة",
                visible: false
            }, {
                dataField: "IsConfirmed",
                caption: "تم التأكيد",
                visible: false,
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.IsConfirmed ? "نعم" : "لا") + '</span>')
                }
            }, {
                dataField: "IsRegisted",
                caption: "تم التسجيل",
                visible: false,
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.IsRegisted ? "نعم" : "لا") + '</span>')
                }
            }, 
            {
                dataField: "DischargeDate",
                caption: "تاريخ الخروج",
                dataType: "date",
            },
            {
                dataField: "PatientID",
                caption: "الحالة",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.DischargeDate != null ? info.data.ReasonTitle : info.data.LastPatientVisitMedicalRecordStateTitle) + '</span>')
                }
            },
            
            {
                dataField: "PatientID",
                caption: "الاجراء",
                width: "100",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" onClick="EditPatientData(' + info.data.PatientID + ',' + info.data.PatientVisitID + ')" class="btn yellow-gold btn-xs" data-id="' + info.data.PatientID + '" name="btnUpdateData" title="تعديل بيانات المستخدم"><i class="fa fa-edit"></i></a>' +
                        '<a htef="javascript:;" id="btnPatientVisitDetails-' + info.data.PatientVisitID + '" name="btnPatientVisitDetails" data-id="' + info.data.PatientVisitID + '"  data-ismyhospital="0"  class="btn blue btn-xs"><i class="fa fa-list-alt"></i></a>' +
                        '</div>'

                    )
                },
            }

        ],
    }).dxDataGrid("instance");
}

function GetPatientVisitRelative(PatientID) {
    $("#DivPatientRelative").generateTable({
        translate: true,
        tablelanguage: 'ar',
        datatable: {
            responsive: true,
        },
        enabledatatable: true,
        enableajaxcall: true,
        ajaxType: "api",
        ajax: {
            url: urlRoot + '/api/PatientRelative/GetPatientRelative/' + PatientID,
            type: "GET"
        },
        datatableprint: {
            allow: false
        },
        hidden: ['ID', 'NationalID'],
        tableclass: "table table-bordered table-striped table-condensed ",
        actions: true,
        actionstitle: "الاجراء",
        actionswidth: "20%",
        createAction: {
            key: 'ID',

            allowAction: true,
            actions: [{

                title: '',
                name: 'btnDeleteRelative',
                class: 'btn red btn-xs',
                method: DeletePatientRelative,
                icon: 'fa fa-times',
                tooltip: 'حذف',
            }]
        },
    });
    //if ($('#DivPatientRelativetable').find("tbody").children().length == 0) {
    //    $('#DivPatientRelativetable').html('<label class="text-center alert col-md-12 col-xs-12" style="margin-bottom: 0px;font-weight: bold;">لا يوجد بيانات .</label>');
    //}
}

function DeletePatientRelative(id) {
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
            $.post(urlRoot + "/api/PatientRelative/Delete/" + id, function (result) {
            if (result == "ok") {
                GetPatientVisitRelative(PatientID)
                Notifyonsuccess("ar");
            } else {
                Notifyonerror("ar", result);
            }
        })
    });
}

var PatientVisitResidenceID = null;
var HospitalVentilatorID = null;
var IsICUPage = true;
var IsICU = true;
var FirstTimeCountValidVen = 0;
var FirstTimeCountValidVenNeed = 0;
$("body").on("click", 'a[name="btnPatientVisitDetails"]', function () {
    var ID = $(this).data("id");
    patientVisitID = ID;
    GetPatientVisitMedicalRecord(patientVisitID);
    GetPatientVisitAttachment(patientVisitID);
    GetPatientVisitDiagnose(patientVisitID);
    GetPatientVisitCare(patientVisitID);
    FirstTimeCountValidVen = 0;
    FirstTimeCountValidVenNeed = 0;
    if ($(this).data("isicu") === 1) IsICU = true;
    else IsICU = false;

    $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', false);
    $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", false);

    var patientVisitDetail = CustomAjax(urlRoot + "/api/PatientManagement/GetPatientVisitInfo/" + patientVisitID, '', 'GET');
    if (patientVisitDetail != null) {
        $("#CkEditVentilatorNeed").bootstrapSwitch('state', patientVisitDetail.IsVentilatorNeeded);
        if (patientVisitDetail.IsRegisted && !patientVisitDetail.IsCanceled) {
            PatientVisitResidenceID = patientVisitDetail.PatientVisitResidenceID;
            HospitalVentilatorID = patientVisitDetail.HospitalVentilatorID;
            if (patientVisitDetail.IsVentilatorNeeded) {
                drowDropdownListSelect2($("#ddlEditHospitalVentilatorID"), urlRoot + "/api/PatientVisitResidence/GetPatientVentilator/" + patientVisitDetail.HospitalVentilatorID, "", "GET", "اختر جهاز التنفس للمريض");
                $("#ddlEditHospitalVentilatorID").val(patientVisitDetail.HospitalVentilatorID).trigger("change");
                $(".DivEditVentilatorResidence").show();
            }
        } else {
            PatientVisitResidenceID = null;
            HospitalVentilatorID = null;
            $("#ddlEditHospitalVentilatorID").val("").trigger("change");
            $(".DivEditVentilatorResidence").hide();
        }
    } else $(".DivEditVentilatorResidence").hide();


    if (Boolean($(this).data("ismyhospital"))) {
        $(".ShowAddMedicalRecordCard").show();
        $(".ShowAddMedicalAttachmentCard").show();
        $("body").find('input[name="checkdiagnose"]').attr("disabled", false);
        $("body").find('input[name="checkcare"]').attr("disabled", false);
        $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', false);
        $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", false);
    } else {
        $(".ShowAddMedicalRecordCard").hide();
        $(".ShowAddMedicalAttachmentCard").hide();
        $("body").find('input[name="checkdiagnose"]').attr("disabled", true);
        $("body").find('input[name="checkcare"]').attr("disabled", true);
        $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', true);
        $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", true);
    }


    $('#modal-actions').modal('show');
})

function FormatDate(date) {
    var result = '';

    var startdate = new Date(date); var enddate = new Date();
    // get total seconds between the times
    var delta = Math.abs(startdate - enddate) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;  // in theory the modulus is not required
    if (days > 1)
        result += days + " ي"
    if (hours > 1)
        result += hours + " س"
    if (minutes > 1)
        result += minutes + " د"
    if (days < 1 && hours < 1 && minutes < 1)
        result = "اقل من دقيقة"
    return result;
}


var fuMedicalFile = '';
var fuMedicalFilex = $("#fuMedicalFile").fileinput({
    uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
    uploadAsync: false,
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    minFileCount: 1,
    language: 'ar',
    showClose: false,
    showCaption: false,
    resizeImage: true,
    maxImageWidth: 500,
    // maxImageHeight: 500,
    removeLabel: '',
    browseLabel: '',
    browseClass: 'btn btn-primary btn-block',
    browseIcon: '<i class="fa fa-camera"></i>',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-2',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/assets-custom/images/ticket.png" style="width: 40%;" alt="Your File">',
    layoutTemplates: { main2: '{preview}  {remove} {browse}' },
    resizeImageQuality: '0.92',
    resizeIfSizeMoreThan: "1024",
    browseIcon: '<i class="fa fa-camera"></i>',
    uploadExtraData: { FilePath: '~/uploads/Patient/MedicalFile/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    fuMedicalFile = data.response.name;
}).on('filebatchselected', function (event) {
    fuMedicalFilex.fileinput('upload');
});

var AttachFileUrlAdd = '';
var AttachFileUrlx = $("#AttachFileUrl").fileinput({
    uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
    uploadAsync: false,
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    minFileCount: 1,
    language: 'ar',
    resizeImage: true,
    removeLabel: '',
    showClose: false,
    showCaption: false,
    browseLabel: '',
    browseIcon: '<i class="fa fa-camera"></i>',
    browseClass: 'btn btn-primary btn-block',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-2',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="/assets-custom/images/medicalfiles.png" style="width: 40%;" alt="Your File">',
    layoutTemplates: { main2: '{preview} {remove} {browse}' },
    maxImageWidth: 500,
    maxImageHeight: 500,
    resizeImageQuality: '0.92',
    resizeIfSizeMoreThan: "1024",
    browseIcon: '<i class="fa fa-camera"></i>',
    uploadExtraData: { FilePath: '~/uploads/Patient/AttachFile/' }
}).on('filebatchuploadsuccess', function (event, data, previewId, index) {
    AttachFileUrlAdd = data.response.name;
}).on('filebatchselected', function (event) {
    AttachFileUrlx.fileinput('upload');
});



function BindDiagnoseTree() {
    var data = GetDiagnoseTree();
    $("#DiagnoseTree").jstree('destroy');
    $('#DiagnoseTree').jstree({
        'core': {
            'data': data,
            "multiple": true
        },
        "plugins": ["wholerow", "search", "types", 'checkbox'],//"state",

    });
}

function GetDiagnoseTree() {
    var data = '';
    $.ajax({
        async: false,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: urlRoot + "/api/Diagnose/BindDiagnoseTree",
        success: function (jsonData) {
            data = $.map(jsonData, function (n) {
                return {
                    id: n.ID,
                    parent: n.Parent,
                    text: n.Text,
                    state: {
                        opened: true,
                    },
                }
            });
        }
    });
    return data;
}
function BindMedicalCare() {
    var data = CustomAjax(urlRoot + "/api/RelativeType/BindMedicalCare", '', 'GET');
    var html = '<div class="mt-checkbox-list">';
    for (var i = 0; i < data.length; i++) {
        html += '<label class="mt-checkbox">' +
            '<input type="checkbox"  name="ckMedicalCare" id="ckMedicalCare' + data[i].ID + '" value="' + data[i].ID + '"> ' + data[i].Title + '' +
            '<span></span>' +
            '</label>'
    }
    html += '</div>';
    $('#divMedicalCare').html(html);
}
var PatientID;
function EditPatientData(id, PVID) {
    PatientID = id;
    PatientVisitID = PVID;
    GetPatientVisitRelative(PatientID);
    DisplayMedicalFile(PVID);
    DisplayStandardPatientData(id)
    $("#modal-AddnewPatient").modal('show');

}

function GetPatientRelative() {

}
function DisplayStandardPatientData(id) {
    var data = CustomAjax(urlRoot + "/api/ReceptionPatientManagement/BindAllReceptionPatient/" + id, '', "GET");
    $("#txtFullName").val(data.FullName);
    $("#txtNationalID").val(data.NationalID);
    $("#txtInsuranceNo").val(data.InsuranceNo);
    $("#txtMobile1").val(data.Mobile1);
    $("#txtMobile2").val(data.Mobile2);
    $("#txtAge").val(data.Age);
}
function DisplayMedicalFile(PatientVisitID) {
    $("#ImageDiv").html('')
    //$("#ImageDiv").trigger('zoom.destroy');
    var MedicalFile = CustomAjax(urlRoot + "/api/ReceptionPatientManagement/GetMedicalFileUrl/" + PatientVisitID, '', "GET");
    var Html = '';
    if (MedicalFile != null) {
        var span = $('<span>');
        var img = $('<img id="medicalimage">');
        img.attr('src', MedicalFile);
        img.attr('style', "width:100%");
        img.appendTo('#ImageDiv');
        img.ezPlus({

            container: 'ZoomContainer',
            attrImageZoomSrc: 'zoom-image', // attribute to plugin use for zoom
            borderColour: '#888',
            borderSize: 4,
            constrainSize: false,  //in pixels the dimensions you want to constrain on
            constrainType: false,  //width or height
            containLensZoom: false,
            cursor: 'inherit', // user should set to what they want the cursor as, if they have set a click function
            debug: false,
            easing: false, // easing effects
            easingAmount: 12,
            enabled: true,

            // gallery options
            gallery: false,
            galleryActiveClass: 'zoomGalleryActive',
            gallerySelector: false,
            galleryItem: 'a',
            galleryEvent: 'click',

            // enable cross-fade effect
            imageCrossfade: false,

            // lens options
            lensBorderColour: '#000',
            lensBorderSize: 1,
            lensColour: 'white', //colour of the lens background
            lensFadeIn: false,
            lensFadeOut: false,
            lensOpacity: 0.4, //opacity of the lens
            lensShape: 'square', //can be 'round'
            lensSize: 200,
            lenszoom: false,

            // image loading spinner
            loadingIcon: false, //http://www.example.com/spinner.gif

            // This change will allow to decide if you want to decrease
            // zoom of one of the dimensions once the other reached it's top value,
            // or keep the aspect ratio, default behaviour still being as always,
            // allow to continue zooming out, so it keeps retrocompatibility.
            mantainZoomAspectRatio: false,
            maxZoomLevel: true,
            minZoomLevel: 5.01,

            // callbacks
            onComplete: $.noop,
            onDestroy: $.noop,
            onImageClick: $.noop,
            onImageSwap: $.noop,
            onImageSwapComplete: $.noop,
            onShow: $.noop,
            onHide: $.noop,
            onZoomedImageLoaded: $.noop,

            preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
            respond: [],
            responsive: true,
            scrollZoom: false, //allow zoom on mousewheel, true to activate
            scrollZoomIncrement: 0.1,  //steps of the scrollzoom
            showLens: true,
            tint: false, //enable the tinting
            tintColour: '#333', //default tint color, can be anything, red, #ccc, rgb(0,0,0)
            tintOpacity: 0.4, //opacity of the tint
            touchEnabled: true,

            // zoom options
            zoomActivation: 'hover', // Can also be click (PLACEHOLDER FOR NEXT VERSION)
            zoomContainerAppendTo: 'body', //zoom container parent selector
            zoomId: -1, // identifier for the zoom container
            zoomLevel: 1, //default zoom level of image
            zoomTintFadeIn: false,
            zoomTintFadeOut: false,
            zoomType: 'window', //window is default,  also 'lens' available -
            zoomWindowAlwaysShow: false,
            zoomWindowBgColour: '#fff',
            zoomWindowFadeIn: false,
            zoomWindowFadeOut: false,
            zoomWindowHeight: 400,
            zoomWindowOffsetX: 0,
            zoomWindowOffsetY: 0,
            zoomWindowPosition: 1, //Possible values: 1-16, but we can also position with a selector string.
            zoomWindowWidth: 400,
            zoomEnabled: true, //false disables zoomwindow from showing
            zIndex: 999999999

        });
        

        //Html += '<img src="' + MedicalFile + '" class="media"  alt="Medical File Image" style="display:block;margin:auto;width:95%;height:750px"/>';
        //$("#ImageDiv").html(Html)
        //$("#ImageDiv").zoom({ url: MedicalFile, on: 'grab' });
    } else {
        Html += '<p>No Medical File</p>';
    }


}
$("#btnSavePatient").on("click", function () {
    var arr = {
        ID: PatientID,
        FullName: $("#txtFullName").val(),
        Age: $("#txtAge").val(),
        NationalID: $("#txtNationalID").val(),
        InsuranceNo: $("#txtInsuranceNo").val(),
        Mobile1: $("#txtMobile1").val(),
        Mobile2: $("#txtMobile2").val(),
        //Diagnoses: $.map($('#DiagnoseTree').jstree('get_selected', true), function (n, i) { return { DiagnoseID: n.id } }),
        //Activity: $.map($('input[name="ckMedicalCare"]:checked'), function (n, i) { return { HospitalCareTypeID: $(n).val() } }),
        Relatives: ($('#mt-repeater-Relative').repeaterVal()['group-a'][0].RelativeTypeID != "" ? $('#mt-repeater-Relative').repeaterVal()['group-a'] : null),
    }
    $.post(urlRoot + "/api/ReceptionPatientManagement/EditStandardPatientData", arr, function (data) {
        if (data == "ok") {
            Notifyonsuccess("ar");
            BindPatientVisitData();
            $("#modal-AddnewPatient").modal('hide');
            DisplayStandardPatientData(PatientID)

            fuMedicalFilex.fileinput('clear');
        } else {
            Notifyonerror("ar");
        }
    })
})


