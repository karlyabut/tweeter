$(document).ready(function() {
  //scroll to a specific element (with animation)
  $("#writeTweet").click(function() {

    //set our text area to empty if toggled
    if(!$("#tweetTxtArea").val("")){
      $("#tweetTxtArea").val("");
    }

    $(".new-tweet").slideToggle();
    //animate our user to the text area
    $("html, body").animate({
      scrollTop: $(".container").offset().top - 140
    }, 500);
    //sets the focus to the text area / always set counter text to 140 if user toggles
    $("#tweetTxtArea").focus();
    $(".counter").text("140");
  })
});