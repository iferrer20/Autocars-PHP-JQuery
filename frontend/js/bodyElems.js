"use strict";

const getElem = async function(el) { // Returns header html
    var headerhtml = await req("GET", "/elem/" + el + ".html", null, false);
    return headerhtml;
}

const renderBodyElems = async function() {
    $('[elem-key]').each(async function() {
        let key = $(this).attr('elem-key');
        $(this).html(await getElem(key));
    });
}
