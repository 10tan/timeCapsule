import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserPhotos() {
    const [imgurl, setImgurl] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImgurl = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/ph/photos", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("API Response:", response.data);

                const extractedUrls = Array.isArray(response.data.imgurl)
                    ? response.data.imgurl
                    : Object.values(response.data.imgurl);

                setImgurl(extractedUrls);
            } catch (error) {
                console.error("Error fetching imgurl:", error);
            }
        };

        fetchImgurl();
    }, []);

    const isVideo = (url) => {
        const videoExtensions = ['.mp4', '.webm', '.ogg'];
        const lowerCaseUrl = url.toLowerCase();
        return videoExtensions.some(ext => lowerCaseUrl.endsWith(ext));
    };

    const handleBackButtonClick = () => {
        navigate("/profile");
    };

    return (
        <div>
            <h2>Your Photos and Videos</h2>
            <button onClick={handleBackButtonClick}>Back</button> {/* Added Back button */}
            {imgurl.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {imgurl.map((url, index) => (
                        <div key={index} style={{ maxWidth: "300px", margin: "10px" }}>
                            {isVideo(url) ? (
                                <video controls width="100%">
                                    <source src={url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={url} alt={`User Media ${index}`} width="100%" />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No media found.</p>
            )}
        </div>
    );
}