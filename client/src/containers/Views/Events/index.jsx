import React, { useContext, useState, Fragment } from "react";
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
  let [file, setFile] = useState(null);
  let [location, setLocation] = useState("");
  let [description, setDescription] = useState("");
  let [descriptionError, setDescriptionError] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    if (description.length < 25) {
      setDescriptionError("description must be not less than 25 characters");
      return;
    }
    try {
      var formData = new FormData();
      formData.set("name", name);
      formData.set("time", date);
      formData.set("location", location);
      formData.set("description", description);
      formData.set("verified", true);
      formData.append("image", file);
      await createEvent(formData);
      setName("");
      setDate(new Date());
      setLocation("");
      setDescription("");
      setDescriptionError("");
      setFile(null);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="block w-full overflow-x-auto ">
        {events ? (
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
              </tr>
            </thead>

            <tbody className="bg-neutral-100 text-neutral-500">
              {events.map((data, i) => (
                <tr key={i} className={"hover:bg-gray-50 cursor-pointer"}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {i + 1}
                  </th>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {data.name}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {data.location}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <i className="fas fa-circle text-orange-500 mr-2"></i>
                    {new Date(data.time).toDateString()}
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
                          {data.host && <>✨ {data.host.username}</>}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-xl font-bold">No Events</div>
        )}
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
                        name="name"
                        required
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
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="oakland hotels"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="default_size"
                      >
                        Event cover
                      </label>
                      <input
                        class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="default_size"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
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
                        required
                        rows={4}
                        minLength={25}
                        placeholder="about event"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <span className="text-red-500 text-xs">
                        {descriptionError}
                      </span>
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

      <div>
        <button
          title="Create Event"
          className="fixed bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-teal-400 hover:drop-shadow-2xl"
          onClick={openModal}
        >
          <i className="fa-sharp fa-solid fa-plus m-2"></i>
        </button>
      </div>
    </>
  );
};

export default Index;
