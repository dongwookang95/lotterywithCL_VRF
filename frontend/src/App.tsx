import { useState, useEffect } from 'react'
import { Navbar, Welcome, Footer } from './components/general'
import Lotteries from './components/general/Lotteries';
import {Modal} from './components/modal/Modal'
import Spinner from './components/spinner/Spinner'


function App() {

  const [currentAccount, setCurrentAccount] = useState<any>();
  const [currentBalance, setCurrentBalance] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const checkNetwork = async() => {
    console.log("Checking network...")
    try{
      const {ethereum} = window;
      if(currentAccount && ethereum.networkVersion !== '4'){
        setModalIsOpen(true);
      }
    } catch(error){
      console.log(error);
      
    }
  }

  const renderSpinner = () =>{
    return(isLoading && <Spinner/>)
  }

  const switchNetwork = async ()=>{
      console.log('swtiching network..')
      try{
        const {ethereum} = window;
        //check if current account is in Rinkeby
        if (currentAccount && ethereum.networkVersion !== '4'){
          setModalIsOpen(true);
        }
      } 
      catch(error){
        console.log(error)
    }
    }
  
    useEffect(() => {
      checkNetwork()
    }, [currentAccount])
  
  

  return (
    <div className="flex flex-col">
      {renderSpinner()}
      <div className="gradient-bg-welcome">
        <Navbar 
        account={currentAccount}
        setCurrentAccount={setCurrentAccount}
        balance={currentBalance}
        setCurrentBalance={setCurrentBalance}/>
        <Welcome/>
        </div>
        <Lotteries
        account={currentAccount}
        setIsLoading={setIsLoading}
        setCurrentBalance={setCurrentBalance}/>
        <Footer/>
      <Modal open={modalIsOpen} setModalIsOpen={setModalIsOpen} callback={switchNetwork}/>
    </div>
    
  );
}

export default App;
