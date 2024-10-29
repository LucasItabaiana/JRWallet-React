'use client'; 

import { auth, db } from '../../firebase/authentication'; 
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
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
  const router = useRouter(); 

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

      router.push('/Login');
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
      <div className="mx-auto flex flex-col text-center items-center">
        <Image 
          src="/logo.png" 
          alt="LOGO" 
          width={350}
          height={300}
        />
        <h1 className="text-center bebas-neue-regular z-10 text-[90px] leading-none pl-[20px] tracking-[20px] text-[#DBFFFC]">CADASTRO</h1>
        <form className="form goldman-regular relative bottom-[80px] flex flex-col items-center bg-[#2C334B] w-[35%] h-auto justify-center rounded-[32px] py-[60px] px-0 mt-[30px] mb-[40px]" onSubmit={handleSignUp}>
          <p className='text-[35px] text-white leading-[1.1] text-center'>NOME</p>
          <InputSimples 
            className="mb-[30px] p-[7px] w-[80%] h-[40px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          
          <p className='text-[35px] text-white leading-[1.1] text-center'>EMAIL</p>
          <InputSimples 
            className="mb-[30px] p-[7px] w-[80%] h-[40px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <p className='text-[35px] text-white leading-[1.1] text-center'>SENHA</p>
          <InputSimples 
            className="mb-[30px] p-[7px] w-[80%] h-[40px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder="A senha deve conter no mínimo 6 dígitos"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <p className='text-[35px] text-white leading-[1.1] text-center'>DATA DE <br /> NASCIMENTO</p>
          <InputSimples 
            className="mb-[30px] p-[7px] w-[80%] h-[40px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder="YYYY-MM-DD"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <p className='text-[35px] text-white leading-[1.1] text-center'>BIOGRAFIA</p>
          <InputSimples 
            className="mb-[30px] p-[7px] w-[80%] h-[40px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />

          <p className='text-[35px] text-white leading-[1.1] text-center'>ESTADO</p>
          <InputSimples 
            className="mb-[30px] p-[7px] w-[80%] h-[40px] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
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
            <p className="text-[1.4em] text-center bg-[#4b2c2c] py-[5px] px-[15px] tracking-[2px] rounded-full text-[rgb(255, 56, 56)]">{mensagemSucesso}</p>
          )}

          {mensagemErro && (
            <p className="text-[1.4em] text-center bg-[#364b2c] py-[5px] px-[15px] tracking-[2px] rounded-full text-[rgb(112, 255, 56)]">{mensagemErro}</p>
          )}
          
          <Link href="/Login" className="mt-2 text-[.9em] leading-none text-gray-500 duration-100 hover:border-b-2 border-gray-500">JÁ POSSUI UMA CONTA? / ENTRAR</Link>
        </form>
      </div>
    </div>
  );
}
