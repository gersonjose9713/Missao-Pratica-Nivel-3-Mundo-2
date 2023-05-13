import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const codEditora = Number(req.query.codEditora);
      const nomeEditora = await controleEditora.getNomeEditora(codEditora);
      res.status(200).json({ nome: nomeEditora });
    } catch (error) {
      res.status(500).json({ message: console.error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
