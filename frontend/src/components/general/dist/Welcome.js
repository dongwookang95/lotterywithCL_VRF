"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Typewriter_1 = require("../typewriter/Typewriter");
var Welcome = function () {
    var gridStyle = "flex justify-center items-center px-8 py-8 border-white-700/50 border-4";
    var _a = react_1.useState(['Is BlockChain boring?', 'Be a Player', 'Play with it.', 'Don\'t get bored, Play and have fun!']), catchPhrases = _a[0], setCatchphrases = _a[1];
    return (React.createElement("div", { className: "w-full md:h-96 flex justify-center text-white flex-col md:flex-row" },
        React.createElement("div", { className: "w-full md:h-full h-96 px-8 py-8 justify-items-center" },
            React.createElement(Typewriter_1["default"], { text: catchPhrases, clasProps: "m-auto md:w-96 text-6xl text-center md:text-left" })),
        React.createElement("div", { className: "flex justify-center items-center w-full px-8 py-8" },
            React.createElement("div", { className: "grid grid-cols-3 h-32" },
                React.createElement("div", { className: "rounded-tl-xl " + gridStyle }, "Web3"),
                React.createElement("div", { className: "" + gridStyle }, "Blockchain"),
                React.createElement("div", { className: "rounded-tr-xl " + gridStyle }, "Hardhat"),
                React.createElement("div", { className: "rounded-bl-xl " + gridStyle }, "Typescript"),
                React.createElement("div", { className: "" + gridStyle }, "Solidity"),
                React.createElement("div", { className: "rounded-br-xl " + gridStyle }, "Chainlink")))));
};
exports["default"] = Welcome;
