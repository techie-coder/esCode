import NavBar from "./components/NavBar"
import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react";
import PATH from "./PATH";
import React from "react";

const Discuss = () => {

    const { getAccessTokenSilently, user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [discussions, setDiscussions] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    
    useEffect(
        () => {
            const getDiscussions = async() => {
                let token = null;
                try{
                    token = await getAccessTokenSilently({
                        authorizationParams: {
                          audience: `https://dev-skne2ots1cwlwxnk.us.auth0.com/api/v2/`,
                          scope: "read:current_user",
                        },
                      });
                }catch(e){
                    console.log(e);
                }
                console.log(token);
                
                try{
                    const data = await fetch(`${PATH}/discuss/all`, {
                        method: "GET",
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                    setDiscussions(await data.json())
                    console.log(discussions);
                }catch(e){
                    console.log(e)
                }
            }
            getDiscussions();
        }, [discussions, getAccessTokenSilently]
           
    )

    const handleSubmit = async() => {
        if(!isAuthenticated)
            loginWithRedirect();
        
        let token = null;
                try{
                    token = await getAccessTokenSilently({
                        authorizationParams: {
                          audience: `https://dev-skne2ots1cwlwxnk.us.auth0.com/api/v2/`,
                          scope: "read:current_user",
                        },
                      });
                }catch(e){
                    console.log(e);
                }
                console.log(token);
        try{
            const response = await fetch(`${PATH}/discuss`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: {
                    username: user.nickname,
                    title: title,
                    body: body
                }
            })
            console.log("Post submitted");
        }catch(e){
            console.log(e);
        }
    }

    return(
        <>
        <NavBar />
        <div className="h-[60vh] bg-platinum space-y-5">
            <h1 className="p-3 manrope-400 text-3xl flex justify-center items-center align-center">Welcome to esCode community</h1>
            <div className="space-y-2">
                {discussions.map((element, index) => {
                    const pastDate = new Date(element.createdAt); 
                    const currentDate = new Date();
                    const timeDifferenceMs = currentDate - pastDate;
                
                    const seconds = Math.floor(timeDifferenceMs / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const days = Math.floor(hours / 24);
                
                    let timeAgo;
                    if (seconds < 60) {
                      timeAgo = `${seconds} seconds ago`;
                    } else if (minutes < 60) {
                      timeAgo = `${minutes} minutes ago`;
                    } else if (hours < 24) {
                      timeAgo = `${hours} hours ago`;
                    } else {
                      timeAgo = `${days} days ago`;
                    }
                    return(
                    <div key={index} className="bg-white border-black mx-20 space-y-2 shadow">
                    <h2 className="m-2  text-md"><span className="text-blue">{element.username}</span> posted {timeAgo}</h2>
                    <h3 className="m-2 text-xl">{element.title}</h3>
                    <p className="m-2 text-12">{element.body}</p>
                </div>)})}
            </div>
        </div>
        <div className="bg-white max-h-lg space-y-5 flex border-t-1 border-black">
            <div className="mx-4 my-4 space-y-3 justify-start">
            Title: <input placeholder="Enter Title" className="min-h-10 border-platinum-50 border-[0.1rem] outline-none" size={50} onChange={(e) => setTitle(e)}></input>
            <textarea placeholder="Enter the contents" className="h-full w-full border-platinum-50 border-[0.1rem] outline-none" onChange={(e) => setBody(e)}></textarea>
            <button className="bg-black text-white rounded-sm px-2" onClick={handleSubmit}>Add Post</button>
            </div>
        </div>
        </>
    )
}

export default Discuss