import React, { useContext, useState, Fragment, useEffect } from "react";
import "./index.css";
import EventsContext from "../../../context/eventsContext";
import { Dialog, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Index = () => {
  const { events, createEvent } = useContext(EventsContext);

  let [isOpen, setIsOpen] = useState(false);
  let [date, setDate] = useState(new Date());
  let [name, setName] = useState("");
  let [location, setLocation] = useState("");
  let [description, setDescription] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        time: date,
        location,
        description,
        verified: true,
      };
      await createEvent(data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="block w-full overflow-x-auto ">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead className="bg-neutral-600 text-white">
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                SN
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Event Name
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                location
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Date
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Organizer(s)
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Attendees
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Rating
              </th>
            </tr>
          </thead>

          <tbody className="bg-neutral-100 text-neutral-500">
            {events.map((data, i) => (
              <tr key={i} className={"hover:bg-gray-50 cursor-pointer"}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {i + 1}
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {data.name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {data.location}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>
                  {data.time}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <div className="group relative flex justify-center">
                      <img
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png"
                        alt="..."
                        className="w-10 m-4 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                        ✨ {data.host.username}
                      </span>
                    </div>
                    {/* co -hosts */}
                    {/* <div className="group relative flex justify-center">
                      <img
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png"
                        alt="..."
                        className="w-10 m-4 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                        ✨ You hover me!
                      </span>
                    </div> */}
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {data.numberOfAttendee}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i>4.5
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-500 text-center"
                  >
                    Add event
                    <hr className="my-3" />
                  </Dialog.Title>
                  <form
                    className="space-y-4 md:space-y-6"
                    action="#"
                    onSubmit={submitForm}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Bon fire"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Time
                      </label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Venue
                      </label>
                      <input
                        type="text"
                        name="venue"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="oakland hotels"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="password"
                        rows={4}
                        placeholder="about event"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-blue-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <button
        title="Create Event"
        className="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
        onClick={openModal}
      >
        <i className="fa-sharp fa-solid fa-plus m-2"></i>
      </button>
    </>
  );
};

export default Index;
