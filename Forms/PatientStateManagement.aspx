<%@ Page Title="Patient State Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="PatientStateManagement.aspx.cs" Inherits="Re3ayaApp.Forms.PatientStateManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادات حالة المريض
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewPatientState" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة حالة المريض جديدة</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divPatientStateTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewPatientState" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalPatientStateTitle">إضافة حالة المريض </h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-md-3">الحالة</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtTitle" name="Title" placeholder="الحالة" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">حالة الاستقبال ام لا</label>
                                <div class="col-md-7">
                                    <input type="checkbox" class="form-control make-switch" id="CkIsReceptionState" name="IsReceptionState" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">حالة عناية مركزة ام لا</label>
                                <div class="col-md-7">
                                    <input type="checkbox" class="form-control make-switch" id="CkIsIntensiveCareState" name="IsIntensiveCareState" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSavePatientState" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelPatientState" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/PatientStateManagement") %>
</asp:Content>
