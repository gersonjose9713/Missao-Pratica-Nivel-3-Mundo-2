import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import  Livro  from '../../classes/modelo/Livro';
import  ControleEditora  from '../../classes/controle/ControleEditora';
import { LinhaLivro } from '../../classes/componentes/LinhaLivro';

const baseURL = 'http://localhost:3000/api/livros';

const obter = async () => {
  const resposta = await fetch(baseURL);
  return resposta.json();
};

const excluirLivro = async (codigo: number) => {
  const resposta = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
  return resposta.ok;
};

export const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);
  const controleEditora = new ControleEditora();

  useEffect(() => {
    obter().then(dados => {
      setLivros(dados);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = async (codigo: number) => {
    await excluirLivro(codigo);
    setCarregado(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Livros Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Ano</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>

      <Menu />
    </div>
  );
};

const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/" legacyBehavior>
        <a className="navbar-brand">Livros Next</a>
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/" legacyBehavior>
              <a className="nav-link">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/livros" legacyBehavior>
              <a className="nav-link">Livros</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
