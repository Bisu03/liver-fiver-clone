import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const upload = async (file) => {
    // if (file == null) {
    //     return;
    // }
    let imgurl
    try {
        let filename = Math.random() + Date.now + Math.floor;
        const imageRef = ref(storage, `fiver/${filename}`);
        uploadBytes(imageRef, file)
            .then((snapshot) => {
                // console.log(`${allfilesupload} file succesfully uploaded`);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    if (downloadURL) {
                        imgurl = downloadURL
                    }
                });
            })
            .catch((e) => console.log(e));
    } catch (error) {
        console.log(error);
    }
    return imgurl
}