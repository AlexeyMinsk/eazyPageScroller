"use strict";

let engine = {

    pageCounter: 0,

    maxPage: 3,

    transit: false,

    init: function () {

        engine.fixHeight();
        engine.addHandlers();
    },

    addHandlers: function () {

        let arrows = document.body.querySelectorAll('.fa');

        arrows.forEach( arrow =>{
            arrow.addEventListener('click', arrowClick);
        });

        document.addEventListener('wheel', wheelAndKeyChangePage);
        document.addEventListener('keydown', wheelAndKeyChangePage);
        document.addEventListener('click', clickNav);

        function arrowClick(event) {
            if(event.target.classList.contains("fa-arrow-down"))
                engine.changePage(engine.pageCounter + 1);
            else
                engine.changePage(engine.pageCounter - 1);
        }

        function wheelAndKeyChangePage(event) {

            if( engine.transit )    return;

            if( (event.deltaY > 0 || event.keyCode == 40) && engine.pageCounter != engine.maxPage) {
                engine.transit = true;
                engine.changePage(engine.pageCounter + 1);
                setTimeout(() => {
                    engine.transit = false;
                }, 1000);
            }
            else if( (event.deltaY < 0 || event.keyCode == 38) && engine.pageCounter != 0) {
                engine.transit = true;
                engine.changePage(engine.pageCounter - 1);
                setTimeout(() => {
                    engine.transit = false;
                }, 1000);
            }
        }

        function clickNav(event) {
            if( !event.target.dataset.pageNum || engine.transit ) return;

            let pageNum = event.target.dataset.pageNum;
            engine.transit = true;
            engine.changePage(pageNum);
            setTimeout(() => {
                engine.transit = false;
            }, 1000);
        }

    },

    fixHeight: function () {
        let body = document.body;
        body.style.overflow = "hidden";
        body.style.height = document.documentElement.clientHeight + 'px';

        body.onresize = () => {
            document.body.style.height = document.documentElement.clientHeight + 'px';
        }
    },

    changePage: function (nextPage) {
        let parent = document.querySelector('.parent');

        if(nextPage > engine.maxPage)
            nextPage = engine.maxPage;

        let offset = document.documentElement.clientHeight * nextPage;
        parent.style.transform = `translateY(-${offset}px)`;
        engine.pageCounter = nextPage;

        setTimeout( ()=> {
        if(engine.pageCounter == 0)
            document.querySelector('.fa-arrow-up').style.display = 'none';
        else
            document.querySelector('.fa-arrow-up').style.display = 'inline-block';

        if(engine.maxPage == engine.pageCounter)
            document.querySelector('.fa-arrow-down').style.display = 'none';
        else
            document.querySelector('.fa-arrow-down').style.display = 'inline-block';
        }, 1000);
    }
};//

document.addEventListener("DOMContentLoaded", engine.init);

