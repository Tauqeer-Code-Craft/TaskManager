import React,{useState,useContext} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelecter from '../../components/Inputs/ProfilePhotoSelecter';
import Input from '../../components/Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import {validateEmail} from '../../utils/helper';
import  axiosInstance  from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import  uploadImage  from '../../utils/uploadImage';
import {UserContext} from '../../context/userContext';


const Signup:React.FC = () => {

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName,setFullName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [adminInviteToken, setAdminInviteToken] = useState<string>("");

  const [error,setError] = useState<string|null>(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();

      let profileImageUrl:string = ""
  
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!fullName) {
        setError("Please enter full name.");
        return;
      }
  
      if (!password) {
        setError("please enter the password.")
        return;
      }
  
      setError("");
  
      //SignUp API Call
      
      try {
        
        //Upload image if present 
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || "";


        const response = await axiosInstance.post(API_PATHS.AUTH.RESGISTER,{
          name: fullName,
          email,
          password,
          profileImageUrl,
          adminInviteToken
        });

        const {token,role} = response.data;

        if(token){
          localStorage.setItem("token",token);
          updateUser(response.data)

          //Redirect based on role
          if(role === "admin"){
            navigate("/admin/dashboard");
          }else{
            navigate("/user/dashboard")
          }
        }

      } catch (error:any) {
        if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else{
        setError("Something went wrong. Please try again.");
      }
      }


    }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelecter image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            value={fullName}
            onChange={({target}:React.ChangeEvent<HTMLInputElement>)=> setFullName(target.value)}
            label="Full Name"
            placeholder='John'
            type='text'
            ></Input>

            <Input
            value={email}
            onChange= {({target}: React.ChangeEvent<HTMLInputElement>)=> setEmail(target.value)}
            label = "Email Address"
            placeholder= "john@example.com"
            type="text"
          ></Input>

          <Input
            value={password}
            onChange= {({target}: React.ChangeEvent<HTMLInputElement>)=> setPassword(target.value)}
            label = "Password"
            placeholder= "Min 8 Characters"
            type="password"
          ></Input>
          
          <Input
            value={adminInviteToken}
            onChange= {({target}: React.ChangeEvent<HTMLInputElement>)=> setAdminInviteToken(target.value)}
            label = "Admin Invite Token"
            placeholder= "6 Digit Code"
            type="text"
          ></Input>


            </div>

            {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

            <button type='submit' className='btn-primary '>
            SIGNUP
            </button>

            <p className='text-[13px] text-slate-800 mt-30'>
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>

        </form>

      </div>
    </AuthLayout>
  )
}

export default Signup