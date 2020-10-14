var gTrans = {
    id: {
        en: 'Id',
        he: 'מזהה'
    },
    title: {
        en: 'Title',
        he: 'כותרת'
    },
    'main-title': {
        en: 'Welcome to my bookshop :)',
        he: 'ברוכים הבאים לחנות הספרים שלי :)'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    'book-name-colon': {
        en: 'Book Name:',
        he: 'שם הספר:'
    },
    'price-colon': {
        en: 'Price:',
        he: 'מחיר:'
    },
    'currency-sign': {
        en: '$',
        he: '₪'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    read: {
        en: 'Read',
        he: 'קרא'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN';

    var trans = transMap[gCurrLang]
    if (!trans) trans = transMap['en'];
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(function(el){
        const transKey = el.dataset.trans;
        if (el.placeholder) el.placeholder = getTrans(transKey)
        else el.innerText = getTrans(transKey)
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('he')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}