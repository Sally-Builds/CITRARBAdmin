import React, { useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Carousel } from "react-responsive-carousel";
import EventsContext from "../../context/eventsContext";

const Index = ({ data }) => {
  const [isOpenView, setIsOpenView] = useState(false);
  const [hookup, setHookup] = useState(null);

  const { chooseWinner } = useContext(EventsContext);

  function closeViewModal() {
    setIsOpenView(false);
  }

  async function submit(userId) {
    await chooseWinner(hookup._id, userId);
    // setIsOpenView(false);
  }

  function openViewModal(index) {
    setHookup(data[index]);
    console.log(data[index], "oh yes");
    setIsOpenView(true);
  }
  return (
    <>
      <div className="block w-full overflow-x-auto ">
        {data ? (
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-neutral-600 text-white">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  SN
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Start Date
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  End Date
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  status
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Winner
                </th>
              </tr>
            </thead>

            <tbody className="bg-neutral-100 text-neutral-500">
              {data.map((data, i) => (
                <tr
                  key={i}
                  className={"hover:bg-gray-50 cursor-pointer"}
                  onClick={() => openViewModal(i)}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {i + 1}
                  </th>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {new Date(data.startDate).toDateString()}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    end
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {data.status == "active" ? (
                      <i className="fas fa-circle text-green-500 mr-2"></i>
                    ) : (
                      <i className="fas fa-circle text-red-500 mr-2"></i>
                    )}
                    {data.status}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    <div className="flex">
                      <div className="group relative flex justify-center">
                        <img
                          src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png"
                          alt="..."
                          className="w-10 m-4 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                        />
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
                  <article className="overflow-hidden rounded-lg">
                    {hookup && hookup.images.length > 0 ? (
                      <>
                        <Carousel showThumbs={false} showIndicators={false}>
                          {hookup.images.map((el) => (
                            <>
                              <div>
                                <img
                                  alt=""
                                  src={
                                    `${process.env.REACT_APP_BASE_URL}/` +
                                    el.image
                                  }
                                />
                                <div className="pt-2 font-bold">
                                  {el.userId.username}
                                </div>
                              </div>
                              <div className="text-centers pt-6">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={() => submit(el.userId._id)}
                                >
                                  Choose as Winner
                                </button>
                              </div>
                            </>
                          ))}
                        </Carousel>
                      </>
                    ) : (
                      <div className="text-center font-bold pt-4">
                        <span> No Uploads yet</span>
                      </div>
                    )}
                  </article>

                  <div className="text-center mt-12">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeViewModal}
                    >
                      Exit
                    </button>
                  </div>
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
