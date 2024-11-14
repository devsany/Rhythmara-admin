import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";

const Home = () => {
  const [track, setTrack] = useState([]);
  const [album, setAlbum] = useState([]);
  const [artist, setArtist] = useState([]);
  const fetchPrimaryData = async () => {
    const db = getDatabase(app);
    const track = await get(ref(db, `track`));
    const album = await get(ref(db, `album`));
    const artist = await get(ref(db, `track`));
    if (track.exists()) {
      setTrack(Object.values(track.val()));
    } else {
      alert("track data do not exist do not exist");
    }
    if (album.exists()) {
      setAlbum(Object.values(album.val()));
    } else {
      alert("album data do not exist do not exist");
    }
    if (artist.exists()) {
      setArtist(Object.values(artist.val()));
    } else {
      alert("artist data do not exist do not exist");
    }
  };
  console.log(track);
  console.log(album);
  console.log(artist);
  useEffect(() => {
    fetchPrimaryData();
  }, []);
  return (
    <div>
      <div className="md:grid md:grid-cols-6 md:gap-4 m-4">
        <div className="col-span-2 h-[150px] border font-mono font-semibold text-lg rounded-lg shadow-lg text-slate-700 text-center flex justify-center items-center bg-purple-400">
          Number of Track
        </div>
        <div className="col-span-2">Number of Artist</div>
        <div className="col-span-2">Number of Album</div>
      </div>
    </div>
  );
};

export default Home;
