import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import AuthContext from "../../context/authContext";

const Index = () => {
  const { logout } = useContext(AuthContext);

  const Links = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Events",
      link: "/dashboard/events",
    },
    {
      name: "Users",
      link: "/dashboard/users",
    },
    {
      name: "Uploads",
      link: "/dashboard/uploads/eyewitness",
    },
    {
      name: "Contest",
      link: "/dashboard/hookup/male",
    },
  ];
  return (
    <>
      <div
        id="navbar"
        className="col-span-12 h-[3.75rem] px-4 flex items-center"
      >
        <nav
          class="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
          data-te-navbar-ref
        >
          <div class="flex w-full flex-wrap items-center justify-between px-3">
            <button
              class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="[&>svg]:w-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-7 w-7"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>

            <div
              class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
              id="navbarSupportedContent1"
              data-te-collapse-item
            >
              <a
                class="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                href="/"
              >
                <img
                  src={Logo}
                  style={{ height: "25px" }}
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul
                class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
                data-te-navbar-nav-ref
              >
                {Links.map((link, i) => (
                  <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <Link
                      className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                      to={`${link.link}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div class="relative flex items-center">
              <button
                class="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Index;
