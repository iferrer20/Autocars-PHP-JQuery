"use strict";

var toggled_loader = false;
async function getCars(page=0, categories=[]) {
	let resp = await req("POST", "/api/cars/list/", {
		"page": page,
	});
	return resp.content;
}
function toggleLoader() {
    if (toggled_loader) {
        $(".loader_carlist").addClass("loader_carlist-fadeout");
    } else {
        $(".loader_carlist").remove();
        $("#car-list").append('<div class="loader_carlist"><div class="loader"><img src="images/loading.gif" alt="#" /></div></div>');
    }
    toggled_loader = !toggled_loader;
}
async function constructCarList() {
    toggleLoader();
	let content = await getCars(1);
	let cars = content.cars;
	let npages = content.pages;

    clearCars();
    addCars(cars);
    createPagination(npages);
    toggleLoader();
    
}
function addCars(cars) {
    $.each(cars, (key, car) => {
        addCar(car);
    });
}
function updateCar(carId) {

}

function delItem() {
    
}
function addCar(car) {
    let list_el = $("#car-list");
    list_el.prepend(`
		<div class="car-el" car-id="${car.id}">
			<div class="brand_box">
				<div class="img-car" style="background-image: url('images/cars/${car.id}.jpg')" alt="img" />
				<h3><strong class="red">${formatInteger(car.price)} €</strong></h3>
                <span>${car.name}</span>
                <div class="car-update"></div>
                <div class="car-delete"></div>
                <div class="car-read"></div>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
			</div>
		</div>
		`);
}
function clearCars() {
    $("#car-list .car-el").remove();
}
function clearPagination() {
    var pagination = $("#car-list-pagination");
    pagination.html('');
}
async function onPagination() {
    toggleLoader();
    // Change css class
    $(".car-list-pagination-el-selected").removeClass("car-list-pagination-el-selected");
    $(this).addClass("car-list-pagination-el-selected");
    
    var page = parseInt($(this).html());

    clearCars();
    addCars((await getCars(page)).cars);
    toggleLoader();
}

function createPagination(pages) {
    var pagination = $("#car-list-pagination");
    pagination.html('');

    for (let i=1; i<=pages; i++) {
        pagination.append(`<div class="car-list-pagination-el">${i}</div>`);
    }

    pagination.children().first().addClass("car-list-pagination-el-selected");
    
    $(".car-list-pagination-el").click(onPagination);
}