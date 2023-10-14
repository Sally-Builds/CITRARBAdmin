import React, { useState, Fragment } from "react";
import "./index.css";
import { Tab, Dialog, Transition } from "@headlessui/react";
import Music from "../../../components/Music";
import EyeWitness from "../../../components/EyeWitness";
import Market from "../../../components/Market";
import EyeWitnessForm from "../../../components/EyeWitnessForm";
import MusicForm from "../../../components/MusicForm";
import MarketForm from "../../../components/MarketForm";

const Index = () => {
  let [isOpenView, setIsOpenView] = useState(false);
  let [formView, setFormView] = useState("");
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const data = [
    {
      header: "Eye-witness",
      content: <EyeWitness />,
      form: <EyeWitnessForm />,
    },
    {
      header: "Market Place",
      content: <Market />,
      form: <MarketForm />,
    },
    {
      header: "Music",
      content: <Music />,
      form: <MusicForm />,
    },
  ];

  function closeViewModal() {
    setIsOpenView(false);
  }

  function openViewModal(index) {
    setFormView(data[index].form);
    setIsOpenView(true);
  }

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
          className="hover:scale-110  mt-3 cursor-pointer rounded-full p-5 text-white bg-cyan-500"
        >
          <i className="fa-sharp fa-solid fa-plus m-2"></i>
        </button>
        <ul class="absolute z-0 flex translate-y-full flex-col items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-[60%] group-hover:opacity-100">
          <li>
            <div
              data-te-ripple-init
              data-te-ripple-color="light"
              data-te-ripple-centered="true"
              onClick={() => openViewModal(0)}
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
              onClick={() => openViewModal(1)}
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
              onClick={() => openViewModal(2)}
            >
              <i class="fa-solid fa-music"></i>
            </div>
          </li>
        </ul>
      </div>

      <Transition appear show={isOpenView} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeViewModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* <EyeWitnessForm /> */}
                  {formView}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Index;
