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


            // trigger an AJAX call with a mocked click event
            document.querySelector('#F55').click(); //You know what this does Y'ALL? it autoselects the blue car so that when you open the page, the blue car's information is shown!
        },

        beforeUpdate : function() {
            console.log('things are gonna change...');

        },

        updated: function() {
            console.log('things are different now');

        },




        methods : {

            fetchData(e) {
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