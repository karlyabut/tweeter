/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png",
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" 
//       },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(value) {
  const $tweet = `
    <article class="tweet">
    <header>
      <img src="${escape(value.user.avatars)}">
      <span id="userName">${escape(value.user.name)}</span>
      <span id="tweeterName">${escape(value.user.handle)}</span>
    </header>

    <p>${escape(value.content.text)}</p>

    <footer>
      <div>
        <span>${escape(value.created_at)}</span>
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
  for(let tweet of tweets) {
    $(document).ready(()=> {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  }
}

$(function() {
  const $newTweetForm = $("#newTweetForm");
  $newTweetForm.submit(function(event) {
    event.preventDefault();
    if($("#tweetTxtArea").val() === "") {
      alert("Please write some tweet!");
    } else if ($("#tweetTxtArea").val().length > 140) {
      alert("TOO LONG!");
    } else {
      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: $newTweetForm.serialize(),
      })
      .then(response => {
        $("#tweetTxtArea").val("");
        $(".counter").text("140");
        loadLastTweet();
      })
    }
  })
})

//let use async/await on this function!
const loadTweets = async () => {
  try {
    const response = await $.ajax({
      url: "http://localhost:8080/tweets",
      type: "GET",
      dataType: "JSON"
    })
    renderTweets(response);
  } catch (error) {

  }
}

const loadLastTweet = async () => {
  try {
    const response = await $.ajax({
      url: "http://localhost:8080/tweets",
      type: "GET",
      dataType: "JSON"
    })
    // console.log("====>", await response[response.length - 1]);
    $(document).ready(()=> {
      $('#tweets-container').prepend(createTweetElement(response[response.length - 1]));
    })
  } catch (error) {
    console.error(error);
  }
}


loadTweets();