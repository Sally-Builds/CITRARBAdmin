import React from "react";
import "./index.css";
import { Tab } from "@headlessui/react";
import Music from "../../../components/Music";
import EyeWitness from "../../../components/EyeWitness";
import Market from "../../../components/Market";

const index = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const data = [
    {
      header: "Eye-witness",
      content: <EyeWitness />,
    },
    {
      header: "Music",
      content: <Music />,
    },
    {
      header: "Market Place",
      content: <Market />,
    },
  ];
  return (
    <>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {data.map((el, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {el.header}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {data.map((el, i) => (
            <Tab.Panel>{el.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <div class="group fixed bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
        <button
          data-te-ripple-init
          data-te-ripple-color="light"
          className="hover:scale-110  mt-3 cursor-pointer rounded-full p-5 text-white bg-cyan-500 "
        >
          <i className="fa-sharp fa-solid fa-plus m-2"></i>
        </button>
        <ul class="absolute z-0 flex translate-y-full flex-col items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[60%] group-hover:opacity-100">
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="hover:scale-110 mx-5 mb-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
            >
              <i class="fa-solid fa-eye"></i>
            </div>
          </li>
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="hover:scale-110 mx-5 mb-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
            >
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
          </li>
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              className="hover:scale-110 mx-5 mb-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
            >
              <i class="fa-solid fa-music"></i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default index;
