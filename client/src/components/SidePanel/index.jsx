import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import UsersContext from "../../context/usersContext";

const Index = () => {
  const { featAggregates, recentEvents } = useContext(UsersContext);

  const data = {
    labels: featAggregates.label,
    datasets: [
      {
        label: "# of Votes",
        data: featAggregates.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <aside className="col-span-12 md:col-span-4 p-4 bg-gray-300" id="aside">
        <div className="p-4">
          <Doughnut data={data} />
        </div>
        <ul class="flex flex-col p-4">
          <li className="text-center text-lg font-semibold pb-2 text-neutral-600">
            Latest Events
          </li>
          {recentEvents.length > 0 &&
            recentEvents.map((el) => (
              <li class="border-gray-400 flex flex-row mb-2">
                <div class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  <div class="flex-1 pl-1 mr-16">
                    <div class="font-medium text-neutral-700">{el.name}</div>
                    <div class="text-gray-600 text-sm">{el.location}</div>
                  </div>
                  <div class="text-gray-600 text-xs">6:00 AM</div>
                </div>
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
};

export default Index;
