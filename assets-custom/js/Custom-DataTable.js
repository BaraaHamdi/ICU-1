var DataTableCustom = function () {
    
    var Cutome1 = '';
    var Cutome2 = '';
    var Cutome3 = '';
    var Cutome4 = '';
    var Cutome5 = '';
    var Datatable1 = function () {
        Cutome1 = $(".DatatableClass:not(.Inishialized)").DataTable({
            ordering: false,
            responsive: true,
            pageLength: 10,
            lengthChange: false,
            autoWidth: false,
            select: {
                style: 'os',
                selector: 'td:not(.actionRemove)'
            },
            searching: true,
            dom: '<"PrintPaper"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: false, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: false, exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'pdf', text: 'PDF All', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'pdf', text: 'PDF Selected', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                },
                {
                    extend: 'excelHtml5', text: 'Excel All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'excelHtml5', text: 'Excel Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                },
                {
                    extend: 'copyHtml5', text: 'Copy All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'copyHtml5', text: 'Copy Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                }]
       });
        $('.DatatableClass').addClass('Inishialized');
    }
    var Datatable2 = function () {
        Cutome2 = $(".DatatableShiftSchedules").DataTable({
            ordering: false,
            responsive: true,
            pageLength: 20,
            lengthChange: false,
            autoWidth: false,
            select: true,
            searching: true,
            dom: '<"PrintPaper"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: false, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: false, exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'pdf', text: 'PDF All', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'pdf', text: 'PDF Selected', Orientation: 'Landscape', exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                },
                {
                    extend: 'excelHtml5', text: 'Excel All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'excelHtml5', text: 'Excel Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                },
                {
                    extend: 'copyHtml5', text: 'Copy All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'copyHtml5', text: 'Copy Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                }]
        });
    }
    var Datatable3 = function () {
        Cutome3 = $(".DatatableBonusTransaction").DataTable({
            ordering: false,
            responsive: true,
            pageLength: 20,
            lengthChange: false,
            autoWidth: false,
            select: true,
            searching: true,
            dom: '<"PrintPaper"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: false, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: false, exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'pdf', text: 'PDF All', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'pdf', text: 'PDF Selected', Orientation: 'Landscape', exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                },
                {
                    extend: 'excelHtml5', text: 'Excel All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'excelHtml5', text: 'Excel Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                },
                {
                    extend: 'copyHtml5', text: 'Copy All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'copyHtml5', text: 'Copy Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                }]
        });
    }
    var Datatable4 = function () {
        var Cutome4 = $('.DatatableGrouping').DataTable({
            "columnDefs": [
                { "visible": false, "targets": 0 }
            ],
            dom: '<"PrintPaper"> frtip',
            buttons: [
                 {
                     extend: 'print', text: 'Print All', autoPrint: false, exportOptions: { columns: ':not(.actionRemove)', },
                     customize: function (win) {
                         $(win.document.body).css('font-size', '9px');
                         $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                     }
                 },
                 {
                     extend: 'print', text: 'Print Selected', autoPrint: false, exportOptions: {
                         columns: ':not(.actionRemove)', modifier: { selected: true }
                     },
                     customize: function (win) {
                         $(win.document.body).css('font-size', '9px');
                         $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                     }
                 },
                 {
                     extend: 'pdf', text: 'PDF All', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', },
                 },
                 {
                     extend: 'pdf', text: 'PDF Selected', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                 },
                 {
                     extend: 'excelHtml5', text: 'Excel All', exportOptions: { columns: ':not(.actionRemove)', },
                 },
                 {
                     extend: 'excelHtml5', text: 'Excel Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                 },
                 {
                     extend: 'copyHtml5', text: 'Copy All', exportOptions: { columns: ':not(.actionRemove)', },
                 },
                 {
                     extend: 'copyHtml5', text: 'Copy Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                 }],
            ordering: false,
            "displayLength": 25,
            "drawCallback": function (settings) {
                var api = this.api();
                var rows = api.rows({ page: 'current' }).nodes();
                var last = null;

                api.column(0, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="6">' + group + '</td></tr>'
                        );

                        last = group;
                    }
                });
            }
        });
    }
    var Datatable5 = function () {
        Cutome5 = $(".DatatableClass2").DataTable({
            ordering: false,
            responsive: true,
            pageLength: 10,
            lengthChange: false,
            autoWidth: false,
            select: {
                style: 'os',
                selector: 'td:not(:last-child)'
            },
            searching: true,
            dom: '<"PrintPaper"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: false, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: false, exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'pdf', text: 'PDF All', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'pdf', text: 'PDF Selected', Orientation: 'Landscape', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                },
                {
                    extend: 'excelHtml5', text: 'Excel All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'excelHtml5', text: 'Excel Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                },
                {
                    extend: 'copyHtml5', text: 'Copy All', exportOptions: { columns: ':not(.actionRemove)', },
                },
                {
                    extend: 'copyHtml5', text: 'Copy Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                }]
        });

    }
    var Drow = function () {
        $("div.PrintPaper").addClass('pull-right').html('<div class="btn-group btn-group-solid"><div class="btn-group"><a class="btn red btn-outline btn-sm" href="javascript:;" data-toggle="dropdown" aria-expanded="false"><span class="hidden-xs"> Action </span><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu pull-right" id="sample_3_tools"><li><a href="javascript:;" data-action="0" class="tool-action"><i class="icon-printer"></i> Print All</a></li><li><a href="javascript:;" data-action="1" class="tool-action"><i class="icon-printer"></i> Print Selected</a></li><li><a href="javascript:;" data-action="2" class="tool-action"><i class="fa fa-file-pdf-o"></i> PDF All</a></li><li><a href="javascript:;" data-action="3" class="tool-action"><i class="fa fa-file-pdf-o"></i> PDF Selected</a></li><li><a href="javascript:;" data-action="4" class="tool-action"><i class="fa fa-file-excel-o"></i> Excel All</a></li><li><a href="javascript:;" data-action="5" class="tool-action"><i class="fa fa-file-excel-o"></i> Excel Selected</a></li><li><a href="javascript:;" data-action="6" class="tool-action"><i class="icon-check"></i> Copy All</a></li><li><a href="javascript:;" data-action="7" class="tool-action"><i class="icon-check"></i> Copy Selected</a></li></ul></div><div class="btn-group btn-group-solid"><button class="btn green dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-expanded="false">Paper Layout <i class="fa fa-angle-down"></i></i></button><div class="dropdown-menu pull-right dropdown-content input-small hold-on-click" role="menu"><div class="input-group"><select id="PaperLayout" class="bs-select form-control input-small"><option value="Landscape">Landscape</option><option value="Portrait">Portrait</option></select></div></div></div></div>');
    }
    var Button = function () {
        $(".PrintPaper li a.tool-action").on("click", function () {
            var e = $(this).attr("data-action"); Cutome1.button(e).trigger()});
    }


return {
    //main function to initiate the module
        
    init: function () {
        Datatable1();
        Datatable2();
        Datatable3();
        Datatable4();
        Drow();
        Button();
        $("table tbody td").each(function () {
            if (parseInt($(this).text()) > -1 || parseFloat($(this).text()) > -1) $(this).css("text-align", "right");
        });
    }

};
}();