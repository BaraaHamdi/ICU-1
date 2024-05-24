
$(document).ready(function () {
   
    //$.fn.editable.defaults.mode = 'inline';
    $.mockjaxSettings.responseTime = 500;

    var log = function (settings, response) {
        var s = [],
            str;
        s.push(settings.type.toUpperCase() + ' url = "' + settings.url + '"');
        for (var a in settings.data) {
            if (settings.data[a] && typeof settings.data[a] === 'object') {
                str = [];
                for (var j in settings.data[a]) {
                    str.push(j + ': "' + settings.data[a][j] + '"');
                }
                str = '{ ' + str.join(', ') + ' }';
            } else {
                str = '"' + settings.data[a] + '"';
            }
            s.push(a + ' = ' + str);
        }
        s.push('RESPONSE: status = ' + response.status);

        if (response.responseText) {
            if ($.isArray(response.responseText)) {
                s.push('[');
                $.each(response.responseText, function (i, v) {
                    s.push('{value: ' + v.value + ', text: "' + v.text + '"}');
                });
                s.push(']');
            } else {
                s.push($.trim(response.responseText));
            }
        }
        s.push('--------------------------------------\n');
        $('#console').val(s.join('\n') + $('#console').val());
    }



    //ReligionList
    var ReligionList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot+'/hr/ws/wsEmployeeInfo.asmx/GetReigion',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            ReligionList = response.d;
           
        },
        error: function () {
            
        }
    });

    $.mockjax({
        url: '/religions',
        response: function (settings) {
            this.responseText = ReligionList;

        }
    });

    //HireTypeList
    var HireTypeList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetHireType',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            HireTypeList = response.d;

        },
        error: function () {

        }
    });

    $.mockjax({
        url: '/hiretypes',
        response: function (settings) {
            this.responseText = HireTypeList;

        }
    });
    
    //NationalityList
    var NationalityList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetNationality',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            NationalityList = response.d;
           
        },
        error: function () {
            
        }
    });

    $.mockjax({
        url: '/Nationalitys',
        response: function (settings) {
            this.responseText = NationalityList;

        }
    });

    //Marital Status
    var MaritalStatusList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetMaritalStatus',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            MaritalStatusList = response.d;
           
        },
        error: function () {
            
        }
    });
    $.mockjax({
        url: '/MaritalStatuss',
        response: function (settings) {
            this.responseText = MaritalStatusList;

        }
    });
    //Military Status
    var MilitaryStatusList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetMilitaryStatus',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            MilitaryStatusList = response.d;

        },
        error: function () {

        }
    });
    $.mockjax({
        url: '/MilitaryStatuss',
        response: function (settings) {
            this.responseText = MilitaryStatusList;

        }
    });
   
    //Governorate
    var GovernorateList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetGovernorate',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            var list = response.d;
            for (var i = 0; i < list.length; i++) {
                GovernorateList.push({
                    id: list[i].value ,
                    text: list[i].text
                });

            }

        },
        error: function () {

        }
    });

    //EmpCode
    var EmpCodeList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetEmpCode',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            var list = response.d;
            for (var i = 0; i < list.length; i++) {
                EmpCodeList.push({
                    value: list[i].value,
                    text: list[i].text
                });

            }
        },
        error: function () {

        }
    });
    //AddressTyoe
    var AddressTypeList = [];
    $.ajax({
        type: 'POST',
        url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/GetAddressType',
        data: '',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        cache: false,
        timeout: 10000,
        success: function (response) {
            var list = response.d;
            for (var i = 0; i < list.length; i++) {
                AddressTypeList.push({
                    value: list[i].value,
                    text: list[i].text
                });

            }
        },
        error: function () {

        }
    });

    ////////FirstName//////
    $('#firstname').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        placement: 'auto',
        url: function (params) {
            var requestData = '';
            if (params.name == 'firstname')
                requestData = { FirstName: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerFirstName',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        },
        
    });
    ////////End FirstName//////

    ////////MiddleName//////
    $('#middlename').editable({
        placement: 'auto',
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'middlename')
                requestData = { MiddleName: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerMiddleName',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End MiddleName//////

    ////////LastName//////
    $('#lastname').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'lastname')
                requestData = { LastName: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerLastName',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End LastName//////


    ////////familyname//////
    $('#familyname').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'familyname')
                requestData = { FamilyName: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerFamilyName',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End FamilyName//////

    ////////attendancecode//////
    $('#attendancecode').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'attendancecode')
                requestData = { Attendancecode: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerAttendancecode',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End LastName//////

    ////////NationalID//////
    $('#nationaliD').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'nationaliD')
                requestData = { NationalID: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerNationalID',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End NationalID//////

    ////////Social Insurance Number//////
    $('#socialInsurancenumber').editable({
        validate: function (value) {
            if ($.trim(value) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'socialInsurancenumber')
                requestData = { SocialInsuranceNumber: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerSocialInsuranceNumber',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End Social Insurance Number//////

    ////////religion//////
    $('#religion').editable({
        showbuttons: false,
        inputclass: 'form-control input-small',
        source: function () {
            return source;
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'religion')
                requestData = { Religion: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerReligion',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        },
    });
    ////////End religion//////

    ////////hiretype//////
    $('#hiretype').editable({
        showbuttons: false,
        inputclass: 'form-control input-small',
        source: function () {
            return source;
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'hiretype')
                requestData = { HireType: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerHireType',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End religion//////

    ////////gender//////
    $('#gender').editable({
        showbuttons: false,
        inputclass: 'form-control',
        source: [{
            value: 0,
            text: 'Female'
        }, {
            value: 1,
            text: 'Male'
        }], 
        url: function (params) {
            var requestData = '';
            if (params.name == 'gender')
                requestData = { Gender: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerGender',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        }

    });
    ////////End gender//////

    ////////Nationality//////
    $('#nationality').editable({
        showbuttons: false,
        inputclass: 'form-control input-small select2me',
        source: function () {
            return source;
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'nationality')
                requestData = { Nationality: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerNationality',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        },
    });
    ////////End Nationality//////
    ////////Marital Status//////
    $('#maritalstatus').editable({
        showbuttons: false,
        inputclass: 'form-control input-small',
        source: function () {
            return source;
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'maritalstatus')
                requestData = { MaritalStatus: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerMaritalStatus',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        },
    });
    ////////End Marital Status//////

    ////////Marital Status//////
    $('#militarystatus').editable({
        showbuttons: false,
        inputclass: 'form-control input-small',
        source: function () {
            return source;
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'militarystatus')
                requestData = { MilitaryStatus: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerMilitaryStatus',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        },
    });
    ////////End Marital Status//////

    ////////Hire Date//////
    $('#hiredate').editable({
        inputclass: 'form-control',
        url: function (params) {
            var requestData = '';
            if (params.name == 'hiredate')
                requestData = { HireDate: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerHireDate',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        }
    });
    //////// End Hire Date //////

    ////////Birth Date//////
    $('#birthdate').editable({
        inputclass: 'form-control',
        url: function (params) {
            var requestData = '';
            if (params.name == 'birthdate')
                requestData = { BirthDate: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerBirthDate',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {

                },
                error: function () {

                }
            });

        }
    });
    //////// End Birth Date //////

    ////////Nationality//////
    var requestData = '';
    $('#governorate').editable({
        inputclass: 'form-control input-medium',
        showbuttons:false,
        source:GovernorateList,
        select2: {
            placeholder: "Select a Governorate",
            allowClear: true
           
        },
        url: function (params) {
            
            if (params.name == 'governorate')
                requestData = { Governorate: params.value, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerGovernorate',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {
                    
                }
            });

        },
    });
    ////////End Nationality//////


    $('#EmpCode').editable({
        showbuttons: 'right',
        source: EmpCodeList,
        validate: function (value) {
            if ($.trim(value.codeselect) == '') return 'هذا الحقل مطلوب';
            if ($.trim(value.textcode) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
            if (params.name == 'EmpCode')
                requestData = { Code: params.value.codeselect, TextCode: params.value.textcode, EmployeeID: params.pk }
            else
                return; //perform no update
            //
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerEmployeeCode',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                   
                },
                error: function () {

                }
            });

        },
    });

    $('.addresstype').editable({
        showbuttons: 'right',
        source: AddressTypeList,
        validate: function (value) {
            if ($.trim(value.typeselect) == '') return 'هذا الحقل مطلوب';
            if ($.trim(value.textinfo) == '') return 'هذا الحقل مطلوب';
        },
        url: function (params) {
            var requestData = '';
                requestData = { AddressType: params.value.typeselect, Address: params.value.textinfo, EmployeeID: params.pk }
            return $.ajax({
                type: 'POST',
                url: urlRoot + '/hr/ws/wsEmployeeInfo.asmx/PerAddress',
                data: JSON.stringify(requestData),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                cache: false,
                timeout: 10000,
                success: function (response) {
                    alert("OK");
                },
                error: function () {

                }
            });

        },
    });
   
    
});
