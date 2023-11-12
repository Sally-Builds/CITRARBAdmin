import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import UploadsContext from "../../context/uploadsContext";

const Index = () => {
  const { market } = useContext(UploadsContext);

  console.log(market);
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {market ? (
            market.map((el, i) => (
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <Carousel showThumbs={false}>
                    {el.images.map((el, i) => (
                      <div key={i}>
                        <img
                          alt=""
                          src={`${process.env.REACT_APP_BASE_URL}/` + el}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-black"
                        href="/"
                      >
                        {el.name}
                      </a>
                    </h1>
                    <p className="text-grey-darker text-sm">
                      &#8358;{el.price}
                    </p>
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
                      {el.userId && (
                        <p className="ml-2 text-sm">{el.userId.username}</p>
                      )}
                    </a>
                  </footer>
                </article>
              </div>
            ))
          ) : (
            <div className="text-center text-xl font-bold">No Products</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
