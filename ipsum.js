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
            ipsumJs.manipulateText('more');
            return;
        }
        if (ALT_PRESSED && MINUS_PRESSED) {
            ipsumJs.manipulateText('less');
            return;
        }
        if (ALT_PRESSED && ZERO_PRESSED) {
            ipsumJs.manipulateText('clear'); 
            return;
        }
    }
}

ipsumJs.manipulateText = function(operation) {
     for (var i = 0; i < ipsumJs.config.htmlTags.length; i++) {
        var textElems = document.getElementsByTagName(ipsumJs.config.htmlTags[i]);
        for (var ii=0; ii < textElems.length; ii++) {
            if (operation === 'more') {
                ipsumJs.moreText(textElems[ii]);
                continue;
            }
            if (operation === 'less') {
                ipsumJs.lessText(textElems[ii]); 
                continue;
            }
            if (operation === 'clear') {
                ipsumJs.clearText(textElems[ii]); 
                continue;
            }
        }
     } 
}

ipsumJs.moreText = function(textElem) {
    textElem.textContent = textElem.textContent + textElem.textContent;
}

ipsumJs.lessText = function(textElem) {
    var textLength = textElem.textContent.length;
    textElem.textContent = textElem.textContent.substring(textLength*0.1, textLength);
}

ipsumJs.clearText = function(textElem) {
    textElem.textContent = '';
}

ipsumJs.init();
