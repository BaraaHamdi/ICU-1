var DataTableCustom = function () {

    var Cutome1 = '';
    var Cutome2 = '';
    var Cutome3 = '';
    var Cutome4 = '';
    var Cutome5 = '';
    var Datatable1 = function () {
        Cutome1 = $(".DatatableClass:not(.Inishialized)").DataTable({
            language: {
                "decimal": "",
                "emptyTable": "لا توجد بيانات في الجدول",
                "info": "عرض _START_ الي _END_ من _TOTAL_ الإدخالات",
                "infoEmpty": "عرض 0 to 0 of 0 الإدخالات",
                "infoFiltered": " ( تحديد من _MAX_ total الإدخالات ) ",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "عرض _MENU_ الإدخالات",
                "loadingRecords": "جار التحميل...",
                "processing": "معالجة...",
                "search": "بحث:",

                "zeroRecords": "لا توجد سجلات مطابقة",
                "paginate": {
                    "first": "الأول",
                    "last": "الإخر",
                    "next": "التالى",
                    "previous": "السابق"
                },
                select: {
                    rows: {
                        _: "لقد حددت  %d صفوف ",
                        0: " انقر الصف لتحديده  ",
                        1: " فقط 1 صف محدد "
                    }
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
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
            dom: '<"PrintPaperCustom"> frtip',
            buttons: [
                     {
                         extend: 'print', text: 'Print All', autoPrint: true, footer: true, exportOptions: { columns: ':not(.actionRemove)', },
                         customize: function (win) {
                             //$(win.document.body).css('font-size', '9px');
                             //$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                             $(win.document.body).find('table')
                            .removeClass('table-bordered').removeClass('responsive_gridview')
                            .addClass('compact')
                            .css('font-size', 'inherit')
                             .css('direction', 'rtl');
                             var colspn = $(win.document.body).find('table thead tr:nth-child(1) th').length;
                             var date = new Date();
                             $(win.document.body).find('table thead').prepend('<tr><th colspan="' + colspn + '"><div style="width: 80%;float: left;padding-top: 80px;">' + $('body').find(".reportTitle").html() + '</div><div style=" float: left;width: 20%;">' + logo + companyar + '</div></th></tr>');
                             $(win.document.body).append('<p>Print Date: ' + date.toLocaleDateString() + '</p>');
                         }
                     },
                     {
                         extend: 'print', text: 'Print Selected', autoPrint: true,footer:true, exportOptions: {
                             columns: ':not(.actionRemove)', modifier: { selected: true }
                         },
                         customize: function (win) {
                             //$(win.document.body).css('font-size', '9px');
                             //$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                             $(win.document.body).find('table')
                             .removeClass('table-bordered').removeClass('responsive_gridview')
                             .addClass('compact')
                             .css('font-size', 'inherit');
                             var colspn = $(win.document.body).find('table thead tr:nth-child(1) th').length;
                             var date = new Date();

                             $(win.document.body).find('table thead').prepend('<tr><th colspan="' + colspn + '"><div style="width: 80%;float: left;padding-top: 80px;">' + $("#lblTitle").text() + '</div><div style=" float: left;width: 20%;">' + logo + companyar + '</div></th></tr>');
                             $(win.document.body).append('<p>Print Date: ' + date.toLocaleDateString() + '</p>');
                         }
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
                     },
                     {
                         extend: 'pdfHtml5', text: 'PDF All', exportOptions: { columns: ':not(.actionRemove)', },
                     },
                     {
                         extend: 'pdfHtml5', text: 'PDF Selected', exportOptions: { columns: ':not(.actionRemove)', modifier: { selected: true } },
                     }, ]
        });
        $('.DatatableClass').addClass('Inishialized');
    }
    var Datatable2 = function () {
        Cutome2 = $(".DatatableShiftSchedules").DataTable({
            language: {
                "decimal": "",
                "emptyTable": "لا توجد بيانات في الجدول",
                "info": "عرض _START_ الي _END_ من _TOTAL_ الإدخالات",
                "infoEmpty": "عرض 0 to 0 of 0 الإدخالات",
                "infoFiltered": " ( تحديد من _MAX_ total الإدخالات ) ",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "عرض _MENU_ الإدخالات",
                "loadingRecords": "جار التحميل...",
                "processing": "معالجة...",
                "search": "بحث:",

                "zeroRecords": "لا توجد سجلات مطابقة",
                "paginate": {
                    "first": "الأول",
                    "last": "الإخر",
                    "next": "التالى",
                    "previous": "السابق"
                },
                select: {
                    rows: {
                        _: "لقد حددت  %d صفوف ",
                        0: " انقر الصف لتحديده  ",
                        1: " فقط 1 صف محدد "
                    }
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            ordering: false,
            responsive: true,
            pageLength: 20,
            lengthChange: false,
            autoWidth: false,
            select: true,
            searching: true,
            dom: '<"PrintPaperCustom"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: true, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: true, exportOptions: {
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
            language: {
                "decimal": "",
                "emptyTable": "لا توجد بيانات في الجدول",
                "info": "عرض _START_ الي _END_ من _TOTAL_ الإدخالات",
                "infoEmpty": "عرض 0 to 0 of 0 الإدخالات",
                "infoFiltered": " ( تحديد من _MAX_ total الإدخالات ) ",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "عرض _MENU_ الإدخالات",
                "loadingRecords": "جار التحميل...",
                "processing": "معالجة...",
                "search": "بحث:",

                "zeroRecords": "لا توجد سجلات مطابقة",
                "paginate": {
                    "first": "الأول",
                    "last": "الإخر",
                    "next": "التالى",
                    "previous": "السابق"
                },
                select: {
                    rows: {
                        _: "لقد حددت  %d صفوف ",
                        0: " انقر الصف لتحديده  ",
                        1: " فقط 1 صف محدد "
                    }
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            ordering: false,
            responsive: true,
            pageLength: 20,
            lengthChange: false,
            autoWidth: false,
            select: true,
            searching: true,
            dom: '<"PrintPaperCustom"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: true, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        $(win.document.body).css('font-size', '9px');
                        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: true, exportOptions: {
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
            language: {
                "decimal": "",
                "emptyTable": "لا توجد بيانات في الجدول",
                "info": "عرض _START_ الي _END_ من _TOTAL_ الإدخالات",
                "infoEmpty": "عرض 0 to 0 of 0 الإدخالات",
                "infoFiltered": " ( تحديد من _MAX_ total الإدخالات ) ",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "عرض _MENU_ الإدخالات",
                "loadingRecords": "جار التحميل...",
                "processing": "معالجة...",
                "search": "بحث:",

                "zeroRecords": "لا توجد سجلات مطابقة",
                "paginate": {
                    "first": "الأول",
                    "last": "الإخر",
                    "next": "التالى",
                    "previous": "السابق"
                },
                select: {
                    rows: {
                        _: "لقد حددت  %d صفوف ",
                        0: " انقر الصف لتحديده  ",
                        1: " فقط 1 صف محدد "
                    }
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            "columnDefs": [
                { "visible": false, "targets": 0 }
            ],
            dom: '<"PrintPaperCustom"> frtip',
            buttons: [
                 {
                     extend: 'print', text: 'Print All', autoPrint: true, exportOptions: { columns: ':not(.actionRemove)', },
                     customize: function (win) {
                         $(win.document.body).css('font-size', '9px');
                         $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                     }
                 },
                 {
                     extend: 'print', text: 'Print Selected', autoPrint: true, exportOptions: {
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

    var DrowCustom = function () {
        $("div.PrintPaperCustom").addClass('pull-left').html('<div class="btn-group btn-group-solid"><div class="btn-group"><a class="btn btn-primary btn-sm" href="javascript:;" data-toggle="dropdown" aria-expanded="false"><span class="hidden-xs"> تصدير </span><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu pull-left" id="sample_3_tools"><li><a href="javascript:;" data-action="0" class="tool-action"><i class="icon-printer"></i> طباعة الكل</a></li><li><a href="javascript:;" data-action="1" class="tool-action"><i class="icon-printer"></i> طباعة المحدد</a></li><li><a href="javascript:;" data-action="2" class="tool-action"><i class="fa fa-file-excel-o"></i> Excel الكل</a></li><li><a href="javascript:;" data-action="3" class="tool-action"><i class="fa fa-file-excel-o"></i> Excel المحدد</a></li><li><a href="javascript:;" data-action="4" class="tool-action"><i class="icon-check"></i> نسخ الكل</a></li><li><a href="javascript:;" data-action="5" class="tool-action"><i class="icon-check"></i> نسخ المحدد</a></li></ul></div></div>');
    }
    var Button = function () {
        $(".PrintPaperCustom li a.tool-action").on("click", function () {
            var e = $(this).attr("data-action");
            Cutome1.button(e).trigger();
            Cutome5.button(e).trigger();
        });
    }
    var DatatableGoupBy = function () {
        Cutome5 = $(".DatatableGoupBy:not(.Inishialized)").DataTable({
            language: {
                "decimal": "",
                "emptyTable": "لا توجد بيانات في الجدول",
                "info": "عرض _START_ الي _END_ من _TOTAL_ الإدخالات",
                "infoEmpty": "عرض 0 to 0 of 0 الإدخالات",
                "infoFiltered": " ( تحديد من _MAX_ total الإدخالات ) ",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "عرض _MENU_ الإدخالات",
                "loadingRecords": "جار التحميل...",
                "processing": "معالجة...",
                "search": "بحث:",

                "zeroRecords": "لا توجد سجلات مطابقة",
                "paginate": {
                    "first": "الأول",
                    "last": "الإخر",
                    "next": "التالى",
                    "previous": "السابق"
                },
                select: {
                    rows: {
                        _: "لقد حددت  %d صفوف ",
                        0: " انقر الصف لتحديده  ",
                        1: " فقط 1 صف محدد "
                    }
                },
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                }
            },
            columnDefs: [
            {
                "targets": [ 0 ],
                "visible": false,
            }],
            ordering: false,
            pageLength: 10,
            lengthChange: false,
            autoWidth: false,
            select: {
                style: 'os',
                selector: 'td:not(:last-child)'
            },
            dom: '<"PrintPaperCustom"> frtip',
            buttons: [
                {
                    extend: 'print', text: 'Print All', autoPrint: true, exportOptions: { columns: ':not(.actionRemove)', },
                    customize: function (win) {
                        //$(win.document.body)
                        //    .css('font-size', '10pt');

                        $(win.document.body).find('table')
                            .removeClass('table-bordered').removeClass('responsive_gridview')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                        var colspn = $(win.document.body).find('table thead tr:nth-child(1) th').length;

                        var date = new Date();
                        $(win.document.body).find('table thead').prepend('<tr><th colspan="' + colspn + '"><div style="width: 80%;float: left;padding-top: 80px;">' + $("#lblTitle").text() + '</div><div style=" float: left;width: 20%;">' + logo + companyar + '</div></th></tr>');
                        $(win.document.body).append('<p>Print Date: ' + date.toLocaleDateString() + '</p>');
                    }
                    //customize: function (win) {
                    //    $(win.document.body).css('font-size', '9px');
                    //    $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    //}
                },
                {
                    extend: 'print', text: 'Print Selected', autoPrint: true, exportOptions: {
                        columns: ':not(.actionRemove)', modifier: { selected: true }
                    },
                    customize: function (win) {
                        //$(win.document.body)
                        //    .css('font-size', '10pt');

                        $(win.document.body).find('table')
                            .removeClass('table-bordered').removeClass('responsive_gridview')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                        var colspn = $(win.document.body).find('table thead tr:nth-child(1) th').length;
                        var date = new Date();

                        $(win.document.body).find('table thead').prepend('<tr><th colspan="' + colspn + '"><div style="width: 80%;float: left;padding-top: 80px;">' + $("#lblTitle").text() + '</div><div style=" float: left;width: 20%;">' + logo + companyar + '</div></th></tr>');
                        $(win.document.body).append('<p>Print Date: ' + date.toLocaleDateString() + '</p>');
                    }
                    //customize: function (win) {
                    //    $(win.document.body).css('font-size', '9px');
                    //    $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
                    //}
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
            "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(0, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="5">'+group+'</td></tr>'
                    );
 
                    last = group;
                }
            } );
        }
        });
        $('.DatatableGoupBy').addClass('Inishialized');
    }

    return {
        //main function to initiate the module

        init: function () {
            Datatable1();
            Datatable2();
            Datatable3();
            Datatable4();
            DatatableGoupBy();
            DrowCustom();
            Button();
            $("table tbody td").each(function () {
                if (parseInt($(this).text()) > -1 || parseFloat($(this).text()) > -1) $(this).css("text-align", "right");
            });
        }

    };
}();