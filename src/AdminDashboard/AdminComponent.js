import React , {useState , useEffect} from 'react';
import  './style/admin.css'
import Sidebar from './sidebar';
import AdmCnt from './AminContent/MainConetnt';
import Manager from './AminContent/Maneger';
import { useBreakpointValue } from '@chakra-ui/react';
import Settings from './Settings/Settings';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';
import AdmProject from './Project/AdminProjects';
import TaskTabel from '../pages/Tasks/TaskTable';
import UserMessages from '../pages/Tasks/PrivatTask';

function AdminComponent({  userData  , isLogged}) {
   const [isDarkMode , setIsdarkmode] = useState(false)
   const [dashboard , setDashboard] = useState(false)
   const [showUsersProject , setShowUsersProject] = useState(false)
   const[showClubs , setShowClubs] = useState(false)
   const[menu , setMenu] = useState(false)
   const[showProject , setShowProject] = useState(false)
   const [usersMng , setUserMng] = useState(false)
   const [settings , setSettings] = useState(false)
   const [events , setEvents] = useState(false)
   const isAdmin = userData[0].type === 'CEO' || userData[0].type === 'COO'
   const isMobileView = useBreakpointValue({ base: true, lg: false });
     const navigate = useNavigate()
     
     useEffect(()=>{
       if(!isLogged){
        navigate('/')
       }
     
     } ,  [isLogged])
     
const showProjectDash = () =>{
    setShowProject(true)
    setSettings(false)
    setShowClubs(false)
    setUserMng(false)
    setDashboard(false)
    setShowUsersProject(false)
    setEvents(false)
}
const showEvents = () =>{
  setShowProject(false)
  setSettings(false)
  setShowClubs(false)
  setUserMng(false)
  setDashboard(false)
  setEvents(true)
  setShowUsersProject(false)
 
}
const showDashboard = () =>{
   setDashboard(true)
   setSettings(false)
   setShowClubs(false)
   setShowProject(false)
   setEvents(false)
   setUserMng(false)
   setShowUsersProject(false)
}
const showClubsHandle = () =>{
setShowClubs(true)
setSettings(false)
setDashboard(false)
setShowUsersProject(false)
setEvents(false)
setShowProject(false)
setUserMng(false)
}
const showUsersProjectHandle = () =>{
  setShowUsersProject(true)
  setShowClubs(false)
  setSettings(false)
  setDashboard(false)
  setEvents(false)
  setShowProject(false)
  setUserMng(false)
  }
const showUserMng = () =>{
  setUserMng(true)
  setShowClubs(false)
  setShowUsersProject(false)
  setSettings(false)
  setEvents(false)
  setDashboard(false)
  setShowProject(false)
  }
  const showSettings = () =>{
    setUserMng(false)
    setShowClubs(false)
    setShowUsersProject(false)
    setSettings(true)
    setEvents(false)
    setDashboard(false)
    setShowProject(false)
    }
const handleMenuClick = () => {
    setMenu(!menu);
  };
  
const toggleDarkMode = () => {
    setIsdarkmode(!isDarkMode)
  };
const closeDarkMode = () => {
    setIsdarkmode(isDarkMode)
  };
useEffect(() => {
  
    const link = document.createElement('link');
    const linkk= document.createElement('link')
    linkk.rel = 'stylesheet'
    linkk.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp';

 
    document.head.appendChild(link);
		document.head.appendChild(linkk);
  
    return () => {
      document.head.removeChild(link);
			document.head.removeChild(linkk);
    };
  }, []);  console.log(events)
  return (
  <div id='bdy' className={isDarkMode ? 'dark-mode-variables' : ''}>
    <div className='container' id={ isMobileView ? null : usersMng || showUsersProject|| showProject || showClubs || events ? 'cntr--wide' : ''}>
    
    <Sidebar isMobile={isMobileView}  isLogged={isLogged} projectUsers={showUsersProjectHandle} Events={showEvents} userData={userData} menuClicked={menu} menuHide={handleMenuClick} Clubs={showClubsHandle} Dashboard={showDashboard} Settings={showSettings} Projects={showProjectDash} Users={showUserMng}/>
 { dashboard  ? (
 <> 
      <AdmCnt userData={userData} isMobile={isMobileView}/>
       <Manager 
          Clickd={handleMenuClick}   
          Dark={isDarkMode} userData={userData} 
          DarkMode={toggleDarkMode} 
          CloseDarkMode={closeDarkMode}
         
          />
 </>
) : showProject && isAdmin ? (<>
<TaskTabel userData={userData} isMobile={isMobileView} dark={isDarkMode}/>
<NavBar Clicked={handleMenuClick}   
          Dark={isDarkMode} userData={userData} 
          DarkMode={toggleDarkMode} 
          CloseDarkMode={closeDarkMode}/>
</>) : events ? (<> <UserMessages userData={userData} dark={isDarkMode} isMobile={isMobileView}/><NavBar Clicked={handleMenuClick}   
          Dark={isDarkMode} userData={userData} 
          DarkMode={toggleDarkMode} 
          CloseDarkMode={closeDarkMode}/></>)
   :
   settings ? (  <><Settings/><NavBar Clicked={handleMenuClick}   
          Dark={isDarkMode} userData={userData} 
          DarkMode={toggleDarkMode} 
          CloseDarkMode={closeDarkMode}/></> ) 
   : 
     ( <> 
      <AdmCnt  userData={userData} isMobile={isMobileView} />
       <Manager 
          Clickd={handleMenuClick}   
          Dark={isDarkMode} 
          userData={userData} 
          DarkMode={toggleDarkMode} 
          CloseDarkMode={closeDarkMode}
          />
          
          </>
          )
          
 } 


    </div>
    </div>
  );
}

export default AdminComponent;
