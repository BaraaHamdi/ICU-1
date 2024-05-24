<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="DoctorActivityLog.aspx.cs" Inherits="Re3ayaApp.Forms.DoctorActivityLog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <link href="../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="m-grid m-grid-demo">
        <div class="m-grid-row" style="background-color: #fff; height: 70px; padding-top: 10px; padding-right: 20px;">
            <div class="m-grid-col m-grid-col-middle m-grid-col-center" id="currentdoctorpanel" style="border: none;">
                <img id="imgDoctorImage" src="../assets/pages/media/users/avatar1.jpg" style="border-radius: 20px;" width="40" height="40" />&nbsp;
                <span class="mt-action-author" id="lblDoctorName" style="position: absolute; margin-right: -62px; margin-top: 44px;"></span>
                <asp:HiddenField ID="HideCurrentUserID" ClientIDMode="Static" runat="server" />
            </div>
            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                <span class="mt-action-author bold" id="lblDoctorActivityCount"></span>
            </div>
            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                <span class="mt-action-author bold" id="lblDoctorActivityPointCount"></span>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab_actions_pending">
                            <!-- BEGIN: Actions -->
                            <div id="pnlDoctorActivityList"></div>
                            <!-- END: Actions -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="doctorselect" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" style="text-align: center">اختر طبيب</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12" id="pnlDoctorList">
                                    <%--<label class="mt-radio mt-radio-outline" style="width: 100%;">
                                            <input type="radio" name="optionsRadios" id="optionsRadios23" value="option2" checked="">
                                            <img src="/uploads/UserPhoto/a46b37bfe11c4c06ad90531a2306abb1.jpg" style="border-radius: 20px;" id="imgDoctorImage" width="40" height="40" />
                                            د. محمد ابراهيم لاشين
                                            <span style="margin-top: 8px;"></span>
                                        </label>
                                        <label class="mt-radio mt-radio-outline" style="width: 100%;">
                                            <input type="radio" name="optionsRadios" id="optionsRadios23" value="option2" checked="">
                                            <img src="/uploads/UserPhoto/a46b37bfe11c4c06ad90531a2306abb1.jpg" style="border-radius: 20px;" id="imgDoctorImage" width="40" height="40" />
                                            د. محمد ابراهيم لاشين
                                            <span style="margin-top: 8px;"></span>
                                        </label>--%>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">اغلاق</button>
                </div>
            </div>

        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <script src="js/jsDoctorActivityLog.js"></script>
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="../assets/global/plugins/bootstrap-contextmenu/bootstrap-contextmenu.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->
</asp:Content>
