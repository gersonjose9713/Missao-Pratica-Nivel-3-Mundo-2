import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const livros = controleLivro.obterLivros();
        res.status(200).json(livros);
        break;
      case 'POST':
        const livro = req.body;
        controleLivro.incluir(livro);
        res.status(200).json({ message: 'Livro incluído com sucesso' });
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
