<%@ Page Title="Hospital Room Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalRoomManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalRoomManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادت غرف المستشفى
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalRoom" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة غرفة جديدة بالمستشفى</button>

                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalRoomTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospitalRoom" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <%--<h4 class="modal-title" id="divmodalHospitalRoomTitle">إضافة غرفة بالمستشفى</h4>--%>
                    <h4 class="modal-title" id="divmodalHospitalRoomTitle">إضافة غرفة بالمستشفى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">

                            <div class="form-group">
                                <label class="control-label col-md-3">رقم الغرفة</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtRoomNo" name="RoomNo" placeholder="رقم الغرفة" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">اسم الغرفة</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtRoomTitle" name="RoomTitle" placeholder="اسم الغرفة" />
                                </div>
                            </div>
                            <div class="form-group Hospital" style="display: none;">
                                <label class="control-label col-md-3">مستتشفى</label>
                                <div class="col-md-7">
                                    <select id="ddlHospital" name="HospitalID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">نوع الرعاية بالمستشفى</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalCareTypeID" name="HospitalCareTypeID" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospitalRoom" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalRoom" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/HospitalRoomManagement") %>
</asp:Content>
