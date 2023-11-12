import React, { Fragment, useState, useContext } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import SidePanel from "../../../components/SidePanel";
import UsersContext from "../../../context/usersContext";

const people = [
  { name: "all" },
  { name: "2023" },
  { name: "2022" },
  { name: "2021" },
];
const Index = () => {
  const [selected, setSelected] = useState(people[0]);
  const { userAggregates, userAgg } = useContext(UsersContext);

  const test = (e) => {
    setSelected(e);
    if (e.name !== "all") {
      userAgg(e.name);
    } else {
      userAgg();
    }
    console.log(e.name);
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8 p-4 h-[calc(100vh-3.75rem)]">
          <div className="w-32">
            <Listbox value={selected} onChange={test}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <Line
            datasetIdKey="id"
            data={{
              labels: userAggregates.label,
              datasets: [
                {
                  label: "users",
                  data: userAggregates.data,
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
        <SidePanel />
      </div>
    </>
  );
};

export default Index;
