<%@ Page Title="Relative Type Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="DiagnoseManagement.aspx.cs" Inherits="Re3ayaApp.Forms.DiagnoseManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <style>
        /*  .vakata-context li a {
            padding: 0px !important;
        }*/

        .vakata-context li a i {
            margin-left: 0px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        اعدادات التشخيص الطبى
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewDiagnose" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة تشخيص طبى جديد</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
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
                            <div id="containerDiagnose" style="height: 500px; overflow: auto;">
                                <div id="DiagnoseTree">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewDiagnose" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalDiagnoseTitle">إضافة تشخيص طبى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="form-group" style="display: none" id="divParentDiagnose">
                                <label class="control-label col-md-3"  >Parent Diagnose</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="lblDiagnoseTitle" disabled name="DiagnoseTitle" placeholder="Diagnose Title" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">التشخيص</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtDiagnoseTitle" name="DiagnoseTitle" placeholder="التشخيص" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveDiagnose" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelDiagnose" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/DiagnoseManagement") %>
</asp:Content>
