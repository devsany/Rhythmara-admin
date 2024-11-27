import { get, getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const ArtistView = () => {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState([]);
  const [loding, setLoading] = useState(false);
  const nav = useNavigate();
  const fetchPrimaryData = async () => {
    const db = getDatabase(app);
    setLoading(true);
    const dataRef = ref(db, "artists");

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
  // console.log(data);
  const deleteItem = (key) => {
    if (key) {
      // Ensure a teacher has been fetched
      const db = getDatabase();
      const teacherRef = ref(db, `album/${key}`); // Reference to the specific teacher record

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
  // console.log(data);

  //pagination function
  // Set up state for pagination
  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the data to only show items for the current page
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setAnimate(true); // Trigger animation when the component mounts
    fetchPrimaryData();
  }, []);
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div className="flex items-center mb-3">
            {/* Left border */}
            <div className="h-6 border-l-4 border-orange-400"></div>

            {/* Container for the animated text */}
            <div className="overflow-hidden">
              <div
                className={`transform ${
                  animate ? "animate-revealText" : ""
                } opacity-0 font-semibold font-mono dark:text-white text-slate-700 text-2xl pl-2`} // Slight padding-left to adjust spacing
              >
                Artist List
              </div>
            </div>
          </div>
          <div>
            <button
              className="  items-center justify-center px-3 h-8 dark:text-white text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-sm ml-3 font-medium dark:text-white  text-gray-500">
              {currentPage} / {totalPages}
            </span>

            <button
              className="items-center justify-center px-3 h-8 ms-3 dark:text-white text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className="h-screen border p-4 rounded-md">
          {currentItems ? (
            <>
              <div>
                {currentItems.length === 0 ? (
                  <>Data is loading...</>
                ) : (
                  <>
                    {currentItems.map((item, index) => {
                      return (
                        <>
                          <div className="mt-3 " key={index}>
                            <div className="flex items-center ">
                              <div className="w-2 h-2 rounded-full mr-3 bg-gray-400"></div>
                              <div className="font-mono font-semibold dark:text-white text-lg text-slate-600">
                                {item.title}
                              </div>
                            </div>
                            <div className="border-l-[1px]   text-slate-600 text-sm ml-1 pl-2 border-gray-500">
                              <div className="flex items-center">
                                <div>
                                  <img
                                    className="w-16 h-16 rounded-full"
                                    src={item.profileImage}
                                    alt={item.name}
                                  />
                                </div>
                                <div className="ml-3">
                                  {/* <audio controls>
                                    <source
                                      src={item.audioFile}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio> */}
                                </div>
                              </div>
                              <div>{item.releaseDate}</div>
                              <div className="text-slate-500 dark:text-white text-xs m-2">
                                {item.name}
                                <div>{item.bio}</div>
                              </div>

                              <div>
                                <div className="flex">
                                  <div className="bg-blue-50 w-40 p-1 rounded-md pl-2">
                                    {item.createdAt}
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

export default ArtistView;
