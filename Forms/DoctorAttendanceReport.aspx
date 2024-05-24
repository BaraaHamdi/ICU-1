<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="DoctorAttendanceReport.aspx.cs" Inherits="Re3ayaApp.Forms.DoctorAttendanceReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">

    <link href="../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
 


    <div class="row">
        <div>
            <div>
                <div class="portlet-body">
                    <div class="tabbable-custom">
                        <ul class="nav nav-tabs" style="width: 100%;">
                            <li class="active" style="width: 50%; text-align: center;">
                                <a href="#tab_1_1_1" data-toggle="tab">الحضور</a>
                            </li>
                            <li style="width: 48%; text-align: center;">
                                <a href="#tab_1_1_2" data-toggle="tab">الورديات</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab_1_1_1">
                                <div class="m-grid m-grid-demo" id="pnlDoctorShiftAttendance">
                                </div>
                            </div>
                            <div class="tab-pane" id="tab_1_1_2">
                                <div class="m-grid m-grid-demo" id="pnlDoctorScheduledShifts">
                                    <div class="m-grid-row" style="width: 100%;">
                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                                            <span class="mt-action-author">وردية مسائية</span><br>
                                        </div>
                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                                            <span class="mt-action-author ">١٠:٠٠ ص - ٠٧:٠٠ م</span>
                                        </div>
                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                                            <span class="mt-action-author">Fri 30 JUL</span>
                                        </div>
                                    </div>
                                    <div class="m-grid-row" style="width: 100%;">
                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                                            <span class="mt-action-author">وردية مسائية</span>
                                        </div>
                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                                            <span class="mt-action-author ">١٠:٠٠ ص - ٠٧:٠٠ م</span>
                                        </div>
                                        <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                                            <span class="mt-action-author">Fri 30 JUL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END QUICK SIDEBAR -->
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <script src="js/jsDoctorAttendanceReport.js"></script>
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="../assets/global/plugins/bootstrap-contextmenu/bootstrap-contextmenu.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->



</asp:Content>
