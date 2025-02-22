import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  // Upload Image
  const uploadImage = async () => {
    if (!image || !userId) {
      alert("Please select an image or log in.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/images/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      fetchUserImages(); // Refresh images
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Fetch User Images
  const fetchUserImages = async () => {
    if (!userId) return;

    try {
      const response = await axios.get("http://localhost:5000/api/images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Delete Image
  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    fetchUserImages();
  }, [userId]);

  return (
    <div>
      <h2>Upload Your Image</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={uploadImage}>Upload</button>

      <h3>Your Uploaded Images</h3>
      <div>
        {userImages.map((img) => (
          <div key={img._id}>
            <img src={img.imageUrl} alt="User Upload" width="100" />
            <button onClick={() => deleteImage(img._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
