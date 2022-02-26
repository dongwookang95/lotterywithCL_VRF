"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var hi_1 = require("react-icons/hi");
var ai_1 = require("react-icons/ai");
var react_1 = require("react");
var AccountIcon_1 = require("../accounticon/AccountIcon");
var logo2_png_1 = require("../../images/logo2.png");
var NavbarItem = function (_a) {
    var title = _a.title, classProps = _a.classProps;
    return (React.createElement("li", { className: "mx-4 cursos-pointer " + classProps }, title));
};
var Navbar = function (_a) {
    var account = _a.account, setCurrentAccount = _a.setCurrentAccount, balance = _a.balance, setCurrentBalance = _a.setCurrentBalance;
    var _b = react_1.useState(false), toggleMenu = _b[0], setToogleMenu = _b[1];
    var connectWallet = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ethereum_1, accounts, ethBalanceHex, ethBalance_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    ethereum_1 = window.ethereum;
                    return [4 /*yield*/, ethereum_1.request({
                            method: 'eth_requestAccounts'
                        })];
                case 1:
                    accounts = _a.sent();
                    return [4 /*yield*/, ethereum_1.request({
                            method: 'eth_getBalance',
                            params: [accounts[0], 'latest']
                        })];
                case 2:
                    ethBalanceHex = _a.sent();
                    ethBalance_1 = ethers_1.utils.formatEther(ethers_1.BigNumber.from(ethBalanceHex));
                    ethBalance_1 = (+ethBalance_1).toFixed(4);
                    console.log('Connected', accounts[0]);
                    console.log('Balance', ethBalance_1);
                    setCurrentAccount(accounts[0]);
                    setCurrentBalance(ethBalance_1);
                    ethereum_1.on('accountsChanged', function (event_accounts) { return __awaiter(void 0, void 0, void 0, function () {
                        var newBalance;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    setCurrentAccount(event_accounts[0]);
                                    return [4 /*yield*/, ethereum_1.request({
                                            method: 'eth_getBalance',
                                            params: [event_accounts[0], 'latest']
                                        })];
                                case 1:
                                    newBalance = _a.sent();
                                    ethBalance_1 = ethers_1.utils.formatEther(ethers_1.BigNumber.from(newBalance));
                                    ethBalance_1 = (+ethBalance_1).toFixed(4);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var ethereum = window.ethereum;
        //eth objects are the same
        ethereum.on('chainChanged', function (chainId) { return __awaiter(void 0, void 0, void 0, function () {
            var newBalance, ethBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(account !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ethereum.request({
                                method: 'eth_getBalance',
                                params: [account, 'latest']
                            })];
                    case 1:
                        newBalance = _a.sent();
                        ethBalance = ethers_1.utils.formatEther(ethers_1.BigNumber.from(newBalance));
                        ethBalance = (+ethBalance).toFixed(4);
                        setCurrentBalance(ethBalance);
                        return [3 /*break*/, 3];
                    case 2:
                        console.log("No account");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }, [account]);
    return (React.createElement("div", { className: "w-full flex md:justify-center justify-between items-center p-4" },
        React.createElement("div", { className: "md:flex-[0.5] flex-initial justify-center items-center" },
            React.createElement("img", { src: logo2_png_1["default"], className: "w-32 cursor-pointer" })),
        React.createElement("ul", { className: "text-white md:flex hidden list-none flex-row justify-between items-center flex-initial" },
            ["Wallets", "Cards", "About Us"].map(function (item, index) { return (React.createElement(NavbarItem, { key: index, title: item, classProps: item })); }),
            !account ? (React.createElement("button", { className: "bg-[#868686] py-2 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#434343]", onClick: connectWallet }, "Connect your wallet"))
                : (React.createElement("div", { className: "flex items-center rounded-lg pl-2 bg-[#323131]" },
                    React.createElement(AccountIcon_1["default"], { account: account }),
                    React.createElement("div", { className: "align-middle" },
                        account.slice(0, 6),
                        "...",
                        account.slice(account.length - 4, account.length)),
                    React.createElement("div", { className: "rounded-r-lg ml-2 px-2 py-1 bg-[#111111]" },
                        balance,
                        " ETH")))),
        React.createElement("div", { className: "flex relative" },
            toggleMenu
                ? React.createElement(ai_1.AiOutlineClose, { fontSize: 28, className: "text-white md:hidden cursor-pointer", onClick: function () { return setToogleMenu(false); } })
                : React.createElement(hi_1.HiMenuAlt4, { fontSize: 28, className: "text-white md:hidden cursor-pointer", onClick: function () { return setToogleMenu(true); } }),
            toggleMenu && (React.createElement("ul", { className: "z-10 fixed top-0 -right-2 p-3 \n                    w-[70vw] h-screen shadow-2xl md:hidden\n                    list-none flex flex-col justify-start\n                    items-end rounded-md blue-glass text-white animate-slide-in" },
                React.createElement("li", { className: "text-xl w-full my-2" },
                    React.createElement(ai_1.AiOutlineClose, { onClick: function () { setToogleMenu(false); } })),
                ["Wallets", "Cards", "About Us"].map(function (item, index) { return (React.createElement(NavbarItem, { key: index, title: item, classProps: "my-2 text-lg" })); }))))));
};
exports["default"] = Navbar;
