<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="ReceptionPatientManagement.aspx.cs" Inherits="Re3ayaApp.Forms.ReceptionPatientManagement" %>

<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitAttachmentSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitAttachmentSlid" %>
<%@ Register Src="~/Forms/us/ucChangeVentilator.ascx" TagPrefix="uc1" TagName="ucChangeVentilator" %>
<%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitCareAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitCareAdd" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <style>
        /*.modal-dialog,
        .modal-content {*/
        /* 80% of window height */
        /*height: 93%;
        }

        .modal-body {*/
        /* 100% = dialog height, 120px = header + footer */
        /*max-height: calc(100% - 120px);
            overflow-y: scroll;
        }*/

        .Scroller {
            height: 750px;
            overflow-y: scroll;
        }

        .fancybox-overlay {
            z-index: 1000000 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <div class="col-md-12">
            <!-- BEGIN Portlet PORTLET-->
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-gear"></i>ادارة بيانات المرضي
                        <span class="badge " id="DataCount" style="background-color: #f44336;"></span>
                    </div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse" data-original-title="" title=""></a>
                        <a href="javascript:;" class="fullscreen" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body portlet-empty" style="">
                    <div id="PatientVisitDataTableID"></div>
                </div>
            </div>
            <!-- END Portlet PORTLET-->
        </div>
    </div>

    <div id="modal-AddnewPatient" class="modal fade" role="dialog">
        <div class="modal-dialog modal-full" style="height: 93%;">
            <div class="modal-content" style="height: 93%;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalPatientTitle">تعديل بيانات مريض</h4>
                </div>
                <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                    <div class="form-horizontal">
                        <div class="form-body">

                            <div class="row">
                                <div class="col-sm-7 Scroller">
                                    <%--       <div class="row">
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
                            </div>--%>
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
                                                <%-- <label class="control-label col-md-2">الجنس</label>
                                        <div class="col-md-4">
                                            <input type="checkbox" class="form-control make-switch" id="CkSex" name="Sex" data-on-color="success" data-on-text="ذكر" data-off-color="danger" data-off-text="أنثى" />
                                        </div>--%>
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

                                                    <div class="row">
                                                        <div class="co-md-12">
                                                            <div id="DivPatientRelative"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%--<div class="row">
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
                                                            <input type="file" class="form-control " id="AttachFileUrl" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label col-md-2">يحتاج جهاز التنفس الصناعي</label>
                                                        <div class="col-md-10">
                                                            <input type="checkbox" class="form-control make-switch" id="CkVentilatorNeed" name="VentilatorNeed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                                        </div>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>--%>
                                    <%--<div class="row">
                                        <div class="col-md-6">
                                            <div class="portlet light bordered">
                                                <div class="portlet-title">
                                                    <div class="col-md-4">
                                                        <div class="caption font-blue-sharp">
                                                            <i class="icon-speech font-blue-sharp"></i>
                                                            <span class="caption-subject bold uppercase">التشخيص</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="actions">
                                                            <input id="DiagnoseFilter" class="form-control input-sm" placeholder="بحث عن تشخيص" />
                                                        </div>
                                                    </div>
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

                                    </div>--%>
                                </div>
                                <div class="col-sm-5">
                                    <div style="width: 100%">
                                        <span id="ImageDiv" style="width: 100%"></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-12 text-center">
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitAttachmentSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitDiagnoseAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitCareAdd") %>
    <%: Scripts.Render("~/App/Js/ChangeVentilator") %>
    <%: Scripts.Render("~/App/Js/ReceptionPatientManagement") %>
</asp:Content>
