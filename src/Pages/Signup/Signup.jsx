import "./Signup.css"
import {baseurl} from "../../utils/apiCalls"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import axios from "axios";

export default function Signup(){

    const {loginHandler} = useAuth();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function SignUpHandler(name, username, email, password){
        try{
            const response = await axios.post(`${baseurl}/api/users/signup`,{
                name: name, email: email, username: username, password: password
            },{
                headers:{
                    ContentType: "application/json",
                },
            });
            if(response.status === 200){
                // console.log(username, password)
                return loginHandler(username, password)
            }
        }
        catch(error){
            // console.log(error.response);   
        }
    }



    return(
        <div className="signup-layout relative h-full flex justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
            <div className="signup-box border-2 pt-4 w-96 pb-4 pr-8 pl-8 rounded-lg flex flex-col justify-center">
                    <p className="text-4xl text-bold uppercase mb-4 text-white">Sign up</p>
                    <input className="signup-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
                    <input className="signup-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Username" onChange={(event)=>setUsername(event.target.value)}/>
                    <input className="signup-field mt-4 mb-4 8-2 m82 w-full p-2 hover:bg-grey-100" placeholder="Email" type="email" onChange={(event)=>setEmail(event.target.value)}/>
                    <input className="signup-field mt-4 mb-4 ml-2 mr-2 w-full p-2 hover:bg-grey-100" placeholder="Password" type="password" onChange={(event)=>setPassword(event.target.value)}/>
            <button className="signup-btn p-2 bg-white w-1/2 text-l rounded-lg border-solid border-2 border-transparent font-bold text-black hover:bg-purple-700 hover:text-white hover:border-white uppercase" onClick={()=>SignUpHandler(name, username, email, password)}>Sign up</button>

            </div>
        </div>
    );
}