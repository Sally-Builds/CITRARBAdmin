import React from "react";

const index = () => {
  return (
    <>
      <aside className="col-span-12 md:col-span-4 p-4" id="aside">
        <ul class="flex flex-col bg-gray-50 p-4">
          <li className="text-center text-lg text-neutral-600">
            Most Active Users
          </li>
          <li class="border-gray-400 flex flex-row mb-2">
            <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div class="flex items-center space-x-4">
                <img
                  class="w-10 h-10 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt=""
                />
                <div class="font-medium dark:text-white">
                  <div>Jese Leos</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    Joined in August 2014
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="flex flex-col bg-gray-50 p-4">
          <li className="text-center text-lg text-neutral-600">
            Latest Events
          </li>
          <li class="border-gray-400 flex flex-row mb-2">
            <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div class="flex-1 pl-1 mr-16">
                <div class="font-medium text-neutral-700">
                  Bon Fire de la passion
                </div>
                <div class="text-gray-600 text-sm">24 Umuezebi street</div>
              </div>
              <div class="text-gray-600 text-xs">6:00 AM</div>
            </div>
          </li>
          <li class="border-gray-400 flex flex-row mb-2">
            <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div class="flex-1 pl-1 mr-16">
                <div class="font-medium text-neutral-700">
                  Bon Fire de la passion
                </div>
                <div class="text-gray-600 text-sm">24 Umuezebi street</div>
              </div>
              <div class="text-gray-600 text-xs">6:00 AM</div>
            </div>
          </li>
          <li class="border-gray-400 flex flex-row mb-2">
            <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div class="flex-1 pl-1 mr-16">
                <div class="font-medium text-neutral-700">
                  Bon Fire de la passion
                </div>
                <div class="text-gray-600 text-sm">24 Umuezebi street</div>
              </div>
              <div class="text-gray-600 text-xs">6:00 AM</div>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default index;
