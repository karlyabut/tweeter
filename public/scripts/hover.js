$(document).ready(function() {
  // --- our code goes here ---
  $(".tweet").hover(function() {
    $(this).css("opacity", 1)
    $(this).css("box-shadow", "10px 10px 5px #99ccff")
  }, function() {
    $(this).css("opacity", 0.8)
    $(this).css("box-shadow", "")
  })
});