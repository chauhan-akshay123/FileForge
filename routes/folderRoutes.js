const express = require("express");
const router = express.Router();
const { createFolder, updateFolder, deleteFolder, getFolder, getAllFolders } = require("../controller/folderController");

// Folder Routes
router.post('/folder/create', createFolder);
router.put('/folders/:folderId', updateFolder);
router.delete('/folders/:folderId', deleteFolder);
router.get('/folders/:folderId', getFolder);
router.get('/folders', getAllFolders);

module.exports = router;
