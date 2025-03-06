const { File, Folder } = require("../models");
const cloudinary = require("../config/cloudinaryConfig");

// Upload file
const uploadFile = async (req, res) => {
    try{
      const { folderId } = req.params;
      const { description } = req.body;
      const file = req.file;
      
      // validate folder
      const folder = await Folder.findByPk(folderId);
      if(!folder) return res.status(404).json({ message: "Folder not found" });

      // check file type
      if(!file || !file.mimetype.includes(folder.type)) {
         return res.status(400).json({ message: "File type does not match folder type" });
      }

      // upload to cloudinary
      const result = await cloudinary.uploader.upload(file.path, { folder: 'document_management_(FileForge)' });

      // save file details
      const uploadedFile = await File.create({
        folderId,
        name: file.orignalname,
        type: file.mimetype,
        size: file.size,
        description,
        uploadedAt: new Date(),
      });

      return res.status(201).json({ message: "File uploaded successfully.", file: uploadedFile });
    } catch(error){
       console.log("Error in uploading file: ", error);
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

module.exports = { uploadFile, updateFileDescription, deleteFile };