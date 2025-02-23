# 🕒 TimeCapsule 2.0

TimeCapsule 2.0 is a **React-based web application** that allows users to **upload images and videos with a countdown timer**. Once the timer expires, users receive an **automated email notification**. Built with **React (frontend)** and **Node.js + Express (backend)**, it uses **MongoDB** for storage and **Postmark** for email delivery. The app also features **JWT-based authentication** and a seamless file management experience.

---

## 🚀 Technologies Used
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (MongoDB Atlas)  
- **Authentication:** JSON Web Token (JWT)  
- **Email Service:** Postmark  
- **File Upload:** Cloudinary  

---

## 🛠️ How to Run the Project
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/10tan/timeCapsule2.0.git
cd timeCapsule2.0
```
### 2️⃣ Run the Application
Start the frontend
```sh
npm start
```
For the backend
```sh
cd backend
node server.js
```
### 📂 Project Structure
timeCapsule2.0/
```sh
│── backend/             # Backend files (Node.js + Express)
│   ├── node_modules/    # Installed dependencies
│   ├── public/          # Default assets
│   ├── src/             # Routes, controllers, models
│   ├── .env             # Environment variables (not committed)
│── frontend/            # Frontend React app
│── src/             # React components, pages
│── public/          # Static assets
│── node_modules/    # Installed dependencies
│── .gitignore           # Files to ignore in version control
│── README.md            # Project documentation
```
