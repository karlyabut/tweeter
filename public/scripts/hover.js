$(document).ready(function() {
  // --- our code goes here ---
  // $(".tweet").hover(function() {
  //   $(this).css("opacity", 1)
  //   $(this).css("box-shadow", "10px 10px 5px #99ccff")
  // }, function() {
  //   $(this).css("opacity", 0.8)
  //   $(this).css("box-shadow", "")
  // })

  $("#writeTweet").hover( function() {
    $("#iconBounce").animate({ top: 10 }, 
      {duration: 500, easing: "swing"});
  }, function() {
    $("#iconBounce").animate({ top: 0 }, 
      {duration: 0, easing: "swing"});
  })

});