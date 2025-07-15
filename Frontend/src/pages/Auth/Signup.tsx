import React,{useState} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

const Signup:React.FC = () => {

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullname,setFullName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [adminInviteToken, setAdminInviteToken] = useState<string>("");

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

      </div>
    </AuthLayout>
  )
}

export default Signup