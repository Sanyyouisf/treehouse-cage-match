$(document).ready(function() {

    //when bushing the button

    $("#btn").on("click", function() {
        let input2 = $("#input2").val();
        let input1 = $("#input1").val();
       

        const loadFirstPlayer = () => {
            return new Promise((resolve, reject) => {
                $.ajax("https://teamtreehouse.com/" + input1 + ".json")
                    .done((data1) => resolve(data1))
                    .fail((error) => reject(error));
            });
        };


        const loadSecondPlayer = () => {
            return new Promise((resolve, reject) => {
                $.ajax("https://teamtreehouse.com/" + input2 + ".json")
                .done((data1) => resolve(data1))
                .fail((error) => reject(error));
            });
        };


        const players = [];
        //print every player image and points 
        const printplayerData = (players) => {
            let playerString = "";
            for (i = 0; i < players.length; i++) {
                playerString += `<div class= "player row col-md-5">`;
                playerString += `<img class="image" src="${players[i].gravatar_url}"`;
                playerString += `<br>`;
                playerString += `<p class="points"> total points : ${players[i].points.total} </p>`;
                playerString += `</div>`;
            }
            $("#output").append(playerString);
        };


        //to print the winner points and badges
        const playerPointsArray = [];
        let winner = "";
        const checkForWinner = (players) => {
            playerPointsstrings = "";
            for (let i = 0; i < players.length; i++) {
                playerPointsstrings = players[i].points.total;
                playerPointsArray.push(playerPointsstrings);
            }
            if (playerPointsArray[0] > playerPointsArray[1]) {
                $("#winner").val((players[0].name)+ "wins");
                winner = 0;
            } else {
                $("#winner").val((players[1].name)+ " wins");
                winner = 1;
            }
            winnerbagdges(players, winner);
        };

        //to display winner badges
        const winnerBadgesArray = [];
        winnerBadgesStrings = "";
        winnerBadges = "";
        const winnerbagdges = (players, winner) => {
            console.log("winner Pagdges function ");
            for (let i = 0; i < players[winner].badges.length; i++) {
                winnerBadges = players[winner].badges[i].icon_url;
                winnerBadgesArray.push(winnerBadges);
            }
            for (let j = 0; j < winnerBadgesArray.length; j++) {
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
                checkForWinner(players);
            })
            .catch((error)=()=> alert("the user is not found"));
        $("#winner").removeClass("hidden");
    });
	
	//function for animation
	$("#animation").on("click",function(){
		$(".image").animate({height: "0px"});
		$(".image").animate({width: "0px"});
        $(".image").animate({height: "250px"});        
        $(".image").animate({width: "250px"});        
        $(".image").animate({width: "0px"});
		$(".image").animate({height: "0px"});
        $(".image").animate({width: "250px"});        
        $(".image").animate({height: "250px"}); 


        $(".badgeImage").animate({height: "+=50px"});
		$(".badgeImage").animate({width: "+=50px"});
        $(".badgeImage").animate({height: "-=50px"});        
        $(".badgeImage").animate({width: "-=50px"});               
	});


});
