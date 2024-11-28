import React, { useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import { getDatabase, get, ref, push, set } from "firebase/database";

const Album = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger animation when the component mounts
  }, []);
  const [artist, setArtist] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [createdAt, setCreatedAt] = useState(""); // make the 'UpdateArtist' component separatly.
  const [artistName, setArtistName] = useState("");
  const [artiseKey, setArtiseKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data clicked form");
    const db = getDatabase(app);
    //firebase setup
    const newDocm = push(ref(db, "album"));

    const dataRef = push(ref(db, `artists/${artiseKey}/album`));
    set(dataRef, {
      title: title,
      releaseDate: releaseDate,
      coverImageUrl: coverImageUrl,
      gerne: genre,
      createdAt: createdAt,
      artistNameKey: artiseKey,
    })
      .then(() => {
        console.log("track (song) to the artist updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });
    set(newDocm, {
      title: title,
      releaseDate: releaseDate,
      coverImageUrl: coverImageUrl,
      gerne: genre,
      createdAt: createdAt,
      artistNameKey: artiseKey,
    })
      .then(() => {
        alert("artist data saved");
        setTitle("");
        setReleaseDate("");
        setCoverImageUrl("");
        setGenre("");
        setCreatedAt("");
        setArtiseKey("");
        // window.location.reload();
        // setAnswers({});
        // nav("/login");
      })
      .catch((err) => {
        console.error("error", err.message);
      });
  };
  //fetch the artics data
  const fetchArtist = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, `artists`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const entries = Object.values(snapshot.val());
      setArtist(entries);
      const entries1 = Object.entries(snapshot.val());

      //   Find the entry where name is "token as id"
      //   const foundEntry = entries.find(([key, value]) => value.token === id);
      //   if (foundEntry) {
      //     const [key, userData] = foundEntry;
      //     setArtiseKey(key); // Output: user1 (or whatever the key is)
    } else {
      console.log("Data is not found");
    }
  };
  const handleArtistName = async (e) => {
    const datas = e.target.value;
    setArtistName(datas);
    const db = getDatabase(app);
    const dataRef = ref(db, `artists`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const entries1 = Object.entries(snapshot.val());
      // Find the entry where name is "token as id"
      const foundEntry = entries1.find(([key, value]) => value.name === datas);
      if (foundEntry) {
        const [key, userData] = foundEntry;
        setArtiseKey(key); // Output: user1 (or whatever the key is)
      }
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);
  return (
    <div className="h-screen">
      <div className="flex items-center  mb-3">
        {/* Left border */}
        <div className="h-6 border-l-4 dark:text-white border-green-400"></div>

        {/* Container for the animated text */}
        <div className="overflow-hidden">
          <div
            className={`transform ${
              animate ? "animate-revealText" : ""
            } opacity-0 font-semibold font-mono dark:text-white text-slate-700 text-2xl pl-2`} // Slight padding-left to adjust spacing
          >
            Albam Input Area
          </div>
        </div>
      </div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full dark:text-white text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                // for="floating_outlined"
                className="absolute text-sm   text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Title of Album *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>

          {/* releaseData input Field */}
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                // for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Release date of Album *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>

          {/* coverImageUrl */}
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="text"
                id="coverImageUrl"
                name="coverImageUrl"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                // for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Cover Image URL of Album *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>

          {/* list of artist */}

          <select
            name=""
            id=""
            className="block px-2.5 mb-3 dark:text-slate-900  pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={handleArtistName}
          >
            <option value="">Select the Artist Name</option>
            {artist.map((item, index) => {
              return (
                <>
                  <option value={item.name}>{item.name}</option>
                </>
              );
            })}
          </select>
          {/* genre */}
          <div className="mb-3">
            <select
              className="block px-2.5 dark:text-slate-900   pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name=""
              id=""
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select Genre</option>
              {/*  literature, art, film or music  */}
              <option value="literature">Literature</option>
              <option value="art">Art</option>
              <option value="film">Film</option>
              <option value="music">Music</option>
            </select>
            {/* <div className="relative">
              <input
                required
                type="text"
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                // for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Genre of Album *
              </label>
            </div> */}
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>

          {/* created at */}
          <div className="mb-3">
            <div className="relative">
              <input
                required
                type="text"
                id="cretedAt"
                name="cretedAt"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                // for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter created at *
              </label>
            </div>
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>
          {/* updated at */}
          {/* <div className="mb-3">
            <div className="relative">
              <input
                required
                type="date"
                id="updatedAt"
                name="updatedAt"
                value={updatedAt}
                onChange={(e) => setUpdatedAt(e.target.value)}
                className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                // for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Enter Updated at date of Album *
              </label>
            </div>
            <div className="font-semibold">
              {errors && <div className="text-red-500">{errors.email}</div>}
            </div>
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Album;
