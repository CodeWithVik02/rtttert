import React , {useState , useEffect} from "react";
import { Image  , Heading, Button} from "@chakra-ui/react";
import { UserList } from "./UserList";
import MainTaskTabel from "../../pages/Tasks/MainTaskTabel";
import PrivateTable from "../../pages/Tasks/MainPrivTasks";



export default function AdmCnt({userData , isMobile }) {

const [projects, setProjects] = useState([]);
const [users, setUsers] = useState([]);
const [showProject , setShowproject] = useState(false)

let showProjectHandeler = () =>{
setShowproject(!showProject)
}
let closeProjectHandeler = () =>{
setShowproject(false)
}
   useEffect(()=>{
    
   })
      
return(
<main style={{padding:'20px'}}>
       <> <div className="new-users">
               
            <div className="user-list" id="tpp">
            <div className="user" >
            <Heading style={{ listStyle: 'none'  , color: 'white'}} paddingTop={3} paddingBottom={3}>
               Welcome <span>{userData[0].name} {userData[0].surname} {userData[0].type}  of SupliffyxCO</span> 
            </Heading>
            <p style={{paddingBottom: '10px' , color:'white'}}>This is your dashboard , menage and report your tasks</p>
            <Button paddingTop={3}>Add Project</Button>
          </div>
                </div>
            </div> 
            <h1 style={{marginTop:'20px'}} id="ls">Analytics</h1>
            <div className="analyse">
                <div className="sales">
                    <div className="status">
                        <div className="info">
                            <h3 id="tls">Total Sales</h3>
                            <h1 id="ls">$65,024</h1>
                        </div>
                        <div className="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36" />
                            </svg>
                            <div className="percentage">
                                <p>+81%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="visits">
                    <div className="status">
                        <div className="info">
                            <h3 id="tls">Site Visit</h3>
                            <h1 id="ls">24,981</h1>
                        </div>
                        <div className="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36" />
                            </svg>
                            <div className="percentage">
                                <p>-48%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="searches">
                    <div className="status">
                        <div className="info">
                            <h3 id="tls">Searches</h3>
                            <h1 id="ls">14,147</h1>
                        </div>
                        <div className="progresss">
                            <svg>
                                <circle cx="38" cy="38" r="36" />
                            </svg>
                            <div className="percentage">
                                <p>+21%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         {  userData[0].type === 'CEO' || userData[0].type === 'COO' ?   <div className="new-users">
                <h2 id="els">New Users</h2>
            <div className="user-list">
               <UserList />
                </div>
            </div> : null}

            <div className="recent-orders">
                
            {  userData[0].type === 'CEO' || userData[0].type === 'COO' ?   
                
                <MainTaskTabel userData={userData} isMobile={isMobile}/>
               
           : <PrivateTable userData={userData} isMobile={isMobile} /> }
                 
            </div></>
  

        

</main>

)

}
