import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComp from '../components/DashboardComp'
import Data from '../components/Data'
import DashNgo from '../components/DashNgo'
import Userngo from '../components/Userngo'
import ProgressofStudent from '../components/ProgressofStudent'
import DashStakeholder from '../components/DashStakeholder'
import StakeUserPro from '../components/StakeUserPro'
import NgoStudentpro from '../components/NgoStudentpro'
import Profiling from '../components/Profiling'
import Connectionofstud from '../components/Connectionofstud'
import DashStudent from '../components/DashStudent'
import Chat from '../components/Chat'
import Approval from '../components/Approval'
import Adminngo from '../components/Adminngo'
import AdminStakeholder from '../components/AdminStakeholder'
import Projects from '../components/Projects'
import Parentdashboard from '../components/Parentdashboard'
import Parentdash from '../components/Parentdash'
import Dashparent from '../components/Dashparent'
import Feedbackadmin from '../components/Feedbackadmin'
import Approvalngo from '../components/Approvalngo'
import Approvalstakeholder from '../components/Approvalstakeholder'



export default function Dashboard() {
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams  = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl)
            {
              setTab(tabFromUrl);
            }
  },[location.search])
  
  
  
  return <div className="min-h-screen flex flex-col md:flex-row">
    <div className='md:w-56'>
{/* sidebar*/}
<DashSidebar/>
    </div>
{tab === 'profile' && <DashProfile/>}
{tab === 'posts' && <DashPost/>}
{tab === 'users' && <DashUsers />}
{tab === 'comments' && <DashComments />}
{tab === 'dash' && <DashboardComp />}
{tab === 'data' && <Data />}
{tab === 'dashn' && <DashNgo />}
{tab === 'dashstakeholder' && <DashStakeholder/>}
{tab === 'userngo' && <Userngo />}
{tab === 'progressofstudent' && <ProgressofStudent />}
{tab === 'stakeholderstudentprogress' && <StakeUserPro />}
{tab === 'ngostudentprogress' && <NgoStudentpro />}
{tab === 'profiilingofstakeholder' && <Profiling />}
{tab === 'dashStudent' && <DashStudent />}
{tab === 'message' && <Chat />}
{tab === 'Approval' && <Approval />}
{tab === 'adminngo' && <Adminngo />}
{tab === 'adminstakeholder' && <AdminStakeholder />}
{tab === 'dashboardstudent' && <DashStudent />}
{tab === 'parentdash' && <Parentdash />}
{tab === 'projects' && <Projects />}
{tab === 'parentdashboard' && <Parentdashboard />}
{tab === 'dashparent' && <Dashparent />}
{tab === 'feedbackadmin' && <Feedbackadmin />}
{tab === 'approvalngo' && <Approvalngo />}
{tab === 'approvalstakeholder' && <Approvalstakeholder />}

  </div>
}
