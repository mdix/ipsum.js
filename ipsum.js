var ipsumJs = {};
ipsumJs.config = {};
ipsumJs.config.htmlTags = ['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'span'];

ipsumJs.init = function() {
    console.log('ipsum.js loaded, use alt+ or alt- to increase / decrease text quantity or alt 0 to completely remove text in ' + ipsumJs.config.htmlTags + ' tags');
    ipsumJs.keybindings();
}

ipsumJs.keybindings = function() {
    document.onkeydown = function(key) {
        var ALT_PRESSED   = key.altKey;
        var PLUS_PRESSED  = key.keyIdentifier === "U+00BB" ? true : false;
        var MINUS_PRESSED = key.keyIdentifier === "U+00BD" ? true : false;
        var ZERO_PRESSED  = key.keyIdentifier === "U+0030" ? true : false;
        
        if (ALT_PRESSED && PLUS_PRESSED) {
            ipsumJs.moreText();
            return;
        }
        if (ALT_PRESSED && MINUS_PRESSED) {
            ipsumJs.lessText();
            return;
        }
        if (ALT_PRESSED && ZERO_PRESSED) {
            ipsumJs.clearText(); 
            return;
        }
    }
}

ipsumJs.moreText = function() {
    for (var i = 0; i < ipsumJs.config.htmlTags.length; i++) {
        var textElems = document.getElementsByTagName(ipsumJs.config.htmlTags[i]);
        for (var ii=0; ii < textElems.length; ii++) {
            textElems[ii].textContent = textElems[ii].textContent + textElems[ii].textContent;
        }
    }
}

ipsumJs.lessText = function() {
    for (var i = 0; i < ipsumJs.config.htmlTags.length; i++) {
        var textElems = document.getElementsByTagName(ipsumJs.config.htmlTags[i]);
        for (var ii=0; ii < textElems.length; ii++) {
            var textLength = textElems[ii].textContent.length;
            textElems[ii].textContent = textElems[ii].textContent.substring(textLength*0.1, textLength);
        }
    }
}

ipsumJs.clearText = function() {
    for (var i = 0; i < ipsumJs.config.htmlTags.length; i++) {
        var textElems = document.getElementsByTagName(ipsumJs.config.htmlTags[i]);
        for (var ii=0; ii < textElems.length; ii++) {
            textElems[ii].textContent = '';
        }
    }
}


ipsumJs.init();
