$(document).ready(function() {

    //when bushing the button

    
    // const loadsanyyousif = () => {
    //     return new Promise((resolve, reject) => {
    //         $.ajax("https://teamtreehouse.com/sanyyousif.json")
    //             .done((data1) => {
    //                 resolve(data1);
    //                 console.log("data1 sanyyousif", data1);
    //             })
    //             .fail((error) => reject(error));
    //     });
    // };

    $("#btn").on("click", function() {


    	var input2 = $("#input2").val();
    	var input1 = $("#input1").val();

	    const loadsanyyousif = () => {
	        return new Promise((resolve, reject) => {
	            $.ajax("https://teamtreehouse.com/"+input1+".json")
	            // $.ajax("https://teamtreehouse.com/sanyyousif.json")
	                .done((data1) => {
	                    resolve(data1);
	                    console.log("data1 sanyyousif", data1);
	                })
	                .fail((error) => reject(error));
	        });
	    };

    // const loadellisthomas = () => {
    //     return new Promise((resolve, reject) => {
    //         $.ajax("https://teamtreehouse.com/ellisthomas.json")
    //             .done(function(data1) {
    //                 resolve(data1);
    //                 console.log("data1 ellisthomas", data1);
    //             })
    //             .fail((error) => reject(error));
    //     });
    // };
   
	    const loadellisthomas = () => {	
	        return new Promise((resolve, reject) => {
	            $.ajax("https://teamtreehouse.com/"+input2+".json")
	            // $.ajax("https://teamtreehouse.com/ellisthomas.json")
	                .done(function(data1) {
	                    resolve(data1);
	                    console.log("data1 ellisthomas", data1);
	                })
	                .fail((error) => reject(error));
	        });
	    };


    // $("#btn").on("click", function() {
        // loadsanyyousif();
        // loadellisthomas();
        var players = [];

	    const printplayerData = (players) => {
	    	console.log("strat print to dom");
			var playerString = "";
			for (i=0 ; i<players.length ; i++){
				playerString += `<div class= "player row col-md-5">`;
				// playerString +=` <div class= "col-md-5">`;
				playerString += `<img class="image" src="${players[i].gravatar_url}"`;
				playerString += `<br>`;
				playerString += `<p class="points"> the total points is : ${players[i].points.total} </p>`;
				playerString += `</div>`;
				// playerString += `</div>`;
				 	
			}
			$("#output").append(playerString);
			console.log("end print to dom") ;
		};

		playerPointsArray = [];
		const checkForWinner = (players) => {
			console.log("strat check For Winner");
			playerPointsstrings="";
			for ( var i=0 ; i< players.length ; i++ ){
				playerPointsstrings = players[i].points.total;
				console.log("playerPointsstrings",playerPointsstrings);
				console.log("players[i].points.total",players[i].points.totals);
				playerPointsArray.push(playerPointsstrings) ;

			}
			if (playerPointsArray[0] > playerPointsArray[1]){
				console.log("the winner is ",players[0].name);
				$("#winner").text("the winner is"+(players[0].name));	
			}
			else {
				console.log("the winner is ",players[1].name);
				$("#winner").text("the winner is"+(players[1].name));
			}
			console.log("playerPointsArray",playerPointsArray);
		};

		

   

		// $("#btn").on("click", function() {
		// loadsanyyousif();
  //       loadellisthomas();

		    Promise.all([loadsanyyousif(), loadellisthomas()])
		        .then((result) => {
		            console.log("the result is : ", result);
		            result.forEach((xhrResult) => {
		                players.push(xhrResult);

		            });
		        printplayerData(players);
		        console.log("players",players);
		        checkForWinner(players);
		         //    console.log("the players array is :", players);
		         //    var pic =players[0].gravatar_url;
		        	// console.log("pic",pic);
		        	// printplayerData("players",players);
		        })
		        .catch(function(error){
	                console.log(error);
	            });
		// });
	});



});
