document.addEventListener("DOMContentLoaded", function () {
    const imagemodal = document.getElementById("imagemodal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll(".image-item a").forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            // Prevent default behavior if JavaScript is enabled
            event.preventDefault();
            // Show modal with the image
            imagemodal.style.display = "flex";
            modalImg.src = this.getAttribute("data-image-url");
        });
    });

    closeBtn.onclick = function () {
        imagemodal.style.display = "none";
    };

    imagemodal.onclick = function (event) {
        if (event.target == imagemodal) {
            imagemodal.style.display = "none";
        }
    };
});

function addModalImageClickEventListener(anchor) {
    var modalImg = document.getElementById("modal-img");
    anchor.addEventListener("click", function (event) {
        // Prevent default behavior if JavaScript is enabled
        event.preventDefault();
        // Show modal with the image
        imagemodal.style.display = "flex";
        modalImg.src = this.getAttribute("data-image-url");
    });
}
