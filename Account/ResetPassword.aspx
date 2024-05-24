<%@ Page Title="Reset Password" Language="C#" MasterPageFile="~/Account/Account.Master" AutoEventWireup="true" CodeBehind="ResetPassword.aspx.cs" Inherits="Re3ayaApp.Account.ResetPassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="login-form" id="loginForm" runat="server">
        <h3 class="form-title font-green">Enter your new password</h3>
        <asp:PlaceHolder runat="server" ID="ErrorMessage" Visible="false">
            <div class="alert alert-danger">
                <button class="close" data-close="alert"></button>
                <strong>
                    <asp:Literal runat="server" ID="FailureText" />
                </strong>
            </div>
        </asp:PlaceHolder>
        <hr />
        <asp:ValidationSummary runat="server" CssClass="text-danger" />
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="Email" CssClass="control-label visible-ie8 visible-ie9">Email</asp:Label>
            <asp:TextBox runat="server" ID="Email" CssClass="form-control form-control-solid placeholder-no-fix" placeholder="Email" TextMode="Email" />
            <span class="help-block">
                <asp:RequiredFieldValidator runat="server" ControlToValidate="Email"
                                            CssClass="text-danger" ErrorMessage="The email field is required." />
            </span>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="Password" CssClass="control-label visible-ie8 visible-ie9">Password</asp:Label>

            <asp:TextBox runat="server" ID="Password" TextMode="Password" CssClass="form-control form-control-solid placeholder-no-fix" placeholder="Password" />
            <span class="help-block">
                <asp:RequiredFieldValidator runat="server" ControlToValidate="Password"
                                            CssClass="text-danger" ErrorMessage="The password field is required." />
            </span>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="ConfirmPassword" CssClass="control-label visible-ie8 visible-ie9">Confirm password</asp:Label>
            <asp:TextBox runat="server" ID="ConfirmPassword" TextMode="Password" CssClass="form-control form-control-solid placeholder-no-fix" placeholder="Confirm Password" />
            <span class="help-block">
                <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfirmPassword"
                                            CssClass="text-danger" Display="Dynamic" ErrorMessage="The confirm password field is required." />
                <asp:CompareValidator runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword"
                                      CssClass="text-danger" Display="Dynamic" ErrorMessage="The password and confirmation password do not match." />
            </span>
        </div>
        <div class="form-actions">
            <asp:Button runat="server" OnClick="Reset_Click" Text="Reset" CssClass="btn green uppercase" />
        </div>
    </div>
</asp:Content>
