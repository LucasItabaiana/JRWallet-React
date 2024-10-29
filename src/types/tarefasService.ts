// tarefaService.ts
import { auth } from '@/firebase/authentication';
import { cadastrarTarefa, buscarTarefasDoUsuario } from '@/firebase/dbTarefaService';
import { Tarefa } from './tarefa';

export const adicionarTarefa = async (
  novaTarefa: Tarefa,
  listaTarefas: Tarefa[],
  setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>
) => {
  const user = auth.currentUser;
  if (!user) return;

  const novaTarefaComId = {
    ...novaTarefa,
    id: Date.now(),
  };

  // Salvar no Firestore
  await cadastrarTarefa(
    user.uid,
    novaTarefaComId.id,
    novaTarefaComId.nome,
    novaTarefaComId.recompensa,
    novaTarefaComId.dificuldade as 'Fácil' | 'Média' | 'Difícil',
    novaTarefaComId.concluida
  );

  setTarefas([...listaTarefas, novaTarefaComId]);
};

// Função para carregar tarefas do usuário
export const carregarTarefas = async (setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>) => {
  const user = auth.currentUser;
  if (!user) return;

  const tarefas = await buscarTarefasDoUsuario(user.uid);
  setTarefas(tarefas as Tarefa[]);
};