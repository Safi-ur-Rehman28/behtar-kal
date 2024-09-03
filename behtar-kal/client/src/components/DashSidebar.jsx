import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          { currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}

             { currentUser.isNGO && (
            <Link to='/dashboard?tab=dashn'>
              <Sidebar.Item
                active={tab === 'dashn' || !tab}
                icon={HiChartPie}
                as='div'
              >
                NGO-Dashboard
              </Sidebar.Item>
            </Link>
          )}
           
           { currentUser.isNGO && (
            <Link to='/dashboard?tab=data'>
              <Sidebar.Item
                active={tab === 'data' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Report
              </Sidebar.Item>
            </Link>
          )}

{ currentUser.isNGO && (
            <Link to='/dashboard?tab=ngostudentprogress'>
              <Sidebar.Item
                active={tab === 'ngostudentprogress' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Student Avail items
              </Sidebar.Item>
            </Link>
          )}

{ currentUser.isNGO && (
            <Link to='/dashboard?tab=approvalngo'>
              <Sidebar.Item
                active={tab === 'approvalngo' || !tab}
                icon={HiChartPie}
                as='div'
              >
                 Approval Request
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={
                currentUser.isAdmin ? 'Admin' : (currentUser.isNGO ? 'NGO' : (currentUser.isStakeholder ? 'Stakeholder' : 'User'))
              }              
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
  
          { currentUser.isUser &&(<Link to='/dashboard?tab=progressofstudent'>
    <Sidebar.Item
      active={tab === 'progressofstudent'}
      icon={HiUser}
      labelColor='dark'
      as='div'
    >
  Request
    </Sidebar.Item>
  </Link>)}

  { currentUser.isUser &&(<Link to='/dashboard?tab=dashboardstudent'>
    <Sidebar.Item
      active={tab === 'dashboardstudent'}
      icon={HiUser}
      labelColor='dark'
      as='div'
    >
 Student Dashboard
    </Sidebar.Item>
  </Link>)}



  { currentUser.isParent &&(<Link to='/dashboard?tab=parentdashboard'>
    <Sidebar.Item
      active={tab === 'parentdashboard'}
      icon={HiUser}
      labelColor='dark'
      as='div'
    >
  Request
    </Sidebar.Item>
  </Link>)}
  { currentUser.isParent &&(<Link to='/dashboard?tab=dashparent'>
    <Sidebar.Item
      active={tab === 'dashparent'}
      icon={HiUser}
      labelColor='dark'
      as='div'
    >
  Approval
    </Sidebar.Item>
  </Link>)}

  { currentUser.isParent &&(<Link to='/dashboard?tab=parentdash'>
    <Sidebar.Item
      active={tab === 'parentdash'}
      icon={HiUser}
      labelColor='dark'
      as='div'
    >
 Parent Dashboard
    </Sidebar.Item>
  </Link>)}
 

          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=adminngo'>
                <Sidebar.Item
                  active={tab === 'adminngo'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Ngo
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=adminstakeholder'>
                <Sidebar.Item
                  active={tab === 'adminstakeholder'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Stakeholder
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=Approval'>
              <Sidebar.Item
                active={tab === 'Approval'}
                icon={HiDocumentText}
                as='div'
              >
                Approval
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=feedbackadmin'>
              <Sidebar.Item
                active={tab === 'feedbackadmin'}
                icon={HiDocumentText}
                as='div'
              >
                Feedbacks        </Sidebar.Item>
            </Link>
            </>
            
          )}

{ currentUser.isAdmin  && (
 <>
    <Link to='/dashboard?tab=users'>
      <Sidebar.Item
        active={tab === 'users'}
        icon={HiOutlineUserGroup}
        as='div'
      >
        Users
      </Sidebar.Item>
    </Link>
 </>
)}
 { currentUser.isStakeholder && (
            <Link to='/dashboard?tab=dashstakeholder'>
              <Sidebar.Item
                active={tab === 'dashstakeholder' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            
          )}
 { currentUser.isStakeholder && (
            <Link to='/dashboard?tab=approvalstakeholder'>
              <Sidebar.Item
                active={tab === 'approvalstakeholder' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Approve request
              </Sidebar.Item>
            </Link>
            
          )}

           { currentUser.isStakeholder && (
            <Link to='/dashboard?tab=projects'>
              <Sidebar.Item
                active={tab === 'projects' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Projects
              </Sidebar.Item>
            </Link>
            
          )}
          { currentUser.isStakeholder && (
            <Link to='/dashboard?tab=profiilingofstakeholder'>
              <Sidebar.Item
                active={tab === 'profiilingofstakeholder' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Donations 
              </Sidebar.Item>
            </Link>
            
          )}
 { currentUser.isStakeholder && (
<Link to='/dashboard?tab=stakeholderstudentprogress'>
            <Sidebar.Item
              active={tab === 'stakeholderstudentprogress' || !tab}
              icon={HiChartPie}
              as='div'
            >
              Student Progress
            </Sidebar.Item>
          </Link>)}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}