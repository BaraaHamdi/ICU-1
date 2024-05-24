<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Re3ayaApp.Login" Async="true" %>


<!DOCTYPE html>

<html lang="ar" dir="rtl">
<head runat="server">
    <meta charset="utf-8" />
    <title>رعـــاية مـصـــر</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="Preview page of Metronic Admin Theme #3 for " name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/bootstrap-switch/css/bootstrap-switch-rtl.min.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <link href="/assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL PLUGINS -->
    <!-- BEGIN THEME GLOBAL STYLES -->
    <link href="/assets/global/css/components-rtl.min.css" rel="stylesheet" id="style_components" type="text/css" />
    <link href="/assets/global/css/plugins-rtl.min.css" rel="stylesheet" type="text/css" />
    <!-- END THEME GLOBAL STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="/assets/pages/css/login-2-rtl.min.css" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL STYLES -->
    <!-- BEGIN THEME LAYOUT STYLES -->
    <!-- END THEME LAYOUT STYLES -->
    <link rel="shortcut icon" href="/assets-custom/images/favicon.ico" />
    <style type="text/css">
        .login {
            background-color: #27334f;
        }

            .login .content .form-control {
                background-color: #27334f;
                border: 0px solid #6ba3c8;
                border-bottom: 1px solid #6ba3c8;
                height: 43px;
                color: #d9ecf9;
            }

        .loginbutton {
            border-radius: 5px !important;
        }
    </style>
</head>

<body class="login">
    <form id="form1" runat="server">
        <asp:HiddenField ID="DeviceId" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="DeviceKey" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="DeviceType" ClientIDMode="Static" runat="server" />
        <script type="text/javascript">
            function SetMobileEncryptedKey(val) {
                $("#DeviceId").val(val);
                $("#DeviceKey").val(val);
                $("#DeviceType").val(val);
                //$("#alertclientside").removeClass("display-hide");
                //$("#alertclientsidevalue").html(val);
                return $("#DeviceKey").val();
            }
            function SetMobileEncryptedKeys(DeviceId, DeviceKey, DeviceType) {
                $("#DeviceId").val(DeviceId);
                $("#DeviceKey").val(DeviceKey);
                $("#DeviceType").val(DeviceType);
                //$("#alertclientside").removeClass("display-hide");
                //$("#alertclientsidevalue").html(DeviceId);
                return $("#DeviceKey").val();
            }
            function GetMobileEncryptedKey() {
                return $("#DeviceKey").val();
            }

            function GetWebAlert(val) {
                return alert(val);
            }
        </script>

        <!-- BEGIN LOGO -->
        <div class="logo">
            <a href="index.html">
                <img src="/assets-custom/images/logo-white.png" style="height: 150px;" alt="" />
            </a>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">
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
                    <span class="form-title">اهلا بك في تطبيق الرعاية الرقمية.</span>
                </div>
                <div id="alertclientside" class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span id="alertclientsidevalue"></span>
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
                    <asp:Button runat="server" OnClick="LogIn" ValidationGroup="login" Text="تسجــيل الدخـــول" CssClass="btn red btn-block uppercase loginbutton" ID="btnLogin" />
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
            </div>
            <!-- END LOGIN FORM -->
        </div>
        <div class="copyright"><a href="https://www.facebook.com/framesformedia" target="_blank">2021 © Frames</a></div>
    </form>


    <!-- END LOGIN -->
    <!--[if lt IE 9]>
<script src="/assets/global/plugins/respond.min.js"></script>
<script src="/assets/global/plugins/excanvas.min.js"></script> 
<script src="/assets/global/plugins/ie8.fix.min.js"></script> 
<![endif]-->
    <!-- BEGIN CORE PLUGINS -->
    <script src="/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
    <!-- END CORE PLUGINS -->
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
    <script src="/assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->
    <!-- BEGIN THEME GLOBAL SCRIPTS -->
    <script src="/assets/global/scripts/app.min.js" type="text/javascript"></script>
    <!-- END THEME GLOBAL SCRIPTS -->
    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    <script src="/assets/pages/scripts/login.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL SCRIPTS -->
    <!-- BEGIN THEME LAYOUT SCRIPTS -->
    <!-- END THEME LAYOUT SCRIPTS -->
</body>
</html>
