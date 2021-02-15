async function req(method, url, data=null, json=true) {
	const response = await fetch(url, {
		method: method, // *GET, POST, PUT, DELETE, etc.
		mode: 'same-origin', // no-cors, *cors, same-origin
		cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: { 'Content-Type': 'application/json' },
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

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function formatInteger(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
