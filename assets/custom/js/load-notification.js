
$(function () {

    // Proxy created on the fly
    var notification = $.connection.notificationHub;

    // Declare a function on the job hub so the server can invoke it
    notification.client.displayStatus = function () {
        getNotificationData(0);
    };

    // Start the connection
    $.connection.hub.start();
    getNotificationData(0);
});
function getNotificationData(index) {
    var data = JSON.parse(CustomAjax(urlRoot + '/hr/ar/ws/wsNotifications.asmx/Get', JSON.stringify({ index: index })));
    var li = '';
    for (var i = 0; i < data.list.length; i++) {
        li += '<li onclick="ReadNotification(' + data.list[i].ID + ')">';
        li += '<a href="' + data.list[i].PageUrl + '" style="' + (data.list[i].IsRead ? "" : "background-color: #edf2fa !important;") + '" >';
        li += '<span class="photo">';
        li += '<img src="' + (data.list[i].EmployeeImage != null ? data.list[i].EmployeeImage.replace("~", urlRoot) : urlRoot + "/assets/custom/images/img/Avatar-512.png") + '" class="img-rounded" alt="' + data.list[i].Name + '"> </span>';
        li += '<span class="subject">';
        li += '<span class="from"> ' + data.list[i].Name + ' </span>';

        li += '</span>';
        li += '<span class="message"> ' + data.list[i].NotificationMessage + ' </span>';
        li += '<span style="position: relative;bottom: 3px;float: left; font-size: 10px;">' + data.list[i].InsertionDate + ' </span>';
        li += '</a>';
        li += '</li>';
        li += '';
    }
    $("#notiWorker").html(li);
    if (data.UnHideCount > 0) {
        $("#msgCount1").show();
        $("#msgCount1").text(data.UnHideCount);
        $("#msgCount2").text(data.UnHideCount);
    } else {
        $("#msgCount1").hide();
        $("#msgCount2").text("0");
    }

}

function ReadNotification(ID) {
    CustomAjax(urlRoot + '/hr/ar/ws/wsNotifications.asmx/Read', JSON.stringify({ ID: ID }));
}
$(document).ready(function () {
    $(".scrollerx").slimScroll({
        allowPageScroll: true, // allow page scroll when the element scroll is ended
        size: '7px',
        color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
        wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
        railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
        position: 'left',
        height: '350',
        alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
        railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
        disableFadeOut: true
    });
})


var index = 0;
$(document).ready(function () {
    $('body').find(".scrollerx").scroll(function () {
        var hight = $('body').find(".scrollerx")[0].scrollHeight
        if ($('body').find(".scrollerx")[0].scrollHeight < $('body').find(".scrollerx").scrollTop() + 500) {
            // Display AJAX loader animation
            index = index + 1;



            var data = JSON.parse(CustomAjax(urlRoot + '/hr/ar/ws/wsNotifications.asmx/Get', JSON.stringify({ index: index })));
            var li = '';
            for (var i = 0; i < data.list.length; i++) {
                li += '<li onclick="ReadNotification(' + data.list[i].ID + ')">';
                li += '<a href="' + data.list[i].PageUrl + '" style="' + (data.list[i].IsRead ? "" : "background-color: #edf2fa !important;") + '" >';
                li += '<span class="photo">';
                li += '<img src="' + data.list[i].EmployeeImage.replace("~", urlRoot) + '" class="img-rounded" alt="' + data.list[i].Name + '"> </span>';
                li += '<span class="subject">';
                li += '<span class="from"> ' + data.list[i].Name + ' </span>';

                li += '</span>';
                li += '<span class="message"> ' + data.list[i].NotificationMessage + ' </span>';
                li += '<span style="position: relative;bottom: 3px;float: left; font-size: 10px;">' + data.list[i].InsertionDate + ' </span>';
                li += '</a>';
                li += '</li>';
                li += '';
            }

            $('#notiWorker').append(li);



        }
    });
})


$('body').on("click", ".dropdown-inbox", function () { CustomAjax(urlRoot + '/hr/ar/ws/wsNotifications.asmx/HideAll', ''); })



