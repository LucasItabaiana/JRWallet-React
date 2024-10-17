import { doc, setDoc } from "firebase/firestore";
import { db } from "./authentication"; // Certifique-se de que está importando db corretamente

// Função para salvar dados da meta no Firestore
export const cadastrarMeta = async (
  id: number,
  titulo: string,
  recompensa: string,
  dificuldade: 'Fácil' | 'Média' | 'Difícil'
) => {
  try {
    // Cria ou atualiza o documento da meta no Firestore com o ID da meta como ID do documento
    await setDoc(doc(db, "metas", id.toString()), {
      titulo,
      recompensa,
      dificuldade
    });
    console.log('Dados da meta cadastrados no Firestore');
  } catch (error) {
    console.error('Erro ao salvar dados da meta no Firestore:', error);
  }
};

// Função para atualizar o título e recompensa da meta
export const atualizarMeta = async (
  id: number,
  titulo: string,
  recompensa: string
) => {
  try {
    const metaRef = doc(db, "metas", id.toString());
    await setDoc(metaRef, { titulo, recompensa }, { merge: true });
    console.log('Meta atualizada no Firestore');
  } catch (error) {
    console.error('Erro ao atualizar a meta no Firestore:', error);
  }
};
