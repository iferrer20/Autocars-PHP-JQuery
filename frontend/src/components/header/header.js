"use strict";

class Header {
    constructor() {
        let self = this;
        $(this.obj).find(".header-menu-lang-menu").children().click(function() {
            self.changeLang($(this));
        });
        $(this.obj).find(".header-menu > div").click(function() {
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

