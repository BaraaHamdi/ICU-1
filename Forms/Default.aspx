<%@ Page Title="" Language="C#" MasterPageFile="~/Forms/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Re3ayaApp.Forms.Default" %>

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
                                    <th><a id="lblPatientVisitOnBedCount1" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R1">المرضي على الاسرة 180 </a></th>
                                    <th><a id="lblPatientVisitWaitingCount1" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R2">قائمة الإنتظار 50</a></th>
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
                                    <th><a id="lblPatientVisitOnBedCount2" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R1">المرضي على الاسرة 180 </a></th>
                                    <th><a id="lblPatientVisitWaitingCount2" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R2">قائمة الإنتظار 50</a></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="color: #b73377"><span id="lblPatientVisitOnBedWithVentilatorCount">يستخدم جهاز تنفس 80</span></td>
                                    <td style="color: #31d81d"><span id="lblPatientVisitWaitingWithVentilatorCount">يحتاج جهاز تنفس 25</span></td>
                                </tr>
                                <tr>
                                    <td style="color: #2da9d9"><span id="lblPatientVisitOnBedWithoutVentilatorCount">لا يستخدم جهاز تنفس 100</span></td>

                                    <td style="color: #d8731d"><span id="lblPatientVisitWaitingWithoutVentilatorCount">لا يحتاج جهاز تنفس 25</span></td>
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
                                    <th id="lblBedEmptyCount" style="color: #31d81d;"><a href="#" data-toggle="modal" style="color: #31d81d; text-decoration: none" data-target="#R3">المتاحة 45 </a></th>
                                    <th><a id="lblBedOccupiedCount" href="#" data-toggle="modal" style="color: white; text-decoration: none" data-target="#R4">المشغولة 180</a></th>
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
                                    <th id="lblBedMaintenanceCount" style="font-weight: bold; color: red"><a href="#" data-toggle="modal" style="color: red; text-decoration: none" data-target="#R5">الصيانة 7</a></th>
                                    <th id="lblBedMaintenanceCost">التكلفة التقديرية 40,900 الف</th>
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
                                    <th id="lblVentilatorEmptyCount" style="color: #31d81d;">المتاح 25 </th>
                                    <th id="lblVentilatorOccupiedCount">المشغول 75</th>
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
                                    <th id="lblVentilatorMaintenanceCount" style="font-weight: bold; color: red"><a href="#" data-toggle="modal" style="color: red; text-decoration: none" data-target="#R6">الصيانة 3</a></th>
                                    <th id="lblVentilatorMaintenanceCost">التكلفة التقديرية 72,900 الف</th>
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
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">المرضى على الأسرة</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="gridR1"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">قائمة الانتظار </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="gridR2"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">عدد الاسره المتاحه </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="gridR3"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">الاسرة المشغوله </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="gridR4"></div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="R5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">صيانة الأسرة </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="gridR5"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="R6" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">صيانة اجهزة التنفس </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="gridR6"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Footer" runat="server">
    <%: Scripts.Render("~/Script/amcharts") %>

    <script type="text/javascript">



        var HospitalId = null;

        var HospitalsOxogen = [
            {
                "id": 1,
                "Name": 'المنيرة',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 2,

                "sadr": 14,
                "batna": 6,
                "kalb": 2,
                "mokk": 2,
                "graha": 1,
                "horok": 1,

                "wsadr": 4,
                "wbatna": 2,
                "wkalb": 2,
                "wmokk": 0,
                "wgraha": 1,
                "whorok": 1,


            },
            {
                "id": 2,
                "Name": "شبرا",
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 3,

                "sadr": 10,
                "batna": 10,
                "kalb": 1,
                "mokk": 2,
                "graha": 2,
                "horok": 1,

                "wsadr": 2,
                "wbatna": 0,
                "wkalb": 1,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,


            },
            {
                "id": 3,
                "Name": 'الخزندار',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 1,

                "sadr": 7,
                "batna": 1,
                "kalb": 2,
                "mokk": 0,
                "graha": 1,
                "horok": 0,

                "wsadr": 3,
                "wbatna": 1,
                "wkalb": 2,
                "wmokk": 0,
                "wgraha": 1,
                "whorok": 0,


            },
            {
                "id": 4,
                "Name": 'منشية البكري',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 4,

                "sadr": 6,
                "batna": 5,
                "kalb": 4,
                "mokk": 5,
                "graha": 7,
                "horok": 0,

                "wsadr": 3,
                "wbatna": 3,
                "wkalb": 1,
                "wmokk": 1,
                "wgraha": 0,
                "whorok": 0,

            },
            {
                "id": 5,
                "Name": 'حلوان',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 5,

                "sadr": 4,
                "batna": 4,
                "kalb": 4,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 0,
                "wbatna": 0,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,

            },
            {
                "id": 6,
                "Name": 'روض الفرج',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 1,

                "sadr": 2,
                "batna": 1,
                "kalb": 1,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 1,
                "wbatna": 0,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,


            },
            {
                "id": 7,
                "Name": 'عين شمس',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 3,

                "sadr": 3,
                "batna": 1,
                "kalb": 2,
                "mokk": 1,
                "graha": 0,
                "horok": 0,

                "wsadr": 1,
                "wbatna": 1,
                "wkalb": 2,
                "wmokk": 1,
                "wgraha": 0,
                "whorok": 0,


            },
            {
                "id": 8,
                "Name": 'القاهرة الجديدة',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 4,

                "sadr": 2,
                "batna": 0,
                "kalb": 0,
                "mokk": 0,
                "graha": 1,
                "horok": 1,

                "wsadr": 2,
                "wbatna": 0,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 1,
                "whorok": 1,

            },
            {
                "id": 9,
                "Name": 'الشروق',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 2,

                "sadr": 0,
                "batna": 0,
                "kalb": 0,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 0,
                "wbatna": 0,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,

            },
            {
                "id": 10,
                "Name": 'التبين',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 7,

                "sadr": 0,
                "batna": 1,
                "kalb": 1,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 0,
                "wbatna": 1,
                "wkalb": 1,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,

            },
            {
                "id": 11,
                "Name": 'صدر العباسية',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 2,

                "sadr": 5,
                "batna": 1,
                "kalb": 0,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 5,
                "wbatna": 1,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,


            },
            {
                "id": 12,
                "Name": 'حميات العباسية',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 3,

                "sadr": 2,
                "batna": 0,
                "kalb": 0,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 2,
                "wbatna": 0,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,

            },
            {
                "id": 13,
                "Name": 'حميات حلوان',
                "value1": Math.floor(Math.random() * 10000),
                "value2": Math.floor(Math.random() * 10000),
                "day": 5,

                "sadr": 2,
                "batna": 0,
                "kalb": 0,
                "mokk": 0,
                "graha": 0,
                "horok": 0,

                "wsadr": 2,
                "wbatna": 0,
                "wkalb": 0,
                "wmokk": 0,
                "wgraha": 0,
                "whorok": 0,
            },
        ];
        var HospitalTest = [
            {
                "Name": "حلوان",
                "BedName": "B01 - R01",
                "BedError": "مونوتور",
                "BedTotal": "17500",
                "VName": "V0023",
                "VError": "مضخة",
                "VTotal": "26500"
            },
            {
                "Name": "روض الفرج",
                "BedName": "B01 - R01",
                "BedError": "موتور كهربي",
                "BedTotal": "15000",
                "VName": "V0045",
                "VError": "موتور كهربي",
                "VTotal": "14000"
            },
            {
                "Name": "عين شمس",
                "BedName": "B01 - R01",
                "BedError": "طقم رفع",
                "BedTotal": "13500",
                "VName": "V0124",
                "VError": "توصيلات تالفة",
                "VTotal": "13500"
            },
            {
                "Name": "القاهرة الجديدة",
                "BedName": "B01 - R01",
                "BedError": "مولد طاقة",
                "BedTotal": "8400",
                "VName": "V1458",
                "VError": "مولد طاقة",
                "VTotal": "18400"
            }]
        $(function () {
            $("#gridR1").dxDataGrid({
                dataSource: HospitalsOxogen,
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "Name",
                        width: 150
                    }, {
                        caption: "المرضى",
                        dataField: "Name",
                        cellTemplate: function (container, options) {
                            $("<div>")
                                .append(options.data.sadr + options.data.batna + options.data.kalb + options.data.mokk + options.data.graha + options.data.horok)
                                .appendTo(container);
                        }
                    },
                    {
                        caption: "صدر",
                        dataField: "sadr",
                        dataType: "number"
                    }
                    ,
                    {
                        caption: "باطنة",
                        dataField: "batna",
                        dataType: "number"
                    },
                    {
                        caption: "قلب",
                        dataField: "kalb",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "mokk",
                        dataType: "number"
                    },
                    {
                        caption: "جراحة",
                        dataField: "graha",
                        dataType: "number"
                    },
                    {
                        caption: "حروق",
                        dataField: "horok",
                        dataType: "number"
                    }
                ],
            });

            $("#gridR2").dxDataGrid({
                dataSource: HospitalsOxogen,
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "Name",
                        width: 150
                    }, {
                        caption: "الانتظار",
                        dataField: "Name",
                        cellTemplate: function (container, options) {
                            $("<div>")
                                .append(options.data.wsadr + options.data.wbatna + options.data.wkalb + options.data.wmokk + options.data.wgraha + options.data.whorok)
                                .appendTo(container);
                        }
                    },
                    {
                        caption: "صدر",
                        dataField: "wsadr",
                        dataType: "number"
                    }
                    ,
                    {
                        caption: "باطنة",
                        dataField: "wbatna",
                        dataType: "number"
                    },
                    {
                        caption: "قلب",
                        dataField: "wkalb",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "wmokk",
                        dataType: "number"
                    },
                    {
                        caption: "جراحة",
                        dataField: "wgraha",
                        dataType: "number"
                    },
                    {
                        caption: "حروق",
                        dataField: "whorok",
                        dataType: "number"
                    }
                ],
            });

            $("#gridR3").dxDataGrid({
                dataSource: HospitalsOxogen,
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "Name",
                        width: 150
                    }, {
                        caption: "الاسرة المتاحه",
                        dataField: "Name",
                        cellTemplate: function (container, options) {
                            $("<div>")
                                .append(options.data.sadr + options.data.batna + options.data.kalb + options.data.mokk + options.data.graha + options.data.horok)
                                .appendTo(container);
                        }
                    },
                    {
                        caption: "صدر",
                        dataField: "sadr",
                        dataType: "number"
                    }
                    ,
                    {
                        caption: "باطنة",
                        dataField: "batna",
                        dataType: "number"
                    },
                    {
                        caption: "قلب",
                        dataField: "kalb",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "mokk",
                        dataType: "number"
                    },
                    {
                        caption: "جراحة",
                        dataField: "graha",
                        dataType: "number"
                    },
                    {
                        caption: "حروق",
                        dataField: "horok",
                        dataType: "number"
                    }
                ],
            });

            $("#gridR4").dxDataGrid({
                dataSource: HospitalsOxogen,
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "Name",
                        width: 150
                    }, {
                        caption: "الأسره المشغولة",
                        dataField: "Name",
                        cellTemplate: function (container, options) {
                            $("<div>")
                                .append(options.data.wsadr + options.data.wbatna + options.data.wkalb + options.data.wmokk + options.data.wgraha + options.data.whorok)
                                .appendTo(container);
                        }
                    },
                    {
                        caption: "صدر",
                        dataField: "wsadr",
                        dataType: "number"
                    }
                    ,
                    {
                        caption: "باطنة",
                        dataField: "wbatna",
                        dataType: "number"
                    },
                    {
                        caption: "قلب",
                        dataField: "wkalb",
                        dataType: "number"
                    },
                    {
                        caption: "مخ واعصاب",
                        dataField: "wmokk",
                        dataType: "number"
                    },
                    {
                        caption: "جراحة",
                        dataField: "wgraha",
                        dataType: "number"
                    },
                    {
                        caption: "حروق",
                        dataField: "whorok",
                        dataType: "number"
                    }
                ],
            });


            $("#gridR5").dxDataGrid({
                dataSource: HospitalTest,
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "Name",
                        width: 150
                    },
                    {
                        caption: "السرير",
                        dataField: "BedName",
                    }
                    ,
                    {
                        caption: "العطل",
                        dataField: "BedError",
                    },
                    {
                        caption: "التكلفة التقديرية",
                        dataField: "BedTotal",
                    }

                ],
            });

            $("#gridR6").dxDataGrid({
                dataSource: HospitalTest,
                rtlEnabled: true,
                showColumnLines: false,
                showRowLines: true,
                rowAlternationEnabled: true,
                showBorders: true,
                columns: [
                    {
                        caption: "المستشفي",
                        dataField: "Name",
                        width: 150
                    },
                    {
                        caption: "الجهاز",
                        dataField: "VName",
                    }
                    ,
                    {
                        caption: "العطل",
                        dataField: "VError",
                    },
                    {
                        caption: "التكلفة التقديرية",
                        dataField: "VTotal",
                    }

                ],
            });
        });

        $(document).ready(function () {
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
            })

            //BindHospitalsBeds();
            //BindHospitalsPatient();
            //BindHospitalsVentilator();
            BindHospitalsOxogen(HospitalsOxogen);
        })

        //function GetHospitalsPatient(HospitalId) {
        //    $.get(urlRoot + "/api/Dashboard/GetHospitalPatientStatistic/" + HospitalId, function (data) {
        //        BindHospitalsPatient(data);
        //    })
        //}

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

            $('#lblBedEmptyCount').text('الأسرة المتاحة ' + BedEmptyCount);
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

            $('#lblVentilatorEmptyCount').text('الاجهزة المتاحة ' + VentilatorEmptyCount);
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

            label.html = '<div style="color:#902c2d !important">' + VentilatorTotalCount +' جهاز</div>';
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
                return titledata += n.value2
            });
            var title = chart.titles.create();
            title.text = 'إجمالى استهلاك الاكسجين ' + titledata + ' لتر'
            title.fontSize = 20;
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
            //categoryAxis.renderer.labels.template.rotation = 280;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;



            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.grid.template.strokeOpacity = 0;
            valueAxis.strictMinMax = false;
            valueAxis.renderer.baseGrid.disabled = true;
            valueAxis.title.fontWeight = "bold";

            // Create series
            var series1 = chart.series.push(new am4charts.ConeSeries());
            series1.dataFields.valueY = "value1";
            series1.dataFields.categoryX = "Name";
            series1.columns.template.width = am4core.percent(80);
            series1.columns.template.fillOpacity = 0.9;
            series1.columns.template.strokeOpacity = 1;
            series1.columns.template.strokeWidth = 2;
            series1.tooltipText = "{categoryX}: [bold]{valueY}[/] لتر ";

            var categoryLabel = series1.bullets.push(new am4charts.LabelBullet());
            categoryLabel.label.text = "{day} يوم";
            // categoryLabel.label.horizontalCenter = "top";
            categoryLabel.label.dy = -20;
            categoryLabel.label.fill = am4core.color("#000");
            categoryLabel.label.hideOversized = false;
            categoryLabel.label.truncate = false;


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
            series2.tooltipText = "{categoryX}: [bold]{valueY}[/]  لتر ";
        }

    </script>
</asp:Content>
