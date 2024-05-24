<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalDashboard.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalDashboard" %>

<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitAttachmentSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitAttachmentSlid" %>
<%@ Register Src="~/Forms/us/ucChangeVentilator.ascx" TagPrefix="uc1" TagName="ucChangeVentilator" %>
<%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitCareAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitCareAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">

    <webopt:BundleReference runat="server" Path="~/Css/amcharts" />
    <style>
        #chartdiv, #chartdiv2, #chartdiv3, #chartdiv4 {
            width: 100%;
            height: 550px;
        }

        .table {
            font-weight: bold !important;
        }

            .table .thead-dark th {
                color: #fff;
                background-color: #212529;
                border-color: #32383e;
            }

        .dashboard-stat .details .number {
            padding-top: 25px;
            text-align: left;
            font-size: 16px;
            line-height: 36px;
            letter-spacing: -1px;
            margin-bottom: 0;
            font-weight: 600;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">إجمالى المرضي الحاليين</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">

                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 650px;">
                    <div class="col-md-12">
                        <table class="table thead-dark" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblPatientVisitOnBedCount1" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R1">المرضي على الاسرة 0 </a></th>
                                    <th><a id="lblPatientVisitWaitingCount1" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R2">قائمة الإنتظار 0</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div id="chartdiv" style="height: 400px;" dir="rtl"></div>
                    </div>
                    <div class="col-md-12">
                        <table class="table" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblPatientVisitOnBedCount2" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R1">المرضي على الاسرة 0 </a></th>
                                    <th><a id="lblPatientVisitWaitingCount2" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R2">قائمة الإنتظار 0</a></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="color: #b73377"><span id="lblPatientVisitOnBedWithVentilatorCount">يستخدم جهاز تنفس 0</span></td>
                                    <td style="color: #31d81d"><span id="lblPatientVisitWaitingWithVentilatorCount">يحتاج جهاز تنفس 0</span></td>
                                </tr>
                                <tr>
                                    <td style="color: #2da9d9"><span id="lblPatientVisitOnBedWithoutVentilatorCount">لا يستخدم جهاز تنفس 0</span></td>

                                    <td style="color: #d8731d"><span id="lblPatientVisitWaitingWithoutVentilatorCount">لا يحتاج جهاز تنفس 0</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">إجمالى الأسرة</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">

                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 650px;">
                    <div class="col-md-12">
                        <table class="table thead-dark" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblBedOccupiedCount" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R3">المشغولة 0</a></th>
                                    <th style="color: #31d81d;"><a id="lblBedEmptyCount" href="#" data-toggle="modal" style="color: #31d81d; text-decoration: none" data-target="#R4">المتاحة 0 </a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div id="chartdiv2" style="height: 400px;" dir="rtl"></div>
                    </div>
                    <div class="col-md-12">
                        <table class="table" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblBedMaintenanceCount" href="#" data-toggle="modal" style="font-weight: bold; color: red" data-target="#R7">الصيانة 0</a></th>
                                    <th><a id="lblBedMaintenanceCost" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R7">التكلفة التقديرية 00,000 الف</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">إجمالى اجهزة التنفس</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">
                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 650px;">
                    <div class="col-md-12">
                        <table class="table thead-dark" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th style="color: #31d81d;"><a id="lblVentilatorOccupiedCount" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R5">المشغولة 0</a></th>
                                    <th style="color: #31d81d;"><a id="lblVentilatorEmptyCount" href="#" data-toggle="modal" style="color: #31d81d; text-decoration: none" data-target="#R6">المتاح 0 </a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div id="chartdiv3" style="height: 400px;" dir="rtl"></div>
                    </div>
                    <div class="col-md-12">
                        <table class="table" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblVentilatorMaintenanceCount" href="#" data-toggle="modal" style="font-weight: bold; color: red" data-target="#R8">الصيانة 0</a></th>
                                    <th><a id="lblVentilatorMaintenanceCost" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R8">التكلفة التقديرية 00,000 الف</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">مخزون الأكسجين</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">
                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 435px;">
                    <div id="chartdiv4" style="height: 350px;"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">أطـباء المستشفى</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">
                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 435px;">
                    <div id="gridContainer"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a class="dashboard-stat dashboard-stat-v2 blue" id="btnMissedPatientDoctorTransactionCount">
                    <div class="visual">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="details">
                        <div class="number">
                            <div data-counter="counterup" data-value="4">
                                <span id="lblMissedPatientDoctorTransactionCount" data-toggle="modal" style="color: white; text-decoration: none">0</span>
                            </div>
                        </div>
                        <div class="desc">متأخرات المرور </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a class="dashboard-stat dashboard-stat-v2 blue" id="btnMissedPatientInformationRecordCount">
                    <div class="visual">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="details">
                        <div class="number">
                            <div data-counter="counterup" data-value="3">
                                <span id="lblMissedPatientInformationRecordCount" data-toggle="modal" style="color: white; text-decoration: none">0</span>
                            </div>
                        </div>
                        <div class="desc">متأخرات البيانات </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a class="dashboard-stat dashboard-stat-v2 red" id="btnMinICUPatientTime">
                    <div class="visual">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="details">
                        <div class="number">
                            <div data-counter="counterup" data-value="14">
                                <span id="lblMinICUPatientTime" data-toggle="modal" style="color: white; text-decoration: none">0 يوم</span>
                            </div>
                        </div>
                        <div class="desc">أقـدم حالة رعـاية </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a class="dashboard-stat dashboard-stat-v2 green" id="btnMaxICUPatientTime">
                    <div class="visual">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="details">
                        <div class="number">
                            <div data-counter="counterup" data-value="3">
                                <span id="lblMaxICUPatientTime" data-toggle="modal" style="color: white; text-decoration: none">0 ساعة</span>
                            </div>
                        </div>
                        <div class="desc">أحـدث حالة رعـاية </div>
                    </div>
                </a>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a class="dashboard-stat dashboard-stat-v2 purple" id="btnMinWaitingPatientTime">
                    <div class="visual">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="details">
                        <div class="number">
                            <div data-counter="counterup" data-value="18">
                                <span id="lblMinWaitingPatientTime" data-toggle="modal" style="color: white; text-decoration: none">0 ساعة</span>
                            </div>
                        </div>
                        <div class="desc">أقــدم قائمة الإنتظار </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <a class="dashboard-stat dashboard-stat-v2 purple" id="btnMaxWaitingPatientTime">
                    <div class="visual">
                        <i class="fa fa-comments"></i>
                    </div>
                    <div class="details">
                        <div class="number">
                            <div data-counter="counterup" data-value="2">
                                <span id="lblMaxWaitingPatientTime" data-toggle="modal" style="color: white; text-decoration: none">0 ساعة</span>
                            </div>
                        </div>
                        <div class="desc">أحـدث قائمة الإنتظار </div>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="R1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">المرضى على الأسرة</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="ICUPatientTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">قائمة الانتظار </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="WaitingPatientTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الاسرة المشغوله </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalBedInUseTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">عدد الاسره المتاحه </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalBedAvailableTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الأجهزة المشغولة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="VentilatorOccupiedTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R6" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الأجهزة المتاحة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="VentilatorAvailableTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R7" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">أسرة الصيانة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalBedMaintenanceTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R8" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الأجهزة بالصيانة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalVentilatorMaintenanceTable"></div>
                </div>
            </div>
        </div>
    </div>



    <div class="modal fade" id="R9" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">متأخــرات المــرور </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="MissedPatientDoctorTransactionTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R10" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">متأخــرات البيانات </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="MissedPatientInformationRecordTable"></div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="pnlPatientProfile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="lblPatientProfileTitle">أقـدم حـالة رعـاية</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <h4 class="modal-title" id="divmodalPatientTitle">عرض بيانات مريض</h4>
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
                                            </div>
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

                                                    <div class="row">
                                                        <div class="co-md-12">
                                                            <div id="DivPatientRelative"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/Script/amcharts") %>

    <script type="text/javascript">
        var HospitalId = (new URL(location.href)).searchParams.get('HospitalID');

        $('#btnMissedPatientDoctorTransactionCount').click(function () {
            $('#lblPatientProfileTitle').html('متأخــرات المـــرور');
            $('#R9').modal('show');
            BindMissedPatientDoctorTransactionTable();
        });

        $('#btnMissedPatientInformationRecordCount').click(function () {
            $('#lblPatientProfileTitle').html('متأخــرات بيانات المرضى');
            $('#R10').modal('show');
            BindMissedPatientInformationRecordTable();
        })

        $('#btnMaxICUPatientTime').click(function () {
            $('#lblPatientProfileTitle').html('احــدث حــالة رعــاية');
            var PatientID = $('#lblMaxICUPatientTime').data("patientid");
            var PatientVisitID = $('#lblMaxICUPatientTime').data("patientvisitid");
            ShowPatientData(PatientID, PatientVisitID);
            $('#pnlPatientProfile').modal('show');
        })

        $('#btnMinICUPatientTime').click(function () {
            $('#lblPatientProfileTitle').html('اقـدم حــالة رعـاية');
            var PatientID = $('#lblMinICUPatientTime').data("patientid");
            var PatientVisitID = $('#lblMinICUPatientTime').data("patientvisitid");
            ShowPatientData(PatientID, PatientVisitID);
            $('#pnlPatientProfile').modal('show');
        })

        $('#btnMaxWaitingPatientTime').click(function () {
            $('#lblPatientProfileTitle').html('احـدث حـالة انتظـار');
            var PatientID = $('#lblMaxWaitingPatientTime').data("patientid");
            var PatientVisitID = $('#lblMaxWaitingPatientTime').data("patientvisitid");
            ShowPatientData(PatientID, PatientVisitID);
            $('#pnlPatientProfile').modal('show');
        })

        $('#btnMinWaitingPatientTime').click(function () {
            $('#lblPatientProfileTitle').html('اقـدم حـالة انتظـار');
            var PatientID = $('#lblMinWaitingPatientTime').data("patientid");
            var PatientVisitID = $('#lblMinWaitingPatientTime').data("patientvisitid");
            ShowPatientData(PatientID, PatientVisitID);
            $('#pnlPatientProfile').modal('show');
        })


        function BindMissedPatientDoctorTransactionTable() {
            var ID = HospitalId;
            $("#MissedPatientDoctorTransactionTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "PatientVisitID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MissedPatientDoctorTransactionList/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "اسم المريض",
                        dataField: "FullName",
                        width: 150
                    }, {
                        caption: "العمر",
                        dataField: "Age"
                    },
                    {
                        caption: "المحمول",
                        dataField: "Mobile"
                    },
                    {
                        caption: "النوع",
                        dataField: "Sex"
                    },
                    {
                        caption: "تاريخ الدخول",
                        dataField: "RegistrationDate"
                    },
                    {
                        caption: "تنفس صناعي",
                        dataField: "IsVentilatorNeeded"
                    },
                    {
                        caption: "OxygenLevel",
                        dataField: "OxygenLevel"
                    },
                    {
                        caption: "التشخيص",
                        dataField: "Diagnose"
                    },
                    {
                        caption: "الرعاية",
                        dataField: "MedicalCare"
                    }
                ],
            });
        };

        function BindMissedPatientInformationRecordTable() {
            var ID = HospitalId;
            $("#MissedPatientInformationRecordTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "PatientVisitID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MissedPatientInformationRecordList/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "اسم المريض",
                        dataField: "FullName",
                        width: 150
                    }, {
                        caption: "العمر",
                        dataField: "Age"
                    },
                    {
                        caption: "المحمول",
                        dataField: "Mobile"
                    },
                    {
                        caption: "النوع",
                        dataField: "Sex"
                    },
                    {
                        caption: "تاريخ الدخول",
                        dataField: "RegistrationDate"
                    },
                    {
                        caption: "تنفس صناعي",
                        dataField: "IsVentilatorNeeded"
                    },
                    {
                        caption: "OxygenLevel",
                        dataField: "OxygenLevel"
                    },
                    {
                        caption: "التشخيص",
                        dataField: "Diagnose"
                    },
                    {
                        caption: "الرعاية",
                        dataField: "MedicalCare"
                    }
                ],
            });
        };
        $(function () {

            $("#ICUPatientTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardICUPatientTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "المرضى",
                        dataField: "HospitalICUPatientCount"
                    },
                    {
                        caption: "Brain Stroke",
                        dataField: "BrainStroke",
                        dataType: "number"
                    },
                    {
                        caption: "CKD",
                        dataField: "CKD",
                        dataType: "number"
                    },
                    {
                        caption: "Covid-19",
                        dataField: "Covid19",
                        dataType: "number"
                    },
                    {
                        caption: "DM",
                        dataField: "DM",
                        dataType: "number"
                    },
                    {
                        caption: "HTN",
                        dataField: "HTN",
                        dataType: "number"
                    },
                    {
                        caption: "IHD",
                        dataField: "IHD",
                        dataType: "number"
                    },
                    {
                        caption: "Liver Cirrhosis",
                        dataField: "LiverCirrhosis",
                        dataType: "number"
                    },
                    {
                        caption: "Septic Shock",
                        dataField: "SepticShock",
                        dataType: "number"
                    },
                    {
                        caption: "Surgical Condition",
                        dataField: "SurgicalCondition",
                        dataType: "number"
                    },
                    {
                        caption: "TRUMA",
                        dataField: "TRUMA",
                        dataType: "number"
                    }
                ],
            });

            $("#WaitingPatientTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardWaitingPatientTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "المرضى",
                        dataField: "HospitalICUPatientCount"
                    },
                    {
                        caption: "Brain Stroke",
                        dataField: "BrainStroke",
                        dataType: "number"
                    },
                    {
                        caption: "CKD",
                        dataField: "CKD",
                        dataType: "number"
                    },
                    {
                        caption: "Covid-19",
                        dataField: "Covid19",
                        dataType: "number"
                    },
                    {
                        caption: "DM",
                        dataField: "DM",
                        dataType: "number"
                    },
                    {
                        caption: "HTN",
                        dataField: "HTN",
                        dataType: "number"
                    },
                    {
                        caption: "IHD",
                        dataField: "IHD",
                        dataType: "number"
                    },
                    {
                        caption: "Liver Cirrhosis",
                        dataField: "LiverCirrhosis",
                        dataType: "number"
                    },
                    {
                        caption: "Septic Shock",
                        dataField: "SepticShock",
                        dataType: "number"
                    },
                    {
                        caption: "Surgical Condition",
                        dataField: "SurgicalCondition",
                        dataType: "number"
                    },
                    {
                        caption: "TRUMA",
                        dataField: "TRUMA",
                        dataType: "number"
                    }
                ],
            });

            $("#HospitalBedInUseTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalBedInUseTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "الأسـرة",
                        dataField: "HospitalBedCount"
                    },
                    {
                        caption: "رعاية جراحة",
                        dataField: "Re3ayaGera7a",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "Mo5wA3sab",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية قلبية",
                        dataField: "Re3ayaKalbeya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية صدرية",
                        dataField: "Re3ayaSadrya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية باطنة",
                        dataField: "Re3ayaBatna",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية مبتسرين",
                        dataField: "Re3ayaMobtsren",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية اطفال",
                        dataField: "Re3ayaKids",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية حوادث",
                        dataField: "Re3ayaAccedent",
                        dataType: "number"
                    }
                ],
            });

            $("#HospitalBedAvailableTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalBedAvailableTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "الأسـرة",
                        dataField: "HospitalBedCount"
                    },
                    {
                        caption: "رعاية جراحة",
                        dataField: "Re3ayaGera7a",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "Mo5wA3sab",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية قلبية",
                        dataField: "Re3ayaKalbeya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية صدرية",
                        dataField: "Re3ayaSadrya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية باطنة",
                        dataField: "Re3ayaBatna",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية مبتسرين",
                        dataField: "Re3ayaMobtsren",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية اطفال",
                        dataField: "Re3ayaKids",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية حوادث",
                        dataField: "Re3ayaAccedent",
                        dataType: "number"
                    }
                ],
            });

            $("#VentilatorOccupiedTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalVentilatorInUseTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Code",
                        dataField: "HospitalID",
                        width: 150
                    }, {
                        caption: "المستشفى",
                        dataField: "HospitalName"
                    },
                    {
                        caption: "عدد الأجهزة",
                        dataField: "HospitalVentilatorCount",
                        dataType: "number"
                    }
                ],
            });

            $("#VentilatorAvailableTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalVentilatorAvailableTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Code",
                        dataField: "HospitalID",
                        width: 150
                    }, {
                        caption: "المستشفى",
                        dataField: "HospitalName"
                    },
                    {
                        caption: "عدد الأجهزة",
                        dataField: "HospitalVentilatorCount",
                        dataType: "number"
                    }
                ],
            });

            $("#HospitalBedMaintenanceTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalBedID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalBedMaintenanceTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Hospital Name",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "Bed No",
                        dataField: "HospitalBedNo"
                    },
                    {
                        caption: "Room No",
                        dataField: "HospitalRoomNo",
                        dataType: "number"
                    }, {
                        caption: "State",
                        dataField: "HospitalBedStateTitle"
                    }, {
                        caption: "Maintenance Cost",
                        dataField: "HospitalEquipmentCost"
                    }
                ],
            });

            $("#HospitalVentilatorMaintenanceTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalVentilatorID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalVentilatorMaintenanceTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Hospital Name",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "Ventilator No",
                        dataField: "VentilatorNo"
                    },
                    {
                        caption: "Serial No",
                        dataField: "VentilatorSerialNo",
                        dataType: "number"
                    }, {
                        caption: "State",
                        dataField: "HospitalVentilatorStateTitle"
                    }, {
                        caption: "Maintenance Cost",
                        dataField: "HospitalEquipmentCost"
                    }
                ],
            });
        });

        function BindAllDashboard() {
            var ID = HospitalId;
            $.get(urlRoot + '/api/HospitalDashboard/GetDashboardData/' + ID, function (respnose) {
                BindHospitalsPatient(respnose.AllPatientVisitTotalCount, respnose.PatientVisitTotalCount,
                    respnose.PatientVisitOnBedCount, respnose.PatientVisitOnBedWithVentilatorCount, respnose.PatientVisitOnBedWithoutVentilatorCount,
                    respnose.PatientVisitWaitingCount, respnose.PatientVisitWaitingWithVentilatorCount, respnose.PatientVisitWaitingWithoutVentilatorCount,
                    respnose.PatientVisitOutBedCount, respnose.PatientVisitOutBedWithVentilatorCount, respnose.PatientVisitOutBedWithoutVentilatorCount);

                BindHospitalsBeds(respnose.BedTotalCount, respnose.BedEmptyCount, respnose.BedOccupiedCount, respnose.BedReadyCount,
                    respnose.BedMaintenanceCount, respnose.BedMaintenanceCost);


                BindHospitalsVentilator(respnose.VentilatorTotalCount, respnose.VentilatorEmptyCount, respnose.VentilatorOccupiedCount,
                    respnose.VentilatorReadyCount, respnose.VentilatorMaintenanceCount, respnose.VentilatorMaintenanceCost);

                BindHospitalsOxogen(JSON.parse(respnose.OxygenJsonRate));
            })
        };
        function BindHospitalDashboard() {
            var ID = HospitalId;
            $.get(urlRoot + '/api/HospitalDashboard/GetHospitalDashboardData/' + ID, function (respnose) {
                BindHospitalDashboardDetails(respnose.MissedPatientInformationRecordCount,
                    respnose.MissedPatientDoctorTransactionCount,
                    respnose.MinICUPatientID,
                    respnose.MinICUPatientVisitID,
                    respnose.MinICUPatientTime,
                    respnose.LatestICUPatientPeriod,
                    respnose.MaxICUPatientID,
                    respnose.MaxICUPatientVisitID,
                    respnose.MaxICUPatientTime,
                    respnose.OldestICUPatientPeriod,
                    respnose.MinWaitingPatientID,
                    respnose.MinWaitingPatientVisitID,
                    respnose.MinWaitingPatientTime,
                    respnose.LatestWaitingPatientPeriod,
                    respnose.MaxWaitingPatientID,
                    respnose.MaxWaitingPatientVisitID,
                    respnose.MaxWaitingPatientTime,
                    respnose.OldestWaitingPatientPeriod);
            })
        };

        function BindHospitalDashboardDetails(MissedPatientInformationRecordCount, MissedPatientDoctorTransactionCount,
            MinICUPatientID, MinICUPatientVisitID, MinICUPatientTime, LatestICUPatientPeriod, MaxICUPatientID, MaxICUPatientVisitID, MaxICUPatientTime, OldestICUPatientPeriod,
            MinWaitingPatientID, MinWaitingPatientVisitID, MinWaitingPatientTime, LatestWaitingPatientPeriod, MaxWaitingPatientID,
            MaxWaitingPatientVisitID, MaxWaitingPatientTime, OldestWaitingPatientPeriod) {
            $('#lblMissedPatientDoctorTransactionCount').text(MissedPatientDoctorTransactionCount);
            $('#lblMissedPatientInformationRecordCount').text(MissedPatientInformationRecordCount);

            $('#lblMaxICUPatientTime').text(FormatDate(MaxICUPatientTime));
            $('#lblMaxICUPatientTime').data("patientid", MaxICUPatientID);
            $('#lblMaxICUPatientTime').data("patientvisitid", MaxICUPatientVisitID);


            $('#lblMinICUPatientTime').text(FormatDate(MinICUPatientTime));
            $('#lblMinICUPatientTime').data("patientid", MinICUPatientID);
            $('#lblMinICUPatientTime').data("patientvisitid", MinICUPatientVisitID);

            $('#lblMaxWaitingPatientTime').text(FormatDate(MaxWaitingPatientTime));
            $('#lblMaxWaitingPatientTime').data("patientid", MaxWaitingPatientID);
            $('#lblMaxWaitingPatientTime').data("patientvisitid", MaxWaitingPatientVisitID);

            $('#lblMinWaitingPatientTime').text(FormatDate(MinWaitingPatientTime));
            $('#lblMinWaitingPatientTime').data("patientid", MinWaitingPatientID);
            $('#lblMinWaitingPatientTime').data("patientvisitid", MinWaitingPatientVisitID);
        }

        function BindHospitalDoctors() {
            var ID = HospitalId;
            $("#gridContainer").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "UserId",
                    loadUrl: urlRoot + "/api/HospitalDashboard/HospitalDashboardDoctorTable/" + HospitalId,
                }),
                showBorders: true,
                rtlEnabled: true,
                columns: [
                    {
                        caption: "Doctor Name",
                        dataField: "UserFullName",
                    }, {
                        caption: "الوظيفة",
                        dataField: "JobTitle",
                    },
                    {
                        caption: "الموبيل",
                        dataField: "Mobile",

                    }, {
                        caption: "الحالة",
                        dataField: "AttendanceState",
                        width: 40,
                        cellTemplate: function (container, options) {
                            var html = (options.value == "Yes" ? '<i class="fa fa-check font-green"></i>' : '<i class="fa fa-times font-red"></i>')
                            $("<div>")
                                .append(html)
                                .appendTo(container);
                        }
                    }
                ]
            });
        };

        $(document).ready(function () {
            BindAllDashboard();
            BindHospitalDoctors();
            BindHospitalDashboard();
        });

        // Create chart instance
        function BindHospitalsPatient(AllPatientVisitTotalCount, PatientVisitTotalCount, PatientVisitOnBedCount, PatientVisitOnBedWithVentilatorCount, PatientVisitOnBedWithoutVentilatorCount,
            PatientVisitWaitingCount, PatientVisitWaitingWithVentilatorCount, PatientVisitWaitingWithoutVentilatorCount,
            PatientVisitOutBedCount, PatientVisitOutBedWithVentilatorCount, PatientVisitOutBedWithoutVentilatorCount) {
            $('#lblPatientVisitOnBedCount1').text('المرضي على الاسرة ' + PatientVisitOnBedCount);
            $('#lblPatientVisitOnBedCount2').text('المرضي على الاسرة ' + PatientVisitOnBedCount);

            $('#lblPatientVisitWaitingCount1').text('قائمة الإنتظار ' + PatientVisitWaitingCount);
            $('#lblPatientVisitWaitingCount2').text('قائمة الإنتظار ' + PatientVisitWaitingCount);

            $('#lblPatientVisitOnBedWithVentilatorCount').text('يستخدم تنفس صناعي ' + PatientVisitOnBedWithVentilatorCount);
            $('#lblPatientVisitOnBedWithoutVentilatorCount').text('لا يستخدم تنفس صناعي ' + PatientVisitOnBedWithoutVentilatorCount);

            $('#lblPatientVisitWaitingWithVentilatorCount').text('يحتاج تنفس صناعي ' + PatientVisitWaitingWithVentilatorCount);
            $('#lblPatientVisitWaitingWithoutVentilatorCount').text('لا يحتاج تنفس صناعي ' + PatientVisitWaitingWithoutVentilatorCount);


            // am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            chart.rtl = true;
            // Let's cut a hole in our Pie chart the size of 40% the radius
            chart.innerRadius = am4core.percent(30);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.innerRadius = 10;
            pieSeries.slices.template.fillOpacity = 0.4;

            pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
            pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
            pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
            // pieSeries.slices.template.propertyFields.fill = "color";
            //pieSeries2.labels.template.fontSize = 20;
            pieSeries.labels.template.text = "{category}: {value}";
            pieSeries.slices.template.tooltipText = "{category}: {value}";
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;


            // Add data
            pieSeries.data = [{
                "category": "قائمة الإنتظار",
                "value": PatientVisitWaitingCount,//data.pieSeries.TotalWaiting,
                "fill": "#2da9d9"
            }, {
                "category": "المرضي على الاسرة",
                "value": PatientVisitOnBedCount,//data.pieSeries.TotalRegister,
                "fill": "#8b8b8c",
                //"labelDisabled": true
            }];

            // Disable sliding out of slices
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries.slices.template.propertyFields.fill = "fill";
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
            // Add second series
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "value";
            pieSeries2.dataFields.category = "category";
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries2.slices.template.propertyFields.fill = "fill";

            pieSeries2.labels.template.text = "{category}: {value}";
            pieSeries2.slices.template.tooltipText = "{category}: {value}";


            pieSeries2.ticks.template.disabled = true;
            pieSeries2.labels.template.disabled = true;


            pieSeries2.data = [
                {
                    "category": "يحتاج جهاز تنفس",
                    "value": PatientVisitWaitingWithVentilatorCount,//data.pieSeries2.TotalWaitingVentilatorNeeded,
                    "fill": "#31d81d"
                }, {
                    "category": "لا يحتاج جهاز تنفس",
                    "value": PatientVisitWaitingWithoutVentilatorCount,// data.pieSeries2.TotalWaitingVentilatorNotNeeded,
                    'fill': "#d8731d"
                }, {
                    "category": "يستخدم جهاز تنفس",
                    "value": PatientVisitOnBedWithVentilatorCount,//data.pieSeries2.TotalRegisterPatientVentilatorNeeded,
                    "fill": "#b73377"
                }, {
                    "category": "لا يستخدم جهاز تنفس",
                    "value": PatientVisitOnBedWithoutVentilatorCount, // data.pieSeries2.TotalRegisterPatientVentilatorNotNeeded,
                    "fill": "#2da9d9"
                },];


            pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(40);
            })

            pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(60);
            })

            pieSeries.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(100);
            })

            pieSeries2.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(80);
            })
            var label = chart.seriesContainer.createChild(am4core.Label);
            //label.html = '<div style="color:#902c2d !important">' + (data.pieSeries.TotalWaiting + data.pieSeries.TotalRegister) + '</div>';

            label.html = '<div style="color:#902c2d !important">' + PatientVisitTotalCount + ' مريض</div>';
            label.horizontalCenter = "middle";
            label.textAlign = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 20;
        }

        function BindHospitalsBeds(BedTotalCount,
            BedEmptyCount,
            BedOccupiedCount,
            BedReadyCount,
            BedMaintenanceCount,
            BedMaintenanceCost) {

            $('#lblBedEmptyCount').text('الأسرة المتاحة ' + BedReadyCount);
            $('#lblBedOccupiedCount').text('الأسرة المشغولة ' + BedOccupiedCount);

            $('#lblBedMaintenanceCount').text('اجهزة الصيانة ' + BedMaintenanceCount);
            $('#lblBedMaintenanceCost').text('تكاليف الصيانة ' + BedMaintenanceCost);

            // am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv2", am4charts.PieChart);
            chart.rtl = true;
            // Let's cut a hole in our Pie chart the size of 40% the radius
            chart.innerRadius = am4core.percent(30);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.innerRadius = 10;
            pieSeries.slices.template.fillOpacity = 0.4;

            pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
            pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
            pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
            // pieSeries.slices.template.propertyFields.fill = "color";
            //pieSeries2.labels.template.fontSize = 20;
            pieSeries.labels.template.text = "{category}: {value}";
            pieSeries.slices.template.tooltipText = "{category}: {value}";
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;

            // Add data
            pieSeries.data = [{
                "category": "عدد الاسرة",
                "value": BedEmptyCount,
                "labelDisabled": true
            }, {
                "category": "المشغولة",
                "value": BedOccupiedCount,
            }];

            // Disable sliding out of slices
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries.slices.template.propertyFields.fill = "fill";
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
            // Add second series
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "value";
            pieSeries2.dataFields.category = "category";
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries2.slices.template.propertyFields.fill = "fill";

            pieSeries2.labels.template.text = "{category}: {value}";
            pieSeries2.slices.template.tooltipText = "{category}: {value}";


            pieSeries2.ticks.template.disabled = true;
            pieSeries2.labels.template.disabled = true;

            // Add data
            pieSeries2.data = [
                {
                    "category": "تعمل",
                    "value": BedReadyCount,
                    "fill": "#31d81d"

                }, {
                    "category": "صيانة",
                    "value": BedMaintenanceCount,
                    "fill": "#ff0000"
                }, {
                    "category": "المشغولة",
                    "value": BedOccupiedCount,
                    "fill": "#2da9d9"
                },];


            pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(40);
            })

            pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(60);
            })

            pieSeries.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(100);
            })

            pieSeries2.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(80);
            })
            var label = chart.seriesContainer.createChild(am4core.Label);
            //label.html = '<div style="color:#902c2d !important">' + (data.pieSeries.TotalWaiting + data.pieSeries.TotalRegister) + '</div>';

            label.html = '<div style="color:#902c2d !important">' + BedTotalCount + ' سرير</div>';
            label.horizontalCenter = "middle";
            label.textAlign = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 20;
        }

        function BindHospitalsVentilator(VentilatorTotalCount, VentilatorEmptyCount, VentilatorOccupiedCount,
            VentilatorReadyCount, VentilatorMaintenanceCount, VentilatorMaintenanceCost) {

            $('#lblVentilatorEmptyCount').text('الاجهزة المتاحة ' + VentilatorReadyCount);
            $('#lblVentilatorOccupiedCount').text('الاجهزة المشغولة ' + VentilatorOccupiedCount);

            $('#lblVentilatorMaintenanceCount').text('أجهزة الصيانة ' + VentilatorMaintenanceCount);
            $('#lblVentilatorMaintenanceCost').text('تكاليف الصيانة ' + VentilatorMaintenanceCost);

            // am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv3", am4charts.PieChart);
            chart.rtl = true;
            // Let's cut a hole in our Pie chart the size of 40% the radius
            chart.innerRadius = am4core.percent(30);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.innerRadius = 10;
            pieSeries.slices.template.fillOpacity = 0.4;

            pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
            pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
            pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
            // pieSeries.slices.template.propertyFields.fill = "color";
            //pieSeries2.labels.template.fontSize = 20;
            pieSeries.labels.template.text = "{category}: {value}";
            pieSeries.slices.template.tooltipText = "{category}: {value}";
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;

            // Add data
            pieSeries.data = [{
                "category": "عدد الاجهزة",
                "value": VentilatorEmptyCount,
                "labelDisabled": true
            }, {
                "category": "المشغول",
                "value": VentilatorOccupiedCount,
            }];

            // Disable sliding out of slices
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries.slices.template.propertyFields.fill = "fill";
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
            // Add second series
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "value";
            pieSeries2.dataFields.category = "category";
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries2.slices.template.propertyFields.fill = "fill";

            pieSeries2.labels.template.text = "{category}: {value}";
            pieSeries2.slices.template.tooltipText = "{category}: {value}";


            pieSeries2.ticks.template.disabled = true;
            pieSeries2.labels.template.disabled = true;
            // Add data
            pieSeries2.data = [
                {
                    "category": "يعمل",
                    "value": VentilatorReadyCount,
                    "fill": "#31d81d"

                }, {
                    "category": "صيانة",
                    "value": VentilatorMaintenanceCount,

                    "fill": "#f00"
                }, {
                    "category": "المشغول",
                    "value": VentilatorOccupiedCount,
                    "fill": "#045d80"
                },];



            pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(40);
            })

            pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(60);
            })

            pieSeries.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(100);
            })

            pieSeries2.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(80);
            })
            var label = chart.seriesContainer.createChild(am4core.Label);
            //label.html = '<div style="color:#902c2d !important">' + (data.pieSeries.TotalWaiting + data.pieSeries.TotalRegister) + '</div>';

            label.html = '<div style="color:#902c2d !important">' + VentilatorTotalCount + ' جهاز</div>';
            label.horizontalCenter = "middle";
            label.textAlign = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 20;
        }

        function BindHospitalsOxogen(data) {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv4", am4charts.XYChart3D);
            chart.rtl = true;
            var titledata = 0;
            $.map(data, function (n, i) {
                return titledata += n.value2
            });
            var title = chart.titles.create();
            title.text = 'إجمالى استهلاك الاكسجين ' + titledata + ' لتر'
            title.fontSize = 20;
            title.marginBottom = 20;
            // Add chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";
            // Legend
            //chart.legend = new am4charts.Legend();
            //chart.legend.fontSize = 12;
            //chart.legend.position = "right";
            //chart.legend.valign = "top";
            //chart.legend.marginTop = 0;
            //chart.legend.labels.template.width = 130;
            //chart.legend.labels.template.truncate = true;
            //chart.legend.valueLabels.template.text = "{category}"
            //chart.legend.valueLabels.template.fontSize = 12;
            // Add data'
            chart.data = data;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Name";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.grid.template.strokeOpacity = 0;
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;
            //categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            //categoryAxis.renderer.labels.template.rotation = 280;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;



            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.strictMinMax = false;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.title.fontWeight = "bold";

            // Create series
            var series1 = chart.series.push(new am4charts.ConeSeries());
            series1.dataFields.valueY = "value1";
            series1.dataFields.categoryX = "Name";
            series1.columns.template.width = am4core.percent(80);
            series1.columns.template.fillOpacity = 0.9;
            series1.columns.template.strokeOpacity = 1;
            series1.columns.template.strokeWidth = 2;
            series1.tooltipText = "{categoryX}: [bold]{valueY}[/] لتر ";

            var categoryLabel = series1.bullets.push(new am4charts.LabelBullet());
            categoryLabel.label.text = "{day} يوم";
            // categoryLabel.label.horizontalCenter = "top";
            categoryLabel.label.dy = -20;
            categoryLabel.label.fill = am4core.color("#000");
            categoryLabel.label.hideOversized = false;
            categoryLabel.label.truncate = false;


            var series2 = chart.series.push(new am4charts.ConeSeries());
            series2.dataFields.valueY = "value2";
            series2.dataFields.categoryX = "Name";
            series2.stacked = true;
            series2.columns.template.width = am4core.percent(80);
            series2.columns.template.fill = am4core.color("#000");
            series2.columns.template.fillOpacity = 0.1;
            series2.columns.template.stroke = am4core.color("#000");
            series2.columns.template.strokeOpacity = 0.2;
            series2.columns.template.strokeWidth = 2;
            series2.tooltipText = "{categoryX}: [bold]{valueY}[/]  لتر ";
        }

        function ShowPatientData(PatientID, PatientVisitID) {
            GetPatientVisitRelative(PatientID);
            DisplayMedicalFile(PatientVisitID);
            DisplayStandardPatientData(PatientID);

            GetPatientVisitMedicalRecord(PatientVisitID);
            GetPatientVisitAttachment(PatientVisitID);
            GetPatientVisitDiagnose(PatientVisitID);
            GetPatientVisitCare(PatientVisitID);
            FirstTimeCountValidVen = 0;
            FirstTimeCountValidVenNeed = 0;
            if ($(this).data("isicu") === 1) IsICU = true;
            else IsICU = false;

            $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', false);
            $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", false);

            var patientVisitDetail = CustomAjax(urlRoot + "/api/PatientManagement/GetPatientVisitInfo/" + PatientVisitID, '', 'GET');
            if (patientVisitDetail != null) {
                //$("#CkEditVentilatorNeed").bootstrapSwitch('state', patientVisitDetail.IsVentilatorNeeded);
                //if (patientVisitDetail.IsRegisted && !patientVisitDetail.IsCanceled) {
                //    PatientVisitResidenceID = patientVisitDetail.LastPatientVisitResidenceID;
                //    HospitalVentilatorID = patientVisitDetail.HospitalVentilatorID;
                //    if (patientVisitDetail.IsVentilatorNeeded) {
                //        drowDropdownListSelect2($("#ddlEditHospitalVentilatorID"), urlRoot + "/api/PatientVisitResidence/GetPatientVentilator/" + patientVisitDetail.HospitalVentilatorID, "", "GET", "اختر جهاز التنفس للمريض");
                //        $("#ddlEditHospitalVentilatorID").val(patientVisitDetail.HospitalVentilatorID).trigger("change");
                //        $(".DivEditVentilatorResidence").show();
                //    }
                //} else {
                //    PatientVisitResidenceID = null;
                //    HospitalVentilatorID = null;
                //    $("#ddlEditHospitalVentilatorID").val("").trigger("change");
                //    $(".DivEditVentilatorResidence").hide();
                //}
            } else $(".DivEditVentilatorResidence").hide();


            //if (Boolean($(this).data("ismyhospital"))) {
            //    $(".ShowAddMedicalRecordCard").show();
            //    $(".ShowAddMedicalAttachmentCard").show();
            //    $("body").find('input[name="checkdiagnose"]').attr("disabled", false);
            //    $("body").find('input[name="checkcare"]').attr("disabled", false);
            //    $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', false);
            //    $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", false);
            //} else {
            //    $(".ShowAddMedicalRecordCard").hide();
            //    $(".ShowAddMedicalAttachmentCard").hide();
            //    $("body").find('input[name="checkdiagnose"]').attr("disabled", true);
            //    $("body").find('input[name="checkcare"]').attr("disabled", true);
            //    $("body").find("#CkEditVentilatorNeed").bootstrapSwitch('disabled', true);
            //    $("body").find('#ddlEditHospitalVentilatorID').attr("disabled", true);
            //}

            $("#pnlPatientProfile").modal('show');

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
            });
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

        function DisplayStandardPatientData(PatientID) {
            var data = CustomAjax(urlRoot + "/api/ReceptionPatientManagement/BindAllReceptionPatient/" + PatientID, '', "GET");
            $("#txtFullName").val(data.FullName);
            $("#txtNationalID").val(data.NationalID);
            $("#txtInsuranceNo").val(data.InsuranceNo);
            $("#txtMobile1").val(data.Mobile1);
            $("#txtMobile2").val(data.Mobile2);
            $("#txtAge").val(data.Age);
        }

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
                result += days +" يوم "
            if (hours > 1)
                result += "  " + hours + " ساعة "
            if (minutes > 1)
                result += "  " + minutes + " دقيقة "
            if (days < 1 && hours < 1 && minutes < 1)
                result = "اقل من دقيقة"
            return result;
        }
    </script>
    
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitAttachmentSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitDiagnoseAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitCareAdd") %>
    <%: Scripts.Render("~/App/Js/ChangeVentilator") %>
</asp:Content>
