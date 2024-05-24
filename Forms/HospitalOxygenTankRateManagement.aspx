<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalOxygenTankRateManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalOxygenTankRateManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <style type="text/css">
        .fancybox-overlay {
            z-index: 1000000 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        قراءات خزانات الاكسجين المستشفى
                    </h3>
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


    <div id="modal-AddNewHospitalOxygenTankRate" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalOxygenTankTitle">إضافة قراءة خزان الاكسجين بالمستشفى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal" style="margin: 20px;">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-md-3">قراءة الخزان</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtOxygenTankRate" name="txtOxygenTankRate" placeholder="قراءة الاكسجين" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">صورة عداد الأكسجين</label>
                                <div class="col-md-7">
                                    <input type="file" class="file" id="fuOxygenTankFile" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospitalOxygenTankRate" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalOxygenTankRate" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="modal-header">
                    <h4>قراءات الاكسجين السابقة</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div id="divHospitalOxygenTankRateTable">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/jsHospitalOxygenTankRateManagement") %>
</asp:Content>
