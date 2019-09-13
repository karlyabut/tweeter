/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(value) {
  let tweetDate = value.created_at;
  let today = new Date();
  let differenceInMilisec = today.getTime() - tweetDate;

  //date difference in "year/months/day/minute/seconds"
  let diffInMin = Math.floor(differenceInMilisec / 60000);
  let diffInSec = Math.floor(differenceInMilisec / 1000);
  let diffInHour = Math.floor(diffInMin / 60);
  let diffInDays = Math.floor(diffInHour / 24);
  let diffInYear = Math.floor(diffInDays / 365);

  //initial date to set
  let createdAtTxt = diffInYear + " years ago";

  //set approriate text to user
  if(diffInYear <= 0) {
    createdAtTxt = diffInDays + " days ago";
    if(diffInDays <= 0) {
      createdAtTxt = diffInHour + " hours ago";
      if (diffInHour <= 0) {
        createdAtTxt = diffInMin + " minutes ago";
        if(diffInMin <= 0) {
          createdAtTxt = diffInSec + " seconds ago";
        }
      }
    }
  }

  const $tweet = `
    <article class="tweet">
    <header>
      <img src="${escape(value.user.avatars)}">
      <span id="userName">${escape(value.user.name)}</span>
      <span id="tweeterName">${escape(value.user.handle)}</span>
    </header>

    <p><span>${escape(value.content.text)}</span></p>

    <footer>
      <div>
        <span>${escape(createdAtTxt)}</span>
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
      $('#tweets-container').prepend(createTweetElement(tweet));
    })
  }
}

$(function() {
  const $newTweetForm = $("#newTweetForm");
  $newTweetForm.submit(function(event) {
    event.preventDefault();
    //check if the container exist / remove if it does
    if($("#errorContainer")){
      //re-set the focus on the text area
      $("#tweetTxtArea").focus();
      setTimeout(async () => {
        await $("#errorContainer").slideUp();
      }, 2500);
    }

    if($("#tweetTxtArea").val() === "") {
      $("#errorMessage").text("Error: Please add a tweet!"); //set our h4 text to error of string being empty
      $("#errorContainer").slideDown("slow");
    } else if ($("#tweetTxtArea").val().length > 140) {
      $("#errorMessage").text("Error: Too long! You're only allowed 140 characters for a tweet!"); //set our h4 text to error of string length going over 140 characters
      $("#errorContainer").slideDown("slow");
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