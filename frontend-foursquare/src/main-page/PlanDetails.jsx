import { useState } from "react";
import { MapPin, Clock, Route, Camera, Utensils, Building, Activity } from "lucide-react";

// PlanDetails.jsx
export default function PlanDetails() {
  const [tripDetails, setTripDetails] = useState({
    title: "Delhi Sightseeing Trip",
    duration: "3 Days / 2 Nights",
    distance: "120 km total travel",
    locations: [
      {
        name: "Red Fort",
        photos: ["/assets/redfort1.jpg", "/assets/redfort2.jpg"],
        description: "A historic fort in Delhi, showcasing Mughal architecture.",
        dailyPlan: [
          { day: 1, food: "Local street food", hotel: "Hotel Taj Palace", activities: "Guided tour, Photography" },
        ],
      },
      {
        name: "India Gate",
        photos: ["/assets/indiagate1.jpg", "/assets/indiagate2.jpg"],
        description: "A war memorial and popular picnic spot.",
        dailyPlan: [
          { day: 1, food: "Picnic snacks", hotel: "Hotel Taj Palace", activities: "Evening walk, Sightseeing" },
        ],
      },
      {
        name: "Qutub Minar",
        photos: ["/assets/qutub1.jpg", "/assets/qutub2.jpg"],
        description: "Tallest brick minaret in India with rich history.",
        dailyPlan: [
          { day: 2, food: "Local cuisine nearby", hotel: "Hotel Taj Palace", activities: "Guided tour" },
        ],
      },
    ],
    notes: "Remember to carry water, wear comfortable shoes, and follow local guidelines.",
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-6 lg:p-8">
      <div className="w-full">
        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden w-full">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 sm:p-8 text-white">
            <div className="space-y-4">
              {/* Trip Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {tripDetails.title}
              </h1>
              
              {/* Trip Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-white/90" />
                    <div>
                      <p className="text-white/80 text-sm font-medium">Duration</p>
                      <p className="text-white font-semibold">{tripDetails.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    <Route className="w-6 h-6 text-white/90" />
                    <div>
                      <p className="text-white/80 text-sm font-medium">Distance</p>
                      <p className="text-white font-semibold">{tripDetails.distance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Locations */}
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-orange-600" />
                Destinations
              </h2>
              
              {tripDetails.locations.map((location, index) => (
                <div key={index} className="bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  {/* Location Header */}
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                      {index + 1}. {location.name}
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                      {location.description}
                    </p>
                  </div>

                  {/* Photos Gallery */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-4 h-4 text-orange-600" />
                      <h4 className="font-semibold text-gray-800">Gallery</h4>
                    </div>
                    <div className="w-1/2">
                      <div className="group cursor-pointer">
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-400 group-hover:scale-102">
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <Camera className="w-12 h-12" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Plan */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-orange-600" />
                      Daily Plan
                    </h4>
                    <div className="space-y-4">
                      {location.dailyPlan.map((plan, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Day {plan.day}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Food */}
                            <div className="flex items-start gap-3">
                              <div className="bg-orange-100 p-2 rounded-xl">
                                <Utensils className="w-5 h-5 text-orange-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 mb-1">Food</p>
                                <p className="text-gray-600 text-sm">{plan.food}</p>
                              </div>
                            </div>
                            
                            {/* Hotel */}
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-100 p-2 rounded-xl">
                                <Building className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 mb-1">Hotel</p>
                                <p className="text-gray-600 text-sm">{plan.hotel}</p>
                              </div>
                            </div>
                            
                            {/* Activities */}
                            <div className="flex items-start gap-3">
                              <div className="bg-green-100 p-2 rounded-xl">
                                <Activity className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 mb-1">Activities</p>
                                <p className="text-gray-600 text-sm">{plan.activities}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Notes Section */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-amber-200 w-full">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="bg-amber-200 p-2 rounded-xl">
                  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Important Notes
              </h4>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg bg-white/50 rounded-2xl p-4 sm:p-6">
                {tripDetails.notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
