"use strict";

const req = async function(method, url, data=null, json=true) {
	const response = await fetch(url, {
		method: method, // *GET, POST, PUT, DELETE, etc.
		mode: 'same-origin', // no-cors, *cors, same-origin
		cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: json ? { 'Content-Type': 'application/json' } : {'Content-Type': '*/*'},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: data ? JSON.stringify(data) : data // body data type must match "Content-Type" header
	});
	let response_data = await (json ? response.json() : response.text());

	switch (response.status) {
		case 200:
			return response_data;
			break;
		case 400:
			throw response_data.error;
			break;
		case 500:
			throw 'Server error';
			break;
		default:
			break;
	}
	
}

const loadSource = async function(el) {
    return new Promise((resolve, reject) => {
        if (el.readyState) {  //IE
            el.onreadystatechange = function() {
                if (el.readyState == "loaded" || el.readyState == "complete") {
                    el.onreadystatechange = null;
                    resolve();
                }
            };
        } else {  //Others
            el.onload = function() {
                resolve();
            };
        }
        document.getElementsByTagName("head")[0].appendChild(el);
    });
}

const sleep = function(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const formatInteger = function (num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

function b64encode(str) {
	return window.btoa(unescape(encodeURIComponent(str))); // str -> base64
}
function b64encodeJson(obj) {
	return window.btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); // Obj -> json -> base64
}
function b64decodeJson(str) {
	return JSON.parse(decodeURIComponent(escape(window.atob(str))));
}