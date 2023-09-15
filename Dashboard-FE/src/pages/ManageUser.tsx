import { NavBar } from "../components/NavBar"
import {useEffect , useState, FormEvent} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IUser {
    _id: string,
    fullname: string,
    email: string,
    hashed_password: string,
    access_token: null
}

export default function ManageUser(){

    const initialState = {
        _id: "1",
        email: "",
        fullname: "",
        hashed_password: "",
        access_token: null,
    }

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser]  = useState(initialState);

    const [isEdit, setIsEdit] = useState(false);

    const [updatedEmail, setUpdatedEmail] = useState("");

    const [updatedFullname, setUpdatedFullname] = useState("");

    const [isDelete, setDelete] = useState(false);

    const [deleteUserId, setDeleteUserId] = useState('');

    const [isAddUser, setIsAddUser] = useState(false);

    const [email ,setEmail] = useState('');

    const [fullname, setFullname] = useState('');

    const [password, setPassword] = useState('');

    const [confirmed_password, setConfirmedPassword] = useState('');

    async function GetAllUser(){
        try{

            const request = await fetch('http://localhost:3000/api/user',{
                method: 'GET',
                credentials: 'include',   
            })

            const response = await request.json();
            
            if(response.responseStatus === 200){
                //console.log(response.responseContent)
                setUsers(response.responseContent);

            }
        }catch(e){
            console.log(e)
        }
      
    }
    
    useEffect(() =>{

        GetAllUser();

        return () =>{

        }
    },[])

    

    const handleEditModal = (user : IUser) =>{

       setSelectedUser(user)
       setFullname(user.fullname)
       setEmail(user.email);
    }

    const handleDeleteModal = (id : string) =>{
        setDelete(true)
        setDeleteUserId(id)
    }
    const handleCloseModal = () =>{
        setSelectedUser(initialState)
        setIsEdit(false);
    }

    const handleCloseModalDelete = () =>{
        setDeleteUserId('');
        setDelete(false);
    }

    const handleCloseAddUserModal = () =>{
        setIsAddUser(false);
        setConfirmedPassword('');
        setEmail('');
        setFullname('');
        setPassword('');
    }


    const handleSubmitEdit = async () => {

        const data = {...selectedUser, fullname: updatedFullname, email: updatedEmail}
        
        try{
            const request = await fetch('http://localhost:3000/api/user/'+selectedUser._id,{
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include', 
                body:  JSON.stringify(data)
            })
    
            const response = await request.json();
            
            console.log(response)
            if(response.responseContent === 200){
                GetAllUser();
                toast(response.responseContent)
                handleCloseModal();
            }else{
                toast(response.responseContent)
            }
        }catch(e){
            toast("Error in update: error " + e)
        }

    }

    const handleSubmitDelete = async () =>{

        try{
            const request = await fetch('http://localhost:3000/api/user/'+deleteUserId,{
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include', 
            })
    
            const response = await request.json();
            

            if(response.responseStatus === 200){
              GetAllUser();
                handleCloseModalDelete();
                toast(response.responseContent)
            }else{
                toast(response.responseContent)
            }
        }catch(e){
            toast("Error in update: error " + e)
        }

    }

    const handleSubmitNewUser = async (event : FormEvent<HTMLFormElement>) =>{
        event?.preventDefault();

        try{
            const data = {"fullname" : fullname, "email": email, "hashed_password" : password}
            const request = await fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include', 
                body:  JSON.stringify(data)
            })

            const response = await request.json();

            if(response.responseStatus === 200){
                GetAllUser();
                toast(response.responseContent)
                handleCloseAddUserModal();
            }else{

                toast(response.responseContent)
            }

        }catch(e){
            toast("Error in adding a new user "+ e)
        }
    }

    useEffect(() =>{

      console.log(users)

      return () =>{}
  },[users, isEdit, isDelete, deleteUserId, isAddUser, email, fullname, password, confirmed_password])



    return(
        <>
        <NavBar >

        {isAddUser ? (
               <div
               tabIndex={-1}
               aria-hidden="true"
               className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-opacity-80 bg-black"
             >
               <div className="relative w-full max-w-md">
                 <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                   <button
                     type="button"
                     className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                     data-modal-hide="authentication-modal"
                     onClick = {handleCloseAddUserModal}
                   >
                     <svg
                       className="w-3 h-3"
                       aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 14 14"
                     >
                       <path
                         stroke="currentColor"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth="2"
                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                       />
                     </svg>
                     <span className="sr-only">Close modal</span>
                   </button>
                   <div className="px-6 py-6 lg:px-8">
                     <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                       Add User
                     </h3>
                     <form className="space-y-6" onSubmit={handleSubmitNewUser} >
                     <div>
                         <label
                           htmlFor="fullname"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Full name
                         </label>
                         <input
                           type="text"
                           name="fullname"
                           id="fullname"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  text-white"
                           placeholder={"Enter your full name here"}
                           value ={fullname}
                           onChange= {(event) => {setFullname(event.target.value)}}
                           required
                         />
                       </div>
                       <div>
                         <label
                           htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Email
                         </label>
                         <input
                           type="email"
                           name="email"
                           id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  text-white"
                           placeholder={"Enter your email here"}
                           value ={email}
                           required
                           onChange={(event) => {
                             setEmail(event.target.value)
                           }}
                         />
                       </div>

                       <div>
                         <label
                           htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Password
                         </label>
                         <input
                           type="password"
                           name="password"
                           id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  text-white"
                           placeholder={"Enter your password here"}
                           value ={password}
                           required
                           onChange={(event) => {
                             setPassword(event.target.value)
                           }}
                         />
                       </div>
 
                        
                        
                       <div>
                         <label
                           htmlFor="confirm_password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Confirm Password
                         </label>
                         <input
                           type="confirm_password"
                           name="confirm_password"
                           id="confirm_password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  text-white"
                           placeholder={"Confirm your password"}
                           value ={confirmed_password}
                           required
                           onChange={(event) => {
                             setConfirmedPassword(event.target.value)
                           }}
                         />
                       </div>

                       <button
                         type ="submit"
                         className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                       >
                         Save
                       </button>

                     </form>
                   </div>
                 </div>
               </div>
             </div>
        ) : (<></>)
        }

        {selectedUser._id === "1" ? (<></>) : ( 
                 <div
                 tabIndex={-1}
                 aria-hidden="true"
                 className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-opacity-80 bg-black"
               >
                 <div className="relative w-full max-w-md">
                   <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                     <button
                       type="button"
                       className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                       data-modal-hide="authentication-modal"
                       onClick = {handleCloseModal}
                     >
                       <svg
                         className="w-3 h-3"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 14 14"
                       >
                         <path
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                         />
                       </svg>
                       <span className="sr-only">Close modal</span>
                     </button>
                     <div className="px-6 py-6 lg:px-8">
                       <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                         Edit User
                       </h3>
                       <form className="space-y-6" onSubmit ={handleSubmitEdit} >
                       <div>
                           <label
                             htmlFor="fullname"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                             Full name
                           </label>
                           <input
                             disabled ={!isEdit}
                             type="text"
                             name="fullname"
                             id="fullname"
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  text-white"
                             placeholder={selectedUser.fullname}
                             value ={updatedFullname}
                             onChange= {(event) => {setUpdatedFullname(event.target.value)}}
                             required
                           />
                         </div>
                         <div>
                           <label
                             htmlFor="email"
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                           >
                             Email
                           </label>
                           <input
                         
                             disabled ={!isEdit}
                             type="email"
                             name="email"
                             id="email"
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  text-white"
                             placeholder={selectedUser.email}
                             value ={updatedEmail}
                             onChange={(event) => {
                               setUpdatedEmail(event.target.value)
                             }}
                             required
                           />
                         </div>
   
                       {isEdit ? ( <button
                           type ="submit"
                           className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                         >
                           Save
                         </button>) : (
                            <button
                            onClick={() =>{setIsEdit(true)}}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Edit
                          </button>
                         )}
                        
                       </form>
                     </div>
                   </div>
                 </div>
               </div>
        )}

        {isDelete ? (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div tabIndex={1} className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  onClick={handleCloseModalDelete}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <button
                    onClick={handleSubmitDelete}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>          
        ) : (<></>)}
 

    <div className="p-4  border-gray-200 rounded-lg dark:border-gray-700 mt-14">
    <button type="button" onClick = {() => setIsAddUser(true)}className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add User</button>

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   Full name
                </th>
                <th scope="col" className="px-6 py-3">
                   Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {users.map( (user : IUser) =>{
            return(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {user.fullname}
                </th>
                <td className="px-6 py-4">
                {user.email}
                </td>
                <td className="px-6 py-4">
                <button type="button" onClick={() => handleEditModal(user)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-l-xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View</button>
                <button type="button" onClick={() => handleDeleteModal(user._id)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-r-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Delete</button>
                </td>

                
            </tr>
            )
           } )}
        
        </tbody>
    </table>
</div>
            </div>
          </NavBar>
          <ToastContainer />
        </>
    )

   
}