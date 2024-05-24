$(document).ready(function () {
    GetActivityListForUserId($('#HideUserID').val());
});

function GetActivityListForUserId(currentuserid) {
    $('#HideCurrentUserID').val(currentuserid);
    getDoctorActivityHeader(currentuserid);
    getDoctorActivityList(currentuserid);
    //getOtherDoctorList(currentuserid);
    //$('#doctorselect').modal('hide');
}

function getDoctorActivityHeader(currentuserid) {
    $.get(urlRoot + '/api/DoctorActivity/GetDoctorHeaderData/' + currentuserid,
        function (data) {
            $("#lblDoctorName").html(data.DoctorName);
            $("#imgDoctorImage").attr("src", data.DoctorImageUrl);
            $("#lblDoctorActivityCount").html('الانشطة : ' + data.DoctorActivityCount);
            $("#lblDoctorActivityPointCount").html('النقاط : ' + data.DoctorActivityPointCount);
        });
}

function getDoctorActivityList(currentuserid) {
    $.get(urlRoot + '/api/DoctorActivity/GetDoctorActivityHistory/' + currentuserid,
        function (data) {
            var li = '';
            for (var i = 0; i < data.length; i++) {
                li += '<div class="mt-actions">';
                li += '<div class="mt-action header" style="background-color: #ebebeb; margin-right: -20px; margin-top: -21px; margin-left: -20px;">';
                li += '<div class="mt-action-img"></div>';
                li += '<div class="mt-action-body" style="overflow: inherit !important;">';
                li += '<div class="mt-action-row">';
                li += '<div class="mt-action-info"><div class="mt-action-details"><span class="mt-action-author">' + data[i].ActivityDateFormat + '</span></div></div>';
                li += '<div class="mt-action-buttons" style="position: absolute; bottom: -8%; right: 24%; font-size: 18px;"><a>' + data[i].ActivityCount + '</a></div>';
                li += '<div class="mt-action-icon" style="position: absolute; bottom: -8%; left: 8%; font-size: 18px;"><a>' + data[i].ActivityPointCount + '</a></div>';
                li += '</div></div></div>';

                for (var c = 0; c < data[i].ActivityList.length; c++) {
                    li += '<div class="mt-action"><div class="mt-action-img"></div><div class="mt-action-body">';
                    li += '<div class="mt-action-row"><div class="mt-action-info">';

                    li += '<div class="mt-action-details" style="width:350px;">';
                    li += '<p class="mt-action-author">' + data[i].ActivityList[c].ActivityTitle1 + '</p>';
                    li += '<p class="mt-action-desc">' + data[i].ActivityList[c].ActivitySubTitle1 + '</p>';
                    li += '</div>';

                    li += '<div class="mt-action-details" style="width:350px;">';
                    li += '<p class="mt-action-author">' + data[i].ActivityList[c].ActivityTitle2 + '</p>';
                    li += '<p class="mt-action-desc">' + data[i].ActivityList[c].ActivitySubTitle2 + '</p>';
                    li += '</div>';

                    li += '<div class="mt-action-details" style="width: 350px;">';
                    if (data[i].ActivityList[c].ActivityTitle3 == null || data[i].ActivityList[c].ActivityTitle3 == "") {

                        li += '<p class="mt-action-author" style="color:#fff;">null</p>';
                    }
                    else {
                        li += '<p class="mt-action-author">' + data[i].ActivityList[c].ActivityTitle3 + '</p>';
                    }
                    li += '<p class="mt-action-desc">' + data[i].ActivityList[c].ActivitySubTitle3 + '</p>';
                    li += '</div>';
                    li += '</div></div>';
                    li += '</div></div>';
                }
                li += '</div><br />';
            }
            $("#pnlDoctorActivityList").html(li);
        });
}

$("#currentdoctorpanel").on("click", function () {
    getOtherDoctorList($('#HideCurrentUserID').val());
    $('#doctorselect').modal('show');
})

function getOtherDoctorList(currentuserid) {
    $.get(urlRoot + '/api/DoctorActivity/GetOtherDoctorList/' + currentuserid + '/' + $('#HideHospitalID').val(),
        function (data) {
            var li = '';
            for (var i = 0; i < data.length; i++) {
                li += '<div class="mt-radio mt-radio-outline" style="width: 100%;" name="DoctorItem" id="DoctorId-' + data[i].ID + '" data-id="' + data[i].UserId + '">';
                //li += '<input type="radio" class="pnlDoctorItem" value="' + data[i].UserId + '">';
                li += '<img src="' + data[i].DoctorImageProfileUrl + '" style="border-radius: 20px;" id="imgDoctorImage-' + data[i].ID + '" width="40" height="40" />';
                li += data[i].DoctorName;
                //li += '<span style="margin-top: 8px;"></span>';
                li += '</div>';
            }
            $("#pnlDoctorList").html(li);

            $('div[name=DoctorItem]').on('click', function () {
                GetActivityListForUserId($(this).data('id'));
                $("#doctorselect").modal("hide");
            });
        });
}
