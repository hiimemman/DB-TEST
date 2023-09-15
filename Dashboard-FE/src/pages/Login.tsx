import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Login() : JSX.Element{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate  = useNavigate();


    

    async function handleSubmit(event :  React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        try{
            console.log(email)
            console.log(password)
            
            const data = {"email" : email, "hashed_password" : password}
    
            const request = await fetch("http://localhost:3000/api/login",{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(data),
            })
    
            const response = await request.json();
            console.log("Response : ",response)
            if(response.responseStatus === 200){
                 navigate('/dashboard')
                //Test();
            }else{
                toast("Wrong Email or Password")
            }
            
        }catch(e){
            console.log("ERROR: ",e);
        }
       

    }

   
    const handleChangeEmail = (event :  React.ChangeEvent<HTMLInputElement> ) =>{
        setEmail(event.target.value);
    }
    
    const handleChangePassword = (event :  React.ChangeEvent<HTMLInputElement> )=>{
        setPassword(event.target.value);
    }
    return(
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Dashboard Test
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Log In
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required onChange={handleChangeEmail}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChangePassword}/>
                        </div>
                       
            
                        <button type="submit" className ="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log In</button>
                    </form>
                </div>
            </div>
        </div>
      </section>
      <ToastContainer />
      </>
    )

}