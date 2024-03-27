import React, { useEffect, useState } from "react";
import { db } from "components/firebase/firebase-config";
import { collection, getDocs } from 'firebase/firestore';
import { updateDoc, doc } from 'firebase/firestore';

export default function ProjectList({showProject}) {
    const [projects, setProjects] = useState([]);
    const [clubsData , setClubsData] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsCollection = collection(db, 'projects');
            const snapshot = await getDocs(projectsCollection);
            const projectsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
        };
        const fetchClubs = async ()=>{
            const clubsCollection = collection(db , 'Clubs') ;
            const snapshot = await getDocs(clubsCollection) ;
            const clubData = snapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()} ) ); 
            setClubsData(clubData)
           }
           fetchClubs()
        fetchProjects();
    }, []);

   

    return (
        <>

            <table id="tbl">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project id</th>
                        <th>Project Club</th>
                        <th>User</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showProject ? projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.id}</td> 
                            <td>
                           {clubsData.find((club) => club.id === project.club)?.name || 'N/A'}
                            </td>
                            <td>{project.userName}</td>
                            <td>{project.status}</td>
														<td className="primary">Details</td>
                        </tr>
                    )) : projects.slice(0, 5).map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.id}</td>
                            <td>
                           {clubsData.find((club) => club.id === project.club)?.name || 'N/A'}
                            </td>
                            <td>{project.userName}</td>
                            <td className={project.status === 'pending' ?  'Pending' : '' }>{project.status}</td>
														<td className="primary">Details</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
