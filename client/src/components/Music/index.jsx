import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Index = () => {
  let data = [1, 2, 3, 5, 6, 7];
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {data.map((el, i) => (
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://media.istockphoto.com/id/640318118/photo/sunset-over-indian-ocean.jpg?s=1024x1024&w=is&k=20&c=ZZ83CXrsxGd4HhoyV8KXgrdnoaQ9XgeAKkN_ru8taYk="
                  alt=""
                />
                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 className="text-lg">
                    <a
                      className="no-underline hover:underline text-black"
                      href="/"
                    >
                      Article Title
                    </a>
                  </h1>
                  <p className="text-grey-darker text-sm">11/1/19</p>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    className="flex items-center no-underline hover:underline text-black"
                    href="/"
                  >
                    <img
                      alt="Placeholder"
                      className="block rounded-full"
                      src="https://picsum.photos/32/32/?random"
                    />
                    <p className="ml-2 text-sm">Author Name</p>
                  </a>
                  <a
                    className="no-underline text-grey-darker hover:text-red-dark"
                    href="/"
                  >
                    <span className="hidden">Like</span>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                  </a>
                </footer>
                <div>
                  <AudioPlayer
                    src="https://drive.google.com/uc?id=1enyL68tAW8a6OTOAGodn3e4vD6XUpu7o&export=download"
                    onPlay={(e) => console.log("onPlay")}
                    // other props here
                  />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
