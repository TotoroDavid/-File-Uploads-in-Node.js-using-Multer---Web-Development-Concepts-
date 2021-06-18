const express = require('express')
const multer = require('multer')

const app = express()

const fileStoregeEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStoregeEngine })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/single', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('single file update success')
})

app.post('/multiple', upload.array('images', 3), (req, res) => {
    console.log(req.files)
    res.send('multiple files upload success')
})

app.listen(5000)