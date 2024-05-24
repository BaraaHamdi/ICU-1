<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucPatientVisitMedicalRecord.ascx.cs" Inherits="Re3ayaApp.Forms.us.ucPatientVisitMedicalRecord" %>


<div class="panel panel-primary">
    <div class="panel-body">
        <div class="form-horizontal form-bordered">
            <div class="form-group">
                <label class="control-label col-md-3">الحالة</label>
                <div class="col-md-8">
                    <select id="ddlPatientStateID" class="form-control input-sm" style="width: 100%"></select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-3 ">نسبة الاوكسجين</label>
                <div class="col-md-8">
                    <input id="txtEditOxygenLevel" class="form-control input-sm text-center" type="text" />
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 control-label">ملف  </label>
                <div class="col-md-8">
                    <input type="file" class="file" id="fuMedicalFile2" />
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-3 control-label">ملاحظات  </label>
                <div class="col-md-8">
                    <textarea id="txtMedicalDescription" placeholder="ملاحظات  " class="form-control input-sm" rows="5"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-md-12">
                    <button id="btnSavePatientVisitMedicalRecord" type="button" class="btn btn-success btn-sm btn-block"><i class="fa fa-floppy-o"></i>إضافة</button>
                </div>
            </div>
        </div>
    </div>
</div>
<%--<div class="panel panel-default">
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-8">
                <h4 class="panel-title"><span class="fa fa-list"></span>&nbsp;سجل الزيارات السابقة للمريض</h4>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <div class="col-md-12">
            <div id="divPatientVisitMedicalRecordTable">
            </div>
        </div>
    </div>
</div>--%>