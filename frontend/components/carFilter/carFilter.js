
class CarFilter {

    async searchCar() {
        let text = this.searchInput.val();
        let { content } = await req("POST", "/api/cars/search/", {
            "text": text
        });
        let carList = this.parent.components.carList.instance;
        carList.cars = content.cars;
        carList.renderCars();
    }

    async onSearchInput() {
        let carList = this.parent.components.carList.instance;
        let text = this.searchInput.val();
        if (text.length > 2) {
            if (!carList.toggled_loader) {
                carList.toggleLoader();
            }
            await this.searchCar();
            if (carList.toggled_loader) {
                carList.toggleLoader();
            }
        }
    }
    async loadCarlist() {
        
    }
    onClickFilter(el) {
        el.find(".gg-chevron-down").toggleClass("gg-chevron-down-rotated");
    }

    filterRangeEvents() {
        this.obj.find(".car-filter-range").mousedown(function(event) {
            let firstX = event.pageX;
            let filterPos = this.offsetLeft;
            let el = $(this);
            function transform(event) {               
                let pos = event.pageX-filterPos-10;
                pos = Math.max(pos, 0);
                pos = Math.min(pos, el.width()-30);
                el.children().first().css("transform",`translateX(${pos}px)`);
                if (el.attr("min") && el.attr("max")) {
                    let min = parseInt(el.attr("min"));
                    let max = parseInt(el.attr("max"));
                    let diff = max-min;
                    let d = pos/(el.width()-30);
                    pos = d*diff;
                }
                el.attr('value',pos);
            }
            transform(event);
            
            App.components.body.obj.on("mousemove.filter", function(event) {
                transform(event);

            });
            App.components.body.obj.on("mouseup.filter", function() {
                App.components.body.obj.off("mousemove.filter");
                App.components.body.obj.off("mouseup.filter");
                App.components.body.obj.off("click.filter");
            });
        });
        

        

    }

    constructor() {
        let self = this;
        this.searchInput = this.obj.find(".car-filter-search");
        this.searchInput.on('input', function() {
            self.onSearchInput();
        });
        this.obj.find(".car-filter-element").click(function() {
            self.onClickFilter($(this));
        });

        this.filterRangeEvents();

        
    }
}