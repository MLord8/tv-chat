var username = 'nrickles3';
var sb;
var appId = 'D74C7631-8912-4A8E-868D-1B1959ACE31A'
var tv_channel;

sb = new SendBird({
    appId: appId
});

var apikey = "daf59fe2ddab4bb297e7134a44daed3f";
var tvShowTitle; //window.localStorage.getItem("id");
var openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
var channels = [];
var channelTitles = [];
var messages = [];
var messageListQuery;
var currChannel = null;
var currChannelURL = "";
var currTime = 0;
var name;

$('#searchButton').click(function() {
    main();
});
//sb.connect(USER_ID, function(user, error) {});
function main() {
    $('.btn.btn-primary').click(function() {
        name = $(this).attr('id');
    });
}

function run() {
    tvShowTitle = name;
    setTimeout(function() {
        sb.connect(username, '8ad51bfd0feff2c6c41b6fe84e1a50085468cd23', function(user, error, callback) {
            console.log(tvShowTitle);
            execute();
        });
    }, 1000);
}

function execute() {

openChannelListQuery.next(function (response, error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log(response);
    $.each(response, function(key, value) {
        channels.push({name: value.name, url: value.url});
        channelTitles.push(value.name);
    });
    console.log(channels);
    if (channelTitles.includes(tvShowTitle) == false) {
        sb.OpenChannel.createChannel(tvShowTitle, '', '', function (channel, error) {
            if (error) {
                console.error(error);
                return;
            }
            console.log(channel);
            channels.push({name: channel.name, url: channel.url});
            channelTitles.push(channel.name);
            enterChannel();
        });
    } else {
        enterChannel();
    }
});


//$("#enterChannel").click(function() {
function enterChannel() {
    for (var i = 0; i < channels.length; i++) {
        if (tvShowTitle == channels[i].name) {
            //enter an open channel
            sb.OpenChannel.getChannel(channels[i].url, function (channel, error, callback) {
                if (error) {
                    console.error(error);
                    return;
                }
                console.log(channel);

                channel.enter(function(response, error){
                    if (error) {
                        console.error(error);
                        return;
                    }


                });
                currChannel = channel;
                currTime = 0;
                statusUpdate(updateChat);
                createGraphs();
                //getInitialSentiment();
            });
            currChannelURL = channels[i].url;
            setInterval(function() {
                updateSentiment();
            }, 1000);
        }
    }
}

function getInitialSentiment() {
    messages = [];
    messageListQuery = currChannel.createPreviousMessageListQuery();
    messageListQuery.load(20, true, function(messageList, error){
        if (error) {
            console.error(error);
            return;
        }
        $.each(messageList, function(key, value) {
            calculateSentiment(value.message, updateSentiment);
        });
    });
}
//sending messages
$("#sendMessage").click(function() {
    currChannel.sendUserMessage($("#message").val(), '', function(message, error) {
        if (error) {
            console.error(error);
            return;
        }
        console.log(message);

        calculateSentiment($("#message").val(), updateSentiment);
        //statusUpdate();
    });
})

var sentimentArr = [{x: 0, y: 100}];
function calculateSentiment(input, callback) {
    var data = {
      "documents": [
        {
          "language": "en",
          "id": "string",
          "text": input
        }
      ]
  }

    $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
            xhrObj.setRequestHeader("Content-Type","application/json");
        },
        type: "POST",
        // Request body
        data: JSON.stringify(data),
  })
    .done(function(data) {
        console.log(data);
        json = Object.assign({}, data);
        sentimentArr.push({y: json.documents[0].score * 100});
        console.log(sentimentArr);

        callback();
    })
    .fail(function() {
        alert("error");
    });
}

var yVal = 0;
var xVal = 0;
var bar;
var barDataset;
var chart;
var chartArr = [{x: 0, y: 100}];
function createGraphs() {
    barDataset = [{x: 0, y: 100, indexLabel: "100%"}];
    bar = new CanvasJS.Chart("barContainer", {
        //backgroundColor: "blue",
        title :{
            text: "Average Sentiment (0 = negative, 100 = positive)"
        },
        axisY:{
         valueFormatString: " ",
         gridThickness: 0,
         lineThickness: 0,
         tickLength: 0
        },
        axisX:{
          valueFormatString: " ",
          gridThickness: 0,
          lineThickness: 0,
          tickLength: 0
        },
        toolTip:{
            enabled: false
        },
        data: [{
                type: "column",
                dataPoints: barDataset
            },
            {
                color: "rgba(0,0,0,0)",
                dataPoints: [{x: 0, y: 100}]
            }]
    });

    bar.render();

    chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        //backgroundColor: "blue",
        title: {
            text: "Sentiment Over Time"
        },
        axisX: {
            title: "Time (min)"
        },
        axisY: {
            title: "Sentiment (%)"
        },
        data: [{
            type: "line",
            dataPoints: chartArr
        }]
    });

    chart.render();
}

function updateSentiment() {
    var sum = 0;
    xVal = chartArr[chartArr.length - 1].x + (1/60);
    if (sentimentArr.length > 0) {
        for (var i = 0; i < sentimentArr.length; i++) {
            sum += sentimentArr[i].y;
        }
        var avg = Math.round(sum / sentimentArr.length);
        //console.log(avg);
        barDataset[0].y = avg;
        barDataset[0].indexLabel = avg + "%";
        chartArr.push({x: xVal, y: avg});
        bar.render();
        chart.render();
    }
}

function updateChat() {
    currTime = messages[0].createdAt;
    console.log(messages);
    $("#chatBox").empty();
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].createdAt >= currTime) {
            $("#chatBox").append("<p><b>" + messages[i].nickname + "</b>: " + messages[i].message + "</p>");
        }
    }
    messages = [];
}

function statusUpdate(callback) {
    setInterval(function() {
        var messageListQuery1 = currChannel.createPreviousMessageListQuery();
        messageListQuery1.load(20, true, function(messageList, error){
            if (error) {
                console.error(error);
                return;
            }
            $.each(messageList, function(key, value) {
                messages.push({nickname: value.sender.userId, message: value.message, createdAt: value.createdAt});
            });
            messages.reverse();
            callback();
        });
    }, 1000);
}

var ConnectionHandler = new sb.ConnectionHandler();

ConnectionHandler.onReconnectStarted = function(){
    alert("reconnect");
};

ConnectionHandler.onReconnectSucceeded = function(){
    alert("reconnect succeeded");
};

ConnectionHandler.onReconnectFailed = function(){
    alert("reconnect failed");
};
sb.addConnectionHandler('uniqueID', ConnectionHandler);

}
