import React, { useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import { getDatabase, ref, get, push, set, update } from "firebase/database";

const Track = () => {
  const [animate, setAnimate] = useState(false);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [like, setLike] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [category, setCategory] = useState("");

  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);

  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");

  const [artistNameKey, setArtistNameKey] = useState("");
  const [albumNameKey, setAlbumNameKey] = useState("");
  const fetchAlbum = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, `album`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const entries = Object.values(snapshot.val());
      setAlbum(entries);

      // Find the entry where name is "token as id"
      // const foundEntry = entries.find(([key, value]) => value.token === id);
      // if (foundEntry) {
      //   const [key, userData] = foundEntry;
      //   setUserKey(key); // Output: user1 (or whatever the key is)
    } else {
      console.log("Data is not found");
    }
  };
  const fetchArtist = async () => {
    const db = getDatabase(app);
    const dataRef = ref(db, `artists`);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const entries = Object.values(snapshot.val());
      setArtist(entries);

      // Find the entry where name is "token as id"
      // const foundEntry = entries.find(([key, value]) => value.token === id);
      // if (foundEntry) {
      //   const [key, userData] = foundEntry;
      //   setUserKey(key); // Output: user1 (or whatever the key is)
    } else {
      console.log("Data is not found");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // update the artist data with the track(song)
    const db = getDatabase(app);
    const dataRef = push(ref(db, `artists/${artistNameKey}/tracks`));
    set(dataRef, {
      title: title,
      duration: duration,
      genre: genre,
      audioFile: audioFile,
      coverImage: coverImage,
      like: like,
      createdAt: createdAt,
      artist: artistNameKey,
      album: albumNameKey,
      category: category,
    })
      .then(() => {
        console.log("track (song) to the artist updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });

    //update the album with the track

    const dataRef1 = push(ref(db, `album/${albumNameKey}/tracks`));
    set(dataRef1, {
      title: title,
      duration: duration,
      genre: genre,
      audioFile: audioFile,
      coverImage: coverImage,
      like: like,
      createdAt: createdAt,
      artist: artistNameKey,
      album: albumNameKey,
    })
      .then(() => {
        console.log("track (song) to the artist updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });

    console.log("data clicked form");
    //firebase setup
    const newDocm = push(ref(db, "track"));
    set(newDocm, {
      title: title,
      duration: duration,
      genre: genre,
      audioFile: audioFile,
      coverImage: coverImage,
      like: like,
      createdAt: createdAt,
      artist: artistNameKey,
      album: albumNameKey,
    })
      .then(() => {
        alert("artist data saved");
        // window.location.reload();
        // setAnswers({});
        // nav("/login");
        setArtistName("");
        setAlbumName("");
        setArtistNameKey("");
        setAlbumNameKey("");
      })
      .catch((err) => {
        console.error("error", err.message);
      });
  };
  const handleArtistKey = async (e) => {
    try {
      const selectedName = e.target.value; // Use this directly

      setArtistName(selectedName);
      const db = getDatabase(app);

      const dataRef = ref(db, `artists`);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const entries1 = Object.entries(snapshot.val());
        // Find the entry where name is "token as id"
        const foundEntry = entries1.find(
          ([key, value]) => value.name === selectedName
        );
        if (foundEntry) {
          const [key, userData] = foundEntry;
          setArtistNameKey(key); // Output: user1 (or whatever the key is)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAlbumKey = async (e) => {
    try {
      const selectedTitle = e.target.value; // Use this directly
      setAlbumName(selectedTitle); // Update state with the selected value
      const db = getDatabase(app);
      const dataRef = ref(db, `album`);
      const snapshot = await get(dataRef);
      if (snapshot.exists()) {
        const entries1 = Object.entries(snapshot.val());
        // Find the entry where name is "token as id"
        const foundEntry = entries1.find(
          ([key, value]) => value.title === selectedTitle
        );
        if (foundEntry) {
          const [key, userData] = foundEntry;
          setAlbumNameKey(key); // Output: user1 (or whatever the key is)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("album", album);
  console.log("artist", artist);
  console.log("artist Name key", artistNameKey);
  console.log("album name key", albumNameKey);
  useEffect(() => {
    fetchAlbum();
    fetchArtist();
    setAnimate(true); // Trigger animation when the component mounts
  }, []);

  return (
    <div>
      <div className="flex items-center mb-3">
        {/* Left border */}
        <div className="h-6 border-l-4 border-blue-600"></div>

        {/* Container for the animated text */}
        <div className="overflow-hidden">
          <div
            className={`transform ${
              animate ? "animate-revealText" : ""
            } opacity-0 font-semibold font-mono text-slate-700 text-2xl pl-2`} // Slight padding-left to adjust spacing
          >
            Track ( Song ) Input Area
          </div>
        </div>
      </div>
      <form className=" " action="" onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <div className="relative mb-3">
            <input
              required
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Enter Title *
            </label>
          </div>
          <div className="relative">
            <input
              required
              type="text"
              id="duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="block px-2.5    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Enter Duration *
            </label>
          </div>
          <div className="font-semibold">
            {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
          </div>
        </div>
        <div>
          <div className="ml-1 font-bold text-slate-600">
            Select the album name which track belong
          </div>
          <select
            value={albumName}
            className="block px-2.5 mb-4    pb-2.5 border pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name=""
            id=""
            onChange={handleAlbumKey}
          >
            <option value="">Select the data</option>
            {album.map((item, index) => {
              return (
                <>
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div>
          <div className="font-bold text-slate-600 ml-1">
            Select the artist name which track belong
          </div>
          <select
            value={artistName}
            className="block px-2.5  mb-4  pb-2.5 border pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name=""
            id=""
            onChange={handleArtistKey}
          >
            <option value="">Select the data</option>
            {artist.map((item, index) => {
              return (
                <>
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div>
          <div className="mb-3">
            <select
              value={genre}
              className="block px-2.5  mb-3   pb-2.5 border pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            <label htmlFor="category" className="font-bold text-slate-600 ml-1">
              Select Category
            </label>
            <select
              value={category}
              className="block px-2.5   mb-4   pb-2.5 border pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              name=""
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select option</option>
              {/*  literature, art, film or music  */}
              <option value="topPlaylist">Top playlist</option>
              <option value="topCharts">Top Charts</option>
              <option value="newReleases">New Releases</option>
              <option value="podcasts">Podcasts</option>
              <option value="radioStation">Radio Station</option>
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
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter Genre of Album *
              </label>
            </div> */}
            <div className="font-semibold">
              {/* {errors && <div className="text-red-500">{errors.email}</div>} */}
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            required
            type="text"
            id="audioFile"
            name="audioFile"
            value={audioFile}
            onChange={(e) => setAudioFile(e.target.value)}
            className="block px-2.5 mb-4 bg-green-50   pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Enter Audio file url*
          </label>
        </div>
        <div className="relative">
          <input
            required
            type="text"
            id="coverImage"
            name="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="block px-2.5 mb-4    pb-2.5 border pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            className="absolute text-sm bg-white text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Enter Cover image url*
          </label>
        </div>
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
            className="absolute text-sm bg-white text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Enter Created At
          </label>
        </div>
        <div className="mb-3">
          <button
            className="text-white mt-4 float-right mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Track;
