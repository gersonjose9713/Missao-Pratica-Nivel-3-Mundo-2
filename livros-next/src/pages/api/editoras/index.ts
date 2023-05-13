import type { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../../classes/controle/ControleEditora';

export const controleEditora = new ControleEditora();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const editoras = await controleEditora.getEditoras();
      res.status(200).json(editoras);
    } catch (error) {
      res.status(500).json({ message: console.error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
