import { doc, setDoc, deleteDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import { db } from "./authentication";
import { getAuth } from "firebase/auth";

interface Meta {
  id: string;
  descricao: string;
  valor: number;
  dificuldade: 'Fácil' | 'Média' | 'Difícil';
  dataCriacao: Date;
}

// Função para salvar dados da meta no Firestore
export const cadastrarMeta = async (
  descricao: string,
  valor: number,
  dificuldade: 'Fácil' | 'Média' | 'Difícil'
) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    // Cria um novo documento com ID automático na subcoleção metas do usuário
    const metasCollection = collection(db, "usuarios", currentUser.uid, "metas");
    const novaMeta = {
      descricao,
      valor,
      dificuldade,
      dataCriacao: new Date(),
      userId: currentUser.uid
    };

    const docRef = await setDoc(doc(metasCollection), novaMeta);
    console.log('Meta cadastrada com sucesso no Firestore');
    return docRef;
  } catch (error) {
    console.error('Erro ao salvar dados da meta no Firestore:', error);
    throw error;
  }
};

// Função para atualizar a meta
export const atualizarMeta = async (
  metaId: string,
  atualizacoes: Partial<Meta>
) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const metaRef = doc(db, "usuarios", currentUser.uid, "metas", metaId);
    await updateDoc(metaRef, {
      ...atualizacoes,
      dataAtualizacao: new Date()
    });
    console.log('Meta atualizada com sucesso no Firestore');
  } catch (error) {
    console.error('Erro ao atualizar a meta no Firestore:', error);
    throw error;
  }
};

// Função para excluir uma meta
export const excluirMeta = async (metaId: string) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const metaRef = doc(db, "usuarios", currentUser.uid, "metas", metaId);
    await deleteDoc(metaRef);
    console.log('Meta excluída com sucesso do Firestore');
  } catch (error) {
    console.error('Erro ao excluir a meta do Firestore:', error);
    throw error;
  }
};

// Função para buscar todas as metas do usuário
export const buscarMetasDoUsuario = async (): Promise<Meta[]> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const metasCollection = collection(db, "usuarios", currentUser.uid, "metas");
    const metasSnapshot = await getDocs(metasCollection);
    
    const metas = metasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao?.toDate() || new Date()
    })) as Meta[];

    return metas;
  } catch (error) {
    console.error('Erro ao buscar metas do usuário:', error);
    throw error;
  }
};

// Função para buscar uma meta específica
export const buscarMetaPorId = async (metaId: string): Promise<Meta | null> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuário não está autenticado');
  }

  try {
    const metaRef = doc(db, "usuarios", currentUser.uid, "metas", metaId);
    const metaDoc = await getDocs(query(collection(db, "usuarios", currentUser.uid, "metas"), where("id", "==", metaId)));
    
    if (metaDoc.empty) {
      return null;
    }

    const metaData = metaDoc.docs[0].data();
    return {
      id: metaDoc.docs[0].id,
      ...metaData,
      dataCriacao: metaData.dataCriacao?.toDate() || new Date()
    } as Meta;
  } catch (error) {
    console.error('Erro ao buscar meta específica:', error);
    throw error;
  }
};