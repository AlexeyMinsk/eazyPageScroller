interface description{
    maxPage:number;
}

class eazyPageScroller implements description{

    pageCounter:number = 0;
    maxPage:number;
    transit:boolean = false;
    slider:boolean;

    constructor(opt:description){
        this.maxPage = opt.maxPage;
    }

    init(){

        this.fixHeight();
        this.addHandlers();
    };

    addHandlers() {

        let arrow = document.body.querySelector('.fa-arrow-down');
        arrow.addEventListener('click', arrowClick.bind(this));
        arrow = document.body.querySelector('.fa-arrow-up');
        arrow.addEventListener('click', arrowClick.bind(this));
        
        document.addEventListener('wheel', wheelAndKey.bind(this));
        document.addEventListener('keydown', wheelAndKey.bind(this));
        document.addEventListener('click', clickNav.bind(this));

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
            this.changePage(+pageNum);
            setTimeout(() => {
                this.transit = false;
            }, 1000);
        }
    }

    fixHeight() {
        let body = document.body;
        body.style.overflow = "hidden";
        body.style.height = document.documentElement.clientHeight + 'px';

        body.addEventListener('resize', ()=>{
            document.body.style.height = document.documentElement.clientHeight + 'px';
        })
    }

    changePage(nextPage) {
        let parent = <HTMLElement>document.querySelector('.parent');

        if(nextPage > this.maxPage)
            nextPage = this.maxPage;

        let offset = document.documentElement.clientHeight * nextPage;
        parent.style.transform = `translateY(-${offset}px)`;
        this.pageCounter = nextPage;

        setTimeout( ()=> {
            if(this.pageCounter == 0)
                (<HTMLElement>document.querySelector('.fa-arrow-up')).style.display = 'none';
            else
                (<HTMLElement>document.querySelector('.fa-arrow-up')).style.display = 'inline-block';

            if(this.maxPage == this.pageCounter)
                (<HTMLElement>document.querySelector('.fa-arrow-down')).style.display = 'none';
            else
                (<HTMLElement>document.querySelector('.fa-arrow-down')).style.display = 'inline-block';
        }, 1000);
    }
}