// Creative Crew Modal
let creativeCrewModal = document.getElementById("creativeCrewModal");
let creativeCrewBtn = document.getElementById("creativeCrewBtn");

creativeCrewBtn.onclick = function() {
    creativeCrewModal.style.display = "block";
}

creativeCrewModal.querySelector(".close-btn").onclick = function() {
    creativeCrewModal.style.display = "none";
}
