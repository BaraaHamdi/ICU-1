<%@ Page Title="Hospital Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">

        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        إعدادات المستشفيات
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitals" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة مستشفى جديدة</button>

                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospital" class="modal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalTitle">إضافة مستشفى</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-body">

                            <div class="form-group">
                                <label class="control-label col-md-3">اسم المستشفى</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtHospitalName" name="HospitalName" placeholder="اسم المستشفى" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">عنوان المستشفى</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtHospitalAddress" name="HospitalAddress" placeholder="عنوان المستشفى" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">شعار المستشفى</label>
                                <div class="col-md-7">
                                    <input type="file" class="form-control " id="fuHospitalLogoUrl" name="HospitalLogoUrl"  />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">خط الطول</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtLongitude" name="Longitude" placeholder="خط الطول" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3">خط العرض</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtLatitude" name="Latitude" placeholder="خط العرض" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="panel panel-rose">

                                        <div class="panel-heading">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                                                        الخريطة
                                                    </h3>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" id="txtHopitalAddress" placeholder="العنوان..." />
                                                        <div class="input-group-btn">
                                                            <button class="btn btn-danger" id="btnAddresSearch">
                                                                <i class="fa fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="panel-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <div id="map" style="height: 300px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" id="btnSaveHospital" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospital" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/HospitalManagement") %>
</asp:Content>
