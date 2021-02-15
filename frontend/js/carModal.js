"use strict";

var toggled_car_modal = false;
var submitting = false;

function updateCarFromModal(car) {
    $.each(car, (key, val) => { 
        let el = $(`#car-modal-${key}`);
        switch (el.attr("type")) {
            case "text":
                car[key] = el.val();
                break;
            case "number":
                car[key] = parseInt(el.val());
                break;
            case "radio":
                car[key] = $(`#car-modal-${key}:checked`).val();
                break;
        }
    });
}

async function openCarModal(car) {
    if (!toggled_car_modal) {

        $.each(car, (key, val) => $(`#car-modal-${key}`).val(val));
        
        $("#car-modal-img").css("background-image", `url(images/cars/${car.id}.jpg)`);
        $("#car-model-submit").click(function() {
            updateCarFromModal(car);
            submitCar(car);
        });

        $("#car-modal-shadow").css('display', 'block'); // Display Shadow
        $("#car-modal").css('display', 'flex');
        await sleep(50);
        $("#car-modal-shadow").removeClass("car-modal-shadow-hidden");
        $("#car-modal").removeClass("car-modal-hidden"); // Show modal

        toggled_car_modal = true;
    }
    
}

async function submitCar(car) {
    // Change button style
    if (!submitting) {
        submitting = true;
        var submitButton = $("#car-model-submit");
        submitButton.addClass("car-model-submit-loading");
        submitButton.html('Loading..');
        try {
            await req("POST", "/api/cars/update/", car);
            submitButton.removeClass("car-model-submit-loading");
            submitButton.addClass("car-model-submit-saved");
            submitButton.html('Saved');
            updateCar(car); // Update car from list
            await sleep(1000);
            submitButton.removeClass("car-model-submit-saved");

        } catch(e) {
            submitButton.html('Error');
            submitButton.removeClass("car-model-submit-loading");
            submitButton.addClass("car-model-submit-error");
            await sleep(1000);
            submitButton.removeClass("car-model-submit-error");
        }
        submitButton.html('Submit');
        submitting = false;
    }
    
    
}
async function closeCarModal() {
    if (toggled_car_modal) {
        
        $("#car-model-submit").off(); // Clear callbacks submit button
        
        toggled_car_modal = false;

        $("#car-modal-shadow").addClass("car-modal-shadow-hidden");
        $("#car-modal").addClass("car-modal-hidden");
        await sleep(500);
        $("#car-modal-shadow").css('display', 'none');
        $("#car-modal").css('display', 'none');
    }
}
function constructCarModal() { // Setup callbacks
    $("#car-modal-close").click(closeCarModal);
}
