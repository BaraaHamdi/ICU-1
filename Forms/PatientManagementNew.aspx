<%@ Page Title="مرضى الانتظار" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="PatientManagementNew.aspx.cs" Inherits="Re3ayaApp.Forms.PatientManagementNew" %>

<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecord.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecord" %>
<%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitCareAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitCareAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitAttachmentSlid.ascx" TagPrefix="uc1" TagName="ucPatientVisitAttachmentSlid" %>
<%@ Register Src="~/Forms/us/ucPatientVisitMedicalRecordAttachment.ascx" TagPrefix="uc1" TagName="ucPatientVisitMedicalRecordAttachment" %>
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

        @media only screen and (max-width: 940px) {
            .panel-body {
                padding: 0px;
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


        .VentilatorNo {
            position: absolute;
            top: 70px;
            right: -72px;
            width: 160px;
            height: 20px;
            background: #32c5d2;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            color: #ffffff;
            -webkit-transform: rotate( 90deg );
            -ms-transform: rotate(90deg);
            transform: rotate( 90deg );
            z-index: 11;
            font-weight: bold;
            -webkit-transition: .4s all ease;
            -o-transition: .4s all ease;
            transition: .4s all ease;
        }

        .VentilatorYes {
            position: absolute;
            top: 70px;
            right: -72px;
            width: 160px;
            height: 20px;
            background: #e7505a;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            color: #ffffff;
            -webkit-transform: rotate( 90deg );
            -ms-transform: rotate(90deg);
            transform: rotate( 90deg );
            z-index: 11;
            font-weight: bold;
            -webkit-transition: .4s all ease;
            -o-transition: .4s all ease;
            transition: .4s all ease;
        }
    </style>
    <link href="../assets-custom/css/lightgallery.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div id="inline" style="display: none">
        <p>ICU Smart</p>
    </div>

    <div class="row">
        <div class="col-md-12 ">
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption" lang="ar">
                        <div class="input-group">
                            <input lang="ar" type="text" id="txtKeyword" class="form-control" placeholder="البحث بالرقم الطبي او الإسم" />
                            <span lang="ar" class="input-group-btn">
                                <a lang="ar" href="javascript:;" class="btn btn-primary" id="btnSearch"><i class="fa fa-search"></i></a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="portlet-body form" style="padding-top: 5px !important;">
                    <div class="row" style="padding-top: 5px !important;margin-right: -10px;margin-left: -10px;">
                        <div class="col-md-12" id="Container">
                        </div>
                    </div>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitAttachmentSlid") %>
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordManagement") %>
    <%: Scripts.Render("~/App/Js/PatientVisitDiagnoseAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitCareAdd") %>
    <%: Scripts.Render("~/App/Js/PatientVisitMedicalRecordAttachment") %>
    <%--<%: Scripts.Render("~/App/Js/ChangeVentilator") %>
    <%: Scripts.Render("~/App/Js/PatientManagement") %>--%>
    <script src="js/jsucChangeVentilator.js" type="text/javascript"></script>
    <script src="js/jsPatientManagementNew.js?ver=20" type="text/javascript"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.2.0-beta.4/lightgallery.min.js"></script>

    <!-- lightgallery plugins -->
    <script src="https://cdn.jsdelivr.net/combine/npm/lightgallery,npm/lg-autoplay,npm/lg-fullscreen,npm/lg-hash,npm/lg-pager,npm/lg-share,npm/lg-thumbnail,npm/lg-video,npm/lg-zoom"></script>
    <script>
        $(window).load(function () {
            var elements = document.getElementsByClassName('lightgallery');
            for (let item of elements) {
                lightGallery(item, {
                    selector: 'this',
                })
            }
        });
    </script>
</asp:Content>
