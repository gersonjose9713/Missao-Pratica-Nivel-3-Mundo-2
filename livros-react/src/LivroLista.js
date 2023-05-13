import React, { useState, useEffect } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivros = new ControleLivro();
const controleEditora = new ControleEditora();

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function obterLivros() {
      try {
        const livrosObtidos = await controleLivros.obterLivros();
        setLivros(livrosObtidos);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    obterLivros();
  }, []);

  const excluirLivro = async codigo => {
    try {
      await controleLivros.excluir(codigo);
      const index = livros.findIndex(livro => livro.codigo === codigo);
      if (index !== -1) {
        const novaLista = [...livros];
        novaLista.splice(index, 1);
        setLivros(novaLista);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      {carregando ? (
        <p>Carregando livros...</p>
      ) : livros.length > 0 ? (
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <tr key={livro.codigo}>
                <td>
                  <p>{livro.titulo}</p>
                  <button
                    className="btn btn-danger pull-right"
                    onClick={() => excluirLivro(livro.codigo)}
                  >
                    Excluir
                  </button>
                </td>
                <td>{livro.resumo}</td>
                <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
                <td>
                  <ul>
                    {livro.autores.map((autor, index) => (
                      <li key={index}>{autor}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum livro encontrado.</p>
      )}
    </main>
  );
};

export default LivroLista;