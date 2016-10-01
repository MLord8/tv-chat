var sb = new SendBird({
    appId: D74C7631-8912-4A8E-868D-1B1959ACE31A
});

sb.connect(USER_ID, function(user, error) {});
//sb.connect(USER_ID, 8ad51bfd0feff2c6c41b6fe84e1a50085468cd23, function(user, error) {});

/*
sb.updateCurrentUserInfo(NICKNAME, PROFILE_URL, function(response, error) {
  console.log(response, error);
}); //is this necessary?
*/

//dynamically creating channels
sb.OpenChannel.createChannel(NAME, COVER_URL, DATA, function (channel, error) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(channel);
});

//get list of channels
var openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

openChannelListQuery.next(function (response, error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log(response);
});


//enter an open channel
sb.OpenChannel.getChannel(CHANNEL_URL, function (channel, error) {
    if (error) {
        console.error(error);
        return;
    }

    channel.enter(function(response, error){
        if (error) {
            console.error(error);
            return;
        }
    });
});

//exiting a channel
sb.OpenChannel.getChannel(CHANNEL_URL, function (channel, error) {
    if (error) {
        console.error(error);
        return;
    }

    channel.exit(function(response, error){
        if (error) {
            console.error(error);
            return;
        }
    });
});

//loading previous messages
var messageListQuery = channel.createPreviousMessageListQuery();

messageListQuery.load(20, true, function(messageList, error){
    if (error) {
        console.error(error);
        return;
    }
    console.log(messageList);
});

//sending messages
channel.sendUserMessage(MESSAGE, DATA, function(message, error){
    if (error) {
        console.error(error);
        return;
    }
    console.log(message);
});

//receiving messages
var ChannelHandler = new sb.ChannelHandler();

ChannelHandler.onMessageReceived = function(channel, message){
    console.log(channel, message);
};

sb.addChannelHandler(UNIQUE_HANDLER_ID, ChannelHandler);
