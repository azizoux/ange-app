import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="bg-blue-200 h-screen ps-2 font-semibold text-md w-48">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/home?tab=dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/home?tab=candidates" icon={HiUser}>
            Candidats
          </Sidebar.Item>
          <Sidebar.Item href="/home?tab=provinces" icon={HiViewBoards}>
            Provinces
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Communes
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Elections
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
