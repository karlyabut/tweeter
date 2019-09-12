$(document).ready(function() {
  //scroll to a specific element (with animation)
  $("#writeTweet").click(function() {
    $("html, body").animate({
      scrollTop: $(".container").offset().top - 140
    }, 500);
    //sets the focus to the text area
    $("#tweetTxtArea").focus();
  })
});