$(document).ready(function() {

    //when bushing the button

    $("#btn").on("click", function() {
    	var input2 = $("#input2").val();
    	var input1 = $("#input1").val();
    	


	    const loadFirstPlayer = () => {
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

	    const loadSecondPlayer = () => {	
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


        var players = [];
        //print every player image and points 
	    const printplayerData = (players) => {
	    	console.log("strat print to dom");
			var playerString = "";
			for (i=0 ; i<players.length ; i++){
				playerString += `<div class= "player row col-md-5">`;
				playerString += `<img class="image" src="${players[i].gravatar_url}"`;
				playerString += `<br>`;
				playerString += `<p class="points"> total points : ${players[i].points.total} </p>`;
				playerString += `</div>`;
			}
			$("#output").append(playerString);
			console.log("end print to dom") ;
		};

		//to print the winner points and badges
		var playerPointsArray = [];
		var winner = "";
		const checkForWinner = (players) => {
			console.log("strat check For Winner");
			playerPointsstrings="";
			for (var i=0 ; i< players.length ; i++){
				playerPointsstrings = players[i].points.total;
				// console.log("playerPointsstrings",playerPointsstrings);
				// console.log("players[i].points.total",players[i].points.totals);
				playerPointsArray.push(playerPointsstrings) ;
			}
			if (playerPointsArray[0] > playerPointsArray[1]){
				console.log("the winner is ",players[0].name);
				$("#winner").val("the winner   "+(players[0].name));
				winner = 0;
			}
			else {
				console.log("the winner is ",players[1].name);
				$("#winner").val("the winner   "+(players[1].name));
				winner = 1;	
			}
			// console.log("playerPointsArray",playerPointsArray);
			winnerbagdges(players,winner);
		};
		//to display winner badges
		var winnerBadgesArray = [];
		winnerBadgesStrings = "";
		winnerBadges = "";
		const winnerbagdges = (players , winner) =>{
			console.log("winner Pagdges function ");
			for (var i=0;i<players[winner].badges.length;i++){
				winnerBadges = players[winner].badges[i].icon_url;
				winnerBadgesArray.push(winnerBadges);
				console.log("pushed padge to the winner Pagdges array");
			}
			console.log ("the winner badges ",winnerBadgesArray);
			for (var j=0 ; j<winnerBadgesArray.length ;j++){
				winnerBadgesStrings += `<div>`;
				winnerBadgesStrings += `<img class="badgeImage col-md-12" src="${winnerBadgesArray[j]}"`;
				winnerBadgesStrings += `</div>`;
			}
			$("#badges").append(winnerBadgesStrings);
		};	


		    Promise.all([loadFirstPlayer(), loadSecondPlayer()])
		        .then((result) => {
		            console.log("the result is : ", result);
		            result.forEach((xhrResult) => {
		                players.push(xhrResult);

		            });
		        printplayerData(players);
		        console.log("players",players);
		        checkForWinner(players);
		        })
		        .catch(function(error){
	                console.log(error);
	            });
	            $("#winner").removeClass("hidden");
		
	});



});
