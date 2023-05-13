import React, { useState, useEffect, useCallback, memo } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';
import { useNavigate } from 'react-router-dom';

const controleLivros = new ControleLivro();
const controleEditora = new ControleEditora();

const LivroDados = memo(() => {
  const [opcoes, setOpcoes] = useState([]);
  const [livro, setLivro] = useState({
    codigo: 0,
    codEditora: 0,
    titulo: '',
    resumo: '',
    autores: [],
  });
  const navigate = useNavigate();

  const fetchEditoras = useCallback(async () => {
    const editoras = await controleEditora.getEditoras();
    setOpcoes(editoras);
    setLivro(livro => ({
      ...livro,
      codEditora: editoras[0].codEditora,
    }));
  }, []);

  useEffect(() => {
    fetchEditoras();
  }, [fetchEditoras]);

  const tratarCombo = event => {
    setLivro({ ...livro, codEditora: Number(event.target.value) });
  };

  const incluir = event => {
    event.preventDefault();
    controleLivros.incluir(livro);
    navigate('/');
  };

  return (
    <main>
      <h2>Dados do Livro</h2>
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            className="form-control"
            type="text"
            value={livro.titulo}
            onChange={e => setLivro({ ...livro, titulo: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="resumo">Resumo</label>
          <textarea
            id="resumo"
            className="form-control"
            value={livro.resumo}
            onChange={e => setLivro({ ...livro, resumo: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="editora">Editora</label>
          <select
            id="editora"
            className="form-control"
            value={livro.codEditora}
            onChange={tratarCombo}
            required
          >
            {opcoes.map(item => (
              <option key={item.codEditora} value={item.codEditora}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="autores">Autores (1 por linha)</label>
          <textarea
            id="autores"
            className="form-control"
            value={livro.autores.join('\n')}
            onChange={e =>
              setLivro({ ...livro, autores: e.target.value.split('\n') })
            }
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Salvar Dados
        </button>
      </form>
    </main>
  );
});

export default LivroDados;