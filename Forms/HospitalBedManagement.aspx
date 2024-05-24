<%@ Page Title="Hospital Bed Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalBedManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalBedManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        اعدادات اسرة المستشفيات
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalBed" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة سرير جديد بالمستشفى</button>

                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalBedTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospitalBed" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalBedTitle">إضافة سرير جديد</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">

                            <div class="form-group">
                                <label class="control-label col-md-3">رقم السرير</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtBedNo" name="BedNo" placeholder="رقم السرير" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3">غرفة</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalRoom" name="HospitalRoomID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">نوع الرعاية الطبية</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalCareTypeList" multiple name="HospitalCareTypeList" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                            <div class="form-group" id="DivlHospitalEquipmentState">
                                <label class="control-label col-md-3">الحالة</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalEquipmentState" name="HospitalEquipmentStateID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" data-id="" id="btnSaveHospitalBed" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalBed" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="modal-AddnewHospitalBedState" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalBedStateTitle">إضافة حالة سرير جديد</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-md-3">الحالة</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalEquipmentStateChange" name="HospitalEquipmentStateID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                            <div class="form-group" id="pnlMaintenanceCost">
                                <label class="control-label col-md-3">تكاليف</label>
                                <div class="col-md-7">
                                    <input id="txtMaintenanceCost" class="form-control input-sm text-center" type="text" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">ملاحظات</label>
                                <div class="col-md-7">
                                    <textarea rows="5" cols="5" class="form-control " id="txtHospitalBedRemarks" name="HospitalBedRemarks" placeholder="ملاحظات"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospitalBedState" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalBedState" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%--<%: Scripts.Render("~/App/Js/HospitalBedManagement") %>--%>
    <script src="js/jsHospitalBedManagement.js"></script>
</asp:Content>

