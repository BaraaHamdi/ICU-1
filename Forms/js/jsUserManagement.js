$(document).ready(function () {
    drowDropdownListSelect3($("#ddlHospital"), urlRoot + "/api/HospitalRoom/GetHospitalEdit", "", "GET", "Select Hospital");
    ddlSelectApi2($("#ddlRole"), urlRoot + "/api/UserManagment/GetRoles", "اختر الصلاحيات", 0);
    drowDropdownListSelect3($("#ddlRoles"), urlRoot + "/api/UserManagment/GetRoles", "", "GET", "Select Hospital");
    GetAllUser();
    initinputUpload();
})
var UserTable = '';
function GetAllUser() {
    UserTable = $("#divUserTable").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "ID",
            loadUrl: urlRoot + "/api/UserManagment/GetAll",
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
                dataField: "ImageProfileUrl",
                caption: "صورة الستخدم",
                allowFiltering: false,
                width: 75,
                cellTemplate: function (element, info) {
                    element.append('<img style="width: 100%;height: 50px;" src="' + urlRoot + (info.data.ImageProfileUrl != null && info.data.ImageProfileUrl != "" ? info.data.ImageProfileUrl.replace('~', '') : '/assets-custom/images/boy.png') + '" class="img-thumbnail" alt="' + info.data.UserName + '">')
                }
            }, {
                dataField: "UserFullName",
                caption: "الاسم"
            },
            {
                dataField: "NationalID",
                caption: "الرقم القومى"
            },

            {
                dataField: "Mobile1",
                caption: "تليفون 1"
            },
            {
                dataField: "Mobile2",
                caption: "تليفون 2"
            },
            {
                dataField: "UserName",
                caption: "اسم المستخدم"
            },
            {
                dataField: "HospitalName",
                caption: "المستشفى"
            },
            {
                dataField: "IsDoctor",
                caption: "هل طبيب ام لا",
                cellTemplate: function (element, info) {
                    element.append('<span>' + (info.data.IsDoctor ? "نعم" : "لا") + '</span>')
                }
            },
            {
                dataField: "ID",
                caption: "الاجراء",
                width: "300",
                allowFiltering: false,
                cellTemplate: function (element, info) {
                    element.append('<div class="btn-group btn-group-sm btn-group-justified ">' +
                        '<a htef="javascript:;" class="btn  btn-xs ' + (info.data.IsActive ? 'red' : 'green') + '" data-id="' + info.data.ID + '" name="btnActiveUser" title=' + (info.data.IsActive ? ' تعطيل المستخدم ' : ' تفعيل المستخدم') + '>' + (info.data.IsActive ? '<i class="fa fa-times"></i>' : '<i class="fa fa-check"></i>') + '</a>' +
                        '<a htef="javascript:;" onClick="resetPassword(' + info.data.ID + ')" class="btn  btn-xs btn-primary" data-id="' + info.data.ID + '" name="btnResetPassword" title="تغيير كلمة السر"><i class="fa fa-key"></i></a>' +
                        '<a htef="javascript:;" onClick="updateUserData(' + info.data.ID + ')" class="btn yellow-gold btn-xs" data-id="' + info.data.ID + '" name="btnUpdateData" title="تعديل بيانات المستخدم"><i class="fa fa-edit"></i></a>' +
                        '<a htef="javascript:;" onClick="updateRoles(' + info.data.ID + ')" class="btn blue-hoki btn-xs" data-id="' + info.data.ID + '" name="btnUpdateRoles" title="تعديل صلاحية المستخدم"><i class="fa fa-wrench"></i></a>'
                    )
                },
            }

        ],
    }).dxDataGrid("instance");
}

$("#divUserTable").on("click", 'a[name="btnActiveUser"]', function () {
    var ID = $(this).data("id");
    var data = {
        ID: ID
    }
    $.post(urlRoot + "/api/UserManagment/Active", data, function (result) {
        if (result == "ok") {
            UserTable.refresh();
            Notifyonsuccess("ar");
        } else {
            Notifyonerror("ar", result);
        }
    })

})
$("#divUserTable").on("click", 'a[name = "btnResetPassword"]', function () {
    var ID = $(this).data("id");
    var data = {
        ID: ID
    }
    $.post(urlRoot + "/api/UserManagment/ResetPassword", data, function (result) {
        if (result == "ok") {
            UserTable.refresh();
            Notifyonsuccess("ar");
        } else {
            Notifyonerror("ar", result);
        }
    })
})
$("#divUserTable").on("click", 'a[name ="btnUpdateData"]', function () {
    var UserID = $(this).data("id");
    $.get(urlRoot + "/api/UserManagment/BindUserDataToEdit/" + UserID, function myfunction(data) {
        $('#ddlHospital').val(data.HospitalId).trigger('change');
        $("#txtUserFullName").val(data.UserFullName);
        $("#txtNationalID").val(data.NationalID);
        $("#txtMobile1").val(data.Mobile1);
        $("#txtMobile2").val(data.Mobile2);
        $("#txtJobTitle").val(data.JobTitle);
        $("#fuImageProfileUrl").unbind("filebatchuploadsuccess");
        $("#fuImageProfileUrl").fileinput('destroy');
        $("#fuImageProfileUrl").fileinput({
            dataType: 'json',
            uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
            uploadAsync: false,
            autoUpload: false,
            browseLabel: "",
            browseIcon: '<i class="fa fa-camera"></i>',
            browseClass: 'btn btn-primary',
            showCaption: true,
            showPreview: true,
            showRemove: false,
            showCancel: false,
            layoutTemplates: {
                actions: '<div class="file-actions">\n' +
                    '    <div class="file-footer-buttons">\n' +
                    '         {delete}  {other}' +
                    '    </div>\n' +
                    '    {drag}\n' +
                    '    <div class="clearfix"></div>\n' +
                    '</div>'
            },
            showClose: false,
            showUploadedThumbs: false,
            allowedFileExtensions: ["jpg", "jpeg", "png", "gif"],
            showUpload: false, // hide upload button
            minFileCount: 1,
            language: 'ar',
            mainClass: "input-group",
            defaultPreviewContent: '<img src="' + urlRoot + (data.ImageProfileUrl != null ? data.ImageProfileUrl.replace("~/", "/") : "/assets-custom/images/Avatar-512.jpg") + '" alt="Your Avatar" style="width:160px">',
            //defaultPreviewContent: '<img src="' + urlRoot + '/assets-custom/images/Avatar-512.jpg" alt="Your Avatar" style="width:160px">',
            previewSettings: {
                image: { width: "160px", height: "160px" },
            },
            uploadExtraData: function () {
                return ({ FilePath: "~/uploads/UserPhoto/" })
            },
            //initialPreview: initialPreview(data.ImageProfileUrl != null ? data.ImageProfileUrl : ""),
        }).on('filebatchuploadsuccess', function (event, data, previewId, index) {
            fuImageProfileUrl = data.response.name;
            AddNewUsers();
        });
    })
    $("#btnSaveUser").data('id', UserID);
    $("#modal-AddnewUser").modal('show');
    $("#UserManagementDataID").hide();
})
var UserID
$("#divUserTable").on("click", 'a[name ="btnUpdateRoles"]', function () {
    UserID = $(this).data("id");
    $.get(urlRoot + "/api/UserManagment/GetUserRoleData/" + UserID, function myfunction(data) {
        $("#CurrentRole").val(data);
    });
    $("#modal-UpdateRoles").modal('show');
});
$("#btnSaveRoles").on("click", function () {
    var arr = {
        ID: UserID,
        RoleID: $("#ddlRoles").val()
    }
    $.post(urlRoot + "/api/UserManagment/UpdateRole", arr, function (data) {
        if (data == "ok") {
            UserTable.refresh();
            Notifyonsuccess("ar");
            $.get(urlRoot + "/api/UserManagment/GetUserRoleData/" + UserID, function myfunction(data) {
                $("#CurrentRole").val(data);
            });
            ClearUser();

        } else {
            Notifyonerror("ar", result);
        }
    })
    $("#modal-UpdateRoles").modal('hide');
})
$('#btnAddNewUsers').click(function () {
    ClearUser();
    $("#UserManagementDataID").show();
    $('#modal-AddnewUser').modal('show')
})


function initialPreview(imageArray) {
    var array = [];
    if (imageArray.length > 0) array.push(imageArray.replace("~/", urlRoot + "/"));
    return array;
}
var fuImageProfileUrl = '';
function initinputUpload() {
    $("#fuImageProfileUrl").unbind("filebatchuploadsuccess");
    $("#fuImageProfileUrl").fileinput('destroy');
    $("#fuImageProfileUrl").fileinput({
        dataType: 'json',
        uploadUrl: urlRoot + '/Forms/UploadDocumentFiles.ashx/ProcessRequest',
        uploadAsync: false,
        autoUpload: false,
        browseLabel: "",
        browseIcon: '<i class="fa fa-camera"></i>',
        browseClass: 'btn btn-primary',
        showCaption: true,
        showPreview: true,
        showRemove: false,
        showCancel: false,
        layoutTemplates: {
            actions: '<div class="file-actions">\n' +
                '    <div class="file-footer-buttons">\n' +
                '         {delete}  {other}' +
                '    </div>\n' +
                '    {drag}\n' +
                '    <div class="clearfix"></div>\n' +
                '</div>'
        },
        showClose: false,
        showUploadedThumbs: false,
        allowedFileExtensions: ["jpg", "jpeg", "png", "gif"],
        showUpload: false, // hide upload button
        minFileCount: 1,
        language: 'ar',
        mainClass: "input-group",
        defaultPreviewContent: '<img src="' + urlRoot + '/assets-custom/images/Avatar-512.jpg" alt="Your Avatar" style="width:160px">',
        previewSettings: {
            image: { width: "160px", height: "160px" },
        },
        uploadExtraData: function () {
            return ({ FilePath: "~/uploads/UserPhoto/" })
        },
    }).on('filebatchuploadsuccess', function (event, data, previewId, index) {
        fuImageProfileUrl = data.response.name;
        AddNewUsers();
    });

}

function ValidNewUsers() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtUserFullName").require();
    $("#txtNationalID").require();
    $("#txtMobile1").require();
    $("#txtJobTitle").require();
    if ($("#btnSaveUser").data("id") == 0) {
        $("#txtUserName").require();
        $("#txtEmail").require();
        $("#txtPassword").require();
        $("#ddlRole").require();
    }
    return $.validity.end();
}

$("#btnSaveUser").click(function () {
    var result = ValidNewUsers();
    if (result.valid) {
        if ($('#fuImageProfileUrl').fileinput('getFileStack').length > 0) $("#fuImageProfileUrl").fileinput("upload");
        else AddNewUsers();
    }
})
function AddNewUsers() {

    var data = {
        ID: $("#btnSaveUser").data("id"),
        UserId: $("#ddlUser").val(),
        Email: $("#txtEmail").val(),
        Password: $("#txtPassword").val(),
        UserName: $("#txtUserName").val(),
        ImageProfileUrl: fuImageProfileUrl,
        UserFullName: $("#txtUserFullName").val(),
        NationalID: $("#txtNationalID").val(),
        Mobile1: $("#txtMobile1").val(),
        Mobile2: $("#txtMobile2").val(),
        JobTitle: $("#txtJobTitle").val(),
        RoleID: $("#ddlRole").val(),
        HospitalId: $("#ddlHospital").val()
    }
    $.post(urlRoot + "/api/UserManagment/Post", data, function (result) {
        if (result == "ok") {
            UserTable.refresh();
            Notifyonsuccess("ar");
            $("#modal-AddnewUser").modal("hide");
            ClearUser();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearUser() {
    $("#btnSaveUser").data("id", 0);
    $("#ddlUser").val('');
    $("#txtEmail").val('');
    $("#txtPassword").val('');
    $("#txtUserName").val('');
    fuImageProfileUrl = '';
    $('#fuImageProfileUrl').fileinput('clear');
    $("#txtUserFullName").val('');
    $("#txtNationalID").val('');
    $("#txtMobile1").val('');
    $("#txtMobile2").val('');
    $("#txtJobTitle").val('');
    $("#ddlRole").val('').trigger('change');
    $("#ddlRoles").val('').trigger('change');
    $("#ddlHospital").val('').trigger('change');
}
