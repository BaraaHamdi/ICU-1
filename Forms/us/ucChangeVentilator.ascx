<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucChangeVentilator.ascx.cs" Inherits="Re3ayaApp.Forms.us.ucChangeVentilator" %>

<div class="panel panel-default DivEditVentilator" style="padding: 4px;">
    <div class="panel-body">
        <div>
            <label class="control-label col-md-2 bold"> جهاز التنفس الصناعي</label>
            <div class="col-md-4">
                <input type="checkbox" class="form-control make-switch" id="CkEditVentilatorNeed"  data-handle-width="80" name="EditVentilatorNeed" data-on-color="danger" data-on-text="يحتاج" data-off-color="success" data-off-text="لا يحتاج" />
            </div>
        </div>
        <div class="DivEditVentilatorResidence" id="EditVentilatorResidenceDiv">
            <label class="control-label col-md-2 bold">جهاز التنفس</label>
            <div class="col-md-2">
                <select id="ddlEditHospitalVentilatorID" class="form-control" style="width: 100%"></select>
            </div>
        </div>
    </div>
</div>

