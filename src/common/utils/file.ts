import firebase from "firebase/app";
import "firebase/storage";

export function getExt(filename: string) {
  return filename
    .substring(filename.lastIndexOf("."), filename.length)
    .toLowerCase();
}

export const uploadImageToFirebaseStorage = async (uid: string, file: File) => {
  const filename = `${uid}_${Date.now()}${getExt(file.name)}`;
  await firebase.storage().ref(`images/${filename}`).put(file);
  const url = await firebase
    .storage()
    .ref(`images/${filename}`)
    .getDownloadURL();
  return url;
};
