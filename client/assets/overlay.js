window.addEventListener("load", function() {
  var text = document.getElementById("line");
  var overlay = document.getElementById("search-overlay");
  text.onfocus = function() {
    overlay.style.display = "block";
  };
  text.onblur = function() {
    overlay.style.display = "none";
  };
});
