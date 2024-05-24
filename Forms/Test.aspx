<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="Re3ayaApp.Forms.Test" %>

<%@ Register Src="~/Forms/us/ucPatientVisitDiagnoseAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitDiagnoseAdd" %>
<%@ Register Src="~/Forms/us/ucPatientVisitResidenceAdd.ascx" TagPrefix="uc1" TagName="ucPatientVisitResidenceAdd" %>





<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">


   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%--    <uc1:ucPatientVisitDiagnoseAdd runat="server" id="ucPatientVisitDiagnoseAdd" />--%>
    <uc1:ucPatientVisitResidenceAdd runat="server" ID="ucPatientVisitResidenceAdd" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    
    
    
    <%: Scripts.Render("~/Forms/js/jsucPatientVisitDiagnoseAdd.js") %>
   
</asp:Content>
