const express = require("express");
const router = express.Router();
const { createFolder, updateFolder, deleteFolder, getFolder, getAllFolders } = require("../controller/folderController");

// Folder Routes
router.post('/folder/create', createFolder);
router.put('/folder/:folderId', updateFolder);
router.delete('/folder/:folderId', deleteFolder);
router.get('/folder/:folderId', getFolder);
router.get('/folder', getAllFolders);

module.exports = router;
