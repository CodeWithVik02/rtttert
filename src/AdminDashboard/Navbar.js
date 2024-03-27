import React from "react";
    
    
export default function NavBar({Clicked , LightMode , Light,  DarkMode , CloseDarkMode , Dark}){

return( 
<div className="right-section">
<div className="nav">
		<button id="menu-btn" onClick={Clicked}>
				<span className="material-icons-sharp" >
						menu
				</span>
		</button>
		<div className="dark-mode">
				<span className={`material-icons-sharp${Dark ? '' : ' active' }`} onClick={LightMode} >
						light_mode
				</span>
				<span className={`material-icons-sharp${Dark ? ' active' : '' }`}  onClick={DarkMode}>
					 dark_mode
				</span>
		</div>


</div></div>
)

}