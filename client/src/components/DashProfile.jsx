import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";

const DashProfile = () => {
  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"></div>
        <TextInput type="text" id="username" placeholder="username" />
        <TextInput type="email" id="email" placeholder="email" />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-blue-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
