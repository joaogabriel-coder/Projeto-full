export interface Tarefa {
  id?: number; // O ID é opcional, pois o backend o gera na criação.
  descricao: string;
  concluida: boolean;
}
