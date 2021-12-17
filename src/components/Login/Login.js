import React, {useState, useContext, useEffect} from 'react'
import {googleProvider} from '../../utils/authMethod'
import { getAuth, signInWithPopup } from "firebase/auth";
import {UserContext} from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PathContext} from '../../context/pathContext';


const Login= ()=> {
    const [nav, setNav]= useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const {path, setPath} =useContext(PathContext);
    const { user, isLoggedIn, authError, error, authErr, signIn } = useContext(UserContext);
    console.log({user, isLoggedIn, authError, error});
    const handleLogin = async(provider) => {
        await signInWithPopup(auth,provider).then(res=>{
            //console.log(res.user);
            toast.success(`${res.user.displayName} successfully logged in`,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              signIn(res.user);
              setNav(true);
            return res.user;
            }).catch(err=>{
                authErr(err.code);
                toast.error(`${err.code}. Try again`,{
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                  setNav(false);
                return err;
            });
        
    }

    useEffect(()=>{
      if(isLoggedIn){
          console.log('logged in');
          navigate("/dashboard");
          setPath('/dashboard');
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


    useEffect(()=>{
        if(isLoggedIn && nav){
            console.log('logged in');
            navigate("/dashboard");
            setPath('/dashboard');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoggedIn,nav]);
    return (
      
        <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover"/>
        </div>
      
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
              flex items-center justify-center">
          <div className="w-full h-100">
            <div className={`bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md ${authError?'visible':'invisible'}`} role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                        <p className="font-bold">{error}</p>
                        <p className="text-sm">Please correct the information and try again.</p>
                        </div>
                    </div>
                </div>
        
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>
      
            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input type="email" name="" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required />
              </div>
      
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                      focus:bg-white focus:outline-none" required />
              </div>
      
              <div className="text-right mt-2">
                <a href="www.google.com" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
              </div>
      
              <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                    px-4 py-3 mt-6">Log In</button>
            </form>
      
            <hr className="my-6 border-gray-300 w-full"/>
      
            <button type="button" onClick={()=>handleLogin(googleProvider)} className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
                  <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible"/></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                  <span className="ml-4">
                  Log in with Google</span>
                  </div>
                </button>
      
            <p className="mt-8">Need an account? <a href="www.google.com" className="text-blue-500 hover:text-blue-700 font-semibold">Create an account</a></p>
      
      
          </div>
        </div>
      
      </section>
    )
}

export default Login;
