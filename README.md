# FileForge - Document Management System

## 📌 Overview
FileForge is a robust **Document Management System (DMS)** that allows users to create folders, upload files, manage metadata, and organize their digital documents efficiently. It supports cloud storage via **Cloudinary** and provides various functionalities like searching, sorting, and filtering files.

## 🚀 Features
- 📂 **Folder Management**: Create, update, and delete folders with specific file type restrictions.
- 📄 **File Uploading**: Upload files to Cloudinary and store metadata in the database.
- 🔎 **File Retrieval**: Fetch files by folder, type, or other parameters.
- 📑 **Metadata Management**: View and update file descriptions.
- 📌 **Sorting & Filtering**: Sort files by size or upload date.
- 🗑 **File Deletion**: Securely delete files from the system.

## 🛠 Tech Stack
### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for building REST APIs
- **Sequelize** - ORM for database interactions
- **Supabase (PostgreSQL)** - Database for storing folder and file metadata

### Cloud Storage
- **Cloudinary** - For file uploads and storage

### Other Dependencies
- **Multer** - Middleware for handling file uploads
- **UUID** - For generating unique folder and file IDs
- **Axios** - For handling API requests (if needed)

## 🔧 Setup & Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/FileForge.git
   cd FileForge
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables** (Create a `.env` file)
   ```sh
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   DB_USER=your-your-supabase-db-user 
   DB_PASSWORD-your-supabase-db-DB_PASSWORD
   DB_NAME-your-supabase-db-name 
   DB_HOST-your-supabase-db-DB_HOST
   DB_PORT-your-supabase-db-port
   ```
4. **Run database migrations**
   ```sh
   npx sequelize-cli db:migrate
   ```
5. **Start the server**
   ```sh
   npm start
   ```

## 📝 License
This project is licensed under the **MIT License**.

