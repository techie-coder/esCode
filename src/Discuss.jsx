import NavBar from "./components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import PATH from "./PATH";
import React from "react";

const Discuss = () => {
  const { getAccessTokenSilently, user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [discussions, setDiscussions] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const getDiscussions = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://dev-skne2ots1cwlwxnk.us.auth0.com/api/v2/`,
            scope: "read:current_user",
          },
        });

        const response = await fetch(`${PATH}/discuss/all`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setDiscussions(data);
        } else {
          console.error("Failed to fetch discussions:", response.statusText);
        }
      } catch (e) {
        console.error("Error fetching discussions:", e);
      }
    };

    getDiscussions();
  }, [getAccessTokenSilently]);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://dev-skne2ots1cwlwxnk.us.auth0.com/api/v2/`,
          scope: "read:current_user",
        },
      });

      const response = await fetch(`${PATH}/discuss`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user.nickname,
          title: title,
          body: body,
        }),
      });

      if (response.ok) {
        console.log("Post submitted successfully");
        setTitle('');
        setBody('');
        setIsFormVisible(false); // Hide form after successful submission
      } else {
        console.error("Failed to submit post:", response.statusText);
      }
    } catch (e) {
      console.error("Error submitting post:", e);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-platinum min-h-screen p-5">
        <h1 className="text-3xl manrope-700 text-center">Community Discussions</h1>
        <div className="space-y-5 mt-5">
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

            return (
              <div
                key={index}
                className="manrope-400 bg-white shadow border-[0.01rem] border-platinum-50 mx-20 p-2"
              >
                <h2 className="text-lg font-semibold">
                  <span className="text-blue">{element.username}</span> posted {timeAgo}
                </h2>
                <h3 className="text-xl font-bold mt-2">{element.title}</h3>
                <p className="mt-1">{element.body}</p>
              </div>
            );
          })}
        </div>
        <div className="fixed bottom-5 right-5">
          <button
            className="bg-bright-orange text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            +
          </button>
        </div>
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
              <button
                className="absolute top-3 right-3 text-black hover:text-gray text-2xl font-bold"
                onClick={() => setIsFormVisible(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
              <label className="block mb-2">
                Title:
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label className="block mb-4">
                Body:
                <textarea
                  placeholder="Enter the contents"
                  className="w-full border border-gray-300 rounded p-2 mt-1"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </label>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white rounded px-4 py-2 mr-2"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white rounded px-4 py-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Discuss;