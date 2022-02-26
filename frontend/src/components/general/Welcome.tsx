import { useState } from "react"
import Typewriter from "../typewriter/Typewriter"




const Welcome = () => {
    const gridStyle = "flex justify-center items-center px-8 py-8 border-white-700/50 border-4"
    const [catchPhrases, setCatchphrases] = useState(['Is BlockChain boring?','Be a Player','Play with it.','Don\'t get bored, Play and have fun!'])

    return(
        <div className="w-full md:h-96 flex justify-center text-white flex-col md:flex-row">
            <div className="w-full md:h-full h-96 px-8 py-8 justify-items-center">
                <Typewriter text={catchPhrases} clasProps="m-auto md:w-96 text-6xl text-center md:text-left"/>
            </div>
            <div className="flex justify-center items-center w-full px-8 py-8">
                <div className="grid grid-cols-3 h-32">
                    <div className={`rounded-tl-xl ${gridStyle}`}>Web3</div>
                    <div className={`${gridStyle}`}>Blockchain</div>
                    <div className={`rounded-tr-xl ${gridStyle}`}>Hardhat</div>
                    <div className={`rounded-bl-xl ${gridStyle}`}>Typescript</div>
                    <div className={`${gridStyle}`}>Solidity</div>
                    <div className={`rounded-br-xl ${gridStyle}`}>Chainlink</div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;