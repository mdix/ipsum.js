var ipsumJs = {};
ipsumJs.config = {};
ipsumJs.config.htmlTags = ['a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'span'];
ipsumJs.config.ipsumElems = ['Sed','ut','perspiciatis','unde','omnis','iste','natus','error','sit','voluptatem','accusantium','doloremque','laudantium,','totam','rem','aperiam,','eaque','ipsa','quae','ab','illo','inventore','veritatis','et','quasi','architecto','beatae','vitae','dicta','sunt','explicabo.','Nemo','enim','ipsam','voluptatem','quia','voluptas','sit','aspernatur','aut','odit','aut','fugit,','sed','quia','consequuntur','magni','dolores','eos','qui','ratione','voluptatem','sequi','nesciunt.','Neque','porro','quisquam','est,','qui','dolorem','ipsum','quia','dolor','sit','amet,','consectetur,','adipisci','velit,','sed','quia','non','numquam','eius','modi','tempora','incidunt','ut','labore','et','dolore','magnam','aliquam','quaerat','voluptatem.','Ut','enim','ad','minima','veniam,','quis','nostrum','exercitationem','ullam','corporis','suscipit','laboriosam,','nisi','ut','aliquid','ex','ea','commodi','consequatur?','Quis','autem','vel','eum','iure','reprehenderit','qui','in','ea','voluptate','velit','esse','quam','nihil','molestiae','consequatur,','vel','illum','qui','dolorem','eum','fugiat','quo','voluptas','nulla','pariatur?','At','vero','eos','et','accusamus','et','iusto','odio','dignissimos','ducimus','qui','blanditiis','praesentium','voluptatum','deleniti','atque','corrupti','quos','dolores','et','quas','molestias','excepturi','sint','occaecati','cupiditate','non','provident,','similique','sunt','in','culpa','qui','officia','deserunt','mollitia','animi,','id','est','laborum','et','dolorum','fuga.','Et','harum','quidem','rerum','facilis','est','et','expedita','distinctio.','Nam','libero','tempore,','cum','soluta','nobis','est','eligendi','optio','cumque','nihil','impedit','quo','minus','id','quod','maxime','placeat','facere','possimus,','omnis','voluptas','assumenda','est,','omnis','dolor','repellendus.','Temporibus','autem','quibusdam','et','aut','officiis','debitis','aut','rerum','necessitatibus','saepe','eveniet','ut','et','voluptates','repudiandae','sint','et','molestiae','non','recusandae.','Itaque','earum','rerum','hic','tenetur','a','sapiente','delectus,','ut','aut','reiciendis','voluptatibus','maiores','alias','consequatur','aut','perferendis','doloribus','asperiores','repellat.'];
ipsumJs.config.keyCodes = {};
ipsumJs.config.keyCodes.plus = {"main": 187, "numPad": 107};
ipsumJs.config.keyCodes.minus = {"main": 189, "numPad": 109};
ipsumJs.config.keyCodes.zero = {"main": 48, "numPad": 96};

ipsumJs.init = function() {
    // because firefox uses different key codes for the _/- and +/= keys to all other browsers :-(
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        ipsumJs.config.keyCodes.plus.main = 61;
        ipsumJs.config.keyCodes.minus.main = 173;
    }

    ipsumJs.keybindings();
    
    console.log('ipsum.js loaded, use alt+ or alt- to increase / decrease text quantity' +
                'or alt 0 to completely remove text in ' + ipsumJs.config.htmlTags + ' tags');
}

ipsumJs.keybindings = function() {
    document.onkeydown = function(key) {
        var keyCodes = ipsumJs.config.keyCodes;
        var ALT_PRESSED   = key.altKey;
        var PLUS_PRESSED  = (key.keyCode === keyCodes.plus.main || key.keyCode === keyCodes.plus.numPad);
        var MINUS_PRESSED = (key.keyCode === keyCodes.minus.main || key.keyCode === keyCodes.minus.numPad);
        var ZERO_PRESSED  = (key.keyCode === keyCodes.zero.main || key.keyCode === keyCodes.zero.numPad);
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
        for (var ii = 0; ii < textElems.length; ii++) {
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
    var textLength = textElem.innerHTML.length;
    textElem.innerHTML = ipsumJs.getRandomIpsumElement() + '    ' + textElem.innerHTML;
}

ipsumJs.lessText = function(textElem) {
    var lastSpaceInElemsText = textElem.innerHTML.lastIndexOf(" ");
    textElem.innerHTML = textElem.innerHTML.substring(0, lastSpaceInElemsText);
}

ipsumJs.clearText = function(textElem) {
    textElem.innerHTML = '';
}

ipsumJs.getRandomIpsumElement = function() {
    var numberOfIpsumElems = ipsumJs.config.ipsumElems.length - 1;
    return ipsumJs.config.ipsumElems[Math.floor(Math.random() * numberOfIpsumElems)];
}

ipsumJs.init();