import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import Dashboard from "../components/Dashboard";
import Provinces from "../components/Provinces";
import Candidates from "../components/Candidates";

const Home = () => {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "dashboard" && <Dashboard />}
      {tab === "provinces" && <Provinces />}
      {tab === "candidates" && <Candidates />}
    </div>
  );
};

export default Home;
