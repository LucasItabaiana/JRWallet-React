import { auth } from '../firebase/authentication';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export const realizarLogin = async (email: string, senha: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        return userCredential.user;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw new Error('Erro ao fazer login. Verifique suas credenciais.');
    }
};

export const redefinirSenha = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return 'Um email de redefinição de senha foi enviado para o seu email.';
    } catch (error) {
        console.error('Erro ao enviar email de redefinição de senha:', error);
        throw new Error('Erro ao enviar email de redefinição. Verifique o email informado.');
    }
};
