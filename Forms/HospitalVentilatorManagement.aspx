<%@ Page Title="Hospital Ventilator Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalVentilatorManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalVentilatorManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادات جهاز التنفس الصناعي بالمستشفى
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalVentilator" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة جهاز تنفس صناعى جديد بالمستشفى</button>

                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalVentilatorTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospitalVentilator" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalVentilatorTitle">إضافة جهاز تنفس صناعى بالمستشفى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">

                            <div class="form-group">
                                <label class="control-label col-md-3">رقم جهاز التنفس الصناعى</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtVentilatorNo" name="VentilatorNo" placeholder="رقم جهاز التنفس الصناعى" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">الرقم التسلسلي</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtVentilatorSerialNo" name="VentilatorSerialNo" placeholder="الرقم التسلسلي (SerialNo)" />
                                </div>
                            </div>
                            <div class="form-group Hospital" style="display: none;">
                                <label class="control-label col-md-3">المستشفى</label>
                                <div class="col-md-7">
                                    <select id="ddlHospital" name="HospitalID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                            <div class="form-group" id="DivddlHospitalEquipmentState" style="display:none">
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
                            <button type="button" data-id="0" id="btnSaveHospitalVentilator" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalVentilator" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospitalVentilatorState" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalVentilatorStateTitle">إضافة حالة لجهاز التنفس الصناعي</h4>
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
                                    <textarea rows="5" cols="5" class="form-control " id="txtHospitalVentilatorRemarks" name="HospitalVentilatorRemarks" placeholder="ملاحظات"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-rose" id="StateHistory" style="display: none">
                        <div class="panel-heading">
                            <h4>الحالات السابقة</h4>
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <div id="divHospitalVentilatorStateHistoryTable">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospitalVentilatorState" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalVentilatorState" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%--<%: Scripts.Render("~/App/Js/HospitalVentilatorManagement") %>--%>
    <script src="js/jsHospitalVentilatorManagement.js"></script>
</asp:Content>
