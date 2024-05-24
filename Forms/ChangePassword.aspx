<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="Re3ayaApp.Forms.ChangePassword" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <h3 class="panel-title">تغيير كلمة المرور</h3>
        </div>
        <div class="panel-body">
            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>
                    <div class="form-horizontal">
                        <asp:PlaceHolder runat="server" ID="successMessage" Visible="false" ViewStateMode="Disabled">
                            <p class="text-success">تم تغيير كلمة المرور بنجاح</p>
                        </asp:PlaceHolder>
                        <asp:ValidationSummary runat="server" ShowModelStateErrors="true" CssClass="text-danger" />
                        <div class="form-group">
                            <asp:Label runat="server" ID="CurrentPasswordLabel" AssociatedControlID="CurrentPassword" CssClass="control-label col-md-3">كلمة المرور الحالية</asp:Label>
                            <div class="col-md-5">
                                <asp:TextBox runat="server" ID="CurrentPassword" TextMode="Password" CssClass="form-control" />
                                <span class="help-block">
                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="CurrentPassword"
                                        CssClass="text-danger" ErrorMessage="مطلوب كلمة المرور الحالية."
                                        ValidationGroup="ChangePassword" /></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <asp:Label runat="server" ID="NewPasswordLabel" AssociatedControlID="NewPassword" CssClass="control-label col-md-3">كلمة المرور الجديدة</asp:Label>
                            <div class="col-md-5">
                                <asp:TextBox runat="server" ID="NewPassword" TextMode="Password" CssClass="form-control" />
                                <span class="help-block">
                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="NewPassword"
                                        CssClass="text-danger" ErrorMessage="مطلوب كلمة المرور الجديدة."
                                        ValidationGroup="ChangePassword" /></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <asp:Label runat="server" ID="ConfirmNewPasswordLabel" AssociatedControlID="ConfirmNewPassword" CssClass="control-label col-md-3">تأكيد كلمة المرور الجديدة</asp:Label>
                            <div class="col-md-5">
                                <asp:TextBox runat="server" ID="ConfirmNewPassword" TextMode="Password" CssClass="form-control" />
                                <span class="help-block">
                                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfirmNewPassword"
                                        CssClass="text-danger" Display="Dynamic" ErrorMessage="مطلوب تأكيد كلمة مرور جديدة."
                                        ValidationGroup="ChangePassword" />
                                    <asp:CompareValidator runat="server" ControlToCompare="NewPassword" ControlToValidate="ConfirmNewPassword"
                                        CssClass="text-danger" Display="Dynamic" ErrorMessage="لا تتطابق كلمة المرور الجديدة وكلمة مرور التأكيد."
                                        ValidationGroup="ChangePassword" /></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-10">
                                <asp:Button runat="server" ID="btnChangePassword" Text="تغيير كلمة المرور" ValidationGroup="ChangePassword" OnClick="ChangePassword_Click" CssClass="btn btn-default" />
                            </div>
                        </div>
                    </div>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="btnChangePassword" />
                </Triggers>
            </asp:UpdatePanel>
        </div>
    </div>
</asp:Content>
