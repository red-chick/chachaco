import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdminAuth } from "../../src/firebase/admin";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password, nickname } = req.body;

    firebaseAdminAuth()
      .createUser({
        email,
        emailVerified: false,
        password,
        displayName: nickname,
        disabled: false,
      })
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
