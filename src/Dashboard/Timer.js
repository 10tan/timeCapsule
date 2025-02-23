// import { useState, useEffect } from "react";
// import "./CountdownTimer.css";
// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// export default function CountdownTimer({initialTime, isDarkMode }) {
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(true);
//   //const [inputTime, setInputTime] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     let interval;
//     if (isRunning && time > 0) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime - 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//       if (isRunning && time === 0) {
//         // Timer reached zero, send email
//         const sendEmail = async () => {
//           try {
//             const token = localStorage.getItem("token");
//             await axios.post(
//               "http://localhost:5000/api/email/send-email",
//               {},
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             console.log("Email sent successfully!");
//           } catch (error) {
//             console.error("Error sending email:", error);
//             if(error.response && error.response.data && error.response.data.error){
//                 console.error("Server error message:", error.response.data.error);
//             }
//           }
//         };
//         sendEmail();
//         setIsRunning(false);
//         navigate("/user-photos"); // Stop the timer
//       }
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, time,navigate]);
//   useEffect(() => {
//     if (initialTime > 0) { // Only reset if initialTime is greater than 0
//         setTime(initialTime);
//         setIsRunning(true);
//     }
// }, [initialTime]);

//   const formatTime = (seconds) => {
//     const years = Math.floor(seconds / 31536000);
//     const months = Math.floor((seconds % 31536000) / 2592000);
//     const days = Math.floor((seconds % 2592000) / 86400);
//     const hours = Math.floor((seconds % 86400) / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     if (years > 0) return `${years}y ${months}m`;
//     if (months > 0) return `${months}m ${days}d`;
//     if (days > 0) return `${days}d ${hours}h`;
//     if (hours > 0) return `${hours}h ${minutes}m`;
//     return `${minutes}m ${remainingSeconds}s`;
//   };

//   /*const handleStart = () => {
//     const seconds = parseInt(inputTime, 10);
//     if (!isNaN(seconds) && seconds > 0) {
//       setTime(seconds);
//       setIsRunning(true);
//     }
//   };*/

//   return (
//     <div className={isDarkMode ? "dark-mode" : "light-mode"}>
//         <div className="timer">{formatTime(time)}</div>
//         <div className="button-container">
//             <button onClick={() => setIsRunning(false)} className="button">
//                 Stop
//             </button>
//             <button
//                 onClick={() => {
//                     setTime(initialTime); // Reset to initialTime
//                     setIsRunning(true);
//                 }}
//                 className="button"
//             >
//                 Reset
//             </button>
//         </div>
//     </div>
// );
// }





// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "./CountdownTimer.css";

// export default function CountdownTimer() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const initialTime = parseInt(queryParams.get("time"), 10) || 0; // Read time from URL

//     const [time, setTime] = useState(initialTime);
//     const [isRunning, setIsRunning] = useState(true);

//     useEffect(() => {
//         let interval;
//         if (isRunning && time > 0) {
//             interval = setInterval(() => {
//                 setTime((prevTime) => prevTime - 1);
//             }, 1000);
//         } else {
//             clearInterval(interval);
//             if (isRunning && time === 0) {
//                 sendEmail();
//                 setIsRunning(false);
//                 navigate("/user-photos"); // Redirect when timer ends
//             }
//         }
//         return () => clearInterval(interval);
//     }, [isRunning, time, navigate]);

//     const sendEmail = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             await axios.post(
//                 "http://localhost:5000/api/email/send-email",
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("Email sent successfully!");
//         } catch (error) {
//             console.error("Error sending email:", error);
//         }
//     };

//     return (
//         <div className="timer-container">
//             <div className="timer">{time}s</div>
//             <button onClick={() => setIsRunning(false)}>Stop</button>
//             <button onClick={() => { setTime(initialTime); setIsRunning(true); }}>Reset</button>
//         </div>
//     );
// }






import { useState, useEffect } from "react";
import "./CountdownTimer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CountdownTimer({ initialTime = 0, isDarkMode }) {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (initialTime > 0) {
            setTime(initialTime); // Set time from props when component mounts
            setIsRunning(true);
        }
    }, [initialTime]);

    useEffect(() => {
        let interval;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            if (isRunning && time === 0) {
                sendEmail(); // Send email when timer hits zero
                setIsRunning(false);
                navigate("/user-photos"); // Redirect after timer ends
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, time, navigate]);

    const sendEmail = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/api/email/send-email",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Email sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className={isDarkMode ? "dark-mode" : "light-mode"}>
            <div className="timer">{formatTime(time)}</div>
            <div className="button-container">
                <button onClick={() => setIsRunning(false)} className="button">
                    Stop
                </button>
                <button
                    onClick={() => {
                        setTime(initialTime); // Reset to initial time
                        setIsRunning(true);
                    }}
                    className="button"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
