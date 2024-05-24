//translate table Header
var translate = function (array) {
    var translateArray = array.map(function (value) {
        if (TranslateAr.hasOwnProperty(value)) return TranslateAr[value];
        else return value;
    });
    return translateArray;
}
var TranslateAr = {
    nameAr: "الإسم بالعربية",
    nameEn: "الإسم بالإنجليزية",
    name: "الإسم",
    Name: "الإسم",
    Price: "السعر",
    Quantity: "الكمية",
    Mobile: "رقم المحمول",
    Mobile2: "رقم المحمول 2", 
    FullName: "الاسم",
    NationalID: "الرقم القومي",
    RelativeType: "صلة القرابة",
    unitMeasurement: "وحدات القياس",

}
var datatablear = {
    "decimal": "",
    "emptyTable": "لا توجد بيانات في الجدول",
    "info": "عرض _START_ الي _END_ من _TOTAL_ الإدخالات",
    "infoEmpty": "عرض 0 to 0 of 0 الإدخالات",
    "infoFiltered": " ( تحديد من _MAX_ total الإدخالات ) ",
    "infoPostFix": "",
    "thousands": ",",
    "lengthMenu": "عرض _MENU_ الإدخالات",
    "loadingRecords": "جار التحميل...",
    "processing": "معالجة...",
    "search": "بحث:",
    "zeroRecords": "لا توجد سجلات مطابقة",
    "paginate": {
        "first": "الأول",
        "last": "الإخر",
        "next": "التالى",
        "previous": "السابق"
    },
    select: {
        rows: {
            _: "لقد حددت  %d صفوف ",
            0: " انقر الصف لتحديده  ",
            1: " فقط 1 صف محدد "
        }
    },
    "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
    }
};