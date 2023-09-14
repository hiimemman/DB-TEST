import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function NavBar(){

  const navigate = useNavigate();
  
    async function Check(){

        try{

            const request = await fetch("http://localhost:3000/check-auth",
            {
              method: 'GET', // or other HTTP methods
              credentials: 'include', // Include cookies
            })
    
            if(request.status === 401 || request.status ===500){
                navigate('/login')
            }

        }catch(e){
            navigate('/login')
        }
             
    }


  useEffect(() =>{

    Check();
    return () =>{

    }

  },[])
   
  const handleLogout = () =>{

  }

    return(
        <>
        
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="login" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page" onClick ={handleLogout} >Log out</a>
        </li>
      
      </ul>
    </div>
  </div>
</nav>

        </>
    )

}