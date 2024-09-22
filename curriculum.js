function navigate() {
    var select = document.getElementById("dropdown");
    var selectedValue = select.options[select.selectedIndex].value;
    if (selectedValue) {
        window.location.href = selectedValue;
    }
}