'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cadastrarUsuario } from '../../types/AuthService';
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

    const dados = { nome, email, dataNascimento, biografia, estado };
    const resultado = await cadastrarUsuario(email, senha, dados);

    if (resultado.sucesso) {
      setMensagemSucesso(resultado.mensagem);
      setMensagemErro('');
      setTimeout(() => router.push('/Login'), 2000); 
    } else {
      setMensagemErro(resultado.mensagem);
      setMensagemSucesso('');
    }
  };

  return (
    <div>
      <div className="div-lc flex flex-col text-center items-center">
        <Image 
          src="/logo.png" 
          alt="LOGO" 
          width={350}
          height={300}
          className="logo-lc"
        />
        <h1 className="txt-lc text-center bebas-neue-regular z-10 leading-none text-[#DBFFFC]">CADASTRO</h1>
        <form className="form goldman-regular relative flex flex-col items-center bg-[#2C334B] h-auto justify-center" onSubmit={handleSignUp}>
          <p className='text-white text-center'>NOME</p>
          <InputSimples 
            className= "input-lc bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          
          <p className='text-white text-center'>EMAIL</p>
          <InputSimples 
            className= "input-lc bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <p className='text-white text-center'>SENHA</p>
          <InputSimples 
            className= "input-lc bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder="A senha deve conter no mínimo 6 dígitos"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <p className='text-white text-center'>DATA DE <br /> NASCIMENTO</p>
          <InputSimples 
            className= "input-lc w-[90%] bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder="YYYY-MM-DD"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <p className='text-white text-center'>BIOGRAFIA</p>
          <InputSimples 
            className="input-lc bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
            placeholder=""
            type="text"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />

          <p className='text-white text-center'>ESTADO</p>
          <InputSimples 
            className="input-lc bg-zinc-200 text-zinc-600 ring-1 ring-zinc-400 focus:ring-2 focus:ring-[#6BBEB7] outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full shadow-md focus:shadow-lg focus:shadow-[#6BBEB7]"
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
          
          <Link href="/Login" className="mt-5 text-[.9em] leading-none text-gray-500 duration-100 hover:border-b-2 border-gray-500">JÁ POSSUI UMA CONTA? / ENTRAR</Link>
        </form>
      </div>
    </div>
  );
}