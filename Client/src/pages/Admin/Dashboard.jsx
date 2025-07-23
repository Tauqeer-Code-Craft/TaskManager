import React, {useContext,useEffect,useState} from 'react'
import { useUserAuth} from "../../hooks/useUserAuth"
import DasboardLayout from '../../components/layouts/DasboardLayout';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import {moment} from 'moment'

const Dashboard = () => {

  useUserAuth();
  const { user} = useContext(UserContext);
  const navigate = useNavigate();

  const [DashboardData , setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );

      if (response.data){
        setDashboardData(response.data);
      }

    } catch (error) {
      console.error("Error fetching users:",error);
    }
  }

  useEffect(()=>{
    getDashboardData();

    return ()=> {};
  },[])


  return (
    <DasboardLayout activeMenu="Dashboard" >
      <div className='card my-5'>
        <div>
          <div className='col-span-3'>
            <h2 className='text-xl md:text-2xl'>Good Day! {user.name}</h2>
            <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
              {moment().format("dddd Do MMM YYYY")}</p>
          </div>
        </div>
      </div>
    </DasboardLayout>
  )
}

export default Dashboard