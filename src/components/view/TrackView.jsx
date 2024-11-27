import { get, getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const TrackView = () => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState([]);
  const [loding, setLoading] = useState(false);
  const nav = useNavigate();
  const fetchPrimaryData = async () => {
    const db = getDatabase(app);
    setLoading(true);
    const dataRef = ref(db, "track");

    // Fetch data and set the state manually
    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const dataArray = Object.keys(dataObj).map((key) => ({
          key,
          ...dataObj[key],
        }));
        setData(dataArray);
      }
      setLoading(false);
    });
  };
  console.log(data);
  const deleteItem = (key) => {
    if (key) {
      // Ensure a teacher has been fetched
      const db = getDatabase();
      const teacherRef = ref(db, `track/${key}`); // Reference to the specific teacher record

      // Remove the teacher's data from the database
      remove(teacherRef)
        .then(() => {
          nav("/album_view");
        })
        .catch((error) => {
          alert("Error deleting teacher:", error);
        });
    } else {
      alert("No album selected for deletion.");
    }
  };
  useEffect(() => {
    setAnimate(true); // Trigger animation when the component mounts
    fetchPrimaryData();
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
              Track or Song List
            </div>
          </div>
        </div>
        <div className="h-screen overflow-y-scroll border p-4 rounded-md">
          {data ? (
            <>
              <div>
                {data.length === 0 ? (
                  <>Data is loading...</>
                ) : (
                  <>
                    {data.map((item, index) => {
                      return (
                        <>
                          <div className="mt-3 " key={index}>
                            <div className="flex items-center ">
                              <div className="w-2 h-2 rounded-full mr-3 bg-gray-400"></div>
                              <div className="font-mono font-semibold text-lg text-slate-600">
                                {item.title}
                              </div>
                            </div>
                            <div className="border-l-[1px] text-slate-600 text-sm ml-1 pl-2 border-gray-500">
                              <div className="flex items-center">
                                <div>
                                  <img
                                    className="w-16 h-16 rounded-full"
                                    src={item.coverImage}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <audio controls>
                                    <source
                                      src={item.audioFile}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                </div>
                              </div>
                              <div>{item.releaseDate}</div>
                              <div className="text-slate-500 text-xs m-2">
                                Created At - {item.createdAt}
                              </div>

                              <div>{item.like}</div>

                              <div>
                                <div className="flex">
                                  <div className="bg-blue-50 w-40 p-1 rounded-md pl-2">
                                    {item.genre}
                                  </div>
                                  <div>
                                    {" "}
                                    <button
                                      className="flex items-center   pt-1 pb-1 pl-3 pr-3 bg-red-200 hover:bg-red-300 shadow-sm  ml-3 rounded-md "
                                      onClick={() => deleteItem(item.key)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <hr />
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div>Data not available</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackView;
