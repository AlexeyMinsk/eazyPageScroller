interface description{
    maxPage:number;
    slider:boolean;
}

class eazyPageScroller implements description{

    pageCounter:number = 0;
    maxPage:number;
    transit:boolean = false;
    slider:boolean;

    constructor(opt:description){
        this.maxPage = opt.maxPage;
        this.slider = opt.slider;
    }

    init(){

        this.fixHeight();
        this.addHandlers();
    };

    addHandlers() {

        let slider = document.getElementsByClassName('slider')[0];
        let shift:number = slider.children[0].clientWidth;
        let maxShift:number = (slider.children.length -1) * shift;
        let sliderShift:number = 0;

        let arrow = document.body.querySelector('.fa-arrow-down');
        arrow.addEventListener('click', arrowClick.bind(this));
        arrow = document.body.querySelector('.fa-arrow-up');
        arrow.addEventListener('click', arrowClick.bind(this));


        document.addEventListener('wheel', wheelAndKey.bind(this));
        document.addEventListener('keydown', wheelAndKey.bind(this));
        document.addEventListener('click', clickNav.bind(this));

        if(this.slider){//пока на 1 слайдер

            let arrow = document.body.querySelector('.fa-chevron-circle-left');
            arrow.addEventListener('click', sliderClick.bind(this));
            arrow = document.body.querySelector('.fa-chevron-circle-right');
            arrow.addEventListener('click', sliderClick.bind(this));
        }

        function arrowClick(event) {
            if(event.target.classList.contains("fa-arrow-down"))
                this.changePage(this.pageCounter + 1);
            else
                this.changePage(this.pageCounter - 1);
        }

        function wheelAndKey(event) {

            if( this.transit )    return;

            if( (event.deltaY > 0 || event.keyCode == 40) && this.pageCounter != this.maxPage) {
                this.transit = true;
                this.changePage(this.pageCounter + 1);
                setTimeout(() => {
                    this.transit = false;
                }, 1000);
            }
            else if( (event.deltaY < 0 || event.keyCode == 38) && this.pageCounter != 0) {
                this.transit = true;
                this.changePage(this.pageCounter - 1);
                setTimeout(() => {
                    this.transit = false;
                }, 1000);
            }
        }

        function clickNav(event) {
            if( !event.target.dataset.pageNum || this.transit ) return;

            let pageNum = event.target.dataset.pageNum;
            this.transit = true;
            this.changePage(pageNum);
            setTimeout(() => {
                this.transit = false;
            }, 1000);
        }

        function sliderClick(){

            if(event.target.classList.contains("fa-chevron-circle-left"))
                sliderShift -= shift;
            else
                sliderShift += shift;

            if(sliderShift > maxShift)
                sliderShift = maxShift;
            else if(sliderShift < 0)
                sliderShift = 0;

            slider.style.transform = `translateX(-${sliderShift}px)`;
        }

    }

    fixHeight() {
        let body = document.body;
        body.style.overflow = "hidden";
        body.style.height = document.documentElement.clientHeight + 'px';

        body.onresize = () => {
            document.body.style.height = document.documentElement.clientHeight + 'px';
        }
    }

    changePage(nextPage) {
        let parent = document.querySelector('.parent');

        if(nextPage > this.maxPage)
            nextPage = this.maxPage;

        let offset = document.documentElement.clientHeight * nextPage;
        parent.style.transform = `translateY(-${offset}px)`;
        this.pageCounter = nextPage;

        setTimeout( ()=> {
            if(this.pageCounter == 0)
                document.querySelector('.fa-arrow-up').style.display = 'none';
            else
                document.querySelector('.fa-arrow-up').style.display = 'inline-block';

            if(this.maxPage == this.pageCounter)
                document.querySelector('.fa-arrow-down').style.display = 'none';
            else
                document.querySelector('.fa-arrow-down').style.display = 'inline-block';
        }, 1000);
    }
}
let scroller:eazyPageScroller = new eazyPageScroller({ maxPage: 3, slider:true});
document.addEventListener("DOMContentLoaded", scroller.init.bind(scroller) );