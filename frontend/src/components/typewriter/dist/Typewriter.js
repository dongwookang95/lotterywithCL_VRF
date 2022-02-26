"use strict";
exports.__esModule = true;
var react_1 = require("react");
var typed_js_1 = require("typed.js");
var Typewriter = function (_a) {
    var text = _a.text, clasProps = _a.clasProps;
    var el = react_1.useRef();
    react_1.useEffect(function () {
        var typed = new typed_js_1["default"](el.current, {
            strings: text,
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 200,
            smartBackspace: true,
            loop: true,
            showCursor: false,
            cursorChar: '_'
        });
        return function () {
            typed.destroy();
        };
    }, []);
    return (React.createElement("p", { ref: el, className: "" + clasProps }));
};
exports["default"] = Typewriter;
