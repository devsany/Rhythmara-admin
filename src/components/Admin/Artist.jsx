import React, { useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import { getDatabase, ref, push, set } from "firebase/database";

const Artist = () => {
  const [animate, setAnimate] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [albumsID, setAlbumsID] = useState([]); //then search the data form id
  const [tracksID, setTracksID] = useState([]); //then search the data form id
  const [createdAt, setCreatedAt] = useState(""); //pass the date strind
  const [updatedAt, setUpdatedAt] = useState(""); // make the 'UpdateArtist' component separatly.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data clicked form");
    const db = getDatabase(app);
    //firebase setup
    const newDocm = push(ref(db, "artists"));
    set(newDocm, {
      name: name,
      bio: bio,
      profileImage: profileImage,

      createdAt: createdAt,
    })
      .then(() => {
        alert("artist data saved");
        // window.location.reload();
        // setAnswers({});
        // nav("/login");
      })
      .catch((err) => {
        console.error("error", err.message);
      });
  };

  useEffect(() => {
    setAnimate(true); // Trigger animation when the component mounts
  }, []);
  return (
    <div>
      <div>
        <div className="flex items-center mb-3">
          {/* Left border */}
          <div className="h-6 border-l-4 border-orange-400"></div>

          {/* Container for the animated text */}
          <div className="overflow-hidden">
            <div
              className={`transform ${
                animate ? "animate-revealText" : ""
              } opacity-0 font-semibold font-mono text-slate-700 text-2xl pl-2`} // Slight padding-left to adjust spacing
            >
              Artist Input Area
            </div>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="text"
                id="Name"
                name="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Name *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="text"
                id="bio"
                name="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Bio *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="text"
                id="PrifileImage"
                name="PrifileImage"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter profile Image URL *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="date"
                id="createdAt"
                name="createdAt"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Created At *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Artist;
