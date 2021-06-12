import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuth } from "../../src/firebase/lib";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const user = firebaseAuth().currentUser;

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("invalid login");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
