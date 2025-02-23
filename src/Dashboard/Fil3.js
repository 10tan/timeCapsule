// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import Navbar from './Navbar';
// import CountdownTimer from './Timer';
// export default function FileUploader() {
//     const [files, setFiles] = useState([]);
//     const [time, setTime] = useState(0); // Initialize time state

//     const handleFileChange = (event) => {
//         const selectedFiles = Array.from(event.target.files);
//         if (!selectedFiles.length) return;
//         setFiles(selectedFiles);
//     };

//     const handleTimeChange = (event) => {
//         setTime(parseInt(event.target.value, 10) || 0); // Parse time input
//     };

//     const handleUpload = async () => {
//         if (!files.length) return;

//         for (const file of files) {
//             const formData = new FormData();
//             formData.append("image", file);
//             formData.append("time", time); // Append time to form data

//             try {
//                 const response = await axios.post(
//                     "http://localhost:5000/api/img",
//                     formData,
//                     {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                             Authorization: `Bearer ${
//                                 typeof window !== "undefined" && localStorage.getItem("token")
//                             }`,
//                         },
//                     }
//                 );

//                 console.log("Upload successful:", response.data);
//             } catch (error) {
//                 if (error.response) {
//                     console.error("Upload failed:", error.response.data.message);
//                 } else if (error.request) {
//                     console.error("Network error:", error.request);
//                 } else {
//                     console.error("Error uploading file:", error.message);
//                 }
//             }
//         }
//         setFiles([]);
//         document.querySelector("input[type=file]").value = "";
//         setTime(0); // Reset time input
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="container mt-5">
//                 <div className="card p-4 shadow-lg">
//                     <h2 className="text-center mb-4">Upload Images & Videos</h2>
//                     <input
//                         type="file"
//                         className="form-control mb-3"
//                         accept="image/*, video/*"
//                         multiple
//                         onChange={handleFileChange}
//                     />
//                     <input
//                         type="number"
//                         className="form-control mb-3"
//                         placeholder="Time (seconds)"
//                         value={time}
//                         onChange={handleTimeChange}
//                     />
//                     <button className="btn btn-primary" onClick={handleUpload}>
//                         Upload Files
//                     </button>
//                     <CountdownTimer initialTime={time} />
//                     <div className="row mt-3">
//                         {files.map((file, index) => (
//                             <div key={index} className="col-md-4 mb-3">
//                                 {file.type.startsWith("image") ? (
//                                     <img
//                                         src={URL.createObjectURL(file)}
//                                         className="img-fluid rounded shadow-sm"
//                                         alt="uploaded"
//                                     />
//                                 ) : (
//                                     <video controls className="img-fluid rounded shadow-sm">
//                                         <source src={URL.createObjectURL(file)} type={file.type} />
//                                     </video>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FileUploader() {
    const [files, setFiles] = useState([]);
    const [time, setTime] = useState(0);
    const navigate = useNavigate(); // Initialize navigation

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (!selectedFiles.length) return;
        setFiles(selectedFiles);
    };

    const handleTimeChange = (event) => {
        setTime(parseInt(event.target.value, 10) || 0);
    };

    const handleUpload = async (event) => {
        event.preventDefault(); // Prevent unintended form submission

        if (!files.length) return;

        for (const file of files) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("time", time);

            try {
                await axios.post(
                    "http://localhost:5000/api/img",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${
                                typeof window !== "undefined" && localStorage.getItem("token")
                            }`,
                        },
                    }
                );

                console.log("Upload successful");

                // Redirect to Dashboard with time as query parameter
                navigate(`/dashboard?time=${time}`);
            } catch (error) {
                if (error.response) {
                    console.error("Upload failed:", error.response.data.message);
                } else if (error.request) {
                    console.error("Network error:", error.request);
                } else {
                    console.error("Error uploading file:", error.message);
                }
            }
        }

        setFiles([]);
        document.querySelector("input[type=file]").value = "";
        setTime(0);
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-lg">
                <h2 className="text-center mb-4">Upload Images & Videos</h2>
                <input
                    type="file"
                    className="form-control mb-3"
                    accept="image/*, video/*"
                    multiple
                    onChange={handleFileChange}
                />
                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Time (seconds)"
                    value={time}
                    onChange={handleTimeChange}
                />
                <button className="btn btn-primary" onClick={handleUpload}>
                    Upload & Go to Dashboard
                </button>
            </div>
        </div>
    );
}
