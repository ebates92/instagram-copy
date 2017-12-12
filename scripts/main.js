
//  GLOBAL VARIABLES

var HOUSEDATADICTIONARY = [       
        {
            "image": "images/house_1.jpg",
            "street" :"151 Hale St NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"3 beds / 2 baths / 1,903 sqft",
            "price":"$679,900"
        },
    
        {
            "image":"images/house_2.jpg",
            "street":"2017 Palifox Dr NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"3 beds / 2 baths / 1,878 sqft",
            "price":"$589,000"
        },
    
        {
            "image": "images/house_3.jpg",
            "street":"36 Leslie St NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"4 beds / 2 baths / 1,900 sqft",
            "price":"$429,900"
        }, 
    
        {
            "image": "images/house_4.jpg",
            "street":"491 Harold Ave NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"3 beds / 2 baths / 1,424 sqft",
            "price":"$449,900"
        }, 
    
        {
            "image": "images/house_5.jpg",
            "street":"1892 Gordon Mnr NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"2 beds / 2 baths / --sqft",
            "price":"$389,900"
        }, 
    
        {
            "image": "images/house_6.jpg",
            "street":"209 Lampkin St NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"1 beds / 2 baths / 1,224 sqft",
            "price":"$365,000"
        },
        {
            "image": "images/house_7.jpg",
            "street":"1124 Faith Ave SE,",
            "cityState":"Atlanta, GA 30307",
            "size":"3 beds / 3 baths / 1,586 sqft",
            "price":"$415,000"
        }, 
        {
            "image":"images/house_8.jpg",
            "street":"1741 S Ponce De Leon Ave NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"4 beds / 5 baths / 5,400 sqft",
            "price":"$2,700,000"
        }, 
        {
            "image": "images/house_9.jpg",
            "street":"860 Peachtree St NE Unit 713,",
            "cityState":"Atlanta, GA 30307",
            "size":"1 beds / 1 baths / 1,060 sqft",
            "price":"$390,000"
        }, 
        {
            "image": "images/house_10.jpg",
            "street":"855 Peachtree St NE Unit 3209,",
            "cityState":"Atlanta, GA 30307",
            "size":"1 beds / 2 baths / 1,000 sqft",
            "price":"$375,000"
        },
        {
            "image": "images/house_11.jpg",
            "street":"1065 Peachtree St NE Unit 3005,",
            "cityState":"Atlanta, GA 30307",
            "size":"2 beds / 3 baths / 2,289 sqft",
            "price":"$1,325,000"
        }, 
        {  
            "image": "images/house_12.jpg",
            "street":"1419 Lanier Pl NE,",
            "cityState":"Atlanta, GA 30307",
            "size":"4 beds / 4 baths / 3,500 sqft",
            "price":"$1,275,000"
        }                
    ]

    
var SERVER_URL = '/house.json'



// AJAX PROMISES

function main() {
    window.onload = function () {
        addFrontPageImages()
            .then(createPhotoPopOut)
    }
};








// SEARCH FILTERING

function useSearchFilter (string) {
    var newHouseDataDictionary = HOUSEDATADICTIONARY.filter(function (thing){
        return stringSearch(thing, string);
    });
    // document.querySelector('.container').removeChild('[data-image]');
    $('.container').empty();
    addFrontPageImages(newHouseDataDictionary);
}

function stringSearch (thing, string) {
    var valuesArray = Object.values(thing)  
    for (var x = 0; x < valuesArray.length; x++) {
        var trueTest = valuesArray[x].search(string);
        if (trueTest >= 0) {
            return true;
        }
    }
    return false;
};

function captureSearchFilter (HOUSEDATADICTIONARY) {
    var $searchBar = $('.nav input');
    $searchBar.keydown(function(event) {
        var $searchBar = $('.nav input')
        if (event.which == '13') {
            event.preventDefault();
            var $filter = $searchBar.val();
            useSearchFilter($filter);
        }
    });
};

captureSearchFilter();





// ON WINDOW LOAD

window.onload = addFrontPageImages(HOUSEDATADICTIONARY);

function addFrontPageImages (houseArray) {

    var imageContainer = document.querySelector('.container');

    houseArray.forEach(function (house,index, array) {

        // creates anchor tags for images
        var originalImageAnchor = document.createElement('a');
        imageContainer.appendChild(originalImageAnchor);
        originalImageAnchor.setAttribute('src', house["image"]);

        // creates front page images
        var originalImage = document.createElement('img');
        originalImageAnchor.appendChild(originalImage);
        originalImage.setAttribute('src', house["image"]);
        originalImage.setAttribute('alt', "house photo");
        originalImage.setAttribute('data-image', '');

        // create div in image
        var nestedImageContainer = document.createElement('div');
        originalImageAnchor.appendChild(nestedImageContainer);
        nestedImageContainer.setAttribute('class', 'frontImageDiv');

        // creates header in image div
        var streetHeader = document.createElement('h2');
        streetHeader.innerText = house['street'];
        nestedImageContainer.appendChild(streetHeader);

        // creates header in image div
        var valueHeader = document.createElement('h2');
        valueHeader.innerText = house['price'];
        valueHeader.setAttribute('id','price');
        nestedImageContainer.appendChild(valueHeader);
    });
    createPhotoPopOut();
};





// CREATES A POPUP WINDOW IN THE DOM

function createPhotoPopOut () {
    var photoArray = document.querySelectorAll('[data-image]');
    var fixedBody = document.querySelector('[data-body]');

    photoArray.forEach(function (photo,index,array) {
        photo.addEventListener('click',function(clicked) {
            clicked.preventDefault();
            var theImage = createAnImage(photo.src, photo.alt);
            var thePictureContainer = createPictureContainer();
            var thePictureWindow = createPictureWindow ();
            var thePictureX = createPictureX ();
            var scrollLeft = createScrollLeft();
            var scrollRight = createScrollRight();
            var infoDiv = createPopUpDivContainer();
            fixedBody.classList.add('fixed');
            document.body.appendChild(thePictureContainer).appendChild(thePictureWindow).appendChild(theImage);
            thePictureWindow.appendChild(infoDiv);
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
    pictureX.innerHTML += "&Cross;";
    return pictureX;
}

function createScrollLeft () {
    var scrollLeft = document.createElement('div');
    scrollLeft.classList.add('clickable');
    scrollLeft.classList.add('scroll');
    scrollLeft.classList.add('scroll-left');
    scrollLeft.innerHTML += "&Lang;";
    return scrollLeft;
}

function createScrollRight () {
    var scrollRight = document.createElement('div');
    scrollRight.classList.add('clickable');
    scrollRight.classList.add('scroll');
    scrollRight.classList.add('scroll-right');
    scrollRight.innerHTML += "&Rang;";
    return scrollRight;
}

function createPopUpDivContainer () {
    var nestedImageContainer = document.createElement('div');
    nestedImageContainer.classList.add('popup-house-info');
    return nestedImageContainer;
}





// LETS YOU EXIT THE POPUP WINDOW
function xClicked () {
    var xContainer = document.querySelector(".picture-x");
    xContainer.addEventListener('click', function(clicked) {
        clicked.preventDefault();
        var pictureContainer = document.querySelector('.picture-container');
        document.body.removeChild(pictureContainer);
        document.body.classList.remove('fixed');
    });
};





//  LET YOU SCROLL THOUGH IMAGES IN THE POPUP WINDOW

function scrollImage (index,array) {
    // finds current image
    var currentImage = document.querySelector('.picture-window > img'); 
    var scrollRight = document.querySelector('.scroll-right');
    var scrollLeft = document.querySelector('.scroll-left');
    // listens for scroll click right or left
    scrollRight.addEventListener('click', function(clicked) {
        clicked.preventDefault();
        var newPosition = index + 1;
        if (index === (HOUSEDATADICTIONARY.length-1)) {
            newPosition = 0;
        };
        var newImage = array[newPosition];
        currentImage.setAttribute('src',newImage.getAttribute('src'));
        index = newPosition;
        updateHouseInfo(index);
    });
    scrollLeft.addEventListener('click', function(clicked) {
        clicked.preventDefault();
        var newPosition = index - 1;
        if (index === 0) {
            newPosition = (HOUSEDATADICTIONARY.length-1);
        };
        var newImage = array[newPosition];
        currentImage.setAttribute('src',newImage.getAttribute('src'));
        index = newPosition;
        updateHouseInfo(index);
    });

    // adds arrow scroll functionality
    document.onkeydown = checkKey;

    function checkKey(e) {
        
        e = e || window.event;

        if (e.keyCode == '37') {
            // left arrow
            var newPosition = index - 1;
            if (index === 0) {
                newPosition = (HOUSEDATADICTIONARY.length-1);
            };
            var newImage = array[newPosition];
            currentImage.setAttribute('src',newImage.getAttribute('src'));
            index = newPosition;
            updateHouseInfo(index);
        }
        else if (e.keyCode == '39') {
            // right arrow
            var newPosition = index + 1;
            if (index === (HOUSEDATADICTIONARY.length-1)) {
                newPosition = 0;
            };
            var newImage = array[newPosition];
            currentImage.setAttribute('src',newImage.getAttribute('src'));
            index = newPosition;
            updateHouseInfo(index);
        };
    };
    createHouseInfo(index);
};



// UPDATES THE IMAGES DATA AS YOU SCROLL

function createHouseInfo (index) {

    var $contentContainer = $('.popup-house-info');
    
    // add street name
    var $streetHeader = $('<h1>', {
        'class': 'address'
    });
    $streetHeader.text(HOUSEDATADICTIONARY[index]['street']);
    $contentContainer.append($streetHeader);


    // // add city/state name
    var $cityStateHeader = $('<h1>', {
        'class': 'address2'
    });
    $cityStateHeader.text(HOUSEDATADICTIONARY[index]['cityState']);
    $contentContainer.append($cityStateHeader);

    // // add house details
    var $sizeHeader = $('<h1>', {
        'class': 'size'
    });
    $sizeHeader.text(HOUSEDATADICTIONARY[index]['size']);
    $contentContainer.append($sizeHeader);

    // // add price
    var $priceHeader = $('<h1>', {
        'id': 'price2'
    });
    $priceHeader.text(HOUSEDATADICTIONARY[index]['price']);
    $contentContainer.append($priceHeader);    
    
};

function updateHouseInfo (index) {

    var $contentContainer = $('.popup-house-info');

    // edit street name
    var $streetHeader = $('.address');
    $streetHeader.text(HOUSEDATADICTIONARY[index]['street']);


    // // edit city/state name
    var $cityStateHeader = $('.address2');
    $cityStateHeader.text(HOUSEDATADICTIONARY[index]['cityState']);

    // // edit house details
    var $sizeHeader = $('.size');
    $sizeHeader.text(HOUSEDATADICTIONARY[index]['size']);

    // // edit price
    var $priceHeader = $('#price2');
    $priceHeader.text(HOUSEDATADICTIONARY[index]['price']);
};
