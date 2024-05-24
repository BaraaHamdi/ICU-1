<%@ page title="Password Changed" language="C#" masterpagefile="~/Account/Account.Master" autoeventwireup="true" codebehind="ResetPasswordConfirmation.aspx.cs" inherits="Re3ayaApp.Account.ResetPasswordConfirmation" async="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h2 class="form-title font-green"><%: Title %>.</h2>
    <div>
        <p>Your password has been changed. Click
            <asp:HyperLink ID="login" runat="server" NavigateUrl="~/Login">here</asp:HyperLink>
            to login </p>
    </div>
</asp:Content>
