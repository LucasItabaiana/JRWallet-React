// src/app/Perfil.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Topo from '@/components/Topo/Topo';
import Image from 'next/image';
import { buscarDadosUsuario, realizarLogout, DadosUsuario } from '../../types/perfilService';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/authentication";

export default function Perfil() {
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuario | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagemErro, setMensagemErro] = useState('');
  const router = useRouter();

  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const selecionarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) {
      const imgURL = URL.createObjectURL(arquivo);
      setImagemSelecionada(imgURL);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        try {
          const dados = await buscarDadosUsuario(user.uid);
          setDadosUsuario(dados);
        } catch (error) {
          if (error instanceof Error) {
            setMensagemErro(error.message);
          } else {
            setMensagemErro('Erro desconhecido.');
          }
        } finally {
          setCarregando(false);
        }
      } else {
        setUid(null);
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await realizarLogout();
      router.push('/'); 
    } catch (error) {
      setMensagemErro("Erro ao deslogar.");
    }
  };

  if (carregando) {
    return (
      <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
        <Topo />
        <div className="div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52 text-center">
          <p className="text-[5em] text-[#175651]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!uid) {
    return (
      <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
        <Topo />
        <div className="div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52 text-center">
          <p className="text-[5em] text-[#561717]">Usuário não está autenticado.</p>
        </div>
      </div>
    );
  }

  if (mensagemErro) {
    return (
      <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
        <Topo />
        <div className="div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52 text-center">
          <p className="text-[5em] text-[#561717]">{mensagemErro}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
      <Topo />
      <div className="div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52 text-[#175651]">
        {imagemSelecionada && (
          <div className="profile-pic flex justify-center py-3">
            <Image 
              src={imagemSelecionada} 
              alt="Foto de Perfil"
              width={200} 
              height={200}
              className="border-[10px] border-[#9ACFCB] rounded-full py-1 px-1"
            />
          </div>
        )}
        <div className="relative w-full flex justify-center text-[25px]">
          <input
            type="file"
            accept="image/*"
            onChange={selecionarImagem}
            className="absolute cursor-pointer opacity-0 z-10 pr-60" 
          />
          <button
            type="button"
            className="py-1 px-5 rounded-full bg-[#175651] hover:bg-[#0f3a36] text-[#02b4a4]"
          >
            Escolher Arquivo
          </button>
        </div>
        {dadosUsuario ? (
          <div className="info-profile">
            <h1>Nome: {dadosUsuario.nome}</h1>
            <p>Bio: {dadosUsuario.biografia}</p>
            <p>Estado: {dadosUsuario.estado}</p>
            <p>Data de nascimento: {dadosUsuario.dataNascimento}</p>
            <p>Email: {dadosUsuario.email}</p>
          </div>
        ) : (
          <p>Nenhum dado foi encontrado.</p>
        )}

        <button
          className="mt-4 py-2 px-6 bg-red-500 text-white rounded-full hover:bg-red-600"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </div>
  );
}
