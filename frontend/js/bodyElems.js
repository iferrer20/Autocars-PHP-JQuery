"use strict";

const getElem = async function(el) { // Returns header html
    var headerhtml = await req("GET", "/elem/" + el + ".html", null, false);
    return headerhtml;
}

const renderBodyElems = async function() {
    $('[elem-key], [nohtml-elem-key]').each(async function() {
        let key_val = $(this).attr('elem-key');
        let nohtml_key_val = $(this).attr('nohtml-elem-key');
        var strFn;

        if (key_val) {
            $(this).html(await getElem(key_val));
            strFn = key_val;
        } else {
            strFn = nohtml_key_val;
        }
        
        let arr = strFn.split("-");
        strFn = '';
        arr.forEach(element => {
            strFn += element.charAt(0).toUpperCase() + element.slice(1);
        });

        strFn = "construct" + strFn;
        if (typeof window[strFn] !== "undefined") {
            window[strFn].call(this);
        }
        // car-list to CreateCarList
        
    });
    $('').each(function() {
        let key = $(this).attr('nohtml-elem-key');
    });
}
