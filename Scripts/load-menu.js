var LoadMenu = function () {
    var myDate = new Date();
    var sessionDate = ((myDate.getMonth() + 1) + "" + myDate.getDate() + "" + myDate.getFullYear());
    var SIDEBARLOAD = function () {
        //localStorage.clear();
        //SIDEBAR LOAD
        var current_menu = "";
        if (typeof (Storage) !== "undefined" && localStorage.getItem($("#HideUserID").val()) != null) {
            $("#sidebar").html(localStorage.getItem($("#HideUserID").val()));
            current_menu = localStorage.getItem($("#HideUserID").val());
            //$(".page-sidebar-menu li ul li a").each(function () {
            //    $(this).parent().removeClass("active");
            //    $(this).parents(".start").removeClass("active");
            //    $(this).parents(".start").removeClass("open");
            //    $(this).parents(".sub-menu").hide();
            //});

            //$(".page-sidebar-menu li ul li a").each(function () {
            //    if ($(this).prop("href").indexOf(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)) > -1) {
            //        $(this).parent().addClass("active");
            //        $(this).parents(".start").addClass("active");
            //        $(this).parents(".start").addClass("open");
            //        $(this).parents(".sub-menu").show();
            //    }
            //});
            $(window).trigger('resize');
        }
        else {
            //var currentpageurl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
            $.ajax({
                //url: urlRoot + "/api/LoadMenu?currentpageurl=" + currentpageurl,
                url: urlRoot + "/api/LoadMenu",
                type: "GET",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#sidebar").html(data);
                    if (typeof (Storage) !== "undefined") localStorage.setItem($("#HideUserID").val(), data);
                    //$(".page-sidebar-menu li ul li a").each(function () {
                    //    $(this).parent().removeClass("active");
                    //    $(this).parents(".start").removeClass("active");
                    //    $(this).parents(".start").removeClass("open");
                    //    $(this).parents(".sub-menu").hide();
                    //});
                    //$(".page-sidebar-menu li ul li a").each(function () {
                    //    if ($(this).prop("href").substring($(this).prop("href").lastIndexOf('/') + 1) == window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)) {
                    //        $(this).parent().addClass("active");
                    //        $(this).parents(".start").addClass("active");
                    //        $(this).parents(".start").addClass("open");
                    //        $(this).parents(".sub-menu").show();
                    //    }
                    //});
                    $(window).trigger('resize');
                }
            });
        }
    }
    var SIDEBARSTATE = function () {
        //SIDEBAR STATE 
        if (typeof (Storage) !== "undefined" && localStorage.getItem("sidebar_state") == "1") {
            closeSidebar();
        }
    }
    var USERDATALOAD = function () {
        //USERDATA LOAD
        if (typeof (Storage) !== "undefined" && localStorage.getItem("userdata" + $("#HideUserID").val()) != null) {
            var data = JSON.parse(localStorage.getItem("userdata" + $("#HideUserID").val()));
            $("#HideUserID").val(data.ID);
            $("#lblProfileName").text(data.Name);
            $("#imProfile").prop("src", data.Image.replace("~/uploads/", urlRoot + "/uploads/"));
        }
        else {
            $.ajax({
                url: urlRoot + "/api/GetEmployeeLoginData",
                type: "GET",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#HideUserID").val(data.ID);
                    $("#lblProfileName").text(data.Name);
                    $("#imProfile").prop("src", data.Image.replace("~/uploads/", urlRoot + "/uploads/"));
                    if (typeof (Storage) !== "undefined") localStorage.setItem("userdata" + $("#HideUserID").val(), JSON.stringify(data));
                }
            });
        }
    }
    return {
        //main function to initiate the module
        init: function () {

            SIDEBARLOAD();
            SIDEBARSTATE();
            USERDATALOAD();
        }
    };
}();


function getMenuHeader() {
    $.get(urlRoot + '/api/MenuData/GetMenuHeaderData',
        function (data) {
            $("#imgProfileImage").attr("src", data.UserImageUrl);
            $("#lblMenuProfileName").html(data.UserFullName);
            $("#lblMenuUserHospitalTitle").html(data.HospitalName);
        });
}

jQuery(document).ready(function () {
    LoadMenu.init();
    getMenuHeader();
});