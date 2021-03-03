"use strict";

class CarList {

    toggleLoader() {
        if (this.toggled_loader) {
            $(".loader-carlist").addClass("loader-carlist-fadeout");
        } else {
            $(".loader-carlist").remove();
            $(".car-list").append(`<div class="loader-carlist"><div class="loader"><img src="/img/carList/loading.gif" alt="#" /></div></div>`);
        }
        this.toggled_loader = !this.toggled_loader; 
    }

    async onPagination(el) {
        App.scroll(0, 0);
        this.toggleLoader();
        // Change css class
        $(".car-list-pagination-el-selected").removeClass("car-list-pagination-el-selected");
        el.addClass("car-list-pagination-el-selected");

        let page = parseInt(el.html());
        if (this.page != page) {
            this.page = page;
            App.setArg("page", this.page);
            this.searchCar();
        }
    
        //clearCars();
        //addCars((await getCars(page)).cars);
        this.toggleLoader();
    }
    updateCar(car) {
        this.renderCars();
    }

    createPagination() {
        let pagination = $(".car-list-pagination");
        pagination.html('');
    
        for (let i=1; i<=this.pages; i++) {
            pagination.append(`<div class="car-list-pagination-el">${i}</div>`);
        }

        pagination.children().eq(this.page-1).addClass("car-list-pagination-el-selected");

        let self = this;
        $(".car-list-pagination-el").click(function() { 
            self.onPagination($(this));
        });
    }
    async deleteCar(car_id) {
        await req("POST", "/api/cars/delete", {
            'id':car_id
        });
        console.log(this.cars.length);
        if (this.cars.length == 0 && this.page > 1) {
            this.page--;
        }
        this.searchCar();
    }
    onDeleteButton(car_el) {
        let car_id = parseInt(car_el.attr("car-id"));
        this.deleteCar(car_id);
    }
    onUpdateButton(car_el) {
        let car_id = parseInt(car_el.attr("car-id"));
        let car = this.cars_indexed[car_id];
        this.parent.components.carModal.instance.open(car);
    }
    renderCars() {
        let self = this;
        this.clearCars();
        let list_el = $(".car-list");

        this.cars.forEach((car) => {
            list_el.append(`
                <div class="car-el" car-id="${car.id}">
                    <div>
                        <div class="car-el-options"><i class="gg-more-vertical-alt"></i></div>
                        <div class="car-el-option-menu">
                            <div class="car-el-option-el" value="update">Update</div>
                            <div class="car-el-option-el" value="delete">Delete</div>
                        </div>
                        <div class="img-car" style="background-image: url('/img/cars/${car.id}.jpg');"></div>
                        <div class="car-el-info">
                            <div class="car-el-info-name">${car.name}</div>
                            <div class="car-el-info-price">${formatInteger(car.price)} €</div>
                            <div class="car-el-info-description">${car.description}</div>
                        </div>
                    </div>
                </div>`);
                this.cars_indexed[car.id] = car;
                this.cars_indexed[car.id].el = list_el.children().last();
        });

        $(".car-el > div").click(function(e) {
            if (e.target.className != "car-el-options" && e.target.className != "gg-more-vertical-alt" && e.target.className != "car-el-option-el" && e.target.className != "car-el-option-menu car-el-option-menu-opened") {
                let car_id = $(this).parent().attr("car-id");
                App.href(`/car/${car_id}/`);
            } else {
                $(this).find(".car-el-option-menu").toggleClass("car-el-option-menu-opened");
            }
            if (e.target.className == "car-el-option-el") {
                let option = $(e.target).attr("value");
                if (option == "delete") {
                    self.onDeleteButton($(this).parent());
                } else if (option == "update") {
                    self.onUpdateButton($(this).parent());
                }
            }
        });
        
    }
    clearCars() {
        $(".car-list .car-el").remove();
    }

    async searchCar() {
        let data = {...this.carFilter.filters};
        if (!this.toggled_loader) {
            this.toggleLoader();
        }
        data.page = this.page;
        let { content } = await req("POST", "/api/cars/search/", data);
        
        this.cars = content.cars;
        this.pages = content.pages;
        this.renderCars();

        if (this.toggled_loader) {
            this.toggleLoader();
        }
        this.createPagination();
    }

    constructor() {
        this.page = 1;
        if (Number.isInteger(App.args.page)) {
            this.page = App.args.page;
        } 
        this.toggled_loader = false;
        this.cars = [];
        this.cars_indexed = {};
        
        let self = this;
        this.carFilter = this.parent.components.carFilter.instance;
        this.searchCar(this.carFilter.filters);
        
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