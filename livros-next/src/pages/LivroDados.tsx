import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../../classes/componentes/Menu';
import ControleEditora from '../../classes/controle/ControleEditora';
import Livro from '../../classes/modelo/Livro';

const LivroDados = () => {
  const controleEditora: ControleEditora = new ControleEditora();
  const baseURL: string = 'http://localhost:3000/api/livros';

  const incluirLivro = async (livro: Livro): Promise<boolean> => {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });

    return response.ok;
  };

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora.toString(),
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState<number>(Number(opcoes[0].value));
  const navigate = useRouter().push;

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const livro: Livro = {
      codigo: 0,
      codEditora: codEditora,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n'),
    };

    const incluido = await incluirLivro(livro);
    if (incluido) {
      navigate('/LivroLista');
    }
  };

  return (
    <div className="container">
      <Head>
        <title>LivroDados</title>
      </Head>
      <Menu />
      <main>
        <h1 className="mt-5 mb-4 text-center">Adição de Livro</h1>

        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título:
            </label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">
              Resumo:
            </label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={e => setResumo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="autores" className="form-label">
              Autores:
            </label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={e => setAutores(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="editora" className="form-label">
              Editora:
            </label>
            <select
              className="form-select"
              id="editora"
              value={codEditora.toString()}
              onChange={tratarCombo}
            >
              {opcoes.map(opcao => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-dark">
            Adicionar
          </button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
