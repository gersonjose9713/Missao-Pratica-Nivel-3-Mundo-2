import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../../classes/controle/ControleLivros';


const controleLivro = new ControleLivro();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo);
      controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro no servidor' });
  }
};

export default handler;