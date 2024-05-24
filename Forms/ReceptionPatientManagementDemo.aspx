<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="ReceptionPatientManagementDemo.aspx.cs" Inherits="Re3ayaApp.Forms.ReceptionPatientManagementDemo" %>

<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitAttachmentSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitAttachmentSlid" %>
<%@ Register Src="~/Forms/us/ucChangeVentilator.ascx" TagPrefix="uc1" TagName="ucChangeVentilator" %>
<%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitCareAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitCareAdd" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <style>
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

    <div id="modal-PatientProfile" class="modal fade" role="dialog">
        <div class="modal-dialog modal-full" style="height: 93%;">
            <div class="modal-content" style="height: 93%;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalPatientTitle">عرض بيانات مريض</h4>
                </div>
                <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                    <div class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-sm-12">
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
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitAttachmentSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitDiagnoseAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitCareAdd") %>
    <%: Scripts.Render("~/App/Js/ChangeVentilator") %>
    <script src="js/jsReceptionPatientManagementDemo.js"></script>
</asp:Content>
