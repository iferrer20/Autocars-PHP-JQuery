"use strict";


const getCars = async function(index=0, categories=[]) {
	let resp = await req("POST", "/api/cars/list/", {
		"index": index,
		"categories": categories
	});
	return resp.content;
}

const renderCars = async function(index=0) {
	let content = await getCars(index);
	let cars = content.cars;
	let pages = content.pages;
	let list_el = $("#car-list");
	
	$.each(cars, (key, car) => {
		list_el.prepend(`
		<div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 margin">
			<div class="brand_box">
				<div class="img-car" style="background-image: url('images/cars/${car.id}.jpg')" alt="img" />
				<h3><strong class="red">${formatInteger(car.price)} €</strong></h3>
				<span>${car.name}</span>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
			</div>
		</div>
		`);
	});
}

