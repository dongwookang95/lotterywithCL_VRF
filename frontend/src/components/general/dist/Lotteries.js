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
var react_1 = require("react");
var ethers_1 = require("ethers");
var axios_1 = require("axios");
var ethereum_svg_1 = require("../../images/ethereum.svg");
var Lotteries = function (_a) {
    var account = _a.account, setIsLoading = _a.setIsLoading, setCurrentBalance = _a.setCurrentBalance;
    var LotteryInfo = require('../../contracts/LotteryGame.json');
    var ABI = LotteryInfo.abi;
    var CONTRACT_ADDRESS = LotteryInfo.address;
    var _b = react_1.useState([]), lotteries = _b[0], setLotteries = _b[1];
    var _c = react_1.useState(null), contract = _c[0], setContract = _c[1];
    var _d = react_1.useState([]), txId = _d[0], setTxId = _d[1];
    var participate = function (id, price) { return __awaiter(void 0, void 0, void 0, function () {
        var ethereum, tx, receipt, ethBalanceHex, ethBalance, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    ethereum = window.ethereum;
                    return [4 /*yield*/, contract.participate(id, {
                            value: price
                        })];
                case 1:
                    tx = _a.sent();
                    setIsLoading(true);
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    receipt = _a.sent();
                    setIsLoading(false);
                    setTxId(receipt.transactionHash);
                    return [4 /*yield*/, ethereum.request({
                            method: 'eth_getBalance',
                            params: [account, 'latest']
                        })];
                case 3:
                    ethBalanceHex = _a.sent();
                    ethBalance = ethers_1.utils.formatEther(ethers_1.BigNumber.from(ethBalanceHex));
                    ethBalance = (+ethBalance).toFixed(4);
                    setCurrentBalance(ethBalance);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var web3render = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, reslotteries, ethereum, provider, signer, lotteryContract, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('render');
                        return [4 /*yield*/, axios_1["default"].get("http://localhost:8000/lotteries")];
                    case 1:
                        response = _a.sent();
                        reslotteries = response.data;
                        setLotteries(reslotteries);
                        ethereum = window.ethereum;
                        provider = new ethers_1.providers.Web3Provider(ethereum);
                        signer = provider.getSigner();
                        if (!contract) {
                            lotteryContract = new ethers_1.Contract(CONTRACT_ADDRESS, ABI, signer);
                            setContract(lotteryContract);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        web3render();
    }, [txId]);
    return (React.createElement("div", { className: "bg-[#0F0E13] p-8 flex-grow lg:mx-48" },
        React.createElement("h1", { className: "text-white text-2xl" }, "Available Lotteries"),
        React.createElement("div", { className: "grid md:grid-cols-2 gap-4 py-4 lg:grid-cols-3 justify-items-center" }, lotteries.length === 0 ? React.createElement("h1", { className: "text-white text-2xl" }, "No available lotteries :(")
            : lotteries.map(function (lottery, index) { return (React.createElement("div", { key: lottery.id, className: "relative bg-gradient-to-r from-gray-500 to-white-900 md:w-5/6 p-4 border-2 rounded-lg flex flex-col border-none text-white" },
                React.createElement("img", { src: ethereum_svg_1["default"], className: "absolute w-16 right-10 opacity-30", alt: "lotteries" }),
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("p", null, "Prize"),
                    React.createElement("p", { className: "text-2xl" },
                        ethers_1.utils.formatEther(ethers_1.BigNumber.from(lottery.prize)),
                        " ETH")),
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("p", null, "Until"),
                    React.createElement("p", { className: "text-2xl" },
                        new Date(lottery.enddate).toLocaleDateString(),
                        " ",
                        new Date(lottery.enddate).toLocaleTimeString())),
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("p", null, "Ticket Price"),
                    React.createElement("p", { className: "text-xl" },
                        ethers_1.utils.formatEther(ethers_1.BigNumber.from(lottery.ticketprice)),
                        " ETH")),
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement("button", { className: "bg-white disabled:bg-gray-400 max-w-fit rounded-md px-4 py-2 text-[#000000]", disabled: Date.now() > Date.parse(lottery.enddate), onClick: function () { participate(lottery.id, lottery.ticketprice); } }, "Participate")))); }))));
};
exports["default"] = Lotteries;
