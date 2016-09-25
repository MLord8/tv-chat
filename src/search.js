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
            alert("error");
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

var main = function() {
	$("#search").on("keyup", function() {
		$("#cards").removeClass("hidden");
			populateAutoSuggList($("#search").val(), buildList);
	});
	$(".icon").on("click", function() {
		$(".box").addClass("hidden");
		$(".chatpage").removeClass("hidden");
	});
}

$(document).ready(main());