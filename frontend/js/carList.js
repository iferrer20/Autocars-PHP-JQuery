"use strict";

var toggled_loader = false;
async function getCars(page=1, categories=[]) {
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
function updateCar(car) {
    let name_el = $(`#car-list [car-id=${car.id}] .car-list-name`);
    let price_el = $(`#car-list [car-id=${car.id}] .car-list-price`);

    name_el.html(car.name);
    price_el.html(car.price);
    
}
function onClickUpdate(car) {
    openCarModal(car);
}
async function onClickDelete(car) {
    if (await userDeleteConfirmation()) {

    }
}

function addCar(car) {
    let list_el = $("#car-list");
    list_el.prepend(`
		<div class="car-el" car-id="${car.id}">
			<div class="brand_box">
				<div class="img-car" style="background-image: url('images/cars/${car.id}.jpg')" alt="img" />
				<h3><strong class="red car-list-price">${formatInteger(car.price)}</strong></h3>
                <span class="car-list-name">${car.name}</span>
                <div class="car-crud-buttons">
                    <div class="car-crud-button car-update">U</div>
                    <div class="car-crud-button car-delete">D</div>
                    <div class="car-crud-button car-read">R</div>
                </div>
				
			</div>
        </div>`);
    /*<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>
				<i><img src="images/star.png"/></i>*/

    // Set Callbacks
    $(`#car-list [car-id=${car.id}]`).click(() => onClickCar(car));
    $(`#car-list [car-id=${car.id}] .car-update`).click(() => onClickUpdate(car));
    $(`#car-list [car-id=${car.id}] .car-delete`).click(() => onClickDelete(car));
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
function onClickCar(car) {
    //openCarModal(car);
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