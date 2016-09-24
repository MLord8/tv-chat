var apikey = "5ef2f92f2125441fb64a9324a42832af";
var currentList = [];

function populateAutoSuggList() {
	var json = $(function() {
		var params = {
            // Request parameters
            "q": $("#search").val(),
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/suggestions/?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
        })
        .fail(function() {
            alert("error");
        });
    });

	/*for (var i = 0; i < ; i--) {
		Things[i]
	}*/
}

var main = function() {
	$("#search").on("keyup", function() {
		populateAutoSuggList();
	})
}

$(document).ready(main());