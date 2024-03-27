
// eslint-disable-next-line no-unused-expressions
import { Image } from "@chakra-ui/react";
import React , {useState , useEffect} from "react";
import NavBar from "../Navbar";
export default function Manager({Clickd ,Dark , DarkMode , CloseDarkMode , userData }){

	const [isDarkMode , setIsdarkmode] = useState(false)
	const [reminders, setReminders] = useState([]);
	const [userClub , setUserClub] = useState([]);
	const [userProject , setUserProject] = useState([]);
	
	
	
	useEffect(()=>{
	  const fetchUsersProject = async() =>{
	      
	  }
	
	
	} , [])
	
	
	
	

	  
	  
return(
<div className="right-section">
<NavBar  Clicked={Clickd}   
          Dark={Dark} userData={userData} 
          DarkMode={DarkMode} 
          CloseDarkMode={CloseDarkMode}/>

<div className="user-profile">
		<div className="logo">
      <Image src={require('../../assets/images/dfsdfs.png')} alt="Logo" />
				<h2 id="ls">{userData[0].name}</h2>
				<h2 id="ls">{userData[0].surname}</h2>
				<h2 id="tls">{userData[0].type}</h2>
		</div>
</div>

<div className="reminders">
      <div className="header">
        <h2 id="ls">Reminders</h2>
        <span className="material-icons-sharp">notifications_none</span>
      </div>

      {reminders.map((reminder, index) => (
        <div className="notification" key={index}>
          <div className="icon">
            <span className="material-icons-sharp">volume_up</span>
          </div>
          <div className="content">
            <div className="info">
              <h3 id="tls">{reminder.title}</h3>
              <small className="text_muted">{reminder.time}</small>
            </div>
            <span className="material-icons-sharp">more_vert</span>
          </div>
        </div>
      ))}
      
      
      

      <div className="notification add-reminder">
        <form >
          <div>
            <span className="material-icons-sharp">add</span>
            <input id="reminder-tlt" type="text" name="title" placeholder="Title" required />
            <input id="reminder-time" type="time" name="time" placeholder="Time" required />
            <button type="submit">Add Reminder</button>
          </div>
        </form>
      </div>
    </div>
 

</div>)

}


