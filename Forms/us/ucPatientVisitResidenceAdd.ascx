<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucPatientVisitResidenceAdd.ascx.cs" Inherits="Re3ayaApp.Forms.us.ucPatientVisitResidenceAdd" %>

<div class="form-horizontal form-bordered">
    <div class="form-group">
        <label class="control-label col-md-3">السرير</label>
        <div class="col-md-8">
            <select id="ddlHospitalBedID" class="form-control" style="width: 100%"></select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3">جهاز التنفس</label>
        <div class="col-md-8">
            <select id="ddlHospitalVentilatorID" class="form-control" style="width: 100%"></select>
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-10 col-md-offset-1">
            <button type="button" id="btnRegisterPatient" class="btn btn-primary btn-sm btn-block"><i class="fa fa-plus"></i>تسجيل المريض </button>
        </div>
    </div>
</div>

