<%@ Page Title="Hospital Equipment State Management" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="HospitalEquipmentStateManagement.aspx.cs" Inherits="Re3ayaApp.Forms.HospitalEquipmentStateManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="panel panel-rose">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-4">
                    <h3 class="panel-title"><i class="fa fa-gear font-white"></i>
                        اعدادات حالة معدات المستشفيات
                    </h3>
                </div>
                <div class="col-md-8">
                    <button type="button" id="btnAddNewHospitalEquipmentState" class="btn default btn-sm pull-right"><i class="fa fa-plus-square"></i>إضافة حالة معدات مستشفى جديدة</button>

                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <div id="divHospitalEquipmentStateTable">
                </div>
            </div>
        </div>
    </div>


    <div id="modal-AddnewHospitalEquipmentState" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h4 class="modal-title" id="divmodalHospitalEquipmentStateTitle"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="row">

                            <div class="form-group">
                                <label class="control-label col-md-3">اسم المعده</label>
                                <div class="col-md-7">
                                    <input type="text" class="form-control " id="txtTitle" name="Title" placeholder="اسم المعده" />
                                </div>
                            </div>
                            <div id="ckContainer">
                                <div class="form-group">
                                    <label class="control-label col-md-3">السرير</label>
                                    <div class="col-md-7">
                                        <input type="checkbox" class="form-control make-switch" id="CkHospitalBedAllowed" name="HospitalBedAllowed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">جهاز التنفس الصناعي </label>
                                    <div class="col-md-7">
                                        <input type="checkbox" class="form-control make-switch" id="CkHospitalVentilatorAllowed" name="HospitalVentilatorAllowed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="control-label col-md-3">يسمح بالاستخدام</label>
                                    <div class="col-md-7">
                                        <input type="checkbox" class="form-control make-switch" id="CkHospitalUsingAllowed" name="HospitalUsingAllowed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3">يسمح بتحديد تكاليف </label>
                                    <div class="col-md-7">
                                        <input type="checkbox" class="form-control make-switch" id="CkHospitalCostAllowed" name="HospitalCostAllowed" data-on-color="success" data-on-text="نعم" data-off-color="danger" data-off-text="لا" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-3 col-md-offset-9">
                            <button type="button" data-id="0" id="btnSaveHospitalEquipmentState" class="btn btn-rose"><i class="fa fa-save"></i>حفظ</button>
                            <button type="button" id="btnCancelHospitalEquipmentState" class="btn default" data-dismiss="modal"><i class="fa fa-ban"></i>إغلاق </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/App/Js/HospitalEquipmentStateManagement") %>
</asp:Content>
