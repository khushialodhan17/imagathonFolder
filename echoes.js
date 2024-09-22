// Get the modal
var echoesModal = document.getElementById("echoesModal");

// Get the button that opens the modal
var echoesBtn = document.getElementById("echoesBtn");

// Get the <span> element that closes the modal
var closeEchoesBtn = document.getElementsByClassName("close-btn")[0];
// Get the <span> element that closes the modal
var closeEchoesBtn = document.querySelector("#echoesModal .close-btn"); 

// When the user clicks the button, open the modal
echoesBtn.onclick = function() {
  echoesModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeEchoesBtn.onclick = function() {
  echoesModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == echoesModal) {
    echoesModal.style.display = "none";
  }
}


