
$(function () {
    var connection = $.hubConnection(urlRoot);
    var notification = connection.createHubProxy('notificationHub');
    notification.on('sendnotification', function () {
        getNotificationData(0);
        getNotificationPageData();
    });
    connection.start()
        .done(function () { console.log('Now connected, connection ID=' + connection.id); })
        .fail(function () { console.log('Could not connect'); });
    getNotificationData(0);
    getNotificationPageData();
});

$("#btnCloseNotificationBar").on("click", function () {
    $.post(urlRoot + '/api/Notification/ClearNotificationCount',
        function (data) {
            if (data > 1) {
                getNotificationData(0);
                getNotificationPageData();
            }
        });
})

function clearNotificationCount() {
    $.post(urlRoot + '/api/Notification/ClearNotificationCount',
        function (data) {
            if (data > 1) {
                getNotificationData(0);
                getNotificationPageData();
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
                $("#msgCount1").text(data.UnReadCount);
                $("#msgCount2").text(data.UnReadCount);
                $("#lblNotificationCount").html(data.UnReadCount);
            } else {
                $("#msgCount1").hide();
                $("#msgCount2").text(data.UnReadCount);
                $("#lblNotificationCount").html(data.UnReadCount);
            }
        });
}

function getNotificationPageData() {
    $.get(urlRoot + '/api/UserNotification/GetUserNotificationList',
        function (data) {
            var li = '';
            for (var i = 0; i < data.length; i++) {
                li += '<li class="media">';
                li += '<div class="m-grid m-grid-demo">';
                li += '<div class="m-grid-row">';
                li += '<div class="m-grid-col m-grid-col-middle" style="border: 0px;background: #21282e;">';
                li += '<img class="media-object" src="' + data[i].NotifierImageProfileUrl + '" alt="' + data[i].NotificationTitleName + '" />';
                li += '<div class="media-body">';
                li += '<h4 class="media-heading">' + data[i].NotificationTitle1 + '</h4>';
                li += '<div class="media-heading-sub">' + data[i].NotificationTitle2 + '</div>';
                li += '<div class="media-heading-small">' + data[i].NotificationTitle3 + '</div>';
                li += '</div>';
                li += '</div>';
                li += '<div class="m-grid-col m-grid-col-middle" style="border: 0px;background: #21282e;padding-right:20px;">';
                li += '<div class="media-body">';
                li += '<h4 class="media-heading">' + data[i].NotificationTitle4 + '</h4>';
                li += '<div class="media-heading-sub">' + data[i].NotificationTitle5 + '</div>';
                li += '<div class="media-heading-small">' + data[i].NotificationTitle6 + '</div>';
                li += '</div>';
                li += '</div>';
                li += '</div>';
                li += '</div>';
                li += '</li>';
            }
            $("#lblNotificationList").html(li);
            $("#lblNotificationCount").html(data.length);
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
                    getNotificationPageData();
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




//document.addEventListener('DOMContentLoaded', function () {
//    if (Notification.permission !== "granted") {
//        Notification.requestPermission();
//    }
//});


//function customnotify(title, desc, url) {

//    if (Notification.permission !== "granted") {
//        Notification.requestPermission();
//    }
//    else {
//        var notification = new Notification(title, {
//            icon: 'http://Your_Website.com/logo.png',
//            body: desc,
//        });

//        /* Remove the notification from Notification Center when clicked.*/
//        notification.onclick = function () {
//            window.open(url);
//        };

//        /* Callback function when the notification is closed. */
//        notification.onclose = function () {
//            console.log('Notification closed');
//        };

//    }
//}

//$('#textbtn').click(function () {
//    customnotify("Nouh", "DEscription", "www.google.com")
//})