$(document).ready(function() {

    //when bushing the button
    // var input1 = $("#input1").val();
    // const loadsanyyousif = ()=> { 
    // 	return new Promise((resolve,reject) => {
    // 		$.ajax("https://https://teamtreehouse.com/sanyyousif.json")
    // 		.done((data1) => resolve(data1));
    // 			console.log("data1",data1);

    // 		 .fail((error) => reject(error));
    // 		 });
    // };

    // })
    const loadsanyyousif = () => {
        return new Promise((resolve, reject) => {
            $.ajax("https://teamtreehouse.com/sanyyousif.json")
                .done((data1) => {
                    resolve(data1);
                    console.log("data1 sanyyousif", data1);
                })
                .fail((error) => reject(error));
        });
    };

    const loadellisthomas = () => {
        return new Promise((resolve, reject) => {
            $.ajax("https://teamtreehouse.com/ellisthomas.json")
                .done(function(data1) {
                    resolve(data1);
                    console.log("data1 ellisthomas", data1);
                })
                .fail((error) => reject(error));
        });
    };

    $("#btn").on("click", function() {
        loadsanyyousif();
        loadanessaortner();
    })
    var players = [];

    Promise.all([loadsanyyousif(), loadellisthomas()])
        .then((result) => {
            console.log("the result is : ", result);
            result.forEach((xhrResult) => {
                players.push(xhrResult);
            });
            console.log("the players array is :", players);
        });



});
