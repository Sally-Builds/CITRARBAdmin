import React, { useContext, useState, Fragment } from "react";
import UsersContext from "../../../context/usersContext";
import { Dialog, Transition } from "@headlessui/react";

const Index = () => {
  const { users, userInfo, info } = useContext(UsersContext);

  let [isOpenDelete, setIsOpenDelete] = useState(false);
  let [isOpenView, setIsOpenView] = useState(false);
  const [index, setIndex] = useState(-1);

  function closeDeleteModal() {
    setIsOpenDelete(false);
  }

  function openDeleteModal() {
    setIsOpenDelete(true);
  }

  function closeViewModal() {
    setIsOpenView(false);
  }

  function openViewModal() {
    setIsOpenView(true);
  }

  async function getUser(i) {
    try {
      console.log(users[i]);
      await userInfo(users[i]._id).then(() => {
        setIndex(i);
        openViewModal();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="block w-full overflow-x-auto ">
        {users.length > 0 ? (
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="bg-neutral-600 text-white">
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  SN
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  username
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  email
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                  photo
                </th>
                <th className="px-6 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap text-left">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </th>
              </tr>
            </thead>

            <tbody className="bg-neutral-100 text-neutral-500">
              {users.map((user, i) => (
                <tr key={i}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {i + 1}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.username}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/${user.photo}`}
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i
                      className="text-md cursor-pointer fa-solid fa-eye hover:text-blue-400"
                      onClick={() => getUser(i)}
                    ></i>
                    {/* <i
                      className="fa-sharp fa-solid fa-trash text-md cursor-pointer p-2 hover:text-red-400"
                      onClick={openDeleteModal}
                    ></i> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-xl font-bold">No Users</div>
        )}
      </div>

      <Transition appear show={isOpenDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this user? Action is not
                      reversible
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-9 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteModal}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeDeleteModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
                  {index >= 0 && info && (
                    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 mt-16">
                      <div class="px-6">
                        <div class="flex flex-wrap justify-center">
                          <div class="w-full px-4 flex justify-center">
                            <div class="relative">
                              <img
                                alt="user profile"
                                src={`${process.env.REACT_APP_BASE_URL}/${users[index].photo}`}
                                class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                              />
                            </div>
                          </div>
                          <div class="w-full px-4 text-center mt-20">
                            <div class="flex justify-center py-4 lg:pt-4 pt-8">
                              <div class="mr-4 p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                  {info.eyeWitness}
                                </span>
                                <span class="text-sm text-blueGray-400">
                                  Eye Witness
                                </span>
                              </div>
                              <div class="mr-4 p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                  {info.music}
                                </span>
                                <span class="text-sm text-blueGray-400">
                                  Music
                                </span>
                              </div>
                              <div class="lg:mr-4 p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                  {info.market}
                                </span>
                                <span class="text-sm text-blueGray-400">
                                  Market Place
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="w-full px-4 text-center">
                            <div class="flex justify-center py-4 lg:pt-4 pt-8">
                              <div class="mr-4 p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                  {info.friend}
                                </span>
                                <span class="text-sm text-blueGray-400">
                                  Friends
                                </span>
                              </div>
                              <div class="mr-4 p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                  {info.event}
                                </span>
                                <span class="text-sm text-blueGray-400">
                                  Events
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="text-center mt-12">
                          <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                            {users[index].username}
                          </h3>
                          <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                            <i class="fa-regular fa-envelope mr-2 text-lg text-blueGray-400"></i>
                            {users[index].email}
                          </div>
                        </div>

                        <div className="text-center mt-12">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeViewModal}
                          >
                            Exit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
