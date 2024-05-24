var _SelectedId;
var _SelectedParentId;
$(document).ready(function () {
    ddlSelectApi2($("#ddlHospitalRoom"), urlRoot + "/api/Diagnose/GetHospitalRooms", "Choose Hospital Room", 0);

    BindDiagnoseTree();
    var to = false;
    $('#DiagnoseFilter').keyup(function () {
        if (to) { clearTimeout(to); }
        to = setTimeout(function () {
            var v = $('#DiagnoseFilter').val();
            $('#DiagnoseTree').jstree(true).search(v);
            $("#containerDiagnose").animate({
                scrollTop: $(".jstree-search").length > 0 ? ($(".jstree-search").offset().top - $("#containerDiagnose").offset().top + $("#containerDiagnose").scrollTop()) : 0
            });
        }, 250);
    });
});
function BindDiagnoseTree() {
    var data = GetDiagnoseTree();
    $("#DiagnoseTree").jstree('destroy');
    $('#DiagnoseTree').jstree({
        'core': {
            'data': data,
            "multiple": false
        },
        "plugins": ["contextmenu", "wholerow", "search", "types"],//"state",
        "contextmenu": {
            "items": customMenu
        }
    });
}

function GetDiagnoseTree() {
    var data = '';
    $.ajax({
        async: false,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: urlRoot + "/api/Diagnose/BindDiagnoseTree",
        success: function (jsonData) {
            data = $.map(jsonData, function (n) {
                return {
                    id: n.ID,
                    parent: n.Parent,
                    text: n.Text,
                    state: {
                        opened: true,
                    },
                }
            });
        }
    });
    return data;
}

function customMenu(node) {
    var items = {
        //"AddClassification": {
        //    "label": "إضافة تشخيص",
        //    "icon": "fa fa-plus font-blue",
        //    "action": function () {
        //        _SelectedId = node.id;
        //        $('#btnSaveDiagnose').data('id', '');
        //        _SelectedParentId = node.parent;
        //        $('#btnSaveDiagnose').data('_SelectedParentId', '');
        //        $('#lblDiagnoseTitle').val(node.text);
        //        $('#divParentDiagnose').show();
        //        $('#modal-AddnewDiagnose').modal('show');
        //        $('#diagnoseTitleContainer').show();
        //    }
        //},
        "UpdateDiagnose": {
            "label": "تعديل التشخيص",
            "icon": "fa fa-edit  font-blue",
            "action": function () {
                _SelectedId = node.id;
                $('#btnSaveDiagnose').data('id', _SelectedId);
                if (node.parent == "#") {
                    $('#btnSaveDiagnose').data('_SelectedParentId', null);
                } else {
                    _SelectedParentId = node.parent;
                    $('#btnSaveDiagnose').data('_SelectedParentId', _SelectedParentId);
                }

                $('#lblDiagnoseTitle').val(node.text);
                $('#divmodalDiagnoseTitle').text("تعديل التشخيص");
                $('#divParentDiagnose').show();
                $('#divParentDiagnose').hide();
                $('#txtDiagnoseTitle').val(node.text);
                $('#modal-AddnewDiagnose').modal('show');
            }
        },
        "DeleteDiagnose": {
            "label": "حذف التشخيص",
            "icon": "fa fa-trash font-red",
            "action": function () {
                _SelectedId = node.id;
                //$('#btnSaveDiagnose').data('id', _SelectedId);
                swal({
                    title: "تحذير",
                    text: "سوف يتم حذف البيانات!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "نعم",
                    cancelButtonText: "إلغاء",
                    animation: "slide-from-top",
                    closeOnConfirm: true
                }, function () {
                    $.get(urlRoot + '/api/Diagnose/Delete/' + node.id, function (result) {
                        if (result == "ok") {
                            BindDiagnoseTree();
                            Notifyonsuccess("ar", 'تم الحذف بنجاح');
                        } else {
                            Notifyonerror("en", result);
                        }
                    })
                });
            }
        },
    }
    return items;
}





$('#btnAddNewDiagnose').click(function () {
    ClearDiagnose();
    $('#modal-AddnewDiagnose').modal('show');
})

function ValidNewDiagnose() {
    $.validity.setup({ outputMode: 'label' });
    $.validity.start();
    $("#txtDiagnoseTitle").require();
    return $.validity.end();
}

$("#btnSaveDiagnose").click(function () {
    if ($('#btnSaveDiagnose').data('id') > 0) {
        AddNewDiagnose();
    } else {
        var result = ValidNewDiagnose();
        if (result.valid) {
            AddNewDiagnose();
        }
    }
})

function AddNewDiagnose() {
    var data = {
        ID: $('#btnSaveDiagnose').data('id'),
        ParentID: $('#btnSaveDiagnose').data('_SelectedParentId'),
        DiagnoseTitle: $("#txtDiagnoseTitle").val()
    }
    $.post(urlRoot + "/api/Diagnose/Post", data, function (result) {
        if (result == "ok") {
            BindDiagnoseTree();
            Notifyonsuccess("ar");
            $("#modal-AddnewDiagnose").modal("hide");
            ClearDiagnose();
        } else {
            Notifyonerror("ar", result);
        }
    })
}

function ClearDiagnose() {
    $("#txtDiagnoseTitle").val('');
    $('#btnSaveDiagnose').data('id', null);
    $('#lblDiagnoseTitle').val('')
    $('#divParentDiagnose').hide();
}
$('#btnCancelDiagnose').click(function () {
    ClearDiagnose()
})