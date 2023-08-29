import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (email === "test@gmail.com") {
      res.status(200).json({ message: "Valid email!" });
    }
    res.status(500).json({ message: "Invalid email!" });
  }
}
