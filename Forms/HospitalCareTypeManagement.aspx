<%@ Page Title="Hospital CareType Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalCareTypeManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalCareTypeManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        اعدادات الرعاية الطبية بالمستشفى
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalCareType" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة نوع الرعاية الطبية</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalCareTypeTable2"></div>
                <div id="divHospitalCareTypeTable"></div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospitalCareType" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalCareTypeTitle"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">

                            <div class="form-group">
                                <label class="control-label col-md-3">نوع الرعاية</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtTitle" name="Title" placeholder="نوع الرعاية" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospitalCareType" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalCareType" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/HospitalCareTypeManagement") %>
</asp:Content>
