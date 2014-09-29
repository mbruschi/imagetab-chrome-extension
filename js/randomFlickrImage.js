var query = '';
var results_per_page = '100';

var image_generator = {
    searchOnFlickrUrl: function(){ return 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
        '&api_key=364295986c1e737da1baf1d60b64e985' +
        '&tags=' + encodeURIComponent(query) +
        '&sort=interestingness-desc&content_type=1&per_page='+ results_per_page +
        '&format=rest';
    },

    requestImages: function() {
        var req = new XMLHttpRequest();
        req.open("GET", this.searchOnFlickrUrl(), true);
        req.onload = this.showPhotos.bind(this);
        req.send(null);
    },

    showPhotos: function (e) {
        var images = e.target.responseXML.querySelectorAll('photo');
        var i = Math.floor(Math.random() * results_per_page);
        document.body.setAttribute('style','background-image: url('+ this.constructImageUrl(images[i]) +'); background-size: cover;');
        document.getElementById("imagelink").setAttribute("href",this.constructImageFlickrUrl(images[i]));
    },

    constructImageUrl: function (photo) {
        return "http://farm" + photo.getAttribute("farm") +
            ".static.flickr.com/" + photo.getAttribute("server") +
            "/" + photo.getAttribute("id") +
            "_" + photo.getAttribute("secret") +
            "_b.jpg";
    },

    constructImageFlickrUrl: function(photo){
     return "https://www.flickr.com/photos/" + photo.getAttribute("owner") +
            "/"+ photo.getAttribute("id");
    }

};

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get({
        imagekeywords: 'mountain'
    }, function(items) {
        query = items.imagekeywords;
        image_generator.requestImages();
    });
});
