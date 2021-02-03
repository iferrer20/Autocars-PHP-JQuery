"use strict";

var toggled_car_modal = false;
function serializeCar(car) {
    // $.each(car, (key, val) => {
    //     let val = $(`#car-modal-${key}`).val();
    // });
}

function openCarModal(car) {
    if (!toggled_car_modal) {
        $("#car-modal-shadow").removeClass("car-modal-shadow-hidden");
        $("#car-modal").removeClass("car-modal-hidden");
        toggled_car_modal = !toggled_car_modal;
    }
    $.each(car, (key, val) => {
        $(`#car-modal-${key}`).val(val);
    });
    
    $("#car-modal-img").css("background-image", `url(images/cars/${car.id}.jpg)`);
    $("#car-model-submit").click(function() {
        onSubmit(car);
    });
}
function onSubmit(car) {
    console.log(car);
}
function closeCarModal() {
    if (toggled_car_modal) {
        $("#car-modal-shadow").addClass("car-modal-shadow-hidden");
        $("#car-modal").addClass("car-modal-hidden");
        $("#car-model-submit").off(); // Clear callbacks submit button
        toggled_car_modal = !toggled_car_modal;
    }
}
function constructCarModal() { // Setup callbacks
    $("#car-modal-close").click(closeCarModal);
}
