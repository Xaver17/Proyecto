function modalActive(id) {
    var modal = document.getElementById(id);
    if (modal.style.display === "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}