const express = require("express");
const router = express.Router();
const { createFolder, updateFolder, deleteFolder, getFolder, getAllFolders } = require("../controller/folderController");

// Folder Routes
router.post('/create', createFolder);
router.put('update/:folderId', updateFolder);
router.delete('delete/:folderId', deleteFolder);
router.get('/:folderId', getFolder);
router.get('all/folders', getAllFolders);

module.exports = router;
