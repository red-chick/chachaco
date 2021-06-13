import { NextApiRequest, NextApiResponse } from "next";
import { addDoc } from "../../src/firebase/utils";
import { firestore } from "firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, gid, pid, content, imageUrl, uid, uname } = req.body;

    const data = await addDoc("games", {
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
      uid,
      uname,
      title,
      gid,
      pid,
      content,
      imageUrls: imageUrl ? [imageUrl] : [],
      likesUids: [],
      likesCount: 0,
    });
    res.json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};