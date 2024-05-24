<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalShiftManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalShiftManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادت ورديات المستشفى
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalShift" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة وردية جديدة للمستشفى</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalShift">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddNewHospitalShift" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalShiftTitle">إضافة وردية مستشفى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-md-3">اسم الوردية</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtShiftTitle" name="ShiftTitle" placeholder="اسم الوردية" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3">كود الوردية</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtShiftPrefix" name="ShiftPrefix" placeholder="كود الوردية" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3">بداية الوردية</label>
                                <div class="col-md-7">
                                    <%--<input id="txtTimeFrom" class="form-control" />--%>
                                    <div class="input-group">
                                        <input type="text" class="form-control timepicker timepicker-no-seconds" id="txtTimeFrom" name="txtTimeFrom" />
                                        <span class="input-group-btn">
                                            <button class="btn default" type="button">
                                                <i class="fa fa-clock-o"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">نهاية الوردية</label>
                                <div class="col-md-7">
                                    <%--<input id="txtTimeTo" class="form-control" />--%>
                                    <div class="input-group">
                                        <input type="text" class="form-control timepicker timepicker-no-seconds" id="txtTimeTo" name="txtTimeTo" />
                                        <span class="input-group-btn">
                                            <button class="btn default" type="button">
                                                <i class="fa fa-clock-o"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group Hospital" style="display: none;">
                                <label class="control-label col-md-3">مستتشفى</label>
                                <div class="col-md-7">
                                    <select id="ddlHospital" name="HospitalID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospitalShift" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalShift" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/jsHospitalShiftManagement") %>
</asp:Content>
