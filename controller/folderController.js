const { Folder, File } = require("../models");

// Create Folder
const createFolder = async (req, res) => {
    try{
      const { name, type, maxFileLimit } = req.body;        
      
      // Validate Input
      if(!name || !type || !maxFileLimit || maxFileLimit <= 0){
        return res.status(400).json({ message: "Invalid input data." }); 
      }

      // check if folder name already exists
      const existingFolder = await Folder.findOne({ where: { name } });
      if(existingFolder){
        return res.status(400).json({ message: "Folder name must be unique." });
      };

      // create new folder
      const folder = await Folder.create({ name, type, maxFileLimit });

      return res.status(201).json({ message: "Folder created successfully", folder });
    } catch(error){
       console.log("Error in creating folder: ", error); 
       return res.status(500).json({ message: "Server error", error: error.message }); 
    }
};

// Update folder (only name and maxFileLimit)
const updateFolder = async (req, res) => {
     try{
     const { folderId } = req.params;
     const { name, maxFileLimit } = req.body;

     // Find folder
     const folder = await Folder.findByPk(folderId);
     if (!folder) return res.status(401).json({ message: "Folder not found." });

     // Update Folder details
     folder.name = name || folder.name;
     folder.maxFileLimit = maxFileLimit || folder.maxFileLimit;
     await Folder.save();

     return res.status(200).json({ message: "Folder updated successfully.", folder });
     } catch(error){
        console.log("Error while updating folder: ", error);
        return res.status(500).json({ message: "Server error", error: error.message });
     }
};

// Delete folder
const deleteFolder = async (req, res) => {
    try{
      const { folderId } = req.params;

      // Find folder
      const folder = await Folder.findByPk(folderId);
      if(!folder) return res.status(404).json({ message: 'folder not found.' });
      
      await folder.destroy();
      
      return res.status(200).json({ message: "Folder deleted successfully." });
    } catch(error){
        console.log("Error in deleting the folder: ", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Folder details
const getFolder = async (req, res) => {
  try{
    const { folderId } = req.params;

    const folder = await Folder.findByPk(folderId, { include: File });
    if(!folder) return res.status(404).json({ message: "Folder not found" });

    return res.status(200).json(folder); 
  } catch(error){
     console.log("Error in fetching a folder by Id: ", error);
     return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all folders
const getAllFolders = async (req, res) => {
    try{
      const folders = await Folder.findAll();
      return res.json(folders);  
    } catch(error){
        console.log("Error in fetching all the folders: ", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createFolder, updateFolder, deleteFolder, getFolder, getAllFolders };