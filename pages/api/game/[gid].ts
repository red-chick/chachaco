import { firestore } from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getCollectionWhere,
  updateDoc,
  deleteDoc,
} from "../../../src/firebase/utils";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { gid } = req.query;
    const data = await getCollectionWhere("games", {
      fieldPath: "gid",
      opStr: "==",
      value: gid,
    });
    res.json(data[0]);
  } else if (req.method === "PATCH") {
    const { gid: docId } = req.query;
    const { title, pid, content, images, maker, source } = req.body;

    const data = await updateDoc("games", docId as string, {
      updatedAt: firestore.Timestamp.now(),
      title,
      pid,
      content,
      images,
      maker,
      source,
    });

    res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const { gid: docId } = req.query;

    const data = await deleteDoc("games", docId as string);

    res.status(200).json(data);
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
