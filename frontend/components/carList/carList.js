"use strict";

class CarList {

    toggleLoader() {
        if (this.toggled_loader) {
            this.obj.find(".loader-carlist").addClass("loader-carlist-fadeout");
        } else {
            this.obj.find(".loader-carlist").html();
            this.obj.find(".loader-carlist").remove();
            this.obj.find(".car-list").append(`<div class="loader-carlist"><div class="loader"><img src="/img/carList/loading.gif" alt="#" /></div></div>`);
        }
        this.toggled_loader = !this.toggled_loader; 
    }

    async onPagination(el) {
        this.toggleLoader();
        // Change css class
        $(".car-list-pagination-el-selected").removeClass("car-list-pagination-el-selected");
        el.addClass("car-list-pagination-el-selected");

        let page = parseInt(el.html());
        if (this.page != page) {
            this.page = page;
            this.searchCar(); 
        }
    
        //clearCars();
        //addCars((await getCars(page)).cars);
        this.toggleLoader();
    }
    createPagination() {
        let pagination = this.obj.find(".car-list-pagination");
        pagination.html('');
    
        for (let i=1; i<=this.pages; i++) {
            pagination.append(`<div class="car-list-pagination-el">${i}</div>`);
        }
    
        pagination.children().first().addClass("car-list-pagination-el-selected");

        let self = this;
        $(".car-list-pagination-el").click(function() { 
            self.onPagination($(this));
        });

    }
    addCar(car) {
        
        list_el.prepend(`<p>${car.name}</p>`);
        /*<i><img src="images/star.png"/></i>
                    <i><img src="images/star.png"/></i>
                    <i><img src="images/star.png"/></i>
                    <i><img src="images/star.png"/></i>*/
    
        // Set Callbacks
        // $(`#car-list [car-id=${car.id}]`).click(() => onClickCar(car));
        // $(`#car-list [car-id=${car.id}] .car-update`).click(() => onClickUpdate(car));
        // $(`#car-list [car-id=${car.id}] .car-delete`).click(() => onClickDelete(car));
    }

    renderCars() {
        this.clearCars();

        let list_el = this.obj.find(".car-list");

        this.cars.forEach((car) => {
            list_el.prepend(`
                <div class="car-el">
                    <div>
                        <div>${car.name}</div>
                        <div>${car.description}</div>
                        <div>${car.price}</div>
                        <div class="img-car" style="background-image: url('/img/cars/${car.id}.jpg');"></div>
                    </div>
                </div>`);
        });
        
    }
    clearCars() {
        this.obj.find(".car-list .car-el").remove();
    }

    async searchCar(filters={}) {
        if (!this.toggled_loader) {
            this.toggleLoader();
        }
        filters.page = this.page;
        let { content } = await req("POST", "/api/cars/search/", filters);
        
        this.cars = content.cars;
        this.pages = content.pages;
        this.renderCars();

        if (this.toggled_loader) {
            this.toggleLoader();
        }
    }

    constructor() {
        this.page = 1;
        this.toggled_loader = false;
        
        let self = this;
        this.searchCar().then(function() {
            self.createPagination();
        });
        
    }
}




// async function constructCarList() {
    
// }


// function updateCar(car) {
//     let name_el = $(`#car-list [car-id=${car.id}] .car-list-name`);
//     let price_el = $(`#car-list [car-id=${car.id}] .car-list-price`);

//     name_el.html(car.name);
//     price_el.html(car.price);
    
// }
// function onClickUpdate(car) {
//     openCarModal(car);
// }
// async function onClickDelete(car) {
//     if (await userDeleteConfirmation()) {

//     }
// }
// function clearPagination() {
//     var pagination = $("#car-list-pagination");
//     pagination.html('');
// }

// function onClickCar(car) {
//     //openCarModal(car);
// }