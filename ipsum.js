var ipsumJs = {};
ipsumJs.config = {};
ipsumJs.config.htmlTags = ['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'span'];

ipsumJs.init = function() {
    console.log('ipsum.js loaded, use alt+ or alt- to increase / decrease text quantity in ' + ipsumJs.config.htmlTags + ' tags');
    ipsumJs.keybindings();
}

ipsumJs.keybindings = function() {
    document.onkeydown = function(key) {
        if (key.altKey && key.keyIdentifier === "U+00BB") {
            ipsumJs.moreText();
        }
        if (key.altKey && key.keyIdentifier === "U+00BD") {
            ipsumJs.lessText();
        }
    }
}

ipsumJs.moreText = function() {
    for (var i = 0; i < ipsumJs.config.htmlTags.length; i++) {
        var elems = document.getElementsByTagName(ipsumJs.config.htmlTags[i]);
        for (var ii=0; ii < elems.length; ii++) {
            elems[ii].textContent = elems[ii].textContent + elems[ii].textContent;
        }
    }
}

ipsumJs.lessText = function() {
    for (var i = 0; i < ipsumJs.config.htmlTags.length; i++) {
        var elems = document.getElementsByTagName(ipsumJs.config.htmlTags[i]);
        for (var ii=0; ii < elems.length; ii++) {
            var textLength = elems[ii].textContent.length;
            elems[ii].textContent = elems[ii].textContent.substring(textLength*0.1, textLength);
        }
    }
}

ipsumJs.init();
