var photoArray = document.querySelectorAll('[data-image]');
var target = document.querySelector('[data-image-main]');

photoArray.forEach(function (photo) {
    photo.addEventListener('click', function (clicked){
        clicked.preventDefault();
        target.setAttribute('src', photo.getAttribute('src'));
    });
});