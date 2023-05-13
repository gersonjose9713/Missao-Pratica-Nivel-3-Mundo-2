import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../../classes/componentes/Menu';
import styles from '../styles/Home.module.css';
import  ControleEditora from '../../classes/controle/ControleEditora';
import  Livro  from '../../classes/modelo/Livro';

const LivroDados = () => {
  const controleEditora: ControleEditora = new ControleEditora();
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(0);
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora.toString(),
    text: editora.nome,
  }));
  const navigate = useRouter().push;

  const baseURL: string = 'http://localhost:3000/api/livros';

  const incluirLivro = async (livro: Livro): Promise<boolean> => {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });

    const data = await response.json();
    return response.ok;
  };

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const livro: Livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };

    const incluido = await incluirLivro(livro);
    if (incluido) {
      navigate('/LivroLista');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>LivroDados</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Adição de Livro</h1>

        <form onSubmit={incluir}>
          <div>
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="resumo">Resumo:</label>
            <textarea
              id="resumo"
              value={resumo}
              onChange={e => setResumo(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="autores">Autores:</label>
            <textarea
              id="autores"
              value={autores}
              onChange={e => setAutores(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="editora">Editora:</label>
            <select
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

          <button type="submit">Adicionar</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;