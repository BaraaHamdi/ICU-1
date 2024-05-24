<%@ Page Title="User Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="UserManagement.aspx.cs" Inherits="Re3ayaApp.Forms.UserManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <link href="../assets-custom/js/plugins/bootstrap-fileinput/css/fileinput.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">

        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادات المستخدم
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewUsers" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة مستخدم جديد</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divUserTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewUser" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalUserTitle">إضافة مستخدم</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label class="control-label col-md-3">المستشفى</label>
                                        <div class="col-md-7">
                                            <select id="ddlHospital" name="HospitalId" class="form-control" style="width: 100%"></select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3">الاسم بالكامل</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="txtUserFullName" name="UserFullName" placeholder="الاسم بالكامل" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3">الرقم القومى</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="txtNationalID" name="NationalID" placeholder="الرقم القومى" />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label col-md-3">تليفون 1</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="txtMobile1" name="Mobile1" placeholder="تليفون 1" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3">تليفون 2</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="txtMobile2" name="Mobile2" placeholder="تليفون 2" />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-md-3">العنوان الوظيفى</label>
                                        <div class="col-md-7">
                                            <input type="text" class="form-control " id="txtJobTitle" name="JobTitle" placeholder="العنوان الوظيفى" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <input type="file" class="form-control" id="fuImageProfileUrl" name="ImageProfileUrl" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" id="UserManagementDataID">
                                <div class="col-md-10 col-md-offset-1">
                                    <div class="panel panel-rose">

                                        <div class="panel-heading">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                                                        حساب المستخدم
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">اسم المستخدم</label>
                                                        <div class="col-md-7">
                                                            <input type="text" class="form-control" id="txtUserName" name="UserName" placeholder="اسم المستخدم" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">البريد الالكترونى</label>
                                                        <div class="col-md-7">
                                                            <input type="email" class="form-control" id="txtEmail" name="Email" placeholder="البريد الالكترونى" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">كلمه السر</label>
                                                        <div class="col-md-7">
                                                            <input type="text" class="form-control" id="txtPassword" name="Email" placeholder="كلمه السر" />
                                                        </div>
                                                        <%--<label class="control-label col-md-3">Confirm Password</label>
                                                        <div class="col-md-3">
                                                            <input type="password" class="form-control" id="txtConfirmPassword" name="Email" placeholder="Confirm Password" />
                                                        </div>--%>
                                                    </div>

                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">الصلاحيات</label>
                                                        <div class="col-md-7">
                                                            <select id="ddlRole" name="RoleId" class="form-control" style="width: 100%"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" data-id="0" id="btnSaveUser" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelUser" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="modal-UpdateRoles" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">تغيير صلاحية المستخدم</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-group">
                            <div class=" col-md-12">
                                <div class="portlet light bordered">
                                    <div class="portlet-body">
                                        <div class="form-horizontal form-bordered">
                                            <div class="form-group">
                                                <label class="col-md-3 control-label">الصلاحيات الحالية</label>
                                                <div class="col-md-8">
                                                    <input type="text" class="form-control" disabled="disabled" id="CurrentRole" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-3 control-label">الصلاحيات</label>
                                                <div class="col-md-8">
                                                    <select id="ddlRoles" class="form-control input-sm" style="width: 100%"></select>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-sm-8 col-md-offset-3">
                                                    <button type="button" class="btn btn-sm btn-primary" id="btnSaveRoles"><span class="fa fa-save"></span>حفظ </button>
                                                    <button type="button" class="btn btn-sm " data-dismiss="modal" id="btnCancelRoles"><span class="fa fa-times"></span>الغاء </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/assets-custom/js/plugins/bootstrap-fileinput/js/fileinput.min.js") %>
    <%: Scripts.Render("~/assets-custom/js/plugins/bootstrap-fileinput/js/locales/ar.js") %>
    <%: Scripts.Render("~/App/Js/UserManagement") %>
</asp:Content>
