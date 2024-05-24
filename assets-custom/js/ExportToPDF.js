
/****************** Function to export HTML to PDF by NReco (based on WkHtmlToPdf tool)  *******************/
/****************** Created by Coding Keeda *******************/
/************ download from http://www.nrecosite.com/pdf_generator_net.aspx **************************************/
/************ Documentation http://www.nrecosite.com/doc/NReco.PdfGenerator/ *******************/



function ExportToPDF(DivName,TableColumnHide,ReportHeading,PageType) {

    /// <summary>Function to convert HTML to PDF.</summary>
    /// <param name="DivName">Name of the Div  with selector which contains all the html to print.</param>
    /// <param name="TableColumnHide" type="array">Pass array of columns to be hidden like [2,5,6] in a Table.</param>
    /// <param name="ReportHeading">Heading of the Report</param>
    /// <param name="PageType">Provide page type from enum PDFPageType </param>
    /// <returns>PDF File</returns>

    //Below commented code can be added to HTML provided to printContents variable.AppPath is written instead of ~ or ../ beacause This DLL accepts full path for images,external css etc.Keep it in mind.
    //AppPath keyword will be handled in Handler by replacing it with full application path.:)

    //<img src="AppPath/Images/CodingKeeda.jpg" width="50px" height="50px"/>  //Image

    //<link href="AppPath/Style/Style.css" rel="stylesheet" />  //external css

    //<style type="text/css">*{font-family:Mangal;}</style>  //inline css   //You can provide inline css directly like this.uncomment it and cut and paste it in printContents html.


    var PDFtable = DivName.find('table');
    if (TableColumnHide) {
        $.each(TableColumnHide, function (index, value) {
            PDFtable.find('td:nth-child(' + value + '),th:nth-child(' + value + ')').hide();  //hiding the columns of the table inside Div
        });
    }

    // Nouh
    var Tables = "";
    for (i = 0; i < PDFtable.length; i++)
    {        
        //var id = PDFtable[i].id;
        //var sums = Array();
        //var length = $("#" + id + " > thead > tr:nth-child(3) > th").length + $("#" + id + " > thead > tr:nth-child(2) > th:not(:first-child)[rowspan=2]").length;
        //for (var j = 0; j < length; j++) sums.push(0);
        //var row = "<tr><td></td>";
        //$("#" + id + " > thead > tr:nth-child(3) > th").each(function (index, element) {
        //    //console.log($(this).text());
        //    $("#" + id + " > tbody > tr > td[data-name='" + $(this).text() + "']").each(function () {
        //        sums[index] += parseFloat($(this).text());
        //    });
        //    row += "<td>" + sums[index] + "</td>";
        //});
        //row += "</tr>";
        //console.log(sums);
        //var table = $("<div/>").html(PDFtable[i].outerHTML).contents();
        //table.find('> tbody > tr:last-child').append(row);
        Tables += PDFtable[i].outerHTML;
    }
    PDFtable.attr('border', '1');//applied 1 to table attribute border so we can get border in the Table 
    var printContents = '<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><style type="text/css">table {page-break-after: always;border-collapse: collapse;font-size: 13px;text-align:center;width: 100%;} table:last-child{page-break-after: avoid} th {background-color: #3598dc;color: white; padding: 3px;} td {padding: 3px;} table, th, td {border: 1px solid black;}</style></head><body><div style="font-size: 25px;" ><center>' + ReportHeading + '</center></div><br />' + Tables + '</body></html>';

    $('body').prepend("<form method='post' action='ws/ExportHandler.ashx' id='tempForm'><input type='hidden' name='data' value='" + printContents + "' ><input type='hidden' name='PageType' value='" + PageType + "' ></form>");
    $('#tempForm').submit();
    $("tempForm").remove(); 
    if (TableColumnHide) {
        $.each(TableColumnHide, function (index, value) {
            PDFtable.find('td:nth-child(' + value + '),th:nth-child(' + value + ')').show(); // //Again Showing the columns of the table inside Div
        });
    }
}

/// <summary>Enum for Page Type</summary>
var PDFPageType = {
    Default: 'Default',
    Portrait: 'Portrait',
    Landscape: 'Landscape'
}



