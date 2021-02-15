"use strict";

var App = {};
App.loadScript = async function(url) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        
        if (script.readyState) {  //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    resolve();
                }
            };
        } else {  //Others
            script.onload = function() {
                resolve();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}
App.loadComponents = async function(el) {
    $(`${el} [comp-key], ${el} [nohtml-comp-key]`).each(async function() {
        let key_val = $(this).attr('comp-key');
        let nohtml_key_val = $(this).attr('nohtml-comp-key');
        let jquery_attr;
        let class_name;

        if (key_val) {
            $(this).html(await req("GET", `/components/${key_val}/${key_val}.html`, null, false));
            jquery_attr = `[comp-key=${key_val}]`;
            class_name = key_val;
        } else {
            jquery_attr = `[nohtml-comp-key=${nohtml_key_val}]`;
            class_name = nohtml_key_val;
        }

        await App.loadComponents(jquery_attr); // Recursive load child components

        class_name = class_name.charAt(0).toUpperCase() + class_name.slice(1);
        eval(`new ${class_name}();`);
    });
}

App.loadView = async function(path) {
    let content = await req("GET", path, null, false);
    document.body.innerHTML = content;
}

App.uri = window.location.pathname.split("/").slice(1);

App.routing = {
    "" : {
        "page" : "home",
        "view" : "home.html",
        "scripts" : [
            "home.js"
        ],
        "components" : [
            "header"
        ]
    },
    "notfound" : {
        "page" : "notfound",
        "view" : "notfound.html",
        "scripts" : [],
        "components" : []
    }
}

// TODO
App.main = async function() {
    let route = this.routing[this.uri[0]];
    route = route ? route : this.routing.notfound;
    
    let view = `/pages/${route.page}/${route.view}`;
    let page_scripts = route.scripts.map(s => `/pages/${route.page}/${s}`);
    let component_scripts = route.components.map(s => `/components/${s}/${s}.js`);

    let scripts = page_scripts.concat(component_scripts);

    await this.loadView(view);

    let tasks = scripts.map(script => this.loadScript(script));
    await Promise.all(tasks);
    await this.loadComponents("body");
}

App.main();