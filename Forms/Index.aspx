<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Re3ayaApp.Forms.Index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderHead" runat="server">

    <webopt:BundleReference runat="server" Path="~/Css/amcharts" />
    <style>
        #chartdiv, #chartdiv2, #chartdiv3, #chartdiv4 {
            width: 100%;
            height: 550px;
        }

        .table {
            font-weight: bold !important;
        }

            .table .thead-dark th {
                color: #fff;
                background-color: #212529;
                border-color: #32383e;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="row">
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">إجمالى المرضي الحاليين</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">

                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 650px;">
                    <div class="col-md-12">
                        <table class="table thead-dark" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblPatientVisitOnBedCount1" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R1">المرضي على الاسرة 0 </a></th>
                                    <th><a id="lblPatientVisitWaitingCount1" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R2">قائمة الإنتظار 0</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div id="chartdiv" style="height: 400px;" dir="rtl"></div>
                    </div>
                    <div class="col-md-12">
                        <table class="table" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblPatientVisitOnBedCount2" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R1">المرضي على الاسرة 0 </a></th>
                                    <th><a id="lblPatientVisitWaitingCount2" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R2">قائمة الإنتظار 0</a></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="color: #b73377"><span id="lblPatientVisitOnBedWithVentilatorCount">يستخدم جهاز تنفس 0</span></td>
                                    <td style="color: #31d81d"><span id="lblPatientVisitWaitingWithVentilatorCount">يحتاج جهاز تنفس 0</span></td>
                                </tr>
                                <tr>
                                    <td style="color: #2da9d9"><span id="lblPatientVisitOnBedWithoutVentilatorCount">لا يستخدم جهاز تنفس 0</span></td>

                                    <td style="color: #d8731d"><span id="lblPatientVisitWaitingWithoutVentilatorCount">لا يحتاج جهاز تنفس 0</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">إجمالى الأسرة</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">

                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 650px;">
                    <div class="col-md-12">
                        <table class="table thead-dark" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblBedOccupiedCount" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R3">المشغولة 0</a></th>
                                    <th style="color: #31d81d;"><a id="lblBedEmptyCount" href="#" data-toggle="modal" style="color: #31d81d; text-decoration: none" data-target="#R4">المتاحة 0 </a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div id="chartdiv2" style="height: 400px;" dir="rtl"></div>
                    </div>
                    <div class="col-md-12">
                        <table class="table" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblBedMaintenanceCount" href="#" data-toggle="modal" style="font-weight: bold; color: red" data-target="#R7"> الصيانة 0</a></th>
                                    <th><a id="lblBedMaintenanceCost" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R7">التكلفة التقديرية 00,000 الف</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">إجمالى اجهزة التنفس</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">
                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body" style="height: 650px;">
                    <div class="col-md-12">
                        <table class="table thead-dark" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th style="color: #31d81d;"><a id="lblVentilatorOccupiedCount" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R5">المشغولة 0</a></th>
                                    <th style="color: #31d81d;"><a id="lblVentilatorEmptyCount" href="#" data-toggle="modal" style="color: #31d81d; text-decoration: none" data-target="#R6">المتاح 0 </a> </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-md-12">
                        <div id="chartdiv3" style="height: 400px;" dir="rtl"></div>
                    </div>
                    <div class="col-md-12">
                        <table class="table" style="text-align: center;">
                            <thead class="thead-dark">
                                <tr>
                                    <th><a id="lblVentilatorMaintenanceCount" href="#" data-toggle="modal" style="font-weight: bold; color: red" data-target="#R8"> الصيانة 0</a></th>
                                    <th><a id="lblVentilatorMaintenanceCost" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R8">التكلفة التقديرية 00,000 الف</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 col-xs-12 col-sm-12">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <span class="caption-subject bold uppercase font-dark">مخزون الأكسجين</span>
                        <span class="caption-helper"></span>
                    </div>
                    <div class="actions">

                        <a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#" data-original-title="" title=""></a>
                    </div>
                </div>
                <div class="portlet-body">
                    <div id="chartdiv4" style="height: 500px;"></div>
                </div>
            </div>
        </div>
    </div>



    <!-- Modal -->
    <div class="modal fade" id="R1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">المرضى على الأسرة</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="ICUPatientTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">قائمة الانتظار </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="WaitingPatientTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الاسرة المشغوله </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalBedInUseTable"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="R4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">عدد الاسره المتاحه </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalBedAvailableTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الأجهزة المشغولة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="VentilatorOccupiedTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R6" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الأجهزة المتاحة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="VentilatorAvailableTable"></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="R7" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">أسرة الصيانة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalBedMaintenanceTable"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R8" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الأجهزة بالصيانة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="HospitalVentilatorMaintenanceTable"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/Script/amcharts") %>

    <script type="text/javascript">

        var HospitalId = null;

        $(function () {
            $("#ICUPatientTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardICUPatientTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "المرضى",
                        dataField: "HospitalICUPatientCount"
                    },
                    {
                        caption: "Brain Stroke",
                        dataField: "BrainStroke",
                        dataType: "number"
                    },
                    {
                        caption: "CKD",
                        dataField: "CKD",
                        dataType: "number"
                    },
                    {
                        caption: "Covid-19",
                        dataField: "Covid19",
                        dataType: "number"
                    },
                    {
                        caption: "DM",
                        dataField: "DM",
                        dataType: "number"
                    },
                    {
                        caption: "HTN",
                        dataField: "HTN",
                        dataType: "number"
                    },
                    {
                        caption: "IHD",
                        dataField: "IHD",
                        dataType: "number"
                },
                {
                    caption: "Liver Cirrhosis",
                    dataField: "LiverCirrhosis",
                    dataType: "number"
                },
                {
                    caption: "Septic Shock",
                    dataField: "SepticShock",
                    dataType: "number"
                },
                {
                    caption: "Surgical Condition",
                    dataField: "SurgicalCondition",
                    dataType: "number"
                },
                {
                    caption: "TRUMA",
                    dataField: "TRUMA",
                    dataType: "number"
                }
                ],
            });

            $("#WaitingPatientTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardWaitingPatientTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "المرضى",
                        dataField: "HospitalICUPatientCount"
                    },
                    {
                        caption: "Brain Stroke",
                        dataField: "BrainStroke",
                        dataType: "number"
                    },
                    {
                        caption: "CKD",
                        dataField: "CKD",
                        dataType: "number"
                    },
                    {
                        caption: "Covid-19",
                        dataField: "Covid19",
                        dataType: "number"
                    },
                    {
                        caption: "DM",
                        dataField: "DM",
                        dataType: "number"
                    },
                    {
                        caption: "HTN",
                        dataField: "HTN",
                        dataType: "number"
                    },
                    {
                        caption: "IHD",
                        dataField: "IHD",
                        dataType: "number"
                    },
                    {
                        caption: "Liver Cirrhosis",
                        dataField: "LiverCirrhosis",
                        dataType: "number"
                    },
                    {
                        caption: "Septic Shock",
                        dataField: "SepticShock",
                        dataType: "number"
                    },
                    {
                        caption: "Surgical Condition",
                        dataField: "SurgicalCondition",
                        dataType: "number"
                    },
                    {
                        caption: "TRUMA",
                        dataField: "TRUMA",
                        dataType: "number"
                    }
                ],
            });

            $("#HospitalBedInUseTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalBedInUseTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "الأسـرة",
                        dataField: "HospitalBedCount"
                    },
                    {
                        caption: "رعاية جراحة",
                        dataField: "Re3ayaGera7a",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "Mo5wA3sab",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية قلبية",
                        dataField: "Re3ayaKalbeya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية صدرية",
                        dataField: "Re3ayaSadrya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية باطنة",
                        dataField: "Re3ayaBatna",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية مبتسرين",
                        dataField: "Re3ayaMobtsren",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية اطفال",
                        dataField: "Re3ayaKids",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية حوادث",
                        dataField: "Re3ayaAccedent",
                        dataType: "number"
                    }
                ],
            });

            $("#HospitalBedAvailableTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalBedAvailableTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "الأسـرة",
                        dataField: "HospitalBedCount"
                    },
                    {
                        caption: "رعاية جراحة",
                        dataField: "Re3ayaGera7a",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "Mo5wA3sab",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية قلبية",
                        dataField: "Re3ayaKalbeya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية صدرية",
                        dataField: "Re3ayaSadrya",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية باطنة",
                        dataField: "Re3ayaBatna",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية مبتسرين",
                        dataField: "Re3ayaMobtsren",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية اطفال",
                        dataField: "Re3ayaKids",
                        dataType: "number"
                    },
                    {
                        caption: "رعاية حوادث",
                        dataField: "Re3ayaAccedent",
                        dataType: "number"
                    }
                ],
            });

            $("#VentilatorOccupiedTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalVentilatorInUseTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Code",
                        dataField: "HospitalID",
                        width: 150
                    }, {
                        caption: "المستشفى",
                        dataField: "HospitalName"
                    },
                    {
                        caption: "عدد الأجهزة",
                        dataField: "HospitalVentilatorCount",
                        dataType: "number"
                    }
                ],
            });

            $("#VentilatorAvailableTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalVentilatorAvailableTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Code",
                        dataField: "HospitalID",
                        width: 150
                    }, {
                        caption: "المستشفى",
                        dataField: "HospitalName"
                    },
                    {
                        caption: "عدد الأجهزة",
                        dataField: "HospitalVentilatorCount",
                        dataType: "number"
                    }
                ],
            });

            $("#HospitalBedMaintenanceTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalBedID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalBedMaintenanceTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Hospital Name",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "Bed No",
                        dataField: "HospitalBedNo"
                    },
                    {
                        caption: "Room No",
                        dataField: "HospitalRoomNo",
                        dataType: "number"
                    }, {
                        caption: "State",
                        dataField: "HospitalBedStateTitle"
                    }, {
                        caption: "Maintenance Cost",
                        dataField: "HospitalEquipmentCost"
                    }
                ],
            });

            $("#HospitalVentilatorMaintenanceTable").dxDataGrid({
                dataSource: DevExpress.data.AspNet.createStore({
                    key: "HospitalVentilatorID",
                    loadUrl: urlRoot + "/api/HospitalDashboard/MasterDashboardHospitalVentilatorMaintenanceTable/" + HospitalId,
                }),
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "Hospital Name",
                        dataField: "HospitalName",
                        width: 150
                    }, {
                        caption: "Ventilator No",
                        dataField: "VentilatorNo"
                    },
                    {
                        caption: "Serial No",
                        dataField: "VentilatorSerialNo",
                        dataType: "number"
                    }, {
                        caption: "State",
                        dataField: "HospitalVentilatorStateTitle"
                    }, {
                        caption: "Maintenance Cost",
                        dataField: "HospitalEquipmentCost"
                    }
                ],
            });
        });


        function BindAllDashboard() {
            var ID = 0;
            $.get(urlRoot + '/api/HospitalDashboard/GetDashboardData/' + ID, function (respnose) {
                BindHospitalsPatient(respnose.AllPatientVisitTotalCount, respnose.PatientVisitTotalCount,
                    respnose.PatientVisitOnBedCount, respnose.PatientVisitOnBedWithVentilatorCount, respnose.PatientVisitOnBedWithoutVentilatorCount,
                    respnose.PatientVisitWaitingCount, respnose.PatientVisitWaitingWithVentilatorCount, respnose.PatientVisitWaitingWithoutVentilatorCount,
                    respnose.PatientVisitOutBedCount, respnose.PatientVisitOutBedWithVentilatorCount, respnose.PatientVisitOutBedWithoutVentilatorCount);

                BindHospitalsBeds(respnose.BedTotalCount, respnose.BedEmptyCount, respnose.BedOccupiedCount, respnose.BedReadyCount,
                    respnose.BedMaintenanceCount, respnose.BedMaintenanceCost);


                BindHospitalsVentilator(respnose.VentilatorTotalCount, respnose.VentilatorEmptyCount, respnose.VentilatorOccupiedCount,
                    respnose.VentilatorReadyCount, respnose.VentilatorMaintenanceCount, respnose.VentilatorMaintenanceCost);

                BindHospitalsOxogen(JSON.parse(respnose.OxygenJsonRate));
            })
        };
        $(document).ready(function () {
            BindAllDashboard();

            //BindHospitalsBeds();
            //BindHospitalsPatient();
            //BindHospitalsVentilator();
            //BindHospitalsOxogen(HospitalsOxogen);
        });


        // Create chart instance
        function BindHospitalsPatient(AllPatientVisitTotalCount, PatientVisitTotalCount, PatientVisitOnBedCount, PatientVisitOnBedWithVentilatorCount, PatientVisitOnBedWithoutVentilatorCount,
            PatientVisitWaitingCount, PatientVisitWaitingWithVentilatorCount, PatientVisitWaitingWithoutVentilatorCount,
            PatientVisitOutBedCount, PatientVisitOutBedWithVentilatorCount, PatientVisitOutBedWithoutVentilatorCount) {
            $('#lblPatientVisitOnBedCount1').text('المرضي على الاسرة ' + PatientVisitOnBedCount);
            $('#lblPatientVisitOnBedCount2').text('المرضي على الاسرة ' + PatientVisitOnBedCount);

            $('#lblPatientVisitWaitingCount1').text('قائمة الإنتظار ' + PatientVisitWaitingCount);
            $('#lblPatientVisitWaitingCount2').text('قائمة الإنتظار ' + PatientVisitWaitingCount);

            $('#lblPatientVisitOnBedWithVentilatorCount').text('يحتاج تنفس صناعي ' + PatientVisitOnBedWithVentilatorCount);
            $('#lblPatientVisitOnBedWithoutVentilatorCount').text('لا يحتاج تنفس صناعي ' + PatientVisitOnBedWithoutVentilatorCount);

            $('#lblPatientVisitWaitingWithVentilatorCount').text('يحتاج تنفس صناعي ' + PatientVisitWaitingWithVentilatorCount);
            $('#lblPatientVisitWaitingWithoutVentilatorCount').text('لا يحتاج تنفس صناعي ' + PatientVisitWaitingWithoutVentilatorCount);


            // am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            chart.rtl = true;
            // Let's cut a hole in our Pie chart the size of 40% the radius
            chart.innerRadius = am4core.percent(30);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.innerRadius = 10;
            pieSeries.slices.template.fillOpacity = 0.4;

            pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
            pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
            pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
            // pieSeries.slices.template.propertyFields.fill = "color";
            //pieSeries2.labels.template.fontSize = 20;
            pieSeries.labels.template.text = "{category}: {value}";
            pieSeries.slices.template.tooltipText = "{category}: {value}";
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;


            // Add data
            pieSeries.data = [{
                "category": "قائمة الإنتظار",
                "value": PatientVisitWaitingCount,//data.pieSeries.TotalWaiting,
                "fill": "#2da9d9"
            }, {
                "category": "المرضي على الاسرة",
                "value": PatientVisitOnBedCount,//data.pieSeries.TotalRegister,
                "fill": "#8b8b8c",
                //"labelDisabled": true
            }];

            // Disable sliding out of slices
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries.slices.template.propertyFields.fill = "fill";
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
            // Add second series
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "value";
            pieSeries2.dataFields.category = "category";
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries2.slices.template.propertyFields.fill = "fill";

            pieSeries2.labels.template.text = "{category}: {value}";
            pieSeries2.slices.template.tooltipText = "{category}: {value}";


            pieSeries2.ticks.template.disabled = true;
            pieSeries2.labels.template.disabled = true;


            pieSeries2.data = [
                {
                    "category": "يحتاج جهاز تنفس",
                    "value": PatientVisitWaitingWithVentilatorCount,//data.pieSeries2.TotalWaitingVentilatorNeeded,
                    "fill": "#31d81d"
                }, {
                    "category": "لا يحتاج جهاز تنفس",
                    "value": PatientVisitWaitingWithoutVentilatorCount,// data.pieSeries2.TotalWaitingVentilatorNotNeeded,
                    'fill': "#d8731d"
                }, {
                    "category": "يستخدم جهاز تنفس",
                    "value": PatientVisitOnBedWithVentilatorCount,//data.pieSeries2.TotalRegisterPatientVentilatorNeeded,
                    "fill": "#b73377"
                }, {
                    "category": "لا يستخدم جهاز تنفس",
                    "value": PatientVisitOnBedWithoutVentilatorCount, // data.pieSeries2.TotalRegisterPatientVentilatorNotNeeded,
                    "fill": "#2da9d9"
                },];


            pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(40);
            })

            pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(60);
            })

            pieSeries.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(100);
            })

            pieSeries2.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(80);
            })
            var label = chart.seriesContainer.createChild(am4core.Label);
            //label.html = '<div style="color:#902c2d !important">' + (data.pieSeries.TotalWaiting + data.pieSeries.TotalRegister) + '</div>';

            label.html = '<div style="color:#902c2d !important">' + PatientVisitTotalCount + ' مريض</div>';
            label.horizontalCenter = "middle";
            label.textAlign = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 20;
        }

        function BindHospitalsBeds(BedTotalCount,
            BedEmptyCount,
            BedOccupiedCount,
            BedReadyCount,
            BedMaintenanceCount,
            BedMaintenanceCost) {

            $('#lblBedEmptyCount').text('الأسرة المتاحة ' + BedReadyCount);
            $('#lblBedOccupiedCount').text('الأسرة المشغولة ' + BedOccupiedCount);

            $('#lblBedMaintenanceCount').text('اجهزة الصيانة ' + BedMaintenanceCount);
            $('#lblBedMaintenanceCost').text('تكاليف الصيانة ' + BedMaintenanceCost);

            // am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv2", am4charts.PieChart);
            chart.rtl = true;
            // Let's cut a hole in our Pie chart the size of 40% the radius
            chart.innerRadius = am4core.percent(30);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.innerRadius = 10;
            pieSeries.slices.template.fillOpacity = 0.4;

            pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
            pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
            pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
            // pieSeries.slices.template.propertyFields.fill = "color";
            //pieSeries2.labels.template.fontSize = 20;
            pieSeries.labels.template.text = "{category}: {value}";
            pieSeries.slices.template.tooltipText = "{category}: {value}";
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;

            // Add data
            pieSeries.data = [{
                "category": "عدد الاسرة",
                "value": BedEmptyCount,
                "labelDisabled": true
            }, {
                "category": "المشغولة",
                "value": BedOccupiedCount,
            }];

            // Disable sliding out of slices
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries.slices.template.propertyFields.fill = "fill";
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
            // Add second series
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "value";
            pieSeries2.dataFields.category = "category";
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries2.slices.template.propertyFields.fill = "fill";

            pieSeries2.labels.template.text = "{category}: {value}";
            pieSeries2.slices.template.tooltipText = "{category}: {value}";


            pieSeries2.ticks.template.disabled = true;
            pieSeries2.labels.template.disabled = true;

            // Add data
            pieSeries2.data = [
                {
                    "category": "تعمل",
                    "value": BedReadyCount,
                    "fill": "#31d81d"

                }, {
                    "category": "صيانة",
                    "value": BedMaintenanceCount,
                    "fill": "#ff0000"
                }, {
                    "category": "المشغولة",
                    "value": BedOccupiedCount,
                    "fill": "#2da9d9"
                },];


            pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(40);
            })

            pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(60);
            })

            pieSeries.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(100);
            })

            pieSeries2.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(80);
            })
            var label = chart.seriesContainer.createChild(am4core.Label);
            //label.html = '<div style="color:#902c2d !important">' + (data.pieSeries.TotalWaiting + data.pieSeries.TotalRegister) + '</div>';

            label.html = '<div style="color:#902c2d !important">' + BedTotalCount + ' سرير</div>';
            label.horizontalCenter = "middle";
            label.textAlign = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 20;
        }

        function BindHospitalsVentilator(VentilatorTotalCount, VentilatorEmptyCount, VentilatorOccupiedCount,
            VentilatorReadyCount, VentilatorMaintenanceCount, VentilatorMaintenanceCost) {

            $('#lblVentilatorEmptyCount').text('الاجهزة المتاحة ' + VentilatorReadyCount);
            $('#lblVentilatorOccupiedCount').text('الاجهزة المشغولة ' + VentilatorOccupiedCount);

            $('#lblVentilatorMaintenanceCount').text('أجهزة الصيانة ' + VentilatorMaintenanceCount);
            $('#lblVentilatorMaintenanceCost').text('تكاليف الصيانة ' + VentilatorMaintenanceCost);

            // am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            var chart = am4core.create("chartdiv3", am4charts.PieChart);
            chart.rtl = true;
            // Let's cut a hole in our Pie chart the size of 40% the radius
            chart.innerRadius = am4core.percent(30);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.innerRadius = 10;
            pieSeries.slices.template.fillOpacity = 0.4;

            pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
            pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
            pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
            // pieSeries.slices.template.propertyFields.fill = "color";
            //pieSeries2.labels.template.fontSize = 20;
            pieSeries.labels.template.text = "{category}: {value}";
            pieSeries.slices.template.tooltipText = "{category}: {value}";
            pieSeries.ticks.template.disabled = true;
            pieSeries.labels.template.disabled = true;

            // Add data
            pieSeries.data = [{
                "category": "عدد الاجهزة",
                "value": VentilatorEmptyCount,
                "labelDisabled": true
            }, {
                "category": "المشغول",
                "value": VentilatorOccupiedCount,
            }];

            // Disable sliding out of slices
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries.slices.template.propertyFields.fill = "fill";
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
            // Add second series
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "value";
            pieSeries2.dataFields.category = "category";
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
            pieSeries2.slices.template.propertyFields.fill = "fill";

            pieSeries2.labels.template.text = "{category}: {value}";
            pieSeries2.slices.template.tooltipText = "{category}: {value}";


            pieSeries2.ticks.template.disabled = true;
            pieSeries2.labels.template.disabled = true;
            // Add data
            pieSeries2.data = [
                {
                    "category": "يعمل",
                    "value": VentilatorReadyCount,
                    "fill": "#31d81d"

                }, {
                    "category": "صيانة",
                    "value": VentilatorMaintenanceCount,

                    "fill": "#f00"
                }, {
                    "category": "المشغول",
                    "value": VentilatorOccupiedCount,
                    "fill": "#045d80"
                },];



            pieSeries.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(40);
            })

            pieSeries2.adapter.add("innerRadius", function (innerRadius, target) {
                return am4core.percent(60);
            })

            pieSeries.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(100);
            })

            pieSeries2.adapter.add("radius", function (innerRadius, target) {
                return am4core.percent(80);
            })
            var label = chart.seriesContainer.createChild(am4core.Label);
            //label.html = '<div style="color:#902c2d !important">' + (data.pieSeries.TotalWaiting + data.pieSeries.TotalRegister) + '</div>';

            label.html = '<div style="color:#902c2d !important">' + VentilatorTotalCount + ' جهاز</div>';
            label.horizontalCenter = "middle";
            label.textAlign = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 20;
        }

        function BindHospitalsOxogen(data) {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create("chartdiv4", am4charts.XYChart3D);
            chart.rtl = true;
            var titledata = 0;
            $.map(data, function (n, i) {
                return titledata = n.value1 - n.value2 
            });
            var title = chart.titles.create();
            title.text = 'Total ' + titledata + ' L '
            title.fontSize = 16;
            title.marginBottom = 20;
            // Add chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";
            // Legend
            //chart.legend = new am4charts.Legend();
            //chart.legend.fontSize = 12;
            //chart.legend.position = "right";
            //chart.legend.valign = "top";
            //chart.legend.marginTop = 0;
            //chart.legend.labels.template.width = 130;
            //chart.legend.labels.template.truncate = true;
            //chart.legend.valueLabels.template.text = "{category}"
            //chart.legend.valueLabels.template.fontSize = 12;
            // Add data'
            chart.data = data;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "Name";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.grid.template.strokeOpacity = 0;
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 50;
            //categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;



            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.strictMinMax = false;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.title.fontWeight = "bold";

            // Create series
            var series1 = chart.series.push(new am4charts.ConeSeries());
            //chart.colors("#f92672");
            series1.dataFields.valueY = "value1";
            series1.dataFields.categoryX = "Name";
            series1.columns.template.width = am4core.percent(80);
            series1.columns.template.fillOpacity = 0.9;
            series1.columns.template.strokeOpacity = 1;
            series1.columns.template.strokeWidth = 2;
            series1.tooltipText = "{categoryX}: [bold]{valueY}[/] L ";

            //var categoryLabel = series1.bullets.push(new am4charts.LabelBullet());
            //categoryLabel.label.text = "{day} ساعة";
            //// categoryLabel.label.horizontalCenter = "top";
            //categoryLabel.label.dy = -20;
            //categoryLabel.label.fill = am4core.color("#000");
            //categoryLabel.label.hideOversized = false;
            //categoryLabel.label.truncate = false;


            var series2 = chart.series.push(new am4charts.ConeSeries());
            series2.dataFields.valueY = "value2";
            series2.dataFields.categoryX = "Name";
            series2.stacked = true;
            series2.columns.template.width = am4core.percent(80);
            series2.columns.template.fill = am4core.color("#000");
            series2.columns.template.fillOpacity = 0.1;
            series2.columns.template.stroke = am4core.color("#000");
            series2.columns.template.strokeOpacity = 0.2;
            series2.columns.template.strokeWidth = 2;
            series2.tooltipText = "{categoryX}: [bold]{valueY}[/]  L ";


            var categoryLabel2 = series2.bullets.push(new am4charts.LabelBullet());
            categoryLabel2.label.text = "{day}";
             //categoryLabel.label.horizontalCenter = "top";
            categoryLabel2.label.dy = -30;
            categoryLabel2.label.fill = am4core.color("#000");
            categoryLabel2.label.hideOversized = false;
            categoryLabel2.label.truncate = false;
        }

        function FormatFutureDate(date) {
            var result = '';

            var startdate = new Date(); var enddate = new Date(date);
            // get total seconds between the times
            var delta = Math.abs(startdate - enddate) / 1000;

            // calculate (and subtract) whole days
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;

            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;

            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            // what's left is seconds
            var seconds = delta % 60;  // in theory the modulus is not required
            if (days > 1)
                result += days + " ي"
            if (hours > 1)
                result += hours + " س"
            if (minutes > 1)
                result += minutes + " د"
            if (days < 1 && hours < 1 && minutes < 1)
                result = "اقل من دقيقة"
            return result;
        }
    </script>
</asp:Content>
