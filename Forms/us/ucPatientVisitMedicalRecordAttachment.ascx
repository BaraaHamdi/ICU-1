<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucPatientVisitMedicalRecordAttachment.ascx.cs" Inherits="Re3ayaApp.Forms.us.ucPatientVisitMedicalRecordAttachment" %>
<div class="panel panel-primary">
    <div class="panel-body">
        <div class="form-horizontal form-bordered">
            <div class="form-group">
                <label class="col-md-3 control-label">ملف  </label>
                <div class="col-md-8">
                    <input type="file" class="file" name="fuAttachmentFile[]" id="fuAttachmentFile" multiple/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-3 control-label">ملاحظات  </label>
                <div class="col-md-8">
                    <textarea id="txtAttachmentDescription" placeholder="ملاحظات  " class="form-control input-sm" rows="5"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-12">
                    <button id="btnSavePatientVisitAttachment" type="button" class="btn btn-success btn-sm btn-block"><i class="fa fa-floppy-o"></i>إضافة</button>
                </div>
            </div>
        </div>
    </div>
</div>