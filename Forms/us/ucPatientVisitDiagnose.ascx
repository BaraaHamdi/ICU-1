﻿<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucPatientVisitDiagnose.ascx.cs" Inherits="Re3ayaApp.Forms.us.ucPatientVisitDiagnose" %>
<div class="panel panel-primary">
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-8">
                <h4 class="modal-title"><span class="fa fa-plus"></span>&nbsp;إضافة طلب التشخيص الطبى </h4>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <div class="portlet light form-fit bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-settings font-green"></i>
                    <span class="caption-subject font-green sbold uppercase">بيانات التشخيص الطبى</span>
                </div>
            </div>
            <div class="portlet-body form">
                <!-- BEGIN FORM-->
                <div class="form-horizontal form-bordered">
                    <div class="form-group">
                        <label class="control-label col-md-3">التشخيص</label>
                        <div class="col-md-8">
                            <select id="ddlDiagnoseID" class="form-control input-sm" style="width: 100%"></select>
                        </div>
                    </div>
                </div>
                <!-- END FORM-->
            </div>
        </div>
    </div>
    <div class="panel-footer">
        <div class="row">
            <div class="col-md-3 pull-right">
                <button id="btnSavePatientVisitDiagnose" type="button" class="btn btn-primary"><i class="fa fa-floppy-o"></i>إضافة</button>
                <button type="button" id="btnClearPatientVisitDiagnose" class="btn default"><i class="fa fa-ban"></i>إلغــــاء</button>
            </div>
        </div>
    </div>
</div>
<div class="panel panel-default">
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-8">
                <h4 class="panel-title"><span class="fa fa-list"></span>&nbsp;الرعاية السابقة</h4>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <div class="col-md-12">
            <div id="divPatientVisitDiagnoseTable">
            </div>
        </div>
    </div>
</div>