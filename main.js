$(document).ready(function () {
    //getRandomQuote();
    $('.workSpace').click(function () {
        getRandomQuote();
    }).click();
    $('.coffee-button').on('click', function (e) {
        $('.quoteCont').html("made by ....");
        $('.quoteAuth').html("marco");
    });
    $('.commSpace').hover(function (e) {
        $('.msg').html("click above to get a quote");
    });
    $('.workSpace').hover(function (e) {
        $('.msg').html("");
    });
});

function titleCase(str) {
   var arrLc=str.toLowerCase().split(/[ ]/g);
  var arrC=arrLc.map(
    function(x) {
      return x.substr(0,1).toUpperCase()+x.substr(1,x.length);
    });
  return arrC.join(" ");
}

function openTwitter(text) {
    var href = 'https://twitter.com/intent/tweet?url=&via=urNameHere&hashtags=testdesquo&text=';
    // trim & fill
    if (text.length > 108) {
        text = text.slice(0, 105) + '.."';
    }
    text = encodeURIComponent(text);
    window.open(href + text, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

// quotesondesign.com
function getRandomQuote() {
    var quoteRequest = $.ajax({
        type: 'GET',
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=?',
        datatype: 'json',
        cache: false
    });
    quoteRequest.done(function (data) {
        // Remove <p> tags and trailing white space & add double quotes
        var quote = ' &ldquo; ' + data[0].content.slice(3, -5).trim() + '&rdquo;';
        var author = data[0].title;
        $('.quoteCont').html(titleCase(quote));
        $('.quoteAuth').html(titleCase(author));
    });
    quoteRequest.fail(function (xhr, status, error) {
        console.warn(xhr.responseText);
        $('.quoteCont').html("woops...some error occurred");
        $('.quoteAuth').html("admin");
    });
}


// Send via twitter
$('.twitter-share-button').on('click', function (e) {
     openTwitter($('.quoteCont').html()+" "+$('.quoteAuth').html());
    //$('.quoteCont').html("sent");
    //$('.quoteAuth').html("admin");
});
