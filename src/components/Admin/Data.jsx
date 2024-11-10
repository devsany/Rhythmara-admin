import React, { useEffect, useState } from "react";

const Data = () => {
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
  useEffect(() => {
    fetchArtist();
  }, []);
  return (
    <div>
      <button>Like</button>
    </div>
  );
};

export default Data;
