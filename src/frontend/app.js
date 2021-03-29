"use strict";

var App = {};
App.views = {};

App.loadScript = async function(path) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = path;
    await loadSource(script);
}
App.loadStyle = async function(path) {
    let css = document.createElement("link");
    css.type = 'text/css';
    css.href = path;
    css.rel = "stylesheet";
    await loadSource(css);
}
App.loadView = async function(path) {
    let content = await req("GET", path, null, false);
    let page = /([^\/]+)(?=\.html)/.exec(path)[0]; 
    App.views[page] = content;
}
App.renderComponents = function(parent_comp) { // Load components in the html 
    let jqSelector = this.page.components.map(e => `[comp-key="${e}"]`).join(", ");
    
    parent_comp.obj.find(jqSelector).each(function() { 
        let comp = {};
        comp.name = $(this).attr("comp-key");
        comp.obj = $(this);
        comp.components = {};
        parent_comp.components[comp.name] = comp;
        
        App.renderView($(this), comp.name);
        App.renderComponents(comp);

        comp.classname = comp.name.charAt(0).toUpperCase() + comp.name.slice(1);
        let target_class = eval(`typeof ${comp.classname} == 'function' ? ${comp.classname} : 0`);
        
        if (target_class) {
            target_class.prototype.obj = $(this);
            target_class.prototype.parent = parent_comp;
            target_class.prototype.components = comp.components;

            comp.instance = new target_class;
            comp.instance.obj = $(this);
            comp.instance.parent = parent_comp;
            comp.instance.components = comp.components;

        }
    });
}

App.langs = ["en","es"];

App.getUserLang = function() { // Get user language
    let lang = localStorage.getItem("lang") || navigator.language || navigator.userLanguage; 
    lang = lang.indexOf("-") == -1 ? lang : lang.split("-")[0];
    lang = App.langs.indexOf(lang) == -1 ? App.langs[0] : lang; // Set default lang en if not support

    return lang;
}

App.loadUserLang = function() {
    let unused_langs = [...App.langs];
    let user_lang = this.getUserLang();
    unused_langs.splice(unused_langs.indexOf(user_lang), 1);

    let lang_css = unused_langs.map(lang => `text-${lang} { display: none; }`).join("\n") + `\ntext-${user_lang} { display: inline; }`;
    $(".lang-style").html(` /* Lang support */\n${lang_css}`);
}

App.setUserLang = function(lang) {
    if (App.langs.indexOf(lang) != -1 && App.getUserLang() != lang) {
        localStorage.setItem("lang", lang);
        App.loadUserLang(); // Reload css
    }
}

App.renderView = function(jqElement, name) {
    let view = App.views[name];
    if (view) {
        jqElement[0].innerHTML = view;
    }
}

App.href = function(path) {
    window.location.href = path;
}
App.uri = window.location.pathname.replace(/\/{2,}/g, "/").split("/").slice(1);
App.args = {};

App.setArg = function(key, value) {
    App.args[key] = value;
    let search = '?' + Object.keys(App.args).map(key => `${key}=${App.args[key]}`).join("&");
    window.history.replaceState(null, '', window.location.pathname+search);
}

window.location.search.slice(1).split("&").map(e => e.split("=")).map(([key,value]) => { 
    if (key != 'undefined' && value != 'undefined') {
        value = decodeURI(value);
        key = decodeURI(key);
        App.args[key] = isNaN(value) ? value : parseFloat(value);
    }
});
App.scroll = function(x,y) {
    window.scrollTo(x, y);
}

App.routing = {
    "" : {
        "name" : "home",
        "components" : [
            "header",
            "footer",
            "carModal",
            "categories",
            "sliderImages",
            "carSlider"
        ]
    },
    "shop" : {
        "name" : "shop",
        "components" : [
            "header",
            "footer",
            "carFilter",
            "carList",
            "carModal"
        ]
    },
    "account" : {
        "name" : "account",
        "components" : [
            "header",
            "footer"
        ]
    },
    "notfound" : {
        "name" : "notfound",
        "components" : []
    },
    "car" : {
        "name" : "car",
        "components" : [
            "header",
            "footer",
            "carDetails",
            "bookList"
        ]
    },
    "user" : {
        "name" : "user",
        "components" : [
            "loginSignup"
        ]
    }
}

// TODO
App.main = async function() {
    let page = this.routing[this.uri[0]];
    page = page ? page : this.routing.notfound;

    let page_script = `/pages/${page.name}/${page.name}.js`;
    let page_style = `/pages/${page.name}/${page.name}.css`;
    let page_view = `/pages/${page.name}/${page.name}.html`;

    let scripts = page.components.map(s => `/components/${s}/${s}.js`);
    let styles = page.components.map(s => `/components/${s}/${s}.css`);
    let views = page.components.map(v => `/components/${v}/${v}.html`);

    scripts.push(page_script);
    styles.push(page_style);
    views.push(page_view);

    let tasks = [];
    tasks = tasks.concat(scripts.map(script => this.loadScript(script)));
    tasks = tasks.concat(styles.map(style => this.loadStyle(style)));
    tasks = tasks.concat(views.map(view => this.loadView(view)));

    await Promise.all(tasks);
    this.page = page;
    this.renderView($("body"), page.name);
    this.loadUserLang();
    this.components = {body: {obj: $("body"), components: {}}};
    this.renderComponents(this.components.body);

    // let body_component = {};
    // body_component.obj = $("body");
    //await this.loadComponents(body_component, page.components);
    //console.log(body_component);
}

App.main();
