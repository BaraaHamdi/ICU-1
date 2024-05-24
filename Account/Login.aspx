<%@ Page Title="رعـــاية مـصـــر" Language="C#" MasterPageFile="~/Account/Account.Master" Async="true" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Re3ayaApp.Account.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    
    <asp:HiddenField ID="DeviceId" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="DeviceKey" ClientIDMode="Static" runat="server" />
    <asp:HiddenField ID="DeviceType" ClientIDMode="Static" runat="server" />
    <script type="text/javascript">
        function SetMobileEncryptedKey(val) {
            $("#DeviceId").val(val);
            $("#DeviceKey").val(val);
            $("#DeviceType").val(val);
            return $("#DeviceKey").val();
        }

        function SetMobileEncryptedKeys(DeviceId, DeviceKey, DeviceType) {
            $("#DeviceId").val(DeviceId);
            $("#DeviceKey").val(DeviceKey);
            $("#DeviceType").val(DeviceType);
            return $("#DeviceKey").val();
        }

        function GetMobileEncryptedKey() {
            return $("#DeviceKey").val();
        }

        function GetWebAlert(val) {
            return alert(val);
        }
    </script>

    <!-- BEGIN LOGIN FORM -->
    <div class="login-form">
        <asp:PlaceHolder runat="server" ID="ErrorMessage" Visible="false">
            <div class="alert alert-danger" style="margin-top: 0;">
                <button class="close" data-close="alert"></button>
                <strong>
                    <asp:Literal runat="server" ID="FailureText" />
                </strong>
            </div>
        </asp:PlaceHolder>
        <div class="form-title">
            <span class="form-title">اهلا بك في تطبيق رعاية مصر.</span>
        </div>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
            <span>Enter any username and password. </span>
        </div>
        <div class="form-group">
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label class="control-label visible-ie8 visible-ie9">اســم المستخــدم</label>
            <%--<input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="اســم المستخــدم" name="username" />--%>
            <asp:TextBox runat="server" ID="UserName" CssClass="form-control form-control-solid placeholder-no-fix" placeholder="اسم المستخدم" autocomplete="off" />
            <asp:RequiredFieldValidator ValidationGroup="login" runat="server" ControlToValidate="UserName" CssClass="text-danger" ErrorMessage="حقل اسم المستخدم مطلوب." />
        </div>
        <div class="form-group">
            <label class="control-label visible-ie8 visible-ie9">كلمــة المــرور</label>
            <%--<input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="كلمــة المــرور" name="password" />--%>
            <asp:TextBox runat="server" ID="Password" TextMode="Password" CssClass="form-control form-control-solid placeholder-no-fix" autocomplete="off" placeholder="كلمه المــرور" />
            <asp:RequiredFieldValidator ValidationGroup="login" runat="server" ControlToValidate="Password" CssClass="text-danger" ErrorMessage="حقل كلمة المرور مطلوب." />
        </div>
        <div class="form-actions">
            <%--<button type="submit" class="btn red btn-block uppercase">تسجــيل الدخـــول</button>--%>
            <asp:Button runat="server" OnClick="LogIn" ValidationGroup="login" Text="تسجــيل الدخـــول" CssClass="btn red btn-block uppercase loginbutton" id="btnLogin"/>
        </div>
        <div class="form-actions">
            <div class="pull-left">
                <label class="rememberme mt-checkbox mt-checkbox-outline">
                    <input type="checkbox" name="remember" value="1" />
                    تذكــرني
                            <span></span>
                </label>
            </div>
            <%--<div class="pull-right forget-password-block">
                        <a class="forget-password">نسـيت كلمــة المــرور ؟ </a>
                    </div>--%>
        </div>
        <!-- END LOGIN FORM -->
    </div>
</asp:Content>

