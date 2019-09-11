$(document).ready(function() {
  // --- our code goes here ---
  $("#tweetTxtArea").on("keyup", function() {
    $(".counter").text(140 - $("#tweetTxtArea").val().length);
    if($("#tweetTxtArea").val().length > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "");
    }
  })
});