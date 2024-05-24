<%@ Page Title="Hospital Bed State Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalBedStateManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalBedStateManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        اعدادات اسرة المستشفيات
                    </h3>
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
                    <div class="form-horizontal" style="margin:20px;">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-md-3">الحالة</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalEquipmentState" name="HospitalEquipmentStateID" class="form-control" style="width: 100%"></select>
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
                <hr />
                <div class="modal-header">
                    <h4 class="modal-title">الحالات السابقة</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div id="divHospitalBedStateHistoryTable"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%--<%: Scripts.Render("~/App/Js/HospitalBedManagement") %>--%>
    <script src="js/jsHospitalBedStateManagement.js"></script>
</asp:Content>

