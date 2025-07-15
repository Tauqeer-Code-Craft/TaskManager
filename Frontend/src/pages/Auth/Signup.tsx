import React,{useState, type FormEvent} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {validateEmail} from '../../utils/helper';
import ProfilePhotoSelecter from '../../components/Inputs/ProfilePhotoSelecter';


const Signup:React.FC = () => {

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullname,setFullName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [adminInviteToken, setAdminInviteToken] = useState<string>("");

  const [error,setError] = useState<string|null>(null);
  
  const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!fullname) {
        setError("Please enter full name.");
        return;
      }
  
      if (!password) {
        setError("please enter the password.")
        return;
      }
  
      setError("");
  
      //Login API Call
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </form>

      </div>
    </AuthLayout>
  )
}

export default Signup