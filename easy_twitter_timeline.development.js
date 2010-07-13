$.fn.easy_twitter_timeline = function(obj, selector) {
	// Set parameter in case they are not sent by the user

	if (!obj) 			obj 			= { username: 'jquery', max: 20 }
	if (!selector)	selector	= ".easy_twitter"
	

	// In case the user does not define all options use defaults
	obj.max 			= ( obj.max == undefined ) 			? 20 				: obj.max;
	obj.username	= ( obj.username == undefined )	? 'jquery'	: obj.username;
	
  $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + obj.username + "&callback=?", function(data) {
		$(selector).append('<div id="easy_twitter_tweets"></div>');
		$("#easy_twitter_tweets").append('<ul id="easy_twitter_tweet_list"></ul');
		
		var tweet_num = 1;
		var count 		= 1;

		$(data).each(function()
		{
			if ( count <= obj.max )
			{
				current_tweet = 'tweet_num_' + tweet_num;
				username 			= '<a href="http://www.twitter.com/' + this.user.screen_name + '">' + this.user.screen_name + ' </a>';
			
				$('#easy_twitter_tweet_list').append('<li id="' + current_tweet + '" class="easy_twitter_tweet"></li>');
				$("#" + current_tweet).append( '<span class="tweet_user_thumb"><img class="profile_pic" src="' + this.user.profile_image_url + '" alt="' + this.user.screen_name + '" /></span>');
				$("#" + current_tweet).append( '<span class="tweet_content">' + username + ' ' + this.text + '</span><span class="easy_twitter_tweet_date">' + H(this.created_at) + '</span>');
			}
			
			count++;
			tweet_num++;
		});
		
		console.log(data[0]);
  });
}

// from http://widgets.twimg.com/j/1/widget.js
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();
 
var H = function (a) {
    var b = new Date();
    var c = new Date(a);
    if (K.ie) {
        c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
    }
    var d = b - c;
    var e = 1000,
        minute = e * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    if (isNaN(d) || d < 0) {
        return ""
    }
    if (d < e * 7) {
        return "right now"
    }
    if (d < minute) {
        return Math.floor(d / e) + " seconds ago"
    }
    if (d < minute * 2) {
        return "about 1 minute ago"
    }
    if (d < hour) {
        return Math.floor(d / minute) + " minutes ago"
    }
    if (d < hour * 2) {
        return "about 1 hour ago"
    }
    if (d < day) {
        return Math.floor(d / hour) + " hours ago"
    }
    if (d > day && d < day * 2) {
        return "yesterday"
    }
    if (d < day * 365) {
        return Math.floor(d / day) + " days ago"
    } else {
        return "over a year ago"
    }
};