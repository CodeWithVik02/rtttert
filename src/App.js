import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import SignIn from "./pages/LoggingIn/signIn";

import { useEffect, useState } from "react";
import { auth , db } from "./components/firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  // , where
} from "firebase/firestore";
import Loading from "./components/Loading/Loading";


import AddCreds from "./pages/LoggingIn/AddCreds";

import Landing from "./pages/Home/Main/Landing";
import AdminComponent from "./AdminDashboard/AdminComponent";
import NavBar from "./components/NavBar/NavBar";



export default function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const departments = ['Informatik' , 'Shkenca' , 'Shkenca Sociale']
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
  setLoading(true);
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setUser(user);
      await getDocs(query(collection(db, "Users")))
        .then((res) => {
          if (res.docs.length === 0) {
            navigate("/signIn/addCreds");
            setLoading(false);
          } else {
            let userResArr = [];
            res.docs.map((doc) => {
              if (doc.data().uid === user.uid) {
                userResArr.push({ id: doc.id, ...doc.data() });
              }
            });
            if (!userResArr.length) {
              navigate("/signIn/addCreds");
              setLoading(false);
            } else {
              setUserData(userResArr);
              setIsLogged(true);
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setIsLogged(false);
      setLoading(false);
      
    }
  });
}, [isLogged , navigate]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
console.log(userData)
  const isMobile = width < 768;
	const isAdmin = isLogged && userData && userData.length > 0 && userData[0].type === "admin";
	const isAproved = isLogged && userData && userData.length > 0 && userData[0].status === "approved"
	console.log(isLogged)
	
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <>
        
          <Routes>
          <Route
            path="/"
            element={ <Landing userData={userData[0]} isLogged={isLogged} isMobile={isMobile}/> }
          ></Route>
          <Route path="/dashboard" element={ isLogged ?   <>
          
          <AdminComponent userData={userData} isLogged={isLogged}/></> : null}>
          </Route>
            <Route
              path="/signIn"
              element={
                <SignIn
                  setLogged={setIsLogged}
                  isLogged={isLogged}
                  setLoading={setLoading}
                />
              }
            />
            <Route
              path="/signIn/addCreds"
           
              element={
                 !isLogged ? (
                  <AddCreds
                    setLoading={setLoading}
                    user={user}
                    setLogged={setIsLogged}
                  />
                ) : (
                  <NotFound />
                )
              }
            />


           
            <Route path="*" element={ <NotFound />}/>
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
}
