import React, { useState, useContext, useEffect, Fragment } from "react";
import "./index.css";
import { Tab, Dialog, Transition } from "@headlessui/react";
import EventsContext from "../../../context/eventsContext";
import HookupTable from "../../../components/HookupTable";
import { useParams, useNavigate } from "react-router-dom";
import HookupForm from "../../../components/HookupForm";

const Index = () => {
  const { getHookups, hookups } = useContext(EventsContext);

  useEffect(() => {
    getHookups();
  }, []);

  let [isOpenView, setIsOpenView] = useState(false);
  const { gender } = useParams();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const history = useNavigate();

  console.log("gender", gender);
  const data = [
    {
      header: "MCM (Male)",
      content:
        hookups.length > 0 ? (
          <HookupTable data={hookups.filter((el) => el.gender === gender)} />
        ) : (
          <HookupTable data={hookups} />
        ),
      gender: "male",
    },
    {
      header: "WCW (Female)",
      content:
        hookups.length > 0 ? (
          <HookupTable data={hookups.filter((el) => el.gender === gender)} />
        ) : (
          <HookupTable data={hookups} />
        ),
      gender: "female",
    },
  ];

  function closeViewModal() {
    setIsOpenView(false);
  }

  function openViewModal(index) {
    setIsOpenView(true);
  }

  function onTabChange(index) {
    history(`/dashboard/hookup/${data[index].gender}`);
  }

  function getDefaultTab() {
    const val = data.findIndex((el) => el.gender === gender);

    return val < 0 ? 0 : val;
  }

  return (
    <>
      <Tab.Group onChange={onTabChange} defaultIndex={getDefaultTab()}>
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

      <div>
        <button
          onClick={openViewModal}
          title="Create Contest"
          className="fixed bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-400 hover:drop-shadow-2xl"
        >
          <i className="fa-sharp fa-solid fa-plus m-2"></i>
        </button>
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
                  <HookupForm />
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
