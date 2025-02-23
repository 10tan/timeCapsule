import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function FileUploader() {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [glow, setGlow] = useState(false);
    const [shake, setShake] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showAddMore, setShowAddMore] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [profileTitle, setProfileTitle] = useState("Default Title"); // Fetch this dynamically in real usage

    useEffect(() => {
        if (glow) setTimeout(() => setGlow(false), 1000);
        if (shake) setTimeout(() => setShake(false), 500);
    }, [glow, shake]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (!selectedFiles.length) return;

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setPreviews((prevPreviews) => [...prevPreviews, ...selectedFiles.map(file => URL.createObjectURL(file))]);
    };

    const handleUploadClick = () => {
        if (!files.length) {
            setGlow(true);
            return;
        }
        setUploadCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount > 1) {
                setShake(true);
            }
            return newCount;
        });
        setShowForm(true);
        setShowAddMore(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        for (const file of files) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                await axios.post("http://localhost:5000/api/img", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("Upload successful");
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }
        setFiles([]);
        setPreviews([]);
        setShowForm(false);
        setShowAddMore(false);
    };

    return (
        <div className="container mt-5">
            <style>{`
                .glow { box-shadow: 0 0 15px #00f !important; transition: 0.5s; }
                .shake { animation: shake 0.5s ease-in-out; background: rgba(255, 0, 0, 0.2); }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 80% { transform: translateX(-5px); }
                    40%, 60% { transform: translateX(5px); }
                }
            `}</style>
            
            <div className="card p-4 shadow-lg">
                <h2 className="text-center mb-4">Upload Images & Videos</h2>
                <input
                    type="file"
                    className={`form-control mb-3 ${glow ? "glow" : ""}`}
                    accept="image/*, video/*"
                    multiple
                    onChange={handleFileChange}
                />
                <div className="preview-container d-flex flex-wrap">
                    {previews.map((src, index) => (
                        <img key={index} src={src} alt="Preview" className="m-2" style={{ width: 100, height: 100, objectFit: "cover" }} />
                    ))}
                </div>
                <div className="d-flex mt-3">
                    <button className="btn btn-primary me-2" onClick={handleUploadClick}>Upload Files</button>
                    {showAddMore && <button className="btn btn-primary" onClick={() => document.getElementById("fileInput").click()}>Add More</button>}
                </div>
            </div>

            <input type="file" id="fileInput" className="d-none" accept="image/*, video/*" multiple onChange={handleFileChange} />

            {showForm && (
                <div className={`card p-4 mt-4 shadow-lg ${shake ? "shake" : ""}`}>
                    <h4 className="text-center mb-3">Confirm Upload</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Enter a title:</label>
                            <input type="text" className="form-control" value={profileTitle} required readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea className="form-control" rows="3" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Submit Upload</button>
                    </form>
                </div>
            )}
        </div>
    );
}
