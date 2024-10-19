import { doc, setDoc } from "firebase/firestore";
import { db } from "./authentication"; // Certifique-se de que está importando db corretamente

// Função para salvar dados da tarefa no Firestore
export const cadastrarTarefa = async (
  id: number,
  nome: string,
  recompensa: string,
  dificuldade: 'Fácil' | 'Média' | 'Difícil',
  concluida: boolean
) => {
  try {
    // Cria ou atualiza o documento da tarefa no Firestore com o ID da tarefa como ID do documento
    await setDoc(doc(db, "tarefas", id.toString()), {
      nome,
      recompensa,
      dificuldade,
      concluida
    });
    console.log('Dados da tarefa cadastrados no Firestore');
  } catch (error) {
    console.error('Erro ao salvar dados da tarefa no Firestore:', error);
  }
};

// Função para atualizar o status de conclusão da tarefa
export const atualizarStatusTarefa = async (
  id: number,
  concluida: boolean
) => {
  try {
    const tarefaRef = doc(db, "tarefas", id.toString());
    await setDoc(tarefaRef, { concluida }, { merge: true });
    console.log('Status da tarefa atualizado no Firestore');
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa no Firestore:', error);
  }
};
