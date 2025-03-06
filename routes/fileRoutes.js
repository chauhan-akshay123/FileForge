const express = require("express");
const router = express.Router();
const { uploadFile, updateFileDescription, deleteFile, getFilesInFolder, getFilesByType, getFileMetaData, sortFiles } = require("../controller/fileController");
const upload = require("../config/multerConfig");

// File routes
router.post('/folders/:folderId/files', upload.single("file"), uploadFile);
router.put('/folders/:folderId/files/:fileId', updateFileDescription);
router.delete('/folders/:folderId/files/:fileId', deleteFile);
router.get('/folders/:folderId/files', getFilesInFolder);
router.get('/files', getFilesByType);
router.get('/folders/:folderId/filesBySort', sortFiles);
router.get('/folders/:folderId/files/metadata', getFileMetaData);

module.exports = router;