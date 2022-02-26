import { useEffect, useRef } from "react"
import * as Jazzicon from "@metamask/jazzicon";


const AccountIcon = ({account}:{account:string})=>{
    const ref = useRef<any>();
    useEffect(() =>{
        try{
            console.log("This is account in AccountIcon : ", account)
        if(account !==null && ref.current !== null){
            ref.current.innerHTML = "";
            ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
            
        }
    }catch(error){
            console.log("Errors are occuring while it is calling AccountIcon")
            console.log(error)
        }
    },[account]);
    return( <div ref={ref} className="h-full mx-1 rounded-t-3xl"></div> )
}

export default AccountIcon