import { NextApiRequest, NextApiResponse } from 'next'

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('http://127.0.0.1:5000/stickers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
  if (!response.ok) {
    res.status(400).json({ message: 'Something went wrong.' })
  }
  const data = await response.json()
  res.status(200).json(data)
}
