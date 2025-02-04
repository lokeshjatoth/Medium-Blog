import { SignupInput, SigninInput } from "@jatoth_lokesh/medium1-common"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"



type AuthProps = {
    type: "signup" | "signin";
};

type AuthInputs = SignupInput | SigninInput;

const Auth = ({type}: AuthProps) => {

    const initialState: AuthInputs =
    type === "signup"
      ? { name: "", email: "", password: "" } // SignupInput
      : { email: "", password: "" }; // SigninInput

    const [postInputs, setPostInputs] = useState<AuthInputs>(initialState);
    const navigate = useNavigate();

    const changeHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setPostInputs(c => ({
            ...c, [e.target.name] : e.target.value
        }))
    }

    const submitHandler = async(event: React.FormEvent) => {
        event.preventDefault(); // Prevent page refresh
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type}`, 
                postInputs,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const {jwt} = response.data;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            console.log(jwt);
            navigate("/blogs")
        } catch (error) {
            alert("Error while signing");
            console.log(error);
        }
        

    };

  return (
    <div className="flex justify-center h-screen items-center">
        {/* {JSON.stringify(postInputs)} */}
        <div className="w-full bg-white md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
                <h1 className="text-3xl font-bold text-center">
                  {type==="signup" ? "Create an account" : "Login to your Account"}
                </h1>
                <p className="text-md text-gray-500 dark:text-gray-400 text-center mt-2">
                    {type==="signup"? "Already have an account?":"Don't Have an account?"} <Link to={type === "signup"? "/signin": "/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500 underline">{type==="signup"? "Login": "Sign up"}</Link>
                </p>
            </div>
              
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                    {
                        type === "signup" ? <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full name</label>
                            <input type="text" name="name" id="name" placeholder="Jatoth Lokesh" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} onChange={changeHandler}/>
                        </div> : null
                    }
                  
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@gmail.com" required={true} onChange={changeHandler}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} onChange={changeHandler}/>
                  </div>
                  
                  <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full hover:cursor-pointer">{type === "signup" ? "Sign up": "Sign In"}</button>
                  
              </form>
          </div>
      </div>
    </div>
    
  )
}

export default Auth