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

  useEffect(() => {
    fetchPrimaryData();
  }, []);
  return (  
    <div className="h-screen">
      <div className="md:grid md:grid-cols-6 md:gap-4 m-4">
        <div className="col-span-2 h-[150px]    font-mono m-2 font-semibold text-lg rounded-lg shadow-lg text-slate-700 text-center flex justify-center items-center bg-purple-300 hover:bg-purple-400">
          <div>
            <div>Number of Song</div>
            <div className="text-5xl">{track.length}</div>
          </div>
        </div>
        <div className="col-span-2 h-[150px]   font-mono  m-2 font-semibold text-lg rounded-lg shadow-lg text-slate-700 text-center flex justify-center items-center bg-orange-300 hover:bg-orange-400">
          <div>
            <div>Number of Album</div>
            <div className="text-5xl">{album.length}</div>
          </div>
        </div>
        <div className="col-span-2 h-[150px]   font-mono m-2 font-semibold text-lg rounded-lg shadow-lg text-slate-700 text-center flex justify-center items-center bg-gray-200 hover:bg-gray-400">
          <div>
            <div>Number of Artist</div>
            <div className="text-5xl">{artist.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
