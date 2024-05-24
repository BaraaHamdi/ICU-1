$("#sidebar").on("click", ".sidebar-toggler", function () {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.getItem("sidebar_state") === "1") sessionStorage.setItem("sidebar_state", 0);
        else sessionStorage.setItem("sidebar_state", 1);
    }
});

function closeSidebar() {
    var body = $('body');
    var sidebar = $('.page-sidebar');
    var sidebarMenu = $('ul.page-sidebar-menu');
    $(".sidebar-search", sidebar).removeClass("open");

    body.addClass("page-sidebar-closed");
    $('ul.page-sidebar-menu').addClass('page-sidebar-menu-closed');
    if (body.hasClass("page-sidebar-fixed")) {
        sidebarMenu.trigger("mouseleave");
    }
    $(window).trigger('resize');
}