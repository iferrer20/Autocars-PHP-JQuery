"use strict";

class Header {
    constructor() {
        let self = this;
        $(".header-menu-lang-menu").children().click(function() {
            self.changeLang($(this));
        });
        $(".header-menu > div").click(function() {
            self.onClickMenuElement($(this));
        });
    }
    
    onClickMenuElement(el) {
        let page = el.attr("value");
        if (typeof page != 'undefined') {
            App.href("/" + page);
        }
        
    }
    
    changeLang(el) {
        App.setUserLang(el.attr("value"));
    }
}

