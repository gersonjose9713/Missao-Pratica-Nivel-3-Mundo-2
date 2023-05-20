import React, { useState, useEffect } from 'react';
import { Menu } from '../../classes/componentes/Menu';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Livro from '../../classes/modelo/Livro';
import { LinhaLivro } from '../../classes/componentes/LinhaLivro';

const LivroLista: React.FC = () => {
  const baseURL = 'http://localhost:3000/api/livros';
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  const obterLivros = async () => {
    await fetch(baseURL)
      .then(response => response.json())
      .then(data => setLivros(data))
      .catch(error => console.log(error));
  };

  const excluirLivro = async (codigo: number) => {
    await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' })
      .then(response => response.ok)
      .then(() => obterLivros())
      .catch(error => console.log(error));
  };

  useEffect(() => {
    obterLivros()
      .then(() => setCarregado(true))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>LivroLista</title>
      </Head>
      <Menu />
      <main>
        <h1>Catálogo de Livros</h1>
        {carregado ? (
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Título</th>
                <th>Resumo</th>
                <th>Editora</th>
                <th>Autores</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map(livro => (
                <LinhaLivro
                  key={livro.codigo}
                  livro={livro}
                  excluir={() => excluirLivro(livro.codigo)}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>Carregando...</p>
        )}
      </main>
    </div>
  );
};

export default LivroLista;