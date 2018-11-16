(() => {
    //rework this with a vue instance

    const vm = new Vue({
        el : "#app",

        data : {
            modelname : "",
            modelpricing : "",
            modeldetails : ""
        },


        //we know to write mounted, beforeUpdate and Updated because of this website: https://vuejs.org/v2/guide/instance.html

        mounted : function() {
            console.log('view is ready to go on the page'); //making these messages to see what happens and when


            this.addPreloader(document.querySelector('.modelInfo')); //so when it is loading/hasn't loaded yet, the ticker thing will show up

            // trigger an AJAX call with a mocked click event
            document.querySelector('#F55').click(); //trigger AJAX call...You know what this does Y'ALL? it autoselects the blue car so that when you open the page, the blue car's information is shown!
        },

        beforeUpdate : function() {
            console.log('things are gonna change...');

        },

        updated: function() {
            console.log('things are different now');
            // move the preloader out of the element and hide it
            let preloader = document.querySelector('.preloader-wrapper');

            //hide the preloader with css
            //move it to the bottom of the page - ready for the next AJAX call, so it is at the bottom of the HTML file, ready to be used the next time and it will take on the height of the div you put it in
            setTimeout(function(){
                preloader.classList.add('hidden');
                document.body.appendChild(preloader);
            }, 1000); // 1000ms = 1 s <--THIS MAKES THE PRELOADER STAY FOR A SECOND
        },



//when we load vue, that mounted method will fire, which will trigger the AJAX file, and in case that data takes awhile, the spinner will show
        methods : {

            addPreloader(parentEl) {
                // load the preloader into the parent element and make it draw
                let preloader = document.querySelector('.preloader-wrapper');

                parentEl.appendChild(preloader);

                let animItem = bodymovin.loadAnimation({
                    wrapper : document.querySelector('.preloader'),
                    animType : 'svg',
                    loop : true,
                    path : 'data/search.json'
                })

            },

            fetchData(e) {

                // trigger the preloader.. now with this, it works when you select the red car too
                this.addPreloader(document.querySelector('.modelInfo'));
                let preloader = document.querySelector('.preloader-wrapper').classList.remove('hidden');


                //debugger;
                // gets the id of the element via the event object
                let targetURL = e.currentTarget.id; 

                fetch(`./includes/connect.php?modelNo=${targetURL}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const { modelName, pricing, modelDetails } = data[0];

                    this.modelname = modelName;
                    this.modeldetails = modelDetails;
                    this.modelpricing = pricing; //make temporary variables that take those values (model name would be that) data instide the vue model is assigning it
                    //parseCarData(data[0]);
                })
                .catch(function(error) {
                    console.error(error);

                });
            }
        }
    });
})();