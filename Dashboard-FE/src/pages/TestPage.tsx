import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function TestPage(){

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    async function CheckIfAuth(){

        try{

            const request = await fetch('http://localhost:3000/check-auth')
    
            if(request.status === 401 || request.status ===500){
                navigate('/login')
            }


        }catch(e){
            console.log("ters")
            navigate('/login')
        }
             
    }

    useEffect(() =>{
        CheckIfAuth()

        return () =>{
            setIsLoading(false);   
        }
    }, [])

    return(<>
    {isLoading ? (<></>) : 
    (<p className="text-8xl text-slate-600">HELLO WORLD</p>)
    }
   
    </>)

}