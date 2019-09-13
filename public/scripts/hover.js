$(document).ready(function() {
  // --- our code goes here ---
  $("#writeTweet").hover( function() {
    $("#iconBounce").animate({ top: 10 }, 
      {duration: 500, easing: "swing"});
  }, function() {
    $("#iconBounce").animate({ top: 0 }, 
      {duration: 0, easing: "swing"});
  })

});