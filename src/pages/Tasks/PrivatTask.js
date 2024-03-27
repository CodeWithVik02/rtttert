import { Button, Center, Heading } from "@chakra-ui/react";
import { db } from "../../components/firebase/firebase-config";

import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MessagesModal from "./DesMess";

export default function UserMessages({userData , dark , isMobile}) {
    const [showDetails, setShowDetails] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (userData && userData.length > 0 && userData[0].id) {
            const fetchRequests = async (userId) => {
                const messagesCollection = collection(db, 'Tasks');
                const q = query(messagesCollection, where(`user`, '==', `${userId}`));

                const docSnap = await getDocs(q);
                const data = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(data);
            };

            fetchRequests(userData[0].id);
        }
    }, [userData]);

    const markAsDone = async (messageId) => {
        const messageRef = doc(db, 'Tasks', messageId);
        await updateDoc(messageRef, { status: 'done' });

        // Update the messages state to reflect the change
        setMessages(messages.map(message => message.id === messageId ? { ...message, status: 'done' } : message));
    };

    return (
        <main>
            <Center><Heading style={dark ? {color:'white'} : null}>Tasks</Heading></Center>
            

            {messages.length > 0 ? (
                showDetails ?
                    (
                        messages.map((message) => {
                            if (!message.status || message.status !== 'done') {
                                return (
                                    <div className="project" key={message.id}>
                                        <div className="message">
                                            <div className="msg" style={isMobile ? {flexDirection:'column'} : null}>
                                                <p>You have got a new task</p>
                                                <MessagesModal Name={message.name} Description={message.description} Status={message.status} Id={message.id} />
                                                <Button onClick={() => markAsDone(message.id)} colorScheme="green"  >Mark as Done</Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })
                    ) :
                    (
                        messages.slice(0, 3).map((message) => {
                            if (!message.status || message.status !== 'done') {
                                return (
                                    <div className="project" key={message.id}>
                                        <div className="message">
                                            <div className="msg" style={isMobile ? {flexDirection:'column'} : null}>
                                                <p style={{ paddingBottom: '10px' }}>You have got a new task</p>
                                                <MessagesModal Name={message.name} Description={message.description} Status={message.status} Id={message.id} />
                                                <Button onClick={() => markAsDone(message.id)} colorScheme="green"  >Mark as Done</Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })
                    )
            ) :
                <Center padding={20}><Heading>No Tasks yet</Heading></Center>
            }

            <Center>
                <a style={{ marginTop: '20px', color: 'var(--color-primary)' }} onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Close' : 'Show All'}</a>
            </Center>

        </main>
    );
}
