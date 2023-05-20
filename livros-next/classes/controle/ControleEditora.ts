import Editora from '../modelo/Editora';

const editoras: Editora[] = [
  { codEditora: 1, nome: 'Editora Companhia das Letras' },
  { codEditora: 2, nome: 'Editora Intrínseca' },
  { codEditora: 3, nome: 'Editora Cosac Naify' },
  { codEditora: 4, nome: 'Editora Sextante' },
  { codEditora: 5, nome: 'Editora Nova Fronteira' },
];

export default class ControleEditora {
  public getNomeEditora(codEditora: number): string {
    if (!Number.isInteger(codEditora)) {
      throw new Error('O código da editora deve ser um número inteiro.');
    }
    const editora = editoras.find(item => item.codEditora == codEditora);
    return editora ? editora.nome : 'Editora não encontrada';
  }

  public getEditoras(): Editora[] {
    return editoras;
  }
}
