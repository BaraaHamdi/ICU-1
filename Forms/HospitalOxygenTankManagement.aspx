<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalOxygenTankManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalOxygenTankManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادت خزانات الاكسجين المستشفى
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalOxygenTank" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة خزان اكسجين جديدة بالمستشفى</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalOxygenTank">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddNewHospitalOxygenTank" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalOxygenTankTitle">إضافة خزان اكسجين بالمستشفى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-md-3">اسم خزان الاكسجين</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtOxygenTankTitle" name="OxygenTankTitle" placeholder="اسم خزان الاكسجين" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3">نوع خزان الاكسجين</label>
                                <div class="col-md-7">
                                    <select id="ddlHospitalOxygenTankType" name="ddlHospitalOxygenTankType" class="form-control" style="width: 100%"></select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-3">الحد الادني للخزان</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtOxygenMinCapacity" name="txtOxygenMinCapacity" placeholder="الحد الادني للخزان" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">الحد الاقصى للخزان</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtOxygenMaxCapacity" name="txtOxygenMaxCapacity" placeholder="الحد الاقصى للخزان" />
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
                            <button type="button" id="btnSaveHospitalOxygenTank" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalOxygenTank" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/jsHospitalOxygenTankManagement") %>
</asp:Content>
