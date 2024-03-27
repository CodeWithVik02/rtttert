import React , {useState} from "react";
import { auth } from "../components/firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Sidebar({ isMobile, menuHide , isLogged , isUser ,projectUsers ,  menuClicked , Events , Dashboard , Users , Projects , Clubs , Logout , Settings , userData}){
    
    
    const navigate =  useNavigate()
    
    const singOutUser = ()=>{
        signOut(auth);
        navigate('/')
      }


return(

<aside style={menuClicked ? {display:'block'} : {}}>

            
            <div className="sidebar" >
          { isMobile ?  <a style={{height:'20px' , marginBottom:'20px' , marginTop:'10px'}}>
            <span  className="material-symbols-outlined" onClick={menuHide} style={{cursor: 'pointer' , position: 'relative' , left: '130px' , fontSize:'30px'}}>
               close
             </span></a> : null}
                <a  className="" onClick={Dashboard} style={isMobile ? null : {marginTop:'20px'}}>
                    <span className="material-icons-sharp">
                        dashboard
                    </span>
                    <h3   id="tls">Dashboard</h3>
                </a>
            
                
             {  userData[0].type === 'CEO' || userData[0].type === 'COO'  ?  <a  onClick={Projects}>
                    <span className="material-icons-sharp">
                        receipt_long
                    </span>
                    <h3  id="tls">Menage</h3>
                </a> : null }
                <a  onClick={Events}>
                <span className="material-symbols-outlined">
                    event_available
                </span>
                    <h3  id="tls">Tasks</h3>
                </a> 
                <a href="#">
								<span className="material-symbols-outlined">
                         home
                  </span>
                  <h3  id="tls">Home</h3></a>  
                 <a >
                    <span className="material-icons-sharp">
                        logout
                    </span>
                    { isLogged ?   <h3  id="tls" onClick={singOutUser}>Logout</h3>: null}
                </a>
            </div>
        </aside>

)

}
