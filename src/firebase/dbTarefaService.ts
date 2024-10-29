import { doc, setDoc, deleteDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./authentication";
import { getAuth } from "firebase/auth";

interface Tarefa {
  id: string;
  nome: string;
  recompensa: string;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  concluida: boolean;
  userId: string;
  dataCriacao: Date;
}

// Função para salvar dados da tarefa no Firestore
export const cadastrarTarefa = async (
  nome: string,
  recompensa: string,
  dificuldade: 'Fácil' | 'Média' | 'Difícil'
) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const tarefasCollection = collection(db, "usuarios", currentUser.uid, "tarefas");
    const novaTarefa = {
      nome,
      recompensa,
      dificuldade,
      concluida: false,
      userId: currentUser.uid,
      dataCriacao: new Date()
    };

    // Usando addDoc ao invés de setDoc para gerar um ID automático
    const docRef = await addDoc(tarefasCollection, novaTarefa);
    
    return {
      id: docRef.id,
      ...novaTarefa
    };
  } catch (error) {
    console.error('Erro ao salvar dados da tarefa no Firestore:', error);
    throw error;
  }
};

// Função para atualizar o status da tarefa
export const atualizarTarefa = async (
  tarefaId: string,
  concluida: boolean
) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const tarefaRef = doc(db, "usuarios", currentUser.uid, "tarefas", tarefaId);
    await setDoc(tarefaRef, { concluida }, { merge: true });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar a tarefa no Firestore:', error);
    throw error;
  }
};

// Função para excluir uma tarefa
export const excluirTarefa = async (tarefaId: string) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const tarefaRef = doc(db, "usuarios", currentUser.uid, "tarefas", tarefaId);
    await deleteDoc(tarefaRef);
    return true;
  } catch (error) {
    console.error('Erro ao excluir a tarefa do Firestore:', error);
    throw error;
  }
};

// Função para buscar todas as tarefas do usuário
export const buscarTarefasDoUsuario = async (): Promise<Tarefa[]> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const tarefasCollection = collection(db, "usuarios", currentUser.uid, "tarefas");
    const tarefasSnapshot = await getDocs(tarefasCollection);
    
    const tarefas = tarefasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao?.toDate() || new Date()
    })) as Tarefa[];

    return tarefas;
  } catch (error) {
    console.error('Erro ao buscar tarefas do usuário:', error);
    throw error;
  }
};