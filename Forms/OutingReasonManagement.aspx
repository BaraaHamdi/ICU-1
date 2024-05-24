<%@ Page Title="Outing Reason Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="OutingReasonManagement.aspx.cs" Inherits="Re3ayaApp.Forms.OutingReasonManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                       أسباب الخروج
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewOutingReason" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة سبب خروج </button>

                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divOutingReasonTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewOutingReason" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalOutingReasonTitle">إضافة سبب خروج جديد</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">

                            <div class="form-group">
                                <label class="control-label col-md-3">السبب</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtReasonTitle" name="ReasonTitle" placeholder="السبب" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3">استقبال</label>
                                <div class="col-md-7">
                                    <input type="checkbox" class="form-control make-switch" id="CkReceptionAllowed" name="ReceptionAllowed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                </div>
                            </div>

                              <div class="form-group">
                                <label class="control-label col-md-3">رعاية</label>
                                <div class="col-md-7">
                                    <input type="checkbox" class="form-control make-switch" id="CkICUAllowed" name="ICUAllowed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveOutingReason" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelOutingReason" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/OutingReasonManagement") %>
</asp:Content>
