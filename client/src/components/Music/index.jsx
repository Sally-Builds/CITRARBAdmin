import React, { useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import UploadsContext from "../../context/uploadsContext";

const Index = () => {
  const { music } = useContext(UploadsContext);
  console.log(music);
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {music ? (
            music.map((el, i) => (
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${el.image}`}
                    alt=""
                  />
                  <header className="leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-black"
                        href="/"
                      >
                        {el.title}
                      </a>
                    </h1>
                  </header>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <a
                      className="flex items-center no-underline hover:underline text-black"
                      href="/"
                    >
                      {el.userId && (
                        <>
                          <img
                            alt="profile"
                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                            src={`${process.env.REACT_APP_BASE_URL}/${el.userId.photo}`}
                          />
                          <p className="ml-2 text-sm">{el.userId.username}</p>
                        </>
                      )}
                    </a>
                  </footer>
                  <div>
                    <AudioPlayer
                      src={`${process.env.REACT_APP_BASE_URL}/${el.file}`}
                      onPlay={(e) => console.log("onPlay")}
                      // other props here
                    />
                  </div>
                </article>
              </div>
            ))
          ) : (
            <div className="text-center text-xl font-bold">
              No Music Uploads
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
