<%@ Page Title="Patient Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="PatientAdministrationReport.aspx.cs" Inherits="Re3ayaApp.Forms.PatientAdministrationReport" %>

<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecord.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecord" %>
<%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitCareAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitCareAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitAttachmentSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitAttachmentSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordAttachment.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordAttachment" %>
<%@ Register Src="~/Forms/us/ucPatientVisitResidenceAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitResidenceAdd" %>
<%@ Register Src="~/Forms/us/ucChangeVentilator.ascx" TagPrefix="uc1" TagName="ucChangeVentilator" %>













<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
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

        @media only screen and (max-width: 940px) {
            .tabbable-custom .panel-body {
                padding: 0px;
            }

            .tabbable-custom > .tab-content {
                padding: 0px;
            }

            .tabbable-custom > .nav-tabs > li > a {
                padding-left: 5px;
                padding-right: 5px;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div id="inline" style="display: none">
        <p>Lorem Ipsum</p>
    </div>


    <div class="tabbable-custom">
        <ul class="nav nav-tabs">
           <%-- <li >
                <a href="#tab_1_1_5" id="tabMyHospital" data-toggle="tab">انتظار داخلي </a>
            </li>--%>
            <li class="active">
                <a href="#tab_1_1_7" id="tabOtherHospital" data-toggle="tab">قائمة الإنتظار </a>
            </li>
            <li>
                <a href="#tab_1_1_2" id="tabICUHospital" data-toggle="tab">مرضى ICU  </a>
            </li>

        </ul>
        <div class="tab-content">
            <%--<div class="tab-pane " id="tab_1_1_5">
                <div class="panel panel-rose">

                   
                    <div class="panel-body">
                        <div class="form-group">
                            <div id="divPatientTableHospital" style="height: 500px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>--%>

            <div class="tab-pane active" id="tab_1_1_7">
                <div class="panel panel-rose">
                    <div class="panel-body">
                        <div class="form-group">
                            <div id="divPatientTableOtherHospital" style="height: 500px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="tab_1_1_2">
                <div class="panel panel-rose">
                    <div class="panel-body">
                        <div class="form-group">
                            <div id="divPatientTableICUHospital" style="height: 500px;">
                            </div>
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
                            <uc1:ucChangeVentilator runat="server" id="ucChangeVentilator" />
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

    <div id="modal-ResidenceAdd" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">تسجيل مريض</h4>
                </div>
                <div class="modal-body">
                    <div class="co-md-12">
                        <uc1:ucPatientVisitResidenceAdd runat="server" ID="ucPatientVisitResidenceAdd" />
                    </div>

                </div>
            </div>

        </div>
    </div>
     <%-- Discharge  Patient Visit --%>
    <div class="modal fade draggable-modal ui-draggable" id="modal-DischargePatientVisit" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 20px">
                <div class="modal-header ui-draggable-handle">
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
                                                    <select id="ddlReason" class="form-control input-sm" style="width: 100%"></select>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitAttachmentSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordManagement") %>
    <%: Scripts.Render("~/App/Js/PatientVisitDiagnoseAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitCareAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordAttachment") %>
    <%: Scripts.Render("~/App/Js/PatientVisitResidenceAdd") %>
    <%: Scripts.Render("~/App/Js/ChangeVentilator") %>
    <%: Scripts.Render("~/App/Js/PatientAdministrationReport") %>
</asp:Content>
