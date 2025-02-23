import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FileUploader() {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [glow, setGlow] = useState(false);
    const [shake, setShake] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showAddMore, setShowAddMore] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [profileTitle, setProfileTitle] = useState("");
    const [positiveInteger, setPositiveInteger] = useState("");
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const storedProfileTitle = localStorage.getItem("profileInput");
        if (storedProfileTitle) {
            setProfileTitle(storedProfileTitle);
        }
    }, []);

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

    const handlePositiveIntegerChange = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, ""); // Ensure only positive integers
        setPositiveInteger(value);
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
        setUploading(true);
        event.preventDefault();

        for (const file of files) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("positiveInteger", positiveInteger);

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
        setUploading(false);
        navigate(`/dashboard?time=${positiveInteger}`);
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
                            <input type="text" className="form-control" value={profileTitle} onChange={(e) => setProfileTitle(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter a positive integer:</label>
                            <input type="text" className="form-control" value={positiveInteger} onChange={handlePositiveIntegerChange} required />
                        </div>
                        <button type="submit" className="btn btn-success" disabled={uploading}>
                            {uploading ? "Uploading..." : "Submit Upload"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
