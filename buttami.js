$(document).ready(function () {
    $.getJSON("https://quotesondesign.com/wp-json/posts", function (json) {
        var html = "";
        json.forEach(function (val) {
            var keys = Object.keys(val); //[quote, author, category]
            html += "<div class = 'cat'>";
            keys.forEach(function (key) {
                html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
            });
        });
        $(".message").html(html);
    });
});
