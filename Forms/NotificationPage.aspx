<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="NotificationPage.aspx.cs" Inherits="Re3ayaApp.Forms.NotificationPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">
    <link href="../assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">



    <div class="m-grid m-grid-demo">
        <div class="m-grid-row" style="background-color: #fff; height: 70px; padding-top: 10px; padding-right: 20px;">
            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                <img src="" style="border-radius: 20px;" id="imgUserImage" width="60" height="60" />&nbsp;
                <span class="mt-action-author" id="lblUserName"></span>
            </div>
            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                <span class="mt-action-author bold" id="lblUserNotificationCount"></span>
            </div>
            <div class="m-grid-col m-grid-col-middle m-grid-col-center" style="border: none;">
                <span class="mt-action-author bold" id="lblUserNotificationCount2"></span>
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
                            <div id="pnlNotificationList"></div>
                            <!-- END: Actions -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <script src="js/jsNotificationPage.js"></script>
    <!-- BEGIN PAGE LEVEL PLUGINS -->
    <script src="../assets/global/plugins/bootstrap-contextmenu/bootstrap-contextmenu.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL PLUGINS -->
</asp:Content>
