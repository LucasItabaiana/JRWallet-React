'use client'; 

import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth } from '../../firebase/authentication';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import InputSimples from "@/components/Input/input";
import BotaoInicio from "@/components/Botoes/botaoInicio";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemReset, setMensagemReset] = useState('');
  const router = useRouter(); 

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log('Usuário logado:', userCredential.user);
      setMensagemSucesso('Login realizado com sucesso! Aguarde...');
      setMensagemErro('');
  
      router.push('/Perfil');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMensagemErro('Erro ao fazer login. Verifique suas credenciais.');
      setMensagemSucesso('');
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMensagemReset('Um email de redefinição de senha foi enviado para o seu email.');
      setMensagemErro('');
    } catch (error) {
      console.error('Erro ao enviar email de redefinição de senha:', error);
      setMensagemErro('Erro ao enviar email de redefinição. Verifique o email informado.');
      setMensagemReset('');
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-[500px] flex flex-col items-center">
        <Image 
          src="/logo.png" 
          alt="LOGO" 
          width={350}
          height={300}
        />
        <h1 className="text-center bebas-neue-regular z-10 text-[90px] leading-none pl-[20px] tracking-[20px] text-[#DBFFFC]">LOGIN</h1>
        <form className="form goldman-regular relative bottom-[80px] flex flex-col items-center bg-[#2C334B] w-[98%] h-auto justify-center rounded-[32px] py-[60px] px-0 mt-[30px] mb-[40px]" onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <p className="text-[35px] text-white leading-[1.1] text-center">EMAIL</p>
          <InputSimples
            className="mb-[30px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]" 
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        
          <p className="text-[35px] text-white leading-[1.1] text-center">SENHA</p>
          <InputSimples
            className="mb-[30px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]" 
            placeholder=""
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          
          <BotaoInicio
            texto="ENTRAR"
            onClick={() => handleLogin()} 
          />
          
          {mensagemErro && (
            <p className="formErro bebas-neue-regular">{mensagemErro}</p>
          )}
          
          {mensagemSucesso && (
            <p className="formSucesso bebas-neue-regular">{mensagemSucesso}</p>
          )}

          {mensagemReset && (
            <p className="formSucesso bebas-neue-regular">{mensagemReset}</p>
          )}
          
          <button 
            type="button" 
            onClick={handleResetPassword} 
            className="mt-2 text-[.9em] leading-none text-gray-500 duration-100 hover:border-b-2 border-gray-500">
            ESQUECEU A SENHA? / CLIQUE AQUI
          </button>
          
          <Link href="/Cadastro" className="mt-2 text-[.9em] leading-none text-gray-500 duration-100 hover:border-b-2 border-gray-500">CRIAR CONTA / CLIQUE AQUI</Link>
        </form>
      </div>
    </div>
  );
}
