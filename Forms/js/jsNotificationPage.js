$(document).ready(function () {
    getUserNotificationList(0);
});

function getUserNotificationList(index) {
    $.get(urlRoot + '/api/UserNotification/GetUserNotificationList',
        function (data) {
            var _count = 0;
            $("#imgUserImage").attr("src", data[0].RecieverImageProfileUrl);
            $("#lblUserName").html(data[0].RecieverUserName);
            $("#lblUserNotificationCount").html('الاشعارات : ' + data.length);
            $("#lblUserNotificationCount2").html('النقاط : ' + data.length);

            var li = '';
            for (var i = 0; i < data.length; i++) {
                li += '<div class="mt-actions">';
                li += '<div class="mt-action"><div class="mt-action-img">';
                li += '<img class="img-responsive" src="' + data[i].NotifierImageProfileUrl + '"/>';
                li += '</div><div class="mt-action-body">';
                li += '<div class="mt-action-row"><div class="mt-action-info">';


                li += '<div class="mt-action-details" style="width:350px;">';
                li += '<p class="mt-action-author">' + data[i].NotificationTitle1 + '</p>';
                li += '<p class="mt-action-desc">' + data[i].NotificationSubTitle1 + '</p>';
                li += '</div>';

                li += '<div class="mt-action-details" style="width:350px;">';
                li += '<p class="mt-action-author">' + data[i].NotificationTitle2 + '</p>';
                li += '<p class="mt-action-desc">' + data[i].NotificationSubTitle2 + '</p>';
                li += '</div>';

                li += '<div class="mt-action-details" style="width: 350px;">';
                li += '<p class="mt-action-author">' + data[i].NotificationTitle3 + '</p>';
                li += '<p class="mt-action-desc">' + data[i].NotificationSubTitle3 + '</p>';
                li += '</div>';
                li += '</div></div>';
                li += '</div></div>';
                li += '</div><br />';
            }

            $("#pnlNotificationList").html(li);
        });
}
//function getUserNotificationList(index) {
//    $.get(urlRoot + '/api/UserNotification/GetUserNotificationList',
//        function (data) {
//            var _count = 0;
//            $("#imgUserImage").attr("src", data[0].RecieverImageProfileUrl);
//            $("#lblUserName").html(data[0].RecieverUserName);
//            var li = '';
//            for (var i = 0; i < data.length; i++) {
//                li += '<div class="mt-actions">';
//                li += '<div class="mt-action header" style="background-color: #ebebeb; margin-right: -20px; margin-top: -21px; margin-left: -20px;">';
//                li += '<div class="mt-action-img"></div>';
//                li += '<div class="mt-action-body" style="overflow: inherit !important;">';
//                li += '<div class="mt-action-row">';
//                li += '<div class="mt-action-info"><div class="mt-action-details"><span class="mt-action-author">' + data[i].NotificationDateFormat +'</span></div></div>';
//                li += '<div class="mt-action-buttons" style="position: absolute; bottom: -8%; right: 24%; font-size: 18px;"><a>' + data[i].NotificationCount +'</a></div>';
//                li += '<div class="mt-action-icon" style="position: absolute; bottom: -8%; left: 8%; font-size: 18px;"><a>' + data[i].NotificationCount +'</a></div>';
//                li += '</div></div></div>';
//                _count = _count + data[i].NotificationList.length;
//                for (var c = 0; c < data[i].NotificationList.length; c++) {
//                    li += '<div class="mt-action"><div class="mt-action-img"></div><div class="mt-action-body">';
//                    li += '<div class="mt-action-row"><div class="mt-action-info">';

//                    li += '<div class="mt-action-details" style="width:350px;">';
//                    li += '<p class="mt-action-author">' + data[i].NotificationList[c].NotificationTitle1 +'</p>';
//                    li += '<p class="mt-action-desc">' + data[i].NotificationList[c].NotificationSubTitle1 +'</p>';
//                    li += '</div>';

//                    li += '<div class="mt-action-details" style="width:350px;">';
//                    li += '<p class="mt-action-author">' + data[i].NotificationList[c].NotificationTitle2 + '</p>';
//                    li += '<p class="mt-action-desc">' + data[i].NotificationList[c].NotificationSubTitle2 + '</p>';
//                    li += '</div>';

//                    li += '<div class="mt-action-details" style="width: 350px;">';
//                    li += '<p class="mt-action-author">' + data[i].NotificationList[c].NotificationTitle3 +'</p>';
//                    li += '<p class="mt-action-desc">' + data[i].NotificationList[c].NotificationSubTitle3 +'</p>';
//                    li += '</div>';
//                    li += '</div></div>';
//                    li += '</div></div>';
//                }
//                li += '</div><br />';
//            }

//            $("#lblUserNotificationCount").html('الاشعارات : ' + _count);
//            $("#lblUserNotificationCount2").html('النقاط : ' + _count);
//            $("#pnlNotificationList").html(li);
//        });
//}


$(function () {
    var connection = $.hubConnection(urlRoot);
    var notification = connection.createHubProxy('notificationHub');
    notification.on('sendnotification', function () {
        getNotificationData(0);
    });
    connection.start()
        .done(function () { console.log('Now connected, connection ID=' + connection.id); })
        .fail(function () { console.log('Could not connect'); });
    getNotificationData(0);
});

function getNotificationData(index) {
    $.get(urlRoot + '/api/Notification/GetNotification?index=' + index,
        function (data) {
            var li = '';
            for (var i = 0; i < data.EmployeeNotificationList.length; i++) {
                li += '<li onclick="ReadNotification(this)" data-id="' + data.EmployeeNotificationList[i].ID + '" data-page="' + data.EmployeeNotificationList[i].PageUrl + '">';
                li += '<a href="javascript:;"  style="' + (data.EmployeeNotificationList[i].IsRead ? "" : "background-color: #edf2fa !important;") + '" >';
                li += '<span class="photo">';
                li += '<img src="' + (data.EmployeeNotificationList[i].EmployeeImage != null ? data.EmployeeNotificationList[i].EmployeeImage.replace("~", urlRoot) : urlRoot + "/assets/custom/images/img/Avatar-512.png") + '" class="img-rounded" alt="' + data.EmployeeNotificationList[i].EmployeeName + '"> </span>';
                li += '<span class="subject">';
                li += '<span class="from"> ' + data.EmployeeNotificationList[i].EmployeeName + ' </span>';
                li += '</span>';
                li += '<span class="message"> ' + data.EmployeeNotificationList[i].NotificationMessage + ' </span>';
                li += '<span style="position: relative;bottom: 3px;float: left; font-size: 10px;">' + data.EmployeeNotificationList[i].InsertionDate + ' </span>';
                li += '</a>';
                li += '</li>';
                li += '';
            }
            $("#notiWorker").html(li);

            if (data.UnHideCount > 0) {
                $("#msgCount1").show();
                $("#msgCount1").text(data.UnHideCount);
                $("#msgCount2").text(data.UnAllCount);
            } else {
                $("#msgCount1").hide();
                $("#msgCount2").text(data.UnAllCount);
            }
        });
}

function ReadNotification(elem) {
    $.post(urlRoot + '/api/Notification/ReadNotification?notificationid=' + $(elem).data("id"),
        function (data) {
            if (data === 1)
                window.location = urlRootNotification + "/" + $(elem).data("page")
        });
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

    $('body').on("click",
        ".dropdown-inbox",
        function () {
            $.post(urlRoot + '/api/Notification/HideAllNotification',
                function (data) {
                    getNotificationData(0);
                });
        });
});

var index = 0;
$(document).ready(function () {
    $('body').find(".scrollerx").scroll(function () {
        var hight = $('body').find(".scrollerx")[0].scrollHeight
        if ($('body').find(".scrollerx")[0].scrollHeight < $('body').find(".scrollerx").scrollTop() + 500) {
            // Display AJAX loader animation
            index = index + 1;
            $.get(urlRoot + '/api/Notification/GetNotification?index=' + index,
                function (data) {
                    var li = '';
                    for (var i = 0; i < data.EmployeeNotificationList.length; i++) {
                        li += '<li onclick="ReadNotification(' + data.EmployeeNotificationList[i].ID + ')">';
                        li += '<a href="' +
                            data.EmployeeNotificationList[i].PageUrl +
                            '" style="' +
                            (data.EmployeeNotificationList[i].IsRead ? "" : "background-color: #edf2fa !important;") +
                            '" >';
                        li += '<span class="photo">';
                        li += '<img src="' +
                            data.EmployeeNotificationList[i].EmployeeImage.replace("~", urlRoot) +
                            '" class="img-rounded" alt="' +
                            data.EmployeeNotificationList[i].EmployeeName +
                            '"> </span>';
                        li += '<span class="subject">';
                        li += '<span class="from"> ' + data.EmployeeNotificationList[i].EmployeeName + ' </span>';

                        li += '</span>';
                        li += '<span class="message"> ' +
                            data.EmployeeNotificationList[i].NotificationMessage +
                            ' </span>';
                        li += '<span style="position: relative;bottom: 3px;float: left; font-size: 10px;">' +
                            data.EmployeeNotificationList[i].InsertionDate +
                            ' </span>';
                        li += '</a>';
                        li += '</li>';
                        li += '';
                    }

                    $('#notiWorker').append(li);
                });
        }
    });
});
