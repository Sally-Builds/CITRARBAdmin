import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import UploadsContext from "../../context/uploadsContext";

const Index = () => {
  const { market } = useContext(UploadsContext);
  let data = [1, 2, 3, 5, 6, 7];

  console.log(market);
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {market.length > 0 &&
            market.map((el, i) => (
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <article className="overflow-hidden rounded-lg shadow-lg">
                  {/* <img
                  src="https://media.istockphoto.com/id/640318118/photo/sunset-over-indian-ocean.jpg?s=1024x1024&w=is&k=20&c=ZZ83CXrsxGd4HhoyV8KXgrdnoaQ9XgeAKkN_ru8taYk="
                  alt=""
                /> */}
                  <Carousel showThumbs={false}>
                    <div>
                      <img
                        alt=""
                        src="http://localhost:8000/product--1696755248179-1.jpeg"
                      />
                    </div>
                    <div>
                      <img alt="" src="assets/2.jpeg" />
                    </div>
                    <div>
                      <img alt="" src="assets/3.jpeg" />
                    </div>
                  </Carousel>
                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-black"
                        href="/"
                      >
                        IPhone X
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
                      <p className="ml-2 text-sm">Sally Nwamama</p>
                    </a>
                  </footer>
                </article>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Index;
