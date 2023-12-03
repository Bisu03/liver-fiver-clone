import multer from "multer";

const storage = multer.diskStorage({
    destination: "./public/images", //directory (folder) setting
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + "-" + file.originalname)
    },
});

//Upload Setting
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file) {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error("Only jpeg,  jpg , png, and gif Image allow"));
        }
    },
});
