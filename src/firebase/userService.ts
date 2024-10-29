import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./authentication"; // Certifique-se de que está importando db corretamente

// Função para salvar dados do usuário no Firestore
export const cadastrarUsuario = async (
  uid: string,
  nome: string,
  email: string,
  dataNascimento: string,
  biografia: string,
  estado: string
) => {
  try {
    // Cria ou atualiza o documento do usuário no Firestore com o UID como ID do documento
    await setDoc(doc(db, "usuarios", uid), {
      nome,
      email,
      dataNascimento,
      biografia,
      estado
    });
    console.log('Dados do usuário cadastrados no Firestore');
  } catch (error) {
    console.error('Erro ao salvar dados do usuário no Firestore:', error);
  }
};

// Função para cadastrar um novo usuário e salvar os dados no Firestore
export const handleSignUp = async (
  email: string,
  senha: string,
  nome: string,
  dataNascimento: string,
  biografia: string,
  estado: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Após o cadastro no Authentication, salvar os dados adicionais no Firestore
    await cadastrarUsuario(user.uid, nome, email, dataNascimento, biografia, estado);

    console.log('Usuário cadastrado com sucesso!');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
};
