import { auth, db } from '../firebase/authentication';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

interface DadosUsuario {
  nome: string;
  email: string;
  dataNascimento: string;
  biografia: string;
  estado: string;
}

export const cadastrarUsuario = async (email: string, senha: string, dados: DadosUsuario) => {
  try {
    // Criação do usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    // Gravação dos dados no Firestore
    await setDoc(doc(db, 'usuarios', user.uid), dados);

    return { sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      return { sucesso: false, mensagem: error.message };
    }
    console.error('Erro desconhecido:', error);
    return { sucesso: false, mensagem: 'Erro desconhecido.' };
  }
};
