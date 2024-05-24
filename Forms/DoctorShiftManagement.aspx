<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="DoctorShiftManagement.aspx.cs" Inherits="Re3ayaApp.Forms.DoctorShiftManagement" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <link href="../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .m-grid.m-grid-demo .m-grid-col {
             height: 0px!important; 
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div class="row" style="background-color: #fff; height: 70px; box-shadow: 0 1px 7px rgb(0 0 0 / 15%);">
        <a id="btnDateLeft"><i class="icon-arrow-left" style="position: absolute; left: 30%; padding-top: 24px; font-size: 20px;"></i></a>
        <a id="btnDateRigth"><i class="icon-arrow-right" style="position: absolute; right: 30%; padding-top: 24px; font-size: 20px;"></i></a>
        <h4 id="lblCurrentDate" style="text-align: center; padding-top: 12px; font-weight: bold;" data-date=""></h4>
        <input type="date" id="txtCurrentDate" style="display: none;" />
    </div>
    <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="margin-top: 10px!important;">
        <!-- BEGIN CONTENT BODY -->
        <div class="clearfix"></div>
        <!-- END DASHBOARD STATS 1-->
        <div class="row">
            <div class="col-lg-612 col-xs-12 col-sm-12">
                <div class="portlet light bordered">
                    <div class="portlet-title tabbable-line" style="border-top: 1px solid #eef1f5;">
                        <div class="caption">
                            <i class=" icon-social-twitter font-dark hide"></i>
                            <span class="caption-subject font-dark bold uppercase" id="lblStartedShiftCount">الورديات الحالية  (0/0)</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_actions_pending">
                                <!-- BEGIN: Actions -->
                                <div class="mt-actions">
                                    <div id="pnlStartedShiftList"></div>
                                </div>
                                <!-- END: Actions -->
                            </div>
                        </div>
                    </div>
                    <div class="portlet-title tabbable-line" style="border-top: 1px solid #eef1f5;">
                        <div class="caption">
                            <i class=" icon-social-twitter font-dark hide"></i>
                            <span class="caption-subject font-dark bold uppercase" id="lblUpcomingShiftCount">الورديات القادمة (0/0)</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_actions_pending">
                                <!-- BEGIN: Actions -->
                                <div class="mt-actions">
                                    <div id="pnlUpcomingShiftList"></div>
                                </div>
                                <!-- END: Actions -->
                            </div>
                        </div>
                    </div>



                    <div class="modal fade" id="AddDoctorShiftModal" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="m-grid m-grid-demo">
                                        <div class="m-grid-row">
                                            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border-style: none; background-color: #fff;">
                                                <img id="imgDoctorImage" src="" style="border-radius: 20px;" width="41" height="41" />

                                                <div class="mt-action-info ">
                                                    <div class="mt-action-details ">
                                                        <span class="mt-action-author" id="lblDoctorName"></span>
                                                        <br />
                                                        <span class="mt-action-desc" id="lblJobTitle"></span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="m-grid-row">
                                            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border-style: none; background-color: #fff;">
                                                <h4>اضافة وردية</h4>
                                                <select id="ddlHospitalShift" name="ddlHospitalShift" class="form-control" style="width: 100%"></select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer" style="text-align: left;">
                                    <button id="btnAddDoctorShift" type="button" class="btn green">اضــافة الوردية</button>
                                    <button id="btnCancelDoctorShift" type="button" class="btn dark btn-outline">الغاء</button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>


                    <div class="modal fade" id="ShiftConfirmationModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>

                                </div>
                                <div class="modal-body">
                                    <div class="m-grid m-grid-demo">
                                        <div class="m-grid-row">
                                            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border-style: none; background-color: #fff;">
                                                <img id="imgDoctorShiftImage" src="" style="border-radius: 20px;" width="41" height="41" />

                                                <div class="mt-action-info ">
                                                    <div class="mt-action-details ">
                                                        <span class="mt-action-author" id="lblDoctorShiftName"></span>
                                                        <br />
                                                        <span class="mt-action-desc" id="lblDoctorShiftJobTitle"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-left: 20px;">
                                                <p>الوردية : <span id="lblShiftName"></span></p>
                                            </div>

                                        </div>

                                        
                                        <div class="m-grid-row">
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-left: 20px;">
                                                <p>نوع الحضور</p>
                                            </div>
                                            
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-left: 20px;">
                                                <select id="ddlAttendanceState" class="form-control">
                                                    <option value="True">حضور</option>
                                                    <option value="False">غياب</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div class="m-grid-row">
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-left: 20px;" id="pnlTimeFrom">
                                                <p>بداية الحضور الفعلي</p>
                                                <div class="input-group">
                                                    <input id="txtTimeFrom" type="text" class="form-control timepicker timepicker-no-seconds" />
                                                    <span class="input-group-btn">
                                                        <button class="btn default" type="button">
                                                            <i class="fa fa-clock-o"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-right: 20px;" id="pnlTimeTo">
                                                <p>نهاية الحضور الفعلي</p>
                                                <div class="input-group">
                                                    <input id="txtTimeTo" type="text" class="form-control timepicker timepicker-no-seconds" />
                                                    <span class="input-group-btn">
                                                        <button class="btn default" type="button">
                                                            <i class="fa fa-clock-o"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="m-grid-row">
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-left: 20px;">
                                                <p>بداية الوردية : <span id="lblTimeFrom"></span></p>
                                            </div>
                                            <div class="m-grid-col m-grid-col-middle" style="border-style: none; background-color: #fff; padding-right: 20px;">
                                                <p>نهاية الوردية : <span id="lblTimeTo"></span></p>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div class="modal-footer" style="text-align: left;">
                                    <button id="btnConfirmShift" type="button" class="btn green">تاكيد</button>
                                    <button id="btnCancelConfirmShift" type="button" class="btn dark btn-outline" data-dismiss="modal">الغاء</button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>


                </div>

            </div>


        </div>

        <!-- END QUICK SIDEBAR -->
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <script type="text/javascript" src="js/jsDoctorShiftManagement.js"></script>
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="../assets/global/plugins/bootstrap-contextmenu/bootstrap-contextmenu.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->
</asp:Content>
