var apikey = "5ef2f92f2125441fb64a9324a42832af";

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
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });

    var obj = JSON.parse(text);
    console.log(obj);
}

var main = function() {
	$("#search").change(function() {
		populateAutoSuggList();
	})
}

$(document).ready(main());