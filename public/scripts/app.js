/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" 
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const createTweetElement = function(value) {
  const $tweet = `
    <article class="tweet">
    <header>
      <img src="${value.user.avatars}">
      <span id="userName">${value.user.name}</span>
      <span id="tweeterName">${value.user.handle}</span>
    </header>

    <p>${value.content.text}</p>

    <footer>
      <div>
        <span>${value.created_at}</span>
        <div id="tweetIcons">
          <i class="fas fa-flag fa-xs"></i>
          <i class="fas fa-retweet fa-xs"></i>
          <i class="fas fa-heart fa-xs"></i>
        </div>
      </div>
    </footer>
  </article>`;
  return $tweet;
}

const renderTweets = function(tweets) {
  // loops through tweets
  for(let tweet of tweets) {
    $(document).ready(()=> {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); 
renderTweets(data);
// $('#tweets-container').append($tweet);