// Get the modal
var risingStarsModal = document.getElementById("risingStarsModal");

// Get the button that opens the modal
var risingStarsBtn = document.getElementById("risingStarsBtn");

// Get the <span> element that closes the modal
var closeRisingStarsBtn = document.querySelector("#risingStarsModal .close-btn");

// When the user clicks the button, open the modal
risingStarsBtn.onclick = function() {
  risingStarsModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeRisingStarsBtn.onclick = function() {
  risingStarsModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == risingStarsModal) {
    risingStarsModal.style.display = "none";
  }
}
