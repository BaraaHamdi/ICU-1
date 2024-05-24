(function ($) {
    var Eventsarrays = [];
    var PrintPaperID = 0;
    $.fn.generateTable = function (options) {
        var $Tabel = "";
        //Declare Defaults Options
        var defaults = {
            tablelanguage: 'en',
            enabledatatable: false,
            enableajaxcall: false,
            datatableprint: {
                allow: false,
                isPrint: false,
                isPdf: false,
                isExcel: false,
                isCopy: false
            },
            header: [],
            body: [],
            footer: [],
            hidden: [],
            tableclass: "",
            ajaxType: 'json',
            ajax: { // Ajax Options
                url: "",
                type: "POST",
                data: '',
                contenttype: "application/json; charset=utf-8",
                datatype: "json"
            },
            translate: false,
            datatable: { // Datatable Options
                ordering: false,
                responsive: true,
                pageLength: 15,
                lengthChange: false,
                autoWidth: false,
                //select: {
                //    style: 'os',
                //    selector: 'tr:not(.actionRemove)'
                //},
                language: '',
                searching: true,
                dom: '<"PrintPaper' + (PrintPaperID += 1) + '"> frtip',
                buttons: [
                    {
                        extend: 'print', text: 'Print All', autoPrint: true, title: function () { return settings.pagetitle }, exportOptions: { stripHtml: false, columns: ':not(.actionRemove)', },
                        customize: function (win) {
                            var PrintTable = $(win.document.body).find('table');
                            //PrintTable.removeClass('table-bordered').removeClass('responsive_gridview');
                            PrintTable.addClass('compact');
                            PrintTable.css('font-size', 'inherit');
                            settings.tablelanguage == 'ar' ? PrintTable.css('direction', 'rtl') : PrintTable.css('direction', 'ltr');
                            var colspn = $(win.document.body).find('table thead tr:nth-child(1) th').length;
                            var date = new Date();
                            $(win.document.body).find('table').parent().prepend(settings.reporttitle);
                            $(win.document.body).append('<br /><br /><span class="pull-left">Print Date: ' + date.toLocaleDateString() + '</span><span class="pull-right">Print User: ' + $('#HideUserName').val() + '</span>');
                        }
                    },
                    {
                        extend: 'print', text: 'Print Selected', title: function () { return settings.pagetitle }, autoPrint: true, exportOptions: {
                            stripHtml: false,
                            columns: ':not(.actionRemove)', modifier: { selected: true }
                        },
                        customize: function (win) {
                            var PrintTable = $(win.document.body).find('table');
                            //PrintTable.removeClass('table-bordered').removeClass('responsive_gridview');
                            PrintTable.addClass('compact');
                            PrintTable.css('font-size', 'inherit');
                            settings.tablelanguage == 'ar' ? PrintTable.css('direction', 'rtl') : PrintTable.css('direction', 'ltr');
                            var colspn = $(win.document.body).find('table thead tr:nth-child(1) th').length;
                            var date = new Date();
                            $(win.document.body).find('table thead').prepend('<tr><th colspan="' + colspn + '">' + settings.reporttitle + '</th></tr>');
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
                    },]
            },
            actions: false,
            actionstitle: "Action",
            actionswidth: "20%",
            createAction: {
                key: 'ID',
                dataAttribute: [],
                allowAction: false,
                actions: [{
                    twBtn: false,
                    title: '',
                    name: '',
                    class: '',
                    method: null,
                    icon: '',
                    tooltip: '',
                    fildName: '',
                }]
            },
            reporttitle: '',
            pagetitle: ''


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
                success: settings.ajaxType === "json" ? OnSuccess : onSuccessApi,
                failure: function (response) {
                    alert(response.d);
                }
            });
        }
        function onSuccessApi(response) {
            if (response.length > 0) {
                if (!settings.header.length > 0)
                    settings.header = getKeyName(response);
                settings.body = $.map(response, function (value) {
                    return [value];
                });
            }
            else return;

        }

        function OnSuccess(response) {
            var Data = JSON.parse(response.d);
            if (Data.length > 0) {
                if (!settings.header.length > 0)
                    settings.header = getKeyName(Data);
                settings.body = $.map(Data, function (value, index) {
                    return [value];
                });
            }
            else return;

        }

        if (settings.createAction.allowAction) {
            for (var j = 0; j < settings.body.length; j++) {

                var $Buton = "";
                var Buttons = [];
                var $div = $('<div />', { "class": 'btn-group btn-group-sm btn-group-justified', });
                for (var i = 0; i < settings.createAction.actions.length; i++) {

                    if (!settings.createAction.actions[i].twBtn) {
                        $Buton = CreateInput(settings.body[j][settings.createAction.key], settings.createAction.actions[i].title, 'btn ' + settings.createAction.actions[i].class, settings.createAction.actions[i].name, settings.createAction.actions[i].icon, settings.createAction.actions[i].tooltip);
                        if (!(Eventsarrays.indexOf('#' + settings.createAction.actions[i].name + '-' + settings.body[j][settings.createAction.key]) > 0))
                            $btnAction('#' + settings.createAction.actions[i].name + '-' + settings.body[j][settings.createAction.key], settings.createAction.actions[i].method);
                    }
                    else {
                        if (settings.body[j].hasOwnProperty(settings.createAction.actions[i].fildName)) {
                            var fildValue = settings.body[j][settings.createAction.actions[i].fildName];
                            $Buton = CreateInput(settings.body[j][settings.createAction.key], (fildValue ? settings.createAction.actions[i].title[0] : settings.createAction.actions[i].title[1]), 'btn ' + (fildValue ? settings.createAction.actions[i].class[0] : settings.createAction.actions[i].class[1]), (fildValue ? settings.createAction.actions[i].name[0] : settings.createAction.actions[i].name[1]), (fildValue ? settings.createAction.actions[i].icon[0] : settings.createAction.actions[i].icon[1]), (fildValue ? settings.createAction.actions[i].tooltip[0] : settings.createAction.actions[i].tooltip[1]));
                            if (!(Eventsarrays.indexOf('#' + (fildValue ? settings.createAction.actions[i].name[0] : settings.createAction.actions[i].name[1]) + '-' + settings.body[j][settings.createAction.key]) > 0))
                                $btnAction('#' + (fildValue ? settings.createAction.actions[i].name[0] : settings.createAction.actions[i].name[1]) + '-' + settings.body[j][settings.createAction.key], (fildValue ? settings.createAction.actions[i].method[0] : settings.createAction.actions[i].method[1]));
                        }
                    }
                    Buttons.push($Buton);

                }
                for (var n = 0; n < Buttons.length; n++) {
                    $(Buttons[n]).appendTo($($div));
                }

                settings.body[j]["Action"] = $div[0].outerHTML;
            }
            if (settings.header.length > 0)
                settings.header.push([settings.actionstitle, "width:" + settings.actionswidth + "", "actionRemove"]);
            for (var y = 0; y < jQuery._data(document, "events")['click'].length; y++) { Eventsarrays.push(jQuery._data(document, "events")['click'][y].selector) }

        }

        if (settings.hidden.length > 0) {
            settings.header = settings.header.filter(function (el) {
                return settings.hidden.indexOf(el) < 0;
            });
            for (var m = 0; m < settings.body.length; m++) {
                for (var n = 0; n < settings.hidden.length; n++) {
                    delete settings.body[m][settings.hidden[n]];
                }

            }


        }

        $Tabel = CreateTableN($(this).attr('id') + 'table', settings.translate ? translate(settings.header) : settings.header, settings.body, settings.footer, settings.tableclass, settings.createAction.allowAction);
        this.html($Tabel);

        // Greenify the collection based on the settings variable.
        if (settings.enabledatatable) {
            if (settings.header.length > 0) {
                if (settings.tablelanguage === 'ar') settings.datatable.language = datatablear;
                var $DataTableInit = $(this).find('table').DataTable(settings.datatable);
                if (settings.datatableprint.allow) {
                    Drow(settings.datatableprint.isPrint, settings.datatableprint.isPdf, settings.datatableprint.isExcel, settings.datatableprint.isCopy, settings.tablelanguage);
                    Button($DataTableInit);
                }
            }
        }
    };
    var getKeyName = function (objects) {
        return Object.keys(objects[0]);
    }
    var Drow = function (IsPrint, IsPdf, IsExcel, IsCopy, Lang) {
        var Language = ['Export', 'Print All', ' Print Selected', 'PDF ALL', 'PDF Selected', 'Excel ALl', 'Excel Selected', 'Copy ALl', 'Copy Selected'];
        if (Lang == 'ar') {
            Language = ['تصدير', 'طباعة الكل', 'طباعة المحدد', 'Pdf الكل', 'المحدد Pdf', 'اكسيل الكل', 'المحدد اكسيل', 'نسخ الكل', 'نسخ المحدد'];
        }
        var div = '<div class="btn-group btn-group-solid"><div class="btn-group"><a class="btn btn-rose btn-sm" href="javascript:;" data-toggle="dropdown" aria-expanded="false"><span class="hidden-xs"> ' + Language[0] + ' </span><i class="fa fa-angle-down"></i></a><ul class="dropdown-menu">';
        if (IsPrint)
            div += '<li><a href="javascript:;" data-action="0" class="tool-action"><i class="icon-printer"></i> ' + Language[1] + '</a></li><li><a href="javascript:;" data-action="1" class="tool-action"><i class="icon-printer"></i> ' + Language[2] + '</a></li>';
        if (IsPdf)
            div += '<li><a href="javascript:;" data-action="0" class="tool-action"><i class="icon-printer"></i> ' + Language[3] + '</a></li><li><a href="javascript:;" data-action="1" class="tool-action"><i class="icon-printer"></i> ' + Language[4] + '</a></li>';
        if (IsExcel)
            div += '<li><a href="javascript:;" data-action="2" class="tool-action"><i class="fa fa-file-excel-o"></i> ' + Language[5] + '</a></li><li><a href="javascript:;" data-action="3" class="tool-action"><i class="fa fa-file-excel-o"></i> ' + Language[6] + '</a></li>';
        if (IsCopy)
            div += '<li><a href="javascript:;" data-action="4" class="tool-action"><i class="icon-check"></i> ' + Language[7] + '</a></li><li><a href="javascript:;" data-action="5" class="tool-action"><i class="icon-check"></i> ' + Language[8] + '</a></li>';
        div += '</ul></div></div>';


        $("div.PrintPaper" + PrintPaperID).addClass('pull-left').html(div);
    }
    var Button = function (elem) {
        $('.PrintPaper' + PrintPaperID + ' li a.tool-action').on("click", function () {
            var e = $(this).attr("data-action");
            elem.button(e).trigger()
        });
    }
    var CreateTableN = function (id, header, body, footer, className, hasAction) {
        var html = '<table id="' + id + '" class="' + className + '">';

        if (header.length > 0) {
            html += '<thead>' + addRowN(header, 'th', hasAction) + '</thead>';
        }

        html += '<tbody>';
        for (var i = 0; i < body.length; i++) {
            html += addRowN(body[i], 'td', hasAction);
        }
        html += '</tbody>';

        if (footer.length > 0) {
            html += '<tfoot>' + addRowN(footer, 'th', hasAction) + '</tfoot>';
        }
        html += '</table>'
        return html;
    }
    var addRowN = function (d, tag, hasAction) {
        var str = '<tr>';
        for (var key in d) {
            if (d.hasOwnProperty(key)) {
                if (hasAction) {
                    if (d.length - 1 == key)
                        str += '<' + tag + ' class="' + d[key][2] + '" style="' + d[key][1] + '">' + d[key][0] + '</' + tag + '>';
                    else
                        str += '<' + tag + '>' + d[key] + '</' + tag + '>';
                } else {
                    str += '<' + tag + '>' + d[key] + '</' + tag + '>';
                }
            }
        }

        return str + '</tr>';
    };

    var CreateInput = function (id, value, btnclass, name, fontIcon, tooltip) {
        var $button = $('<a/>',
            {
                id: name + '-' + id,
                type: 'button',
                class: btnclass,
                name: name,
                'data-id': id,
                width: '100%',
                title: tooltip,

            });

        return $($button).append('<i class="fa ' + fontIcon + '"></i> ' + value)
    }
    var $btnAction = function (id, method) {
        $(document).on('click', id, function () {
            if ($.isFunction(method)) {
                method($(this).data('id'));
            }
        });
    }


    var translate = function (array) {
        var translateArray = array.map(function (value, index) {
            if (TranslateAr.hasOwnProperty(value))
                return TranslateAr[value]
            else
                return value
        })
        return translateArray;
    }
}(jQuery));

