import { toast } from 'react-toastify'; // For validateImg() function

// ----------------- For uploadImage() function ----------------- 
import { storage } from "../lib/firebase"
import { v4 } from "uuid"
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"

export default function handleChange(event, setFormData) {
  setFormData(prevFormData => {
    return {
      ...prevFormData,
      [event.target.name]: event.target.value
    }
  })
}

function validateImg(img) {
  if (!img?.name?.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    toast.error("Please select valid image!", {
      position: toast.POSITION.TOP_RIGHT
    })
    return false;
  }

  return true;
}

async function uploadImage(img) {
  const imageRef = ref(storage, `images/${img.name + v4()}`);

  try {
    const snapshot = await uploadBytes(imageRef, img);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (err) {
    console.error(`err: ${err}`);
    return err;
  }
}

export { validateImg, uploadImage }