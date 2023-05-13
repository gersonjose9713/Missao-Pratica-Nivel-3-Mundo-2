import Livro from '../modelo/Livro';

const livros: Array<Livro> = [
  {
    codigo: 1,
    codEditora: 1,
    titulo: 'O Hobbit',
    resumo:
      'O Hobbit é um livro que se passa em um mundo imaginário criado pelo autor J.R.R. Tolkien. O livro conta a história de Bilbo Bolseiro, um hobbit que é contratado para participar de uma aventura com um grupo de anões. Eles têm como objetivo recuperar um tesouro que foi roubado por um dragão chamado Smaug. Durante a jornada, Bilbo enfrenta diversos desafios, como trolls, goblins e aranhas gigantes. Ele também encontra o anel mágico que é a chave para o sucesso da missão.',
    autores: ['J.R.R. Tolkien'],
  },
  {
    codigo: 2,
    codEditora: 2,
    titulo: 'A Guerra dos Tronos',
    resumo:
      'A Guerra dos Tronos é o primeiro livro da série As Crônicas de Gelo e Fogo, escrita por George R. R. Martin. A história se passa em um mundo medieval imaginário, onde sete reinos disputam o poder pelo Trono de Ferro. A trama se desenrola através das perspectivas de vários personagens, incluindo membros de diferentes famílias nobres, guerreiros e pessoas comuns. Enquanto a ameaça de uma invasão de criaturas sobrenaturais se aproxima, as disputas políticas e as intrigas pessoais ameaçam desestabilizar os reinos e levar a uma guerra devastadora.',
    autores: ['George R. R. Martin'],
  },
  {
    codigo: 3,
    codEditora: 3,
    titulo: 'O Nome do Vento',
    resumo:
      'O Nome do Vento é o primeiro livro da série A Crônica do Matador do Rei, escrita por Patrick Rothfuss. O livro conta a história de Kvothe, um homem que se tornou uma lenda em um mundo de magia e fantasia. Kvothe narra sua própria história, desde sua infância em uma trupe de artistas até se tornar um estudante na Universidade, onde busca conhecimento sobre a magia. Ao longo do caminho, ele enfrenta muitos desafios, incluindo a busca por vingança contra aqueles que mataram sua família.',
    autores: ['Patrick Rothfuss'],
  },
  {
    codigo: 4,
    codEditora: 4,
    titulo: 'A Revolução dos Bichos',
    resumo:
      'A Revolução dos Bichos é um livro escrito por George Orwell que utiliza animais para representar as pessoas e criticar a sociedade da época. A história se passa em uma fazenda onde os animais se revoltam contra os humanos e estabelecem um sistema de governo próprio. No entanto, com o tempo, os porcos se tornam líderes autoritários e a fazenda se transforma em uma ditadura. O livro é uma reflexão sobre o poder, a corrupção e a manipulação na política.',
    autores: ['George Orwell'],
  },
];

export default class ControleLivro {
  incluir(livro: Livro) {
    const livroExistente = livros.find(l => l.titulo === livro.titulo);
    if (livroExistente) {
      throw new Error(`Já existe um livro com o título "${livro.titulo}"`);
    }
    livro.codigo = livros.length > 0 ? livros.at(-1)!.codigo + 1 : 1;
    livros.push(livro);
  }

  excluir(codigo: number) {
    const index = livros.findIndex(livro => livro.codigo === codigo);
    if (index === -1) {
      throw new Error(`Livro com código ${codigo} não encontrado`);
    }
    livros.splice(index, 1);
  }

  obterLivros() {
    return livros.slice();
  }
}