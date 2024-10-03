// src/services/userService.ts
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebase/authentication";
import { signOut } from "firebase/auth";
import { db } from "@/firebase/authentication"; // Certifique-se de que o db está importado corretamente

export interface DadosUsuario {
  nome: string;
  email: string;
  dataNascimento: string;
  biografia: string;
  estado: string;
}

export const buscarDadosUsuario = async (uid: string): Promise<DadosUsuario> => {
  const userDoc = await getDoc(doc(db, "usuarios", uid));
  if (userDoc.exists()) {
    return userDoc.data() as DadosUsuario;
  } else {
    throw new Error('Nenhum dado foi encontrado.');
  }
};

export const realizarLogout = async (): Promise<void> => {
  await signOut(auth);
};
