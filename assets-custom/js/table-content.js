jQuery(document).ready(function () {
    $(".responsive_gridview tr td").each(function (index) {
        var content = $(this).parents('table').find('th').eq($(this).index()).text();
        $(this).attr('data-content', (content) ? content : "");
    });
});