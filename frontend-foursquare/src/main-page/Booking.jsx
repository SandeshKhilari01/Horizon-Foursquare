import { useState } from "react";

export default function Booking() {
  const [activeTab, setActiveTab] = useState("accommodation");
  const [selectedTransport, setSelectedTransport] = useState(null);

  const tabs = [
    { id: "accommodation", label: "Accommodation" },
    { id: "transport", label: "Transport" },
    { id: "food", label: "Food & Restaurant" },
  ];

  const transportButtons = [
    { id: "flight", label: "Book Flight" },
    { id: "train", label: "Book Train" },
    { id: "bus", label: "Book Bus" },
  ];

  const buttonStyle = (isSelected) => ({
    padding: "10px 20px",
    borderRadius: "10px",
    border: "2px solid #1E3A8A", // Blue border
    backgroundColor: isSelected ? "#1E3A8A" : "#fff",
    color: isSelected ? "#fff" : "#1E3A8A",
    fontWeight: "600",
    cursor: "pointer",
    minWidth: "140px",
    transition: "0.3s",
  });

  return (
    <div style={{
      width: "100%", // full screen width
      margin: "0 auto",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff"
    }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#000" }}>
        Booking Options
      </h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              fontWeight: "600",
              cursor: "pointer",
              backgroundColor: activeTab === tab.id ? "#F97316" : "#E5E7EB",
              color: activeTab === tab.id ? "#fff" : "#000",
              border: "none",
              transition: "0.3s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking Content */}
      <div style={{ marginTop: "20px" }}>
        {/* Accommodation */}
        {activeTab === "accommodation" && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#F97316", marginBottom: "10px" }}>
              Available Hotels:
            </h3>
            <ul style={{ color: "#000", paddingLeft: "20px", listStyleType: "disc" }}>
              <li>Hotel Taj Palace - ₹5000/night</li>
              <li>Heritage Inn - ₹3000/night</li>
              <li>City Lodge - ₹2500/night</li>
            </ul>
          </div>
        )}

        {/* Transport */}
        {activeTab === "transport" && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#1E3A8A", marginBottom: "10px" }}>
              Choose Your Transport:
            </h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {transportButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    setSelectedTransport(btn.id);

                    // Redirect to respective booking site
                    if (btn.id === "flight") window.open("https://www.makemytrip.com/flights/", "_blank");
                    else if (btn.id === "train") window.open("https://www.irctc.co.in/", "_blank");
                    else if (btn.id === "bus") window.open("https://www.redbus.in/", "_blank");
                  }}
                  style={buttonStyle(selectedTransport === btn.id)}
                  onMouseOver={(e) => !selectedTransport === btn.id && (e.currentTarget.style.backgroundColor = "#93C5FD")}
                  onMouseOut={(e) => !selectedTransport === btn.id && (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            {selectedTransport && (
              <p style={{ marginTop: "10px", color: "#1E3A8A", fontWeight: "600" }}>
                Selected Transport: {transportButtons.find((t) => t.id === selectedTransport).label}
              </p>
            )}
          </div>
        )}

        {/* Food */}
        {activeTab === "food" && (
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#F97316", marginBottom: "10px" }}>
              Restaurants & Meals:
            </h3>
            <ul style={{ color: "#000", paddingLeft: "20px", listStyleType: "disc" }}>
              <li>Local Cuisine - ₹300/person</li>
              <li>Fine Dining - ₹1000/person</li>
              <li>Street Food Tour - ₹500/person</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
