import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro  from '../../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      const livro = req.body;
      controleLivro.incluir(livro);
      res.status(200).json({ message: 'Livro incluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  }
};

export default handler;