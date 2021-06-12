import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuth } from "../../src/firebase/lib";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    firebaseAuth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        res.status(200).send("success");
      })
      .catch((error) => {
        res.status(401).send(error);
      });
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
