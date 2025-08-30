import ChatBox from "./ChatBox";
import MapBox from "./MapBox";
import PlanDetails from "./PlanDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoadMap from "./RoadMap";
import Booking from "./Booking"; // <-- Import Booking component

export default function MainPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col gap-0.1">
      {/* Navbar */}
      <Navbar className="sticky top-0 z-50" />

      {/* Main Content */}
      <div className="flex flex-col gap-1 p-1 mt-[60px]">
        {/* Top Row - ChatBox (left) and MapBox (right) */}
        <div className="flex flex-col md:flex-row gap-1">
          {/* Left - ChatBox */}
          <div className="flex-none w-full md:w-[450px] rounded-2xl shadow-2xl p-0.5 border border-gray-200">
            <ChatBox />
          </div>

          {/* Right - MapBox */}
          <div className="flex-1 rounded-2xl shadow-2xl p-0.5 border border-gray-200">
            <MapBox />
          </div>
        </div>

        {/* RoadMap - styled like other cards */}
        <div className="w-full min-h-100 rounded-2xl shadow-2xl p-0.5 border border-gray-200">
          <RoadMap />
        </div>

        {/* PlanDetails */}
        <div className="min-w-screen rounded-2xl shadow-2xl p-0.5 border border-gray-200">
          <PlanDetails />
        </div>

        {/* Booking - styled like other cards */}
        <div className="w-full rounded-2xl shadow-2xl p-0.5 border border-gray-200">
          <Booking />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
