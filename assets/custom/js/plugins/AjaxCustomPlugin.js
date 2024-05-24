(function ($) {

    $.fn.generateTable = function (options) {
        var $Tabel = "";
        //Declare Defaults Options
        var defaults = {
            enabledatatable: false,
            enableajaxcall: false,
            datatableprint: false,
            header: [],
            body: [],
            footer: [],
            tableclass: "",
            ajax: { // Ajax Options
                url: "",
                type: "POST",
                data: '',
                contenttype: "application/json; charset=utf-8",
                datatype: "json"
            },

            datatable: { // Datatable Options
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
            },
            actions: {
                createAction: {
                    allwo: false,
                    updatetext: "Add",
                    class: ""
                },
                updateAction: {
                    allwo: false,
                    updatetext: "Edit",
                    class: ""
                },
                deleteAction: {
                    allwo: false,
                    updatetext: "Delete",
                    class: ""
                },
                fields: [{
                    title: "",
                    value: "",
                    type: "",
                    options: "",
                    displayFormat: "",
                    fieldclass: ""
                }]
            }
        };

        var settings = $.extend(true, defaults, options);
        if (settings.enableajaxcall) {
            $.ajax({
                type: settings.ajax.type,
                url: settings.ajax.url,
                data: settings.ajax.data,
                contentType: settings.ajax.contenttype,
                dataType: settings.ajax.datatype,
                async: false,
                success: OnSuccess,
                failure: function (response) {
                    alert(response.d);
                }
            });
        }


        function OnSuccess(response) {
            var Data = JSON.parse(response.d);
            if (!settings.header.length > 0)
                settings.header = getKeyName(Data);
            settings.body = $.map(Data, function (value, index) {
                return [value];
            });
        }

        //UpdateBtn
        if (settings.actions) {
            for (var i = 0; i < settings.body.length; i++) {
                var $updateButon = "";
                var $deleteButon = "";
                var $div = $('<div />', { "class": 'btn-group btn-group-sm btn-group-justified', });
                if (settings.actions.updateAction.allwo) {
                    $updateButon = $buttonInput(settings.body[i].ID, 'Edit', 'btn ' + settings.actions.updateAction.class, 'btn-Edit', 'fa-edit');
                    $btnAction('#btnEdit-' + settings.body[i].ID);
                    $($updateButon).appendTo($($div));
                }
                if (settings.actions.deleteAction.allwo) {
                    $deleteButon = $buttonInput(settings.body[i].ID, 'Delete', 'btn ' + settings.actions.deleteAction.class, 'btn-Delete', 'fa-remove');
                    $btnAction('#btnDelete-' + settings.body[i].ID);
                    $($deleteButon).appendTo($($div));
                }
                settings.body[i]["Action"] = $div[0].outerHTML;
            }

            settings.header.push([settings.actions.updateAction.updatetext,"width:20%"]);
        }


        $Tabel = CreateTable(settings.header, settings.body, settings.footer, settings.tableclass);
        this.html($Tabel);

        // Greenify the collection based on the settings variable.
        if (settings.enabledatatable) {
            var $DataTableInit = $(this).find('table').DataTable(settings.datatable);
            if (settings.datatableprint)
                Drow(); Button();
        }
    };
    var getKeyName = function (objects) {
        return Object.keys(objects[0]);
    }
    var Drow = function () {
        $("div.PrintPaper").addClass('pull-right').html('<div class="btn-group btn-group-solid"><div class="btn-group"><a class="btn red btn-outline btn-sm" href="javascript:;" data-toggle="dropdown" aria-expanded="false"><span class="hidden-xs"> Action </span><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu pull-right" id="sample_3_tools"><li><a href="javascript:;" data-action="0" class="tool-action"><i class="icon-printer"></i> Print All</a></li><li><a href="javascript:;" data-action="1" class="tool-action"><i class="icon-printer"></i> Print Selected</a></li><li><a href="javascript:;" data-action="2" class="tool-action"><i class="fa fa-file-pdf-o"></i> PDF All</a></li><li><a href="javascript:;" data-action="3" class="tool-action"><i class="fa fa-file-pdf-o"></i> PDF Selected</a></li><li><a href="javascript:;" data-action="4" class="tool-action"><i class="fa fa-file-excel-o"></i> Excel All</a></li><li><a href="javascript:;" data-action="5" class="tool-action"><i class="fa fa-file-excel-o"></i> Excel Selected</a></li><li><a href="javascript:;" data-action="6" class="tool-action"><i class="icon-check"></i> Copy All</a></li><li><a href="javascript:;" data-action="7" class="tool-action"><i class="icon-check"></i> Copy Selected</a></li></ul></div><div class="btn-group btn-group-solid"><button class="btn green dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-expanded="false">Paper Layout <i class="fa fa-angle-down"></i></i></button><div class="dropdown-menu pull-right dropdown-content input-small hold-on-click" role="menu"><div class="input-group"><select id="PaperLayout" class="bs-select form-control input-small"><option value="Landscape">Landscape</option><option value="Portrait">Portrait</option></select></div></div></div></div>');
    }
    var Button = function () {
        $(".PrintPaper li a.tool-action").on("click", function () {
            var e = $(this).attr("data-action"); $DataTableInit.button(e).trigger()
        });
    }
    var CreateTable = function (header, body, footer, className) {
        var html = '<table class="' + className + '">';

        if (header) {
            html += '<thead>' + addRow(header, 'th') + '</thead>';
        }

        html += '<tbody>';
        for (var i = 0; i < body.length ; i++) {
            html += addRow(body[i], 'td');
        }
        html += '</tbody>';

        if (footer) {
            html += '<tfoot>' + addRow(footer, 'th') + '</tfoot>';
        }

        return html;
    }
    var addRow = function (d, tag) {
        var str = '<tr>';
        for (var key in d) {
            if (d.hasOwnProperty(key)) {
                if (d.length - 1 == key)
                    str += '<' + tag + ' class="' + d[key][2] + '" style="' + d[key][1] + '">' + d[key][0] + '</' + tag + '>';
                else
                    str += '<' + tag + '>' + d[key] + '</' + tag + '>';
            }
        }

        return str + '</tr>';
    };

    var $buttonInput = function (id, value, btnclass, name, fontIcon) {
        var $button = $('<a/>',
                      {
                          id: 'btn' + value+'-' + id,
                          type: 'button',
                          class: btnclass,
                          name: name,
                          'data-id': id,
                          width: '100%'
                      });

        return $($button).append('<i class="fa ' + fontIcon + '"></i> ' + value)
    }
    var $btnAction = function (id) {
        $(document).on('click', id, function () {
            alert($(this).data('id'));
        });
    }
}(jQuery));

