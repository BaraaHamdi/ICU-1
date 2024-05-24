jQuery(document).ready(function () {

    $(".touchspinMoneyClass").TouchSpin({
        buttondown_class: 'btn blue',
        buttonup_class: 'btn blue',
        min: 0,
        max: 1000000000,
        step: 0.1,
        decimals: 2,
        initval:0,
        stepinterval: 50,
        maxboostedstep: 10000000,
        prefix: 'EGP'
    });

    $('.clockfaceClass1').clockface({
        format: 'HH:mm',
        trigger: 'manual'
    });

    $('.clockfaceClass_toggle1').click(function (e) {
        e.stopPropagation();
        $('.clockfaceClass1').clockface('toggle');
    });

    $('.clockfaceClass_toggle2').click(function (e) {
        e.stopPropagation();
        $('.clockfaceClass2').clockface('toggle');
    });

    $('.clockfaceClass_toggle3').click(function (e) {
        e.stopPropagation();
        $('.clockfaceClass3').clockface('toggle');
    });

    $('.clockfaceClass_toggle4').click(function (e) {
        e.stopPropagation();
        $('.clockfaceClass4').clockface('toggle');
    });

    $('.clockfaceClass_toggle5').click(function (e) {
        e.stopPropagation();
        $('.clockfaceClass5').clockface('toggle');
    });

    $('#clockfacetimeto_toggle').click(function (e) {
        e.stopPropagation();
        $('#clockfacetimeto').clockface('toggle');
    });

    $('#clockfacetimefrom_toggle').click(function (e) {
        e.stopPropagation();
        $('#clockfacetimefrom').clockface('toggle');
    });

    $(".touchspinpercentClass").TouchSpin({
        buttondown_class: 'btn blue',
        buttonup_class: 'btn blue',
        min: 0,
        max:1000,
        step: 0.1,
        initval: 0,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
    });

    $(".touchspinpercentClass2").TouchSpin({
        buttondown_class: 'btn blue',
        buttonup_class: 'btn blue',
        min: 0,
        max: 100,
        step: 0.1,
        initval: 1.0,
        decimals: 1,
        boostat: 5,
        maxboostedstep: 100000000000,
        postfix: '%'
    });
    $(".touchspinMoneyClass3").TouchSpin({
        buttondown_class: 'btn blue',
        buttonup_class: 'btn blue',
        min: 0,
        max: 1000000000,
        step: 0.1,
        initval: 1.00,
        decimals: 2,
        stepinterval: 50,
        maxboostedstep: 100000000000,
        prefix: 'EGP'
    });
    
    $('.spinner1').spinner({ value: 1, min: 1, initval: 0 });
    $('.spinner2').spinner({ value: 0, min: 0, initval: 0 });
    $('.spinner3').spinner({ value: 0, min: 0, initval: 0 });
    $('.spinnerOvertimeMin').spinner({ value: 30, min: 30, step: 1, initval: 30 });
    $('.spinnerOvertimeMax').spinner({ value: 30, min: 30, step: 1, initval: 30 });
    $('.spinnerOvertimeAmount').spinner({ value: 0, min: 0, step: 1, initval: 0 });

    $('.spinnerOvertimeFactorMin').spinner({ value: 15, min: 15, max: 60, step: 15, initval: 15 });

    $(".touchspinMoneyClass2").TouchSpin({
        buttondown_class: 'btn blue',
        buttonup_class: 'btn blue',
        min: 0,
        max: 1000000000,
        step: 1,
        initval: 0,
        decimals: 0,
        stepinterval: 50,
        maxboostedstep: 100000000000,
        prefix: 'EGP'
    });
    $(".touchspinNumberClass1").TouchSpin({
        buttondown_class: 'btn blue',
        buttonup_class: 'btn blue',
        min: 0,
        max: 1000000000,
        step: 1,
        initval: 1,
        decimals: 0,
        stepinterval: 50,
        maxboostedstep: 100000000000,
    });
    
    $('.defaultrangeFromTo').daterangepicker({
        opens: (App.isRTL() ? 'left' : 'right'),
        format: 'DD/MM/YYYY',
        separator: ' to ',
        startDate: moment().subtract('days', 15),
        endDate: moment().add(15, 'days'),
        //minDate: moment().subtract('days',15),
        //maxDate: moment().add(1, 'years'),
    },
            function (start, end) {
                $('.defaultrangeFromTo input').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            }
        );
});