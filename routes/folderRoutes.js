const express = require("express");
const router = express.Router();
const { createFolder, updateFolder, deleteFolder, getFolder, getAllFolders } = require("../controller/folderController");

// Folder Routes
router.post('/create', createFolder);
router.put('/update/:folderId', updateFolder);
router.delete('/delete/:folderId', deleteFolder);
router.get('/all', getAllFolders);
router.get('/:folderId', getFolder);


module.exports = router;
