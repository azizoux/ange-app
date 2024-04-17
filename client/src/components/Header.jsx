import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

("use client");

function Header() {
  return (
    <Navbar className="border-b-2 bg-blue-300">
      <Link
        to="/home"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 rounded-lg text-slate-200 bg-gradient-to-r from-blue-700 via-yellow-300 to-red-600">
          Bougoudimi's
        </span>
        Technology
      </Link>
      <div className="flex gap-3">
        <form>
          <TextInput type="text" placeholder="search" />
        </form>

        <Button className="flex items-center px-2 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
          <AiOutlineSearch />
        </Button>
      </div>
    </Navbar>
  );
}

export default Header;
