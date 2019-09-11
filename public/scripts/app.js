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
      console.log("adgahdshdahdjjdh", $newTweetForm.val())
      $.ajax({
        url: "/tweets/",
        type: "POST",
        data: $newTweetForm.serialize()
      })
      .then(response => {
        // $('#tweets-container').append(createTweetElement(response));
        console.log("Success!", response);
        loadTweets();
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
    console.error(error);
  }
}

//Helper function for a valid tweet
// const isUserInputValid = inputTweet => {
//   inputTweet !== null,
//   inputTweet !== undefined,
//   inputTweet !== ""
// }

loadTweets();

// console.log("asdasdasd", data);