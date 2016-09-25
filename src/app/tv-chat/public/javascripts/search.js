var apikey = "5ef2f92f2125441fb64a9324a42832af";
var currentList = [];
var json;


var list = function populateAutoSuggList(input) {
	
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
        	console.log(json);
        	var newList = [];
        	$.each(json.suggestionGroups[0].searchSuggestions, function(key, value) {
        		newList.push(value.displayText);
        	})
        	
			currentList = newList;
			console.log(newList);
			return currentList;
        })
        .fail(function() {
            alert("error");
        });	
}

var main = function() {
	$("#search").on("keyup", function() {
		console.log($("#search").val())
		var list = populateAutoSuggList($("#search").val());
	})
}

$(document).ready(main());
