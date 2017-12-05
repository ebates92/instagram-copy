// This creates a pop-up picture window in the DOM

function createPhotoPopOut () {
    var photoArray = document.querySelectorAll('[data-image]');
    var fixedBody = document.querySelector('[data-body]');

    photoArray.forEach(function (photo,index,array) {
        photo.addEventListener('click',function(clicked) {
            clicked.preventDefault();
            // createPictureObjects (photo.src, photo.alt);
            var theImage = createAnImage(photo.src, photo.alt);
            var thePictureContainer = createPictureContainer();
            var thePictureWindow = createPictureWindow ();
            var thePictureX = createPictureX ();
            var scrollLeft = createScrollLeft();
            var scrollRight = createScrollRight();
            fixedBody.classList.add('fixed');
            document.body.appendChild(thePictureContainer).appendChild(thePictureWindow).appendChild(theImage);
            thePictureContainer.appendChild(thePictureX);
            thePictureContainer.appendChild(scrollLeft);
            thePictureContainer.appendChild(scrollRight);
            xClicked();
            scrollImage(index,array);
        });
    });
};

function createPictureObjects (src, alt) {
    var theImage = createAnImage(src, alt);
    var thePictureContainer = createPictureContainer();
    var thePictureWindow = createPictureWindow ();
    var thePictureX = createPictureX ();
    return theImage;
    return thePictureContainer;
    return thePictureWindow;
    return thePictureX;
}

function createAnImage (src, alt) {
    var anImage = document.createElement('img');
    anImage.setAttribute('src', src);
    anImage.setAttribute('alt', alt);
    return anImage;
}

function createPictureContainer () {
    var pictureContainer = document.createElement('div');
    pictureContainer.classList.add('picture-container');
    return pictureContainer;
}

function createPictureWindow () {
    var pictureWindow = document.createElement('div');
    pictureWindow.classList.add('picture-window');
    return pictureWindow;
}

function createPictureX () {
    var pictureX = document.createElement('div');
    pictureX.classList.add('clickable');
    pictureX.classList.add('picture-x');
    pictureX.innerHTML += "X";
    return pictureX;
}

function createScrollLeft () {
    var scrollLeft = document.createElement('div');
    scrollLeft.classList.add('clickable');
    scrollLeft.classList.add('scroll');
    scrollLeft.classList.add('scroll-left');
    scrollLeft.innerHTML += "&lt;";
    return scrollLeft;
}

function createScrollRight () {
    var scrollRight = document.createElement('div');
    scrollRight.classList.add('clickable');
    scrollRight.classList.add('scroll');
    scrollRight.classList.add('scroll-right');
    scrollRight.innerHTML += "&gt;";
    return scrollRight;
}

createPhotoPopOut();

// This lets you exit the PopUp Picture Window

function xClicked () {
    var xContainer = document.querySelector(".picture-x");
    xContainer.addEventListener('click', function(clicked) {
        clicked.preventDefault();
        var pictureContainer = document.querySelector('.picture-container');
        document.body.removeChild(pictureContainer);
        document.body.classList.remove('fixed');
    });
};

//  Lets you scroll through images on the page

function scrollImage (index,array) {
    // finds current image
    console.log(index);
    var currentImage = document.querySelector('.picture-window > img'); 
    var scrollRight = document.querySelector('.scroll-right');
    var scrollLeft = document.querySelector('.scroll-left');
    // listens for scroll right or left
    scrollRight.addEventListener('click', function(clicked) {
        clicked.preventDefault();
        var newPosition = index + 1;
        var newImage = array[newPosition];
        console.log(newPosition);
        currentImage.setAttribute('src',newImage.getAttribute('src'));
        index = newPosition;
    });
    scrollLeft.addEventListener('click', function(clicked) {
        clicked.preventDefault();
        var newPosition = index - 1;
        var newImage = array[newPosition];
        console.log(newPosition);
        currentImage.setAttribute('src',newImage.getAttribute('src'));
        index = newPosition;
    });
}