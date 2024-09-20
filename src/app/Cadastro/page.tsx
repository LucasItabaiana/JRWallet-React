'use client';

import { auth, db } from '../../firebase/authentication'; 
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import BotaoInicio from "@/components/Botoes/botaoInicio";
import InputSimples from "@/components/Input/input";

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [biografia, setBiografia] = useState('');
  const [estado, setEstado] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log('Usuário criado:', user);

      
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email,
        dataNascimento,
        biografia,
        estado
      });

      setMensagemSucesso('Usuário cadastrado com sucesso! Aguarde...');
      setMensagemErro('');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao cadastrar:', error.message);
        setMensagemErro('Erro ao cadastrar o usuário: ' + error.message);
      } else {
        console.error('Erro desconhecido:', error);
        setMensagemErro('Erro desconhecido.');
      }
      setMensagemSucesso('');
    }
  };

  return (
    <div>
      <div className="mx-auto flex flex-col items-center">
        <Image 
          src="/logo.png" 
          alt="LOGO" 
          width={423}
          height={357}
        />
        <h1 className="h1 bebas-neue-regular text-center">CADASTRO</h1>
        <form className="form goldman-regular flex flex-col items-center" onSubmit={handleSignUp}>
          <p className='formsp'>NOME</p>
          <InputSimples 
            className="inputsCadELog bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          
          <p className='formsp'>EMAIL</p>
          <InputSimples 
            className="inputsCadELog bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <p className='formsp'>SENHA</p>
          <InputSimples 
            className="inputsCadELog bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder="A senha deve conter no mínimo 6 dígitos"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <p className='formsp'>DATA DE <br /> NASCIMENTO</p>
          <InputSimples 
            className="inputsCadELog bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder="YYYY-MM-DD"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <p className='formsp'>BIOGRAFIA</p>
          <InputSimples 
            className="inputsCadELog bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />

          <p className='formsp'>ESTADO</p>
          <InputSimples 
            className="inputsCadELog bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />

          <BotaoInicio
            texto="CADASTRAR"
            type="submit"
          />

          
          {mensagemSucesso && (
              <p className="formSucesso">{mensagemSucesso}</p>
          )}

          {mensagemErro && (
            <p className="formErro">{mensagemErro}</p>
          )}
          
          <Link href="/Login" className="mt-2 text-[.9em] leading-none text-gray-500 duration-100 hover:border-b-2 border-gray-500">JÁ POSSUI UMA CONTA? / ENTRAR</Link>
        </form>
      </div>
    </div>
  );
}
