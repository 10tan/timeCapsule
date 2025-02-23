import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Timer from "./Timer";

function Main() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const time = parseInt(queryParams.get("time"), 10) || 0; // Extract time from URL

    return (
        <div>
            <Navbar />
            <Timer initialTime={time} /> {/* Pass time as prop */}
        </div>
    );
}

export default Main;
