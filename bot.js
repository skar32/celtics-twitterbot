// ******************************************************* //
// 					 Authors: Soham Kar & Khadijat Amoo						 //
//              LMC 2700 TwitterBot Project								 //
//										Date: 3/12/20												 //
// ******************************************************* //

// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// Sets up the search parameters for the favoriteCelticsPost() function
var params = {
  q: ['#celtics', '#goceltics', '#bostonceltics', '#bleedgreen'],
  count: 10,
  result_type: 'mixed',
  lang: 'en'
}

// This function finds 10 tweets with the hashtags "#celtics, #goceltics, #bostonceltics, #bleedgreen" and favorites them.
function favoriteCelticsPost() {
		// Searches for tweets matching the search parameters listed above
		T.get('search/tweets', params, function(err, data, response) {
	  		// If there is no error, proceed
				if(!err) {
		    		// Loop through the returned tweets
		  			for(let i = 0; i < data.statuses.length; i++) {
		      			// Get the tweet ID from the returned data
		      			let id = { id: data.statuses[i].id_str }
		      			// Try to favorite the selected Tweet
		      			T.post('favorites/create', id, function(err, response) {
		        				// If the favorite fails, log the error message
		        				if(err) {
		        						console.log(err.message);
		        				}
		        				// If the favorite is successful, log the url of the tweet
		        				else {
		          					let username = response.user.screen_name;
		          					let tweetId = response.id_str;
		          					console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`);
		        				}
		      			});
		    	}
	  		} else {
	    			console.log(err);
	  		}
		})
}

// Set up an event listener for the tweetMentioned() function
var stream = T.stream('statuses/filter', { track: ['@celticsfan017'] });
stream.on('tweet', tweetMentioned);

// This function waits for a Twitter user to mention the TwitterBot and then sends a message to the Twitter user.
function tweetMentioned(tweet) {
    // Who sent the tweet?
    var name = tweet.user.screen_name;
    // What is the text?
    var txt = tweet.text;
    // the status update or tweet ID in which we will reply
    var nameID  = tweet.id_str;

    // Get rid of the @ mention
    var txt = txt.replace(/@celticsfan017/g, "");

    // Start a reply back to the sender
    var reply = "Thanks for mentioning me! @" + name + ' ' + 'You are super cool!';
    var params = {
                  status: reply,
                  in_reply_to_status_id: nameID
                 };

		// Post a tweet mentioning the user
    T.post('statuses/update', params, function(err, data, response) {
      	if (err !== undefined) {
        		console.log(err);
      	} else {
        		console.log('Tweeted: ' + params.status);
      	}
    })
};

// This is the URL of a search for the 15 most popular tweets that contain the '#Celtics' hashtag.
var celticsHashtagSearch = {q: "#Celtics", count: 15, result_type: "popular"};

// This is the URL of a search for the 15 most popular tweets that contain the phrase "Jayson Tatum is".
var jaysonTatumSearch = {q:"Jayson Tatum is", count: 15, result_type: "popular"};

// This is the URL of a search for the 15 most popular tweets that contain the phrase "Jaylen Brown is".
var jaylenBrownSearch = {q:"Jaylen Brown is", count: 15, result_type: "popular"};

// This is the URL of a search for the 15 most recent tweets that have mentioned the TwitterBot using "@celticsfan017."
var mentionsSearch = {q:"@celticsfan017", count: 15, result_type: "recent"};

// This function finds the most popular tweet with the #Celtics hashtag, and retweets it.
function retweetLatestCelticsHashtag() {
	T.get('search/tweets', celticsHashtagSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

// This function finds the most popular tweet with the phrase "Jayson Tatum is", and retweets it.
function retweetJaysonTatum() {
	T.get('search/tweets', jaysonTatumSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your search:', error);
	  }
	});
}

// This function finds the most popular tweet with the phrase "Jaylen Brown is", and retweets it.
function retweetJaylenBrown() {
	T.get('search/tweets', jaylenBrownSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your search:', error);
	  }
	});
}

// This function finds the most recent tweet that has mentioned the bot and retweets it.
function retweetLatestMention() {
	T.get('search/tweets', mentionsSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your search:', error);
	  }
	});
}

// This function picks one of the players on the Boston Celtics to use in the postRandomStatus() method.
function generateRandomCelticsPlayer() {
		// generate a random number between 0 and 16 (inclusive)
		var randomNumber = Math.round(Math.random() * 16);
		var celticsPlayer;
		// pick a player using the generated random number
		switch(randomNumber) {
				case 0:
						celticsPlayer = "Kemba Walker";
						break;
				case 1:
						celticsPlayer = "Jaylen Brown";
						break;
				case 2:
						celticsPlayer = "Jayson Tatum";
						break;
				case 3:
						celticsPlayer = "Gordon Hayward";
						break;
				case 4:
						celticsPlayer = "Daniel Theis";
						break;
				case 5:
						celticsPlayer = "Marcus Smart";
						break;
				case 6:
						celticsPlayer = "Enes Kanter";
						break;
				case 7:
						celticsPlayer = "Romeo Langford";
						break;
				case 8:
						celticsPlayer = "Brad Wanamaker";
						break;
				case 9:
						celticsPlayer = "Robert Williams III";
						break;
				case 10:
						celticsPlayer = "Grant Williams";
						break;
				case 11:
						celticsPlayer = "Carsen Edwards";
						break;
				case 12:
						celticsPlayer = "Javonte Green";
						break;
				case 13:
						celticsPlayer = "Tacko Fall";
						break;
				case 14:
						celticsPlayer = "Semi Ojeleye";
						break;
				case 15:
						celticsPlayer = "Vincent Poirier";
						break;
				case 16:
						celticsPlayer = "Tremont Waters";
						break;
			}
			// return the player signified by the generated random number
			return celticsPlayer;
}

// This function picks a random team in the NBA (besides the Boston Celtics) to use in the postRandomStatus() method.
function generateRandomTeam() {
		// generate a random number between 0 and 28 (inclusive)
		var randomNumber = Math.round(Math.random() * 28);
		var team;
		// pick a team using the generated random number
		switch(randomNumber) {
				case 0:
						team = "Milwaukee Bucks";
						break;
				case 1:
						team = "Toronto Raptors";
						break;
				case 2:
						team = "Miami Heat";
						break;
				case 3:
						team = "Indiana Pacers";
						break;
				case 4:
						team = "Philadelphia 76ers";
						break;
				case 5:
						team = "Brooklyn Nets";
						break;
				case 6:
						team = "Orlando Magic";
						break;
				case 7:
						team = "Washington Wizards";
						break;
				case 8:
						team = "Charlotte Hornets";
						break;
				case 9:
						team = "Chicago Bulls";
						break;
				case 10:
						team = "Detroit Pistons";
						break;
				case 11:
						team = "New York Knicks";
						break;
				case 12:
						team = "Atlanta Hawks";
						break;
				case 13:
						team = "Cleveland Cavaliers";
						break;
				case 14:
						team = "Los Angeles Lakers";
						break;
				case 15:
						team = "Los Angeles Clippers";
						break;
				case 16:
						team = "Denver Nuggets";
						break;
				case 17:
						team = "Utah Jazz"
						break;
				case 18:
						team = "Houston Rockets";
						break;
				case 19:
						team = "Oklahoma City Thunder";
						break;
				case 20:
						team = "Dallas Mavericks";
						break;
				case 21:
						team = "Memphis Grizzlies";
						break;
				case 22:
						team = "Portland Trailblazers";
						break;
				case 23:
						team = "Sacramento Kings";
						break;
				case 24:
						team = "New Orleans Pelicans";
						break;
				case 25:
						team = "San Antonio Spurs";
						break;
				case 26:
						team = "Phoenix Suns";
						break;
				case 27:
						team = "Minnesota Timberwolves";
						break;
				case 28:
						team = "Golden State Warriors";
						break;
			}
			// return the team that is signified by the generated random number
			return team;
}

// This function generates a random status update using the functions generateRandomCelticsPlayer() & generateRandomTeam() and tweets it out.
function postRandomStatus() {
		// generate a random number between 0 and 5 (inclusive)
		var randomNumber = Math.round(Math.random() * 5);
		var statement;
		// produce a random statement using the generated random number
		switch(randomNumber) {
				case 0:
						statement = generateRandomCelticsPlayer() + " is gonna lead us to the championship 🏆";
						break;
				case 1:
						statement = "☘️ The Celtics are the best team in the league ☘️";
						break;
				case 2:
						statement = "I see " + generateRandomCelticsPlayer() + " has been putting that work in 👀";
						break;
				case 3:
						statement = "The Celtics are better than the " + generateRandomTeam() + ", don't @ me 🤷";
						break;
				case 4:
						statement = generateRandomCelticsPlayer() + " is gonna go off against the " + generateRandomTeam() + " next time, mark my words!";
						break;
				case 5:
						statement = "I never want " + generateRandomCelticsPlayer() + " to leave the Celtics 😭";
						break;
		}
		// tweet the statement to the TwitterBot's feed
		T.post('statuses/update', {status: statement}, function(err, data, response) {
				if (!err) {
						console.log("The tweet " + "\"" + statement + "\"" + " has been successfully created and posted to your Twitter feed!");
				} else {
						console.log(err.message);
				}
		})
}

// File system module allows you to work with the file system on your computer
var fs = require('fs');

// Find the image to be used in the daily update message
var dailyUpdateImage = fs.readFileSync('./images/tatum-brown_1.jpg', { encoding: 'base64' })

// This is the counter that counts how many daily updates have been posted
var dailyUpdateCount = 0;

// This function tweets out a "daily update" message with a counter counting how many times the daily update has been posted.
function dailyUpdate() {
		// add the image to be used with the daily update message
		T.post('media/upload', { media_data: dailyUpdateImage }, function (error, data, response) {
				var mediaIdStr = data.media_id_string;
				var meta_params = { media_id: mediaIdStr };

				// tweet the daily update message if no errors occur
				T.post('media/metadata/create', meta_params, function (error, data, response) {
						if (!error) {
								T.post('statuses/update', { status: 'Daily reminder #' + dailyUpdateCount + ' that Jayson Tatum and Jaylen Brown are the best young duo in the league', media_ids: [mediaIdStr]}, function (err, data, response) {console.log(data)});
								console.log("Daily update has been successfully tweeted!");
						} else {
								console.log(error.message);
						}
				})
		})
		// log how many times the daily update has been tweeted to the console
		console.log(dailyUpdateCount);
		// increment the daily update counter
		dailyUpdateCount++;
}

// Favorite 10 tweets containing Celtics-related hashtags
favoriteCelticsPost();

// Tweet the daily update message produced by the dailyUpdate() function
dailyUpdate();

// Tweet out a statement produced by the postRandomStatus() function
postRandomStatus();

// Try to retweet three different tweets using the four retweet functions:

// Retweet a tweet with '#Celtics'
retweetLatestCelticsHashtag();
// Retweet a tweet relating to Jayson Tatum
retweetJaysonTatum();
// Retweet a tweet relating to Jaylen Brown
retweetJaylenBrown();
// Retweet the latest tweet that has mentioned the bot
retweetLatestMention();

// Set repeat times for the functions:

// Like a post with Celtics-related hashtags once every hour
setInterval(favoriteCelticsPost, 1000 * 60 * 60 * 1);
// Tweet the daily update once every twenty-four hours
setInterval(dailyUpdate, 1000 * 60 * 60 * 24);
// Retweet a tweet with "#Celtics" once every two hours
setInterval(retweetLatestCelticsHashtag, 1000 * 60 * 60 * 2);
// Post a random tweet once every three hours
setInterval(postRandomStatus, 1000 * 60 * 60 * 3);
// Retweet a tweet relating to Jayson Tatum once every four hours
setInterval(retweetJaysonTatum, 1000 * 60 * 60 * 4);
// Retweet a tweet relating to Jaylen Brown once every eight hours
setInterval(retweetJaylenBrown, 1000 * 60 * 60 * 8);
// Retweet the most recent tweet that has mentioned the bot once every ten hours
setInterval(retweetLatestMention, 1000 * 60 * 60 * 10);
