Vue.filter('capitalize', function (value) {
    if (!value) {
        return '';
    } else {
        value = value.toString();
        value = value.toLowerCase();
        value = value.charAt(0).toUpperCase() + value.slice(1); 
        return value;
    }    
});

Vue.filter('dateYYYYMMDD', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('YYYY-MM-DD');
});

Vue.filter('dateYYYYMMDDhhmmss', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('YYYY-MM-DD hh:mm:ss A');
});

Vue.filter('bool-to-string', function (value) {
    if (!value) return 'No';
    else return 'Yes';
});

Vue.filter('currency', function (value) {
    //return '$' + value.toFixed(2)
    let amount = parseFloat(value).toFixed(2);
    var parts = amount.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '$' + parts.join(".");
});

Vue.filter('breakLines', function (value) {
    return value.replace('\n', '<br />');
});

Vue.filter('maskedPhone', function (value) {
    if (value) {
        let regex = /(\d+)/g;
        let phoneNumbers = value.match(regex).join();
        if (phoneNumbers !== null && phoneNumbers.length >= 10) {
            return phoneNumbers.substr(0, 3) + " ••• ••" + phoneNumbers.slice(-2);
        }
    }
    return value;
});

Vue.filter('maskedEmail', function (value) {
    if (value) {
        if (value.indexOf("@") >= 0) {
            return value.substr(0, 2) + '•' + value.substr(value.indexOf("@"));
        }
    }
    return value;
});

Vue.filter('removeHtml', function (value) {
    if (value) {
        return value.replace(/<[^>]*>/g, '').replace(/\n/g, '');
    }
    return value;
});

//Vue.filter('highlight', function (value, text) {
//    if (value && text) {
//        return value
//            .replace(text, '<mark>' + text + '</mark>')
//            .replace(text.charAt(0).toUpperCase() + text.slice(1), '<mark>' + text.charAt(0).toUpperCase() + text.slice(1) + '</mark>');
//    }
//    return value;
//});
Vue.filter('highlight', function (value, text) {
    if (value && text) {
        return value
            .replace(text, '<mark>' + text + '</mark>')
            .replace(text.charAt(0).toUpperCase() + text.slice(1), '<mark>' + text.charAt(0).toUpperCase() + text.slice(1) + '</mark>');
    }
    if (text == undefined) {
        return value
            .replace(value, '<mark>' + value + '</mark>')
            .replace(value.charAt(0).toUpperCase() + value.slice(1), '<mark>' + value.charAt(0).toUpperCase() + value.slice(1) + '</mark>');
    }
    return value;
});


Vue.filter('formatMailDate', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    if (moment(d).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
        return moment(value).format('hh:mm A');
    } else {
        return moment(d).format('dddd MM-DD');
    }
});

Vue.filter('dateYYMMDD', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('YY-MM-DD');
});

Vue.filter('Timehhmmss', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('hh:mm:ss A');
});

Vue.filter('currencyDisplay', function (value) {
    if (value != null) {
        let amount = parseFloat(value).toFixed(2);
        var parts = amount.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return '$' + parts.join(".");
    } else {
        return '$' + 0;
    }
});

Vue.filter('statistics', function (value) {
    if (value != null) {
        let amount = parseFloat(value).toFixed(2);
        var parts = amount.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    } else {
        return "0.00";
    }
});

Vue.filter('porcentage-to-string', function (value) {
    if (value > 0) {

        return value + "%";
    } else {
        return 0 + "%";
    }
});

Vue.filter('abbreviation', function (value) {
    if (!value) {
        return '';
    } else {
        value = value.toString();
        value = value.slice(0, 3).toUpperCase();
        return value;
    }
});

Vue.filter('absolute', function (value) {
    if (!value) return '';
    if (value >= 0) {
        return value;
    } else {
        value = value * -1;
        return value;
    }
});

Vue.filter('UpperCase', function (value) {
    if (!value) {
        return '';
    } else {
        value = value.toString();
        value = value.toUpperCase();
        return value;
    }
});

Vue.filter('statisticsText', function (value) {
    if (value != null) {
        let amount = parseFloat(value).toFixed(2);
        var parts = amount.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "");
        return parts.join(".");
    } else {
        return "0.00";
    }
});

Vue.filter('filler', function (value, width) {
    if (value == undefined) {
        value = "";
    }
    width -= value.toString().length;
    if (width > 0) {
        fill = new Array(width + (/\.\s/.test(value) ? 2 : 1)).join(String.fromCharCode(32));
        //fill = new Array(width + (/\./.test(value) ? 2 : 1)).join("½");
        return value + fill;
    }
    return value + "";
});

Vue.filter('getTotalAccount', function (list, orderTypeID, parentOrderTypeID, exclude) {
    total = 0;
    if (exclude == '' || exclude == undefined) {
        $.each(list, function (i, e) {
            if (e.order_TypeID == orderTypeID && e.parentOrderTypeID == parentOrderTypeID) {
                total += e.total;
            }
        });
    } else {
        $.each(list, function (i, e) {
            if (e.order_TypeID == orderTypeID && e.parentOrderTypeID == parentOrderTypeID && e.accountAlias != exclude) {
                total += e.total;
            }
        });
    }
    return total * -1;
});

Vue.filter('getTotalCommission', function (list) {
    total = 0;
    $.each(list, function (i, e) {
        invoiceComission = 0;
        com = e.commissionPercentage/100
        invoiceComission = e.invoice_amount * com;
        total += invoiceComission;
    });
    return total;
});

Vue.filter('getPays', function (list) {
    total = 0;
    details = 0;
    deposits = 0;
    notes = 0;
    $.each(list, function (i, e) {
        if (e.TermsPayment == "Contado") {
            $.each(e.Details, function (id, detail) {
                details += detail.amount;
            });
        }
        if (e.TermsPayment == "Credito") {
            $.each(e.Deposits, function (i, deposit) {
                deposits += deposit.amount;
            });
        }
        $.each(e.Notes, function (ix, note) {
            notes += note.amount;
        });
    });

    total = details+ deposits + notes;
    
    return total;
});

Vue.filter('getCommissionPaid', function (list) {
    total = 0;
    details = 0;
    deposits = 0;
    notes = 0;
    $.each(list, function (i, e) {
        if (e.TermsPayment == "Contado") {
            $.each(e.Details, function (id, detail) {
                details += detail.ComPaid;
            });
        }
        if (e.TermsPayment == "Credito") {
            $.each(e.Deposits, function (i, deposit) {
                deposits += deposit.ComPaid;
            });
        }
        $.each(e.Notes, function (ix, note) {
            notes += note.ComPaid;
        });
    });

    total = details + deposits + notes;

    return total;
});

Vue.filter('getCommissionPendent', function (list) {
    TotalPendent = 0;
    TotalCommission = 0;
    total = 0;
    totalPaid = 0;
    details = 0;
    deposits = 0;
    notes = 0;
    $.each(list, function (i, e) {
        if (e.TermsPayment == "Contado") {
            $.each(e.Details, function (id, detail) {
                details += detail.ComPaid;
            });
        }
        if (e.TermsPayment == "Credito") {
            $.each(e.Deposits, function (i, deposit) {
                deposits += deposit.ComPaid;
            });
        }
        $.each(e.Notes, function (ix, note) {
            notes += note.ComPaid;
        });
        invoiceComission = 0;
        com = e.commissionPercentage / 100
        invoiceComission = e.invoice_amount * com;
        TotalCommission += invoiceComission;
    });

    TotalPendent = details + deposits + notes;
    total = TotalCommission - TotalPendent;
    return total;
});

Vue.filter('dateDDMMYYYY', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('DD-MM-YYYY');
});

Vue.filter('dateDDMMYYYYHHMM', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('DD-MM-YYYY hh:mm a');
});

Vue.filter('date', function (value) {
    if (!value) return '';
    //let re = /-?\d+/;
    //let m = re.exec(value);
    //let d = new Date(parseInt(m[0]));
    return moment(value).format('DD-MMM-YYYY');
});

Vue.filter('dateDDMMYY', function (value) {
    if (!value) return '';
    //let re = /-?\d+/;
    //let m = re.exec(value);
    //let d = new Date(parseInt(m[0]));
    return moment(value).format('DDMMYY');
});

Vue.filter('dateMMYYYY', function (value) {
    if (!value) return '';
    let re = /-?\d+/;
    let m = re.exec(value);
    let d = new Date(parseInt(m[0]));
    return moment(d).format('MM-YYYY');
});