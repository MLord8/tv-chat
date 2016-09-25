var apikey = "5ef2f92f2125441fb64a9324a42832af";
var currentList = [];
var json;


function populateAutoSuggList(input, callback) {
	
		var params = {
            // Request parameters
            "q": input,
        };
      	
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/suggestions/?" + "q=" + input,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
        	json = Object.assign({}, data);
        	var newList = [];
        	$.each(json.suggestionGroups[0].searchSuggestions, function(key, value) {
        		newList.push(value.displayText);
        	})

			currentList = newList;
			callback();
        })
        .fail(function() {
        });	
}

function buildList() {
	$(".list-group").empty();
	$.each(currentList, function(key, value) {
		$(".list-group").append($('<li class="list-group-item">').text(value));
	})
	if (currentList.length == 0) {
		$("#cards").addClass("hidden");
	}
}

function cardList(shows) {
    /*$("#cardlist").append(
        $('<div class="card card-block" style="width:18rem;"></div>')
            .append($('<h3 class="card-title">'+shows.MainTitle+'</h3>'))
            .append($('<p class="card-text">'+shows.EpisodeName+'</p>'))
            .append($('<p class="card-text">'+shows.Description+'</p>'))
            .append($('<a href="#" class="btn btn-primary">'Go to this chat!'</a>'))
    );*/
    var $parent = $('<div class="card card-block" style="width: 60rem;"></div>');

    var $h3 = $('<h3 class="card-title">'+shows.MainTitle+'</h3>');
    //$h3.addClass("card-title");
    //$h3.text(shows.MainTitle);

    var $p1 = $('<p class="card-text">\"'+shows.EpisodeName+'\"</p>');
    //$p1.addClass("card-text");
    //$p1.addText(shows.EpisodeName);

    var $p2 = $('<p class="card-text">'+shows.Description+'</p>');
    //$p2.addClass("card-text");
    //$p2.addText(shows.Description);

    var $a = $('<a href="#" class="btn btn-primary">' + "Go to this chat!" + '</a>');
    //$a.addClass("btn btn-primary");
    //$a.addText("Go to this chat!");

    $parent.append($h3);
    $parent.append($p1);
    $parent.append($p2);
    $parent.append($a);
    $("#cardlist").append($parent);
    //console.log($("#cardList").children());
}

var main = function() {
	$("#search").on("keyup", function() {
		$("#cards").removeClass("hidden");
			populateAutoSuggList($("#search").val(), buildList);
	});

	$(".icon").on("click", function() {
        var field = $("#search").val();
		$(".intro").addClass("hidden");
		$(".intermediate").removeClass("hidden");
        $.each(shows, function(key, value) {
            cardList(value);
        });
	});
}

$(document).ready(main());

var shows = [
  {
    "MainTitle": "Atlanta",
    "EpisodeName": "The Streisand Effect",
    "Description": "Paper Boi deals with a social media troll, internet criticism, and exploitation while Earn tries to trade his phone for quick cash. Darius sets up an investment up for the future.",
    "AirTime": "10:00 pm",
    "DateofAir": "09-24-16",
    "Runtime": "30 minutes"
  },
  {
    "MainTitle": "Breaking Bad",
    "EpisodeName": "Pilot",
    "Description": "Walter White, a 50-year-old chemistry teacher, secretly begins making crystallized methamphetamine to support his family after learning that he has terminal lung cancer. He teams up with a former student, Jesse Pinkman, who is a meth dealer. Jesse tries to sell the meth they made, but the dealers snatch him and make him show them their lab, which is in an old RV. Walt knows the dealers intend to kill him, so he poisons them while pretending to share his recipe.",
    "AirTime": "9:30 pm",
    "DateofAir": "09-24-16",
    "Runtime": "60 minutes"
  },
  {
    "MainTitle": "Parks and Recreation",
    "EpisodeName": "Boys Club",
    "Description": "As Andy cleans up the house to surprise Ann, Leslie tries to infiltrate the boys's club of politics by crashing an after-work gathering at Pawnee Town Hall. Trying to fit in, she opens a gift basket worth more than $25, breaking the local government ethics laws. She apologetically refers Pawnee officials to a website about the pit to highlight her accomplishments, but gets in more trouble when underage intern April Ludgate (Aubrey Plaza) posts a video of herself drinking on the site. Leslie is called before an ethics committee, but is let off with a warning after Ron, who despises the town's disciplinary process, defends her. Leslie is pleased when Mark tells her the warning officially makes her a member of the boys' club.",
    "AirTime": "10:00 pm",
    "DateofAir": "09-24-16",
    "Runtime": "30 minutes"
  },
  {
    "MainTitle": "Sherlock",
    "EpisodeName": "A Study in Pink",
    "Description": "The police investigate the deaths of a series of people who all appear to have committed suicide by taking a poisonous pill. They turn to their unofficial consultant, Sherlock Holmes, who deduces various elements pointing to a serial killer. Meanwhile, Holmes is introduced to John Watson, a former soldier who served in Afghanistan, and the pair immediately move into a flat in Baker Street.",
    "AirTime": "8:30 pm",
    "DateofAir": "09-24-16",
    "Runtime": "90 minutes"
  },

  {
    "MainTitle": "Game of Thrones",
    "EpisodeName": "Garden of Thrones",
    "Description": "Catelyn tries to convince the Baratheon brothers to abandon their quarrel and unite against the Lannisters, while Sansa is abused by Joffrey in revenge for her brother's victories. Tyrion intervenes and in return, Joffrey is cruel to the prostitutes Tyrion sends him as 'gifts'. Arya and Gendry are taken captives to the castle of Harrenhal. After her exhausting journey through the desert, Daenerys arrives at the gates of the prosperous city of Qarth. Melisandre gives birth to a shadow creature.",
    "AirTime": "9:00 pm",
    "DateofAir": "09-24-16",
    "Runtime": "60 minutes"
  },

  {
    "MainTitle": "Freaks and Geeks",
    "EpisodeName": "Girlfriends and Boyfriends",
    "Description": "Nick begins making more aggressive advances towards Lindsay, most of which end up making her feel more disturbed than love struck. Tension is created between Sam and Bill when Bill is paired with Sam's crush, Cindy, as a science partner.",
    "AirTime": "8:30 pm",
    "DateofAir": "09-24-16",
    "Runtime": "30 minutes"
  },

  {
    "MainTitle": "Friends",
    "EpisodeName": "The One With Rachel's Sister",
    "Description": "Joey uses his position as waiter to give all the pretty female customers free things at the coffee house, but quickly gets in trouble with Gunther. Monica is sick and won't admit it. Rachel's sister Jill (Reese Witherspoon) shows up because she's been financially cut off and has to try to make it on her own.",
    "AirTime": "8:30 pm",
    "DateofAir": "09-24-16",
    "Runtime": "30 minutes"
  }
];
