function checkScreenSize() {
    var hiddenBlock = document.querySelector('#logo');
    if (window.innerWidth > 1200) {
        hiddenBlock.style.display = "block";
    } else {
        hiddenBlock.style.display = "none";
    }
}

// Add an event listener to check the size whenever the window is load or réize
window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
// Initial check when the page loads
checkScreenSize();