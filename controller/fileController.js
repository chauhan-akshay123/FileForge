const { File, Folder } = require("../models");
const cloudinary = require("../config/cloudinaryConfig");
const { Op } = require("@sequelize/core");

// Upload file
const uploadFile = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { description } = req.body;
    const file = req.file;
    
    const folder = await Folder.findByPk(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.mimetype.includes(folder.type)) {
      return res.status(400).json({ message: "File type does not match folder type" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "document_management_(FileForge)",
      resource_type: "auto", 
    });

    // Save file details in the database
    const uploadedFile = await File.create({
      folderId,
      name: file.originalname, 
      path: result.secure_url, 
      type: file.mimetype,
      size: file.size,
      description,
      uploadedAt: new Date(),
    });

    return res.status(201).json({
      message: "File uploaded successfully.",
      file: uploadedFile,
    });
  } catch (error) {
    console.error("Error in uploading file:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get files in a folder
const getFilesInFolder = async (req, res) => {
  try{
    const { folderId } = req.params;
    const files = await File.findAll({ where: { folderId } });
    return res.status(200).json(files);
  } catch(error){
     console.log("Error in getting files in a folder: ", error);
     return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// sort files by Size or Recency
const sortFiles = async (req, res) => {
  try{
    const { folderId } = req.params;
    const { sort } = req.query;
    if(!['size', 'uploadedAt'].includes(sort)){
       return res.status(400).json({ message: "Invalid sort para,meter" }); 
    } 
    const files = await File.findAll({ where: { folderId }, order: [[sort, 'ASC']] });
    return res.json(files);
  } catch(error){
     console.log("Error in sorting files: ", error);
     return res.status(500).json({ message: "Server error", error: error.message });
  }
}

// get File by Type Across Folders
const getFilesByType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ message: "File type is required" });
    }

    const files = await File.findAll({
      where: {
        type: {
          [Op.like]: `%${type}%`, // This allows partial matching (e.g., 'csv' matches 'text/csv')
        },
      },
    });

    return res.status(200).json({ files });
  } catch (error) {
    console.error("Error in fetching files by type:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get file metadata
const getFileMetaData = async (req, res) => {
  try{
   const { folderId } = req.params;
   const files = await File.findAll({
    where: { folderId },
    attributes: ['fileId', 'name', 'size', 'description']
   });
   return res.json({ files });  
  } catch(error){
     console.log("Error in getting file metaData: ", error);
     return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update file description
const updateFileDescription = async (req, res) => {
  try{
    const { folderId, fileId } = req.params;
    const { description } = req.body;

    const file = await File.findOne({ where: { fileId, folderId } });
    if(!file) return res.status(404).json({ message: "File not found." });

    file.description = description;
    await file.save();

    return res.status(200).json({ message: "File description updated successfully", file });
  } catch(error){
     console.log("Error in updating file description: ", error);
     return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete file
const deleteFile = async (req, res) => {
    try{
      const { folderId, fileId } = req.params;
      
      const file = await File.findOne({ where: { fileId, folderId } });
      if(!file) return res.status(404).json({ message: "File not found" });
      
      await File.destroy();

      return res.status(200).json({ message: "File deleted successfully" }); 
    } catch(error){
        console.log("Error in deleting file: ", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { uploadFile, updateFileDescription, deleteFile, getFilesInFolder, getFilesByType, getFileMetaData, sortFiles };