function modalActive(id) {
    var m = document.getElementById(id);
    if (m.style.display === "none") {
        m.style.display = "block";
    } else {
        m.style.display = "none";
    }
}