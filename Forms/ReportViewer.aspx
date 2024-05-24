<%@ page language="C#" autoeventwireup="true" codebehind="ReportViewer.aspx.cs" inherits="Re3ayaApp.Forms.ReportViewer" %>

<%--<%@ register assembly="Stimulsoft.Report.Web, Version=2016.3.0.0, Culture=neutral, PublicKeyToken=ebe6666cba19647a" namespace="Stimulsoft.Report.Web" tagprefix="cc1" %>--%>
<%@ Register Assembly="Stimulsoft.Report.Web" Namespace="Stimulsoft.Report.Web" TagPrefix="cc1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <%--<cc1:StiWebViewerFx ID="StiWebViewerFx1" Width="100%" Height="1000px" RequestTimeout="9000" OnGetReport="StiWebViewer1_OnGetReport" runat="server" />--%>
        <%--ScrollbarsMode="true" ShowDesignButton="true"  OnDesignReport="StiWebViewer1_DesignReport"--%>
            <%--OnPrintReport="StiWebViewer1_PrintReport"--%>

        <cc1:StiWebViewer ID="StiWebViewer1" ShowExportToExcel="true"
            ShowExportToExcelXml="true"
            ShowExportToExcel2007="true"
            ShowExportDialog="false"
            StoreExportSettings="false"
            RightToLeft="true"
            Localization="Localization/ar.xml"
            RequestTimeout="1000000" runat="server" CacheMode="StringCache" CacheItemPriority="High" />
    </form>
</body>
</html>
