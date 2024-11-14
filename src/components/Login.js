import React from "react";
import { MdOutlineCancel } from "react-icons/md";

export default function Login({ onClose}) {

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50  bg-black bg-opacity-80">
      <div className="relative w-1/4 border border-black p-9 rounded-lg bg-white bg-opacity-90">
        <button className="absolute p-1 top-2 right-2" onClick={onClose}>
          <MdOutlineCancel size={30} />
        </button>
        <h1 className="text-3xl font-bold mb-7 flex items-center justify-center">Login</h1>
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Username" className="border border-gray-400 p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="border border-gray-400 p-2 rounded-lg" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Login</button>
        </form>
      </div>
    </div>
  );
}