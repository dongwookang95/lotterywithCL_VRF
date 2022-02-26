import {SetStateAction, useEffect, useState} from "react"
import {BigNumber,utils, Contract, providers } from 'ethers';
import axios from 'axios';
import ethereumLogo from '../../images/ethereum.svg';

// The json file shdn't be imported directly. 
// import { abi as ABI, address as CONTRACT_ADDRESS } from '../../contracts/LotteryGame.json' 

type Dispatch<A> = (value:A) =>void;

const Lotteries = ({account, setIsLoading, setCurrentBalance}:{account:String|null, setIsLoading:Dispatch<SetStateAction<boolean>>, setCurrentBalance: Dispatch<SetStateAction<any>>}) => {
    const LotteryInfo = require('../../contracts/LotteryGame.json')
    const ABI = LotteryInfo.abi;
    const CONTRACT_ADDRESS = LotteryInfo.address;
    const [lotteries, setLotteries] = useState<any[]>([]);
    const [contract, setContract] = useState<any | {participate:any}>(null);
    const [txId, setTxId] = useState<any[]>([]);
    const participate = async(id:string, price:string) =>{
        try {
            const { ethereum } = window;        
            const tx = await contract.participate(id,{
                value:price
            });
            setIsLoading(true);
            const receipt = await tx.wait();
            setIsLoading(false);
            setTxId(receipt.transactionHash);

            const ethBalanceHex = await ethereum.request({
                method:'eth_getBalance',
                params: [account, 'latest'],
            })
            let ethBalance = utils.formatEther(BigNumber.from(ethBalanceHex));
            ethBalance = (+ethBalance).toFixed(4);
            setCurrentBalance(ethBalance);
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() =>{
        const web3render = async() => {
        try{
            console.log('render');
            const response = await axios.get("http://localhost:8000/lotteries");
            const reslotteries = response.data;
            setLotteries(reslotteries);

            const { ethereum } = window;
            const provider = new providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            if(!contract){
                const lotteryContract = new Contract(CONTRACT_ADDRESS,ABI,signer);
                setContract(lotteryContract);
            }
            } catch(error){
                console.error(error);
        }
    }
    web3render();
    },[txId])

    return(
        <div className="bg-[#0F0E13] p-8 flex-grow lg:mx-48">
        <h1 className="text-white text-2xl" >Available Lotteries</h1>
        <div className="grid md:grid-cols-2 gap-4 py-4 lg:grid-cols-3 justify-items-center">
            {lotteries.length === 0 ? <h1 className="text-white text-2xl">No available lotteries :(</h1>
            : lotteries.map((lottery:{id:string, prize: number, enddate:string, ticketprice:string},index)=>(
                <div key={lottery.id} className="relative bg-gradient-to-r from-gray-500 to-white-900 md:w-5/6 p-4 border-2 rounded-lg flex flex-col border-none text-white">
                    <img src={ethereumLogo} className="absolute w-16 right-10 opacity-30" alt="lotteries"/>
                    <div className="flex flex-col"><p>Prize</p><p className="text-2xl">{utils.formatEther(BigNumber.from(lottery.prize))} ETH</p></div>
                    <div className="flex flex-col"><p>Until</p><p className="text-2xl">{new Date(lottery.enddate).toLocaleDateString()} {new Date(lottery.enddate).toLocaleTimeString()}</p></div>
                    <div className="flex flex-col"><p>Ticket Price</p><p className="text-xl">{utils.formatEther(BigNumber.from(lottery.ticketprice))} ETH</p></div>
                    <div className="flex justify-center">
                    <button className="bg-white disabled:bg-gray-400 max-w-fit rounded-md px-4 py-2 text-[#000000]"
                        disabled={ Date.now() > Date.parse(lottery.enddate)}
                        onClick={()=>{participate(lottery.id,lottery.ticketprice)}}>Participate</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )

}

export default Lotteries;