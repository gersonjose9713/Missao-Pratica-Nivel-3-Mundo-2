import { NextApiRequest, NextApiResponse } from 'next';
import controleLivro from '.';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const codigo = req.query.codigo as string;

  try {
    switch (req.method) {
      case 'DELETE':
        await controleLivro.excluir(codigo);
        res.status(200).json({ message: 'Livro excluído com sucesso' });
        break;
      default:
        res.status(405).end();
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ocorreu um erro no servidor' });
  }
};
