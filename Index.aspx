<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Re3ayaApp.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="theme-color" content="#337ab7" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>رعــاية مـصــر</title>
    <link href="~/Content/all.css" rel="stylesheet" type="text/css" />

    <webopt:BundleReference runat="server" Path="~/Content/css/public" />
    <webopt:BundleReference runat="server" Path="~/Content/css/global" />
    <webopt:BundleReference runat="server" Path="~/Content/css/theme" />
    <%--    <webopt:BundleReference runat="server" Path="~/Content/DevExtremeBundle" />--%>
    <webopt:BundleReference runat="server" Path="~/Content/css/custom" />

    <link href="~/assets-custom/images/favicon.ico" rel="shortcut icon" />
    <link href="~/assets-custom/css/animation.css" rel="stylesheet" />

    <!--[if IE 7]><link rel="stylesheet" href="~/assets-custom/css/" + font.fontname + "-ie7.css"><![endif]-->
    <style type="text/css">
        .logo-default {
            width: 65px !important;
            margin-top: 5px !important;
        }
    </style>

    <style>
        .rotate {
            transform: rotate(-90deg);
            /* Legacy vendor prefixes that you probably don't need... */
            /* Safari */
            -webkit-transform: rotate(-90deg);
            /* Firefox */
            -moz-transform: rotate(-90deg);
            /* IE */
            -ms-transform: rotate(-90deg);
            /* Opera */
            -o-transform: rotate(-90deg);
            /* Internet Explorer */
            filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
        }


        .fancybox-overlay {
            z-index: 1000000 !important;
        }
        /* Extra small devices (phones, 600px and down) */
        @media only screen and (max-width: 600px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: -25px;
            }
        }

        /* Small devices (portrait tablets and large phones, 600px and up) */
        @media only screen and (min-width: 600px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: -25px;
            }
        }

        /* Medium devices (landscape tablets, 768px and up) */
        @media only screen and (min-width: 768px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: -25px;
            }
        }

        /* Large devices (laptops/desktops, 992px and up) */
        @media only screen and (min-width: 992px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: -25px;
            }
        }

        /* Extra large devices (large laptops and desktops, 1200px and up) */
        @media only screen and (min-width: 1200px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: 40px;
            }
        }

        @media only screen and (min-width: 1440px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: 0px;
            }
        }

        @media only screen and (min-width: 2560px) {
            .fix-rotate {
                position: absolute;
                top: -20px;
                right: 40px;
            }
        }

        #btnAddNewPatients, #btnRefreshPatientList {
            z-index: 9994 !important;
            position: fixed;
            bottom: 29px;
            left: 29px;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            color: white;
            border-radius: 50%;
            padding: 15px 21px 20px 20px;
            width: 65px;
            height: 60px;
            vertical-align: middle;
        }

        @media only screen and (max-width: 940px) {
            .panel-body {
                padding: 0px;
            }
        }
    </style>
    <%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordSlid" %>
    <%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecord.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecord" %>
    <%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
    <%@ Register Src="~/Forms/us/ucPatientVisitCareAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitCareAdd" %>
    <%@ Register Src="~/Forms/us/ucPatientVisitAttachmentSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitAttachmentSlid" %>
    <%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordAttachment.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordAttachment" %>
    <%@ Register Src="~/Forms/us/ucChangeVentilator.ascx" TagPrefix="uc1" TagName="ucChangeVentilator" %>


</head>
<body class="page-container-bg-solid page-header-fixed page-sidebar-closed-hide-logo page-md">
    <form id="form1" runat="server">

        <asp:HiddenField ID="HideUserID" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="HideDoctorID" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="HideHospitalID" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="HideUserName" ClientIDMode="Static" runat="server" />

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
                return $("#MobileEncryptedKey").val();
            }

            function GetWebAlert(val) {
                return alert(val);
            }
        </script>

        <div class="cookie-bar">
            <div class="row">
                <div class="col-md-5">
                    <h5 style="padding: 10px;">مرحباً :
                            <asp:Label ID="lblOriginalEmployee" runat="server" Text=""></asp:Label></h5>
                </div>
                <div class="col-md-5">
                    <h5 style="padding: 10px;">انت الأن تقوم بالدخول بواسطة :
                            <asp:Label ID="lblimpersonatedEmployee" runat="server" Text=""></asp:Label></h5>
                </div>
                <div class="col-md-2">
                    <asp:LinkButton ID="lnkreturntoUser" Visible="false" CssClass="btn dark pull-right" OnClick="lnkreturntoUser_ClickAsync" runat="server">تسجيل الخروج <i class="icon-logout"></i></asp:LinkButton>
                </div>
            </div>
        </div>

        <!-- BEGIN HEADER -->
        <div class="page-header navbar navbar-fixed-top">
            <!-- BEGIN HEADER INNER -->
            <div class="page-header-inner ">
                <!-- BEGIN LOGO -->
                <div class="page-logo visible-sm visible-lg visible-md">
                    <a href="#">
                        <img src="../assets-custom/images/logo.png" alt="logo" class="logo-default" style="height: 65px; width: 65px; margin-top: 10px" />
                    </a>

                    <div id="lblAttendanceState" class="btn blue mt-ladda-btn ladda-button btn-outline" data-style="slide-up" data-spinner-color="#333" style="margin-top: 20px;"></div>

                    <div class="menu-toggler sidebar-toggler">
                        <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
                    </div>
                </div>

                <!-- END LOGO -->
                <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                <%--<a href="javascript:;" class="menu-toggler responsive-toggler visible-sm visible-lg visible-md" data-toggle="collapse" data-target=".navbar-collapse"></a>--%>
                <!-- END RESPONSIVE MENU TOGGLER -->
                <!-- BEGIN PAGE ACTIONS -->
                <!-- BEGIN PAGE TOP -->
                <div class="page-top">
                    <div class=" visible-xs visible-sm pull-left bold" style="margin-right: 10px; margin-top: 35px;" id="hospitaltitleelement">
                        <i class="fa fa-h-square"></i>
                        <span runat="server" id="lblUserHospitalTitle"></span>
                    </div>
                    <!-- BEGIN TOP NAVIGATION MENU -->
                    <div class="top-menu">
                        <ul class="nav navbar-nav pull-left">
                            <li class="dropdown dropdown-extended  dropdown-inbox">
                                <a href="javascript:;" class="dropdown-toggle " data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">
                                    <i class="fa fa-bell"></i>
                                    <span class="badge badge-danger " id="msgCount1" style="display: none">0 </span>
                                </a>
                                <ul class="dropdown-menu" style="position: relative; margin-top: -64px;">
                                    <li class="external">
                                        <h3 lang="ar">لديك <span class="bold " id="msgCount2">0</span> إشعار</h3>
                                        <a href="NotificationPage.aspx" lang="ar">عرض الكل</a>
                                    </li>
                                    <li>
                                        <ul class="dropdown-menu-list scrollerx" id="notiWorker" style="height: 350px;" data-handle-color="#637283">
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="separator hide"></li>

                            <li class="dropdown dropdown-extended quick-sidebar-toggler" id="TabHelpRequestNotification">
                                <span style="color: #C1CCD1; font-size: 24px;"><i class="fa fa-wechat"></i></span>
                                <span class="badge badge-danger" id="HelpRequestCount1" style="display: none">0</span>
                            </li>
                            <li class="separator hide"></li>
                            <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                            <li class="dropdown dropdown-user">
                                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                    <%--username-hide-on-mobile--%>
                                    <span class="username " id="lblProfileName"></span>
                                    <img id="imProfile" runat="server" alt="" class="img-circle" src="~/assets-custom/images/trans.png" />
                                    <i class="fa fa-angle-down"></i></a>
                                <ul class="dropdown-menu dropdown-menu-default" runat="server" id="personalmenu" style="position: relative; margin-top: -68px; padding-right: 10px;">
                                    <li><a href="~/Forms/ChangePassword.aspx" runat="server"><i class="icon-key"></i>تغيير كلمة المرور</a>
                                    </li>
                                    <li class="divider"></li>
                                    <%--<li><a href="~/UserLockScreen.aspx" runat="server"><i class="icon-lock"></i>قفل النظام</a></li>--%>

                                    <li>
                                        <asp:LinkButton ID="LinkButton1" OnClick="LinkButton1_Click" runat="server"><i class="icon-logout"></i>تسجيل الخروج</asp:LinkButton></li>

                                </ul>
                            </li>
                            <!-- END USER LOGIN DROPDOWN -->
                        </ul>
                    </div>
                    <!-- END TOP NAVIGATION MENU -->
                </div>
                <!-- END PAGE TOP -->
            </div>
            <!-- END HEADER INNER -->
        </div>
        <!-- END HEADER -->
        <!-- BEGIN HEADER & CONTENT DIVIDER -->
        <div class="clearfix"></div>
        <!-- END HEADER & CONTENT DIVIDER -->

        <!-- END HEADER & CONTENT DIVIDER -->
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN SIDEBAR -->
            <%--<div class="page-sidebar-wrapper">
                <!-- BEGIN SIDEBAR -->
                <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                <div class="page-sidebar navbar-collapse collapse" id="sidebar">
                    <!-- BEGIN SIDEBAR MENU -->
                    <!-- END SIDEBAR MENU -->
                </div>
            </div>--%>

            <!-- BEGIN CONTAINER -->
            <div class="page-container">
                <!-- BEGIN SIDEBAR -->

                <div class="page-sidebar-wrapper">
                    <!-- BEGIN SIDEBAR -->
                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                    <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->

                    <!-- BEGIN SIDEBAR MENU -->
                    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
                    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
                    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
                    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                    <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                    <div class="page-sidebar navbar-collapse collapse" id="sidebar">
                        <!-- BEGIN SIDEBAR MENU -->
                        <!-- END SIDEBAR MENU -->
                    </div>

                    <!-- END SIDEBAR MENU -->

                    <!-- END SIDEBAR -->
                </div>
                <!-- END SIDEBAR -->
                <!-- BEGIN CONTENT -->
                <div class="page-content-wrapper">
                    <!-- BEGIN CONTENT BODY -->
                    <div class="page-content">
                        <!-- BEGIN PAGE HEAD-->
                        <div class="page-head">
                            <!-- BEGIN PAGE TITLE -->
                            <%--<div class="btn-group btn-group-lg btn-group-solid margin-bottom-10 pull-right">
                            <button type="button" class="btn green">انت حاليا علي</button>
                            <button type="button" class="btn btn-rose txtCurrentFloorName">لم تختار نوع العيادة</button>
                            <button type="button" id="btnChangeFloor" class="btn green" data-toggle="tooltip" title="تغيير العيادة"><i class="fa fa-sign-out"></i></button>
                        </div>--%>
                            <!-- END PAGE TITLE -->
                        </div>
                        <!-- END PAGE HEAD-->
                        <asp:Literal ID="hospitalLogo" runat="server"></asp:Literal>

                        <!-- BEGIN PAGE BASE CONTENT -->


                        <div id="inline" style="display: none">
                            <p>ICU Smart</p>
                        </div>

                        <div class="row">
                            <div class="col-md-12 ">
                                <div class="portlet box blue">
                                    <div class="portlet-title">
                                        <div class="caption" lang="ar">
                                            <i class="fa fa-user"></i>مرضى الانتظار
                                        </div>
                                    </div>
                                    <div class="portlet-body form">
                                        <div class="form-horizontal">
                                            <div class="form-body">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-offset-3 col-md-6">
                                                                <div class="input-group">
                                                                    <input lang="ar" type="text" id="txtKeyword" class="form-control" placeholder="البحث بالرقم الطبي او الإسم" />
                                                                    <span lang="ar" class="input-group-btn">
                                                                        <a lang="ar" href="javascript:;" class="btn btn-primary" id="btnSearch"><i class="fa fa-search"></i></a>
                                                                    </span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12 text-center text-success">
                                                            <h4 lang="ar">
                                                                <asp:Label ID="lblCount" runat="server"></asp:Label></h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12" id="Container">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="col-md-offset-3 col-md-9">
                                                                <div class="btn-group">
                                                                    <div id="page-selection"></div>
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

                        <%--<div class="panel panel-rose">
        <div class="panel-body">
            <div class="form-group">
                <div id="divPatientTable" style="height: 500px;">
                </div>
            </div>
        </div>
    </div>--%>

                        <div id="modal-AddnewPatient" class="modal" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">
                                            <i class="fa fa-arrow-left"></i>
                                        </button>
                                        <h4 class="modal-title" id="divmodalPatientTitle">إضافة مريض</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-horizontal">
                                            <div class="form-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="panel panel-rose">
                                                            <div class="panel-heading">
                                                                <div class="row">
                                                                    <div class="col-md-4">
                                                                        <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                                                                            السجل الطبي
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="panel-body">
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-2  col-xs-12">الحالة</label>
                                                                    <div class="col-md-4   col-xs-12">
                                                                        <select id="ddlPatientVisitState" name="ddlPatientVisitState" class="form-control" style="width: 100%"></select>
                                                                    </div>
                                                                    <label class="control-label col-md-2   col-xs-12 ">نسبة الاوكسجين</label>
                                                                    <div class="col-md-4   col-xs-12">
                                                                        <input id="txtOxygenLevel" class="form-control input-sm text-center" type="text" />
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label class="control-label col-md-2">التذكرة</label>
                                                                    <div class="col-md-10">
                                                                        <input type="file" class="form-control " id="fuMedicalFile" />
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-2">ملفات طبية</label>
                                                                    <div class="col-md-10">
                                                                        <input type="file" class="form-control " id="AttachFileUrl" multiple />
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-2">جهاز التنفس الصناعي</label>
                                                                    <div class="col-md-10">
                                                                        <input type="checkbox" class="form-control make-switch" data-handle-width="90" id="CkVentilatorNeed" name="VentilatorNeed" data-on-color="danger" data-on-text="يحتاج" data-off-color="success" data-off-text="لا يحتاج" />
                                                                    </div>
                                                                </div>
                                                                <%--  <div class="form-group">
                                                <label class="control-label col-md-2">ملاحظات</label>
                                                <div class="col-md-10">
                                                    <textarea class="form-control" id="txtDescription" rows="5" cols="5"></textarea>
                                                </div>
                                            </div>--%>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="portlet light bordered">
                                                            <div class="portlet-title">
                                                                <div class="col-md-4">
                                                                    <div class="caption font-blue-sharp">
                                                                        <i class="icon-speech font-blue-sharp"></i>
                                                                        <span class="caption-subject bold uppercase">امراض مصاحبه</span>
                                                                    </div>
                                                                </div>
                                                                <%--<div class="col-md-8">
                                                <div class="actions">
                                                    <input id="DiagnoseFilter" class="form-control input-sm" placeholder="بحث عن امراض مصاحبه" />
                                                </div>
                                            </div>--%>
                                                            </div>
                                                            <div class="portlet-body">
                                                                <div class="form-group">
                                                                    <div id="containerDiagnose" style="height: 200px; overflow: auto;">
                                                                        <div id="DiagnoseTree">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="portlet light bordered">
                                                            <div class="portlet-title">
                                                                <div class="col-md-12">
                                                                    <div class="caption font-blue-sharp">
                                                                        <i class="icon-speech font-blue-sharp"></i>
                                                                        <span class="caption-subject bold uppercase">الرعاية الطبية</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="portlet-body">
                                                                <div class="form-group">
                                                                    <div id="containerMedicalCare" style="height: 200px; overflow: auto;">
                                                                        <div id="divMedicalCare">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <div class="panel-footer">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="pull-right">
                                                                            <button type="button" id="btnSavePatient2" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                                                                            <button type="button" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-2">الاسم بالكامل</label>
                                                            <div class="col-md-10">
                                                                <input type="text" class="form-control " id="txtFullName" name="FullName" placeholder="الاسم بالكامل" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label col-md-2">الرقم القومى</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control " id="txtNationalID" name="NationalID" placeholder="الرقم القومى" />
                                                            </div>
                                                            <label class="control-label col-md-2">الرقم التأمينى</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control " id="txtInsuranceNo" name="InsuranceNo" placeholder="الرقم التأمينى" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label col-md-2">رقم التليفون 1</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control " id="txtMobile1" name="Mobile1" placeholder="رقم التليفون 1" />
                                                            </div>
                                                            <label class="control-label col-md-2">رقم التليفون 2</label>
                                                            <div class="col-md-4">
                                                                <input type="text" class="form-control " id="txtMobile2" name="Mobile2" placeholder="رقم التليفون 2" />
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label col-md-2">العمر</label>
                                                            <div class="col-md-4">
                                                                <input type="number" class="form-control" id="txtAge" name="RegistratioDate" />
                                                            </div>
                                                            <label class="control-label col-md-2">الجنس</label>
                                                            <div class="col-md-4">
                                                                <input type="checkbox" class="form-control make-switch" id="CkSex" name="Sex" data-on-color="success" checked="checked" data-on-text="ذكر" data-off-color="danger" data-off-text="أنثى" />
                                                            </div>

                                                        </div>
                                                        <%--<div class="form-group">
                                        <label class="control-label col-md-2">تاريخ الميلاد</label>
                                        <div class="col-md-4">
                                            <div class="input-group date date-picker">
                                                <input type="text" class="form-control" id="txtBirthDate" name="BirthDate" />
                                                <span class="input-group-btn">
                                                    <button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>--%>
                                                        <div class="form-group Hospital" style="display: none;">
                                                            <label class="control-label col-md-2">المستشفى</label>
                                                            <div class="col-md-10">
                                                                <select id="ddlHospital" name="HospitalID" class="form-control" style="width: 100%"></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="panel panel-rose">
                                                            <div class="panel-heading">
                                                                <div class="row">
                                                                    <div class="col-md-4">
                                                                        <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                                                                            بيانات الافارب
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="panel-body">
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="mt-repeater" id="mt-repeater-Relative">
                                                                            <div data-repeater-list="group-a">
                                                                                <div data-repeater-item class="mt-repeater-item">
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            <div class="mt-repeater-input">
                                                                                                <div class="form-group">
                                                                                                    <div class="col-md-12">
                                                                                                        <label class="control-label">صلة القرابة</label>
                                                                                                        <br />
                                                                                                        <select id="ddlRelativeType" data-valid="Relative" name="RelativeTypeID" class="form-control">
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="mt-repeater-input">
                                                                                                <div class="form-group">
                                                                                                    <div class="col-md-12">
                                                                                                        <label class="control-label">الاسم بالكامل</label>
                                                                                                        <br />
                                                                                                        <input type="text" id="txtRelativeFullName" data-valid="Relative" name="FullName" class="form-control" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="mt-repeater-input">
                                                                                                <div class="form-group">
                                                                                                    <div class="col-md-12">
                                                                                                        <label class="control-label">الرقم القومى</label>
                                                                                                        <br />
                                                                                                        <input type="text" id="txtRelativeNationalID" name="NationalID" class="form-control" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            <div class="mt-repeater-input">
                                                                                                <div class="form-group">
                                                                                                    <div class="col-md-12">
                                                                                                        <label class="control-label">رقم التليفون 1</label>
                                                                                                        <br />
                                                                                                        <input type="text" id="txtRelativeMobile1" data-valid="Relative" name="Mobile1" class="form-control" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="mt-repeater-input">
                                                                                                <div class="form-group">
                                                                                                    <div class="col-md-12">
                                                                                                        <label class="control-label">رقم التليفون 2</label>
                                                                                                        <br />
                                                                                                        <input type="text" id="txtRelativeMobile2" name="Mobile2" class="form-control" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div class="mt-repeater-input">
                                                                                                <div class="form-group">
                                                                                                    <div class="col-md-12">
                                                                                                        <a href="javascript:;" data-count="deleterelative" data-repeater-delete class="btn btn-danger mt-repeater-delete">
                                                                                                            <i class="fa fa-close"></i>حذف</a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <div class="col-md-12">
                                                                                    <a href="javascript:;" data-repeater-create class="btn btn-primary mt-repeater-add">
                                                                                        <i class="fa fa-plus"></i>إضافة الاقارب</a>
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
                                    <div class="panel-footer">
                                        <div class="row">
                                            <div class="col-md-3 col-md-offset-9">
                                                <button type="button" id="btnSavePatient" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                                                <button type="button" id="btnCancelPatient" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="modal-actions" class="modal fade" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title"></h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucPatientVisitMedicalRecordSlid runat="server" ID="ucPatientVisitMedicalRecordSlid" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucPatientVisitAttachmentSlid runat="server" ID="ucPatientVisitAttachmentSlid" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucChangeVentilator runat="server" ID="ucChangeVentilator" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucPatientVisitDiagnoseAdd runat="server" ID="ucPatientVisitDiagnoseAdd" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucPatientVisitCareAdd runat="server" ID="ucPatientVisitCareAdd" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="modal-medicalRecord" class="modal fade" role="dialog">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">تحديث ملف طبى</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucPatientVisitMedicalRecord runat="server" ID="ucPatientVisitMedicalRecord" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div id="modal-Attachment" class="modal fade" role="dialog">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">ملحقات طبية</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="co-md-12">
                                                <uc1:ucPatientVisitMedicalRecordAttachment runat="server" ID="ucPatientVisitMedicalRecordAttachment" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <button class="btn btn-primary" id="btnAddNewPatients" style="font-size: 20px; display: block;"><i class="fa fa-plus"></i></button>
                        <a id="btnRefreshPatientList" style="font-size: 20px; display: block; right: 40px; display: none;"><i class="fa fa-refresh"></i></a>

                        <%-- Discharge  Patient Visit --%>
                        <div class="modal fade draggable-modal ui-draggable" id="modal-DischargePatientVisit" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content" style="border-radius: 20px">
                                    <div class="modal-header ui-draggable-handle">
                                        <%--<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>--%>
                                        <h4 class="modal-title drag">خـــــــروج 
                                        </h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-horizontal">
                                            <div class="form-group">
                                                <div class=" col-md-12">
                                                    <div class="portlet light bordered">
                                                        <div class="portlet-body">
                                                            <div class="form-horizontal form-bordered">
                                                                <div class="form-group">
                                                                    <label class="col-md-3 control-label">سبب الخروج</label>
                                                                    <div class="col-md-8">
                                                                        <select id="ddlReason" class="form-control" style="width: 100%"></select>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <div class="col-sm-8 col-md-offset-3">
                                                                        <button type="button" class="btn btn-sm btn-primary" id="btnSaveDischarge"><span class="fa fa-save"></span>حفظ </button>
                                                                        <button type="button" class="btn btn-sm " data-dismiss="modal" id="btnCancelDischarg"><span class="fa fa-times"></span>الغاء </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--    <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-5 pull-right">
                            <button type="button"  class="btn btn-primary btn-sm pull-right"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" class="btn default btn-sm pull-right" data-dismiss="modal"><i class="fa fa-times"></i>الغاء</button>
                        </div>
                    </div>
                </div>--%>
                                </div>
                                <!-- /.modal-content -->
                            </div>
                        </div>

                        <div id="modal-PatientContactRelative" class="modal fade" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">بيانات المريض</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="co-md-12">
                                            <div id="DivPatientRelative"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- END PAGE BASE CONTENT -->
                    </div>
                    <!-- END CONTENT BODY -->
                </div>
                <!-- END CONTENT -->

            </div>
            <!-- END CONTAINER -->
            <!-- BEGIN FOOTER -->
            <div class="page-footer">
                <div class="page-footer-inner">
                    2021 &copy; Frames
       
          <%--  <a target="_blank" href="http://keenthemes.com">Keenthemes</a> &nbsp;|&nbsp;
       
            <a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" title="Purchase Metronic just for 27$ and get lifetime updates for free" target="_blank">Purchase Metronic!</a>--%>
                </div>
                <div class="scroll-to-top">
                    <i class="icon-arrow-up"></i>
                </div>
            </div>
            <!-- END FOOTER -->
            <!--[if lt IE 9]>
                <script src="../assets/global/plugins/respond.min.js"></script>
                <script src="../assets/global/plugins/excanvas.min.js"></script> 
                <script src="../assets/global/plugins/ie8.fix.min.js"></script> 
            <![endif]-->

            <a class="rptReport pull-right btn red btn-xs" style="display: none;" data-fancybox-type="iframe" href="/demo/iframe.html"><i class="fa fa-print"></i>عرض التفاصيل</a>
            <%: Scripts.Render("~/bundles/jquery") %>
            <script src="//maps.google.com/maps/api/js?key=AIzaSyCFZNygS6IirLnxlH0dFIra5LhXLPuLcJw"></script>
            <%--<%: Scripts.Render("~/Scripts/DevExtremeBundle") %>--%>
            <%: Scripts.Render("~/bundles/public") %>
            <%: Scripts.Render("~/bundles/plugin") %>
            <%: Scripts.Render("~/bundles/app") %>
            <%: Scripts.Render("~/bundles/custom") %>
            <%: Scripts.Render("~/bundles/repeater") %>
            <%: Scripts.Render("~/bundles/notification") %>

            <script type="text/javascript">
                $(document).ready(function () {
                    ShowDoctorAttendanceState();
                });
                function ShowDoctorAttendanceState() {
                    $.get(urlRoot + '/api/AttendanceLog/GetLastAttendanceType',
                        function (data) {
                            $("#lblAttendanceState").html(data);
                        });
                }
            </script>


            <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordSlid") %>
            <%: Scripts.Render("~/App/Js/PatientVisitAttachmentSlid") %>
            <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordManagement") %>
            <%: Scripts.Render("~/App/Js/PatientVisitDiagnoseAdd") %>
            <%: Scripts.Render("~/App/Js/PatientVisitCareAdd") %>
            <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordAttachment") %>
            <%--<%: Scripts.Render("~/App/Js/ChangeVentilator") %>
    <%: Scripts.Render("~/App/Js/PatientManagement") %>--%>
            <script src="js/jsucChangeVentilator.js" type="text/javascript"></script>
            <script src="js/jsPatientManagementNew.js" type="text/javascript"></script>
    </form>
</body>
</html>
