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

    var $h3 = $('<h3 class="card-title">'+shows.MainTitle+"&emsp;"+shows.AirTime+'</h3>');
    //$h3.addClass("card-title");
    //$h3.text(shows.MainTitle);

    var $p1 = $('<p class="card-text">\"'+shows.EpisodeName+'\"</p>');
    //$p1.addClass("card-text");
    //$p1.addText(shows.EpisodeName);

    var $p2 = $('<p class="card-text">'+shows.Description+'</p>');
    //$p2.addClass("card-text");
    //$p2.addText(shows.Description);

    var $a = $('<a href="#" class="btn btn-primary" id='+shows.MainTitle+'>' + "Go to this chat!" + '</a>');
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
	var visited = [];
	var i = 0;
	$(".icon").on("click", function() {
        var field = $("#search").val();
		$(".intro").addClass("hidden");
		$(".intermediate").removeClass("hidden");
        $.each(shows, function(key, value) {
            if(field.toLowerCase() == value.MainTitle.toLowerCase()){
							 cardList(value);
							 visited[i] = value.MainTitle;
							 i++;
						}

        });
				$.each(shows, function(key, value) {
						if(!visited.includes(value.MainTitle)){
							 cardList(value);
						}
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
    "Description": "Diagnosed with terminal lung cancer, chemistry teacher Walter White teams up with a former student to cook and sell crystal meth.",
    "AirTime": "9:30 pm",
    "DateofAir": "09-24-16",
    "Runtime": "60 minutes"
  },
  {
    "MainTitle": "Parks and Recreation",
    "EpisodeName": "Boys Club",
    "Description": "Leslie tries to infiltrate the boys' club of politics by crashing an after-work gathering at the town hall. Trying to fit in, she opens a gift basket breaking the local government ethics, and then is called before an ethics committee.",
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
    "EpisodeName": "Garden of Bones",
    "Description": "Lord Baelish arrives at Renly's camp just before he faces off against Stannis. Daenerys and her company are welcomed into the city of Qarth. Arya, Gendry, and Hot Pie find themselves imprisoned at Harrenhal.",
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
