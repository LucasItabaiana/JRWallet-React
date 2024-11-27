
'use client';

import React, { useState, useEffect } from 'react';
import Topo from '@/components/Topo/Topo';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from "@/firebase/authentication";

interface Meta {
    id: string;
    userId: string;
    descricao: string;
    valor: number;
    dificuldade: 'Fácil' | 'Média' | 'Difícil';
    dataCriacao: Date;
}

const Metas: React.FC = () => {
    const [metas, setMetas] = useState<Meta[]>([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<string>('');
    const [dificuldade, setDificuldade] = useState<'Fácil' | 'Média' | 'Difícil'>('Fácil');
    const [editando, setEditando] = useState<Meta | null>(null);
    const [novaDescricao, setNovaDescricao] = useState('');
    const [novoValor, setNovoValor] = useState<string>('');
    const [novaDificuldade, setNovaDificuldade] = useState<'Fácil' | 'Média' | 'Difícil'>('Fácil');
    const auth = getAuth();

   
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const metasCollection = collection(db, 'usuarios', currentUser.uid, 'metas');
        const metasQuery = query(metasCollection);

        const unsubscribe = onSnapshot(metasQuery, (snapshot) => {
            const metasData: Meta[] = snapshot.docs.map(doc => ({
                id: doc.id,
                userId: currentUser.uid,
                ...doc.data(),
                dataCriacao: doc.data().dataCriacao?.toDate() || new Date(),
            })) as Meta[];
            setMetas(metasData);
        });

        return () => unsubscribe();
    }, []);

    const adicionarMeta = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('Você precisa estar logado para adicionar metas.');
            return;
        }

        const metasCollection = collection(db, 'usuarios', currentUser.uid, 'metas');

        const novaMeta: Omit<Meta, 'id'> = {
            userId: currentUser.uid,
            descricao,
            valor: Number(valor),
            dificuldade,
            dataCriacao: new Date(),
        };

        try {
            const docRef = await addDoc(metasCollection, novaMeta);
            setMetas([...metas, { ...novaMeta, id: docRef.id }]);
            setDescricao('');
            setValor('');
            setDificuldade('Fácil');
        } catch (error) {
            console.error('Erro ao adicionar meta:', error);
            alert('Erro ao adicionar meta. Por favor, tente novamente.');
        }
    };

    const iniciarEdicao = (meta: Meta) => {
        setEditando(meta);
        setNovaDescricao(meta.descricao);
        setNovoValor(String(meta.valor));
        setNovaDificuldade(meta.dificuldade);
    };

    const cancelarEdicao = () => {
        setEditando(null);
    };

    const salvarEdicao = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || !editando) return;

        const metaDoc = doc(db, 'usuarios', currentUser.uid, 'metas', editando.id);

        const metaAtualizada: Partial<Meta> = {
            descricao: novaDescricao,
            valor: Number(novoValor),
            dificuldade: novaDificuldade,
        };

        try {
            await updateDoc(metaDoc, metaAtualizada);
            setMetas(metas.map(meta => (meta.id === editando.id ? { ...meta, ...metaAtualizada } : meta)));
            cancelarEdicao();
        } catch (error) {
            console.error('Erro ao atualizar meta:', error);
            alert('Erro ao atualizar meta. Por favor, tente novamente.');
        }
    };

    const excluirMeta = async (id: string) => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        try {
            const metaDoc = doc(db, 'usuarios', currentUser.uid, 'metas', id);
            await deleteDoc(metaDoc);
            setMetas(metas.filter(meta => meta.id !== id));
        } catch (error) {
            console.error('Erro ao excluir meta:', error);
            alert('Erro ao excluir meta. Por favor, tente novamente.');
        }
    };

    
    return (
      <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
      <Topo />

      <div className="div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52">
        <h1 className='h1-metas text-[#02b4a4]'>METAS</h1>

        <div className="div-add-meta bg-[#B8E8E4] rounded-[30px] leading-none shadow-sm">
          <h2 className='text-[#0E7E75] leading-none'>Adicionar Meta</h2>
          <div className="flex justify-center items-center">
            <div>
              <p className='text-[#175651]'>DESCRIÇÃO DA META:</p>
              <input
                type="text"
                value={descricao}
                placeholder="DESCREVA A META"
                onChange={(e) => setDescricao(e.target.value)}
                className="placeholder-[#A0F7EF] border-none rounded-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                required
              />
            </div>
            <div>
              <p className='text-[#175651]'>VALOR DA META:</p>
              <input
                type="text"
                value={valor}
                placeholder="DIGITE O VALOR"
                onChange={(e) => setValor(e.target.value)}
                className="placeholder-[#A0F7EF] border-none rounded-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                required
              />
            </div>
            <div>
              <p className='text-[#175651]'>SELECIONE A DIFICULDADE:</p>
              <select
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as 'Fácil' | 'Média' | 'Difícil')}
                className="text-[#02b4a4] border-none rounded-[30px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fácil">Fácil</option>
                <option value="média">Média</option>
                <option value="difícil">Difícil</option>
              </select>
            </div>
            <button
              onClick={adicionarMeta}
              className="rounded-[30px] bg-[#02b4a4] text-[#175651] hover:bg-[#175651] hover:text-[#02b4a4] transition"
            >
              Adicionar Meta
            </button>
          </div>
        </div>

        {editando && (
          <div className="div-add-meta bg-[#e1e8b8] rounded-[30px] leading-none shadow-sm">
            <h2 className=" text-[#7e770e]">Editar Meta</h2>
            <div className="flex justify-center items-center">
              <div>
                <p className='text-[#555617]'>DESCRIÇÃO DA META:</p>
                <input
                  type="text"
                  value={novaDescricao}
                  placeholder="DESCREVA A META"
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  className="placeholder-[#e7f7a0] border-none rounded-[30px] text-[#b1b402] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <p className='text-[#555617]'>VALOR DA META:</p>
                <input
                  type="text"
                  value={novoValor}
                  placeholder="DIGITE O VALOR"
                  onChange={(e) => setNovoValor(e.target.value)}
                  className="placeholder-[#e7f7a0] border-none rounded-[30px] text-[#b1b402] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <p className='text-[#555617]'>SELECIONE A DIFICULDADE:</p>
                <select
                  value={novaDificuldade}
                  onChange={(e) => setNovaDificuldade(e.target.value as 'Fácil' | 'Média' | 'Difícil')}
                  className="border-none rounded-[30px] text-[#b1b402] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="fácil">Fácil</option>
                  <option value="média">Média</option>
                  <option value="difícil">Difícil</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <button
                  onClick={salvarEdicao}
                  className="rounded-[30px] bg-[#02b47f] text-[#17563e] hover:bg-[#17563e] hover:text-[#02b47f] transition"
                >
                  Salvar
                </button>              
                <button
                  onClick={cancelarEdicao}
                  className="rounded-[30px] bg-[#b40202] text-[#561717] hover:bg-[#561717] hover:text-[#b40202] transition"
                >
                  Cancelar
                </button>   
              </div>             
            </div>
          </div>
        )}

        <ul className="ul-metas list-none p-0">
          {metas.map((meta) => (
            <li key={meta.id} className="bg-[#B8E8E4] rounded-[30px] shadow-sm">
              <div className="flex justify-between items-center">
                <div className='w-[80%] flex justify-evenly'>
                  <strong className=" text-[#175651]">{meta.descricao}</strong>
                  <p className=' text-[#02b4a4]'>R${meta.valor}</p>
                  <p className=' text-[#02b4a4]'>{meta.dificuldade}</p>
                </div>
                <div className="div-btn-metas flex">
                  <button
                    onClick={() => iniciarEdicao(meta)}
                    className="rounded-[30px] bg-[#b4a802] text-[#525617] hover:bg-[#525617] hover:text-[#b4a802] transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirMeta(meta.id)}
                    className="rounded-[30px] bg-[#b40202] text-[#561717] hover:bg-[#561717] hover:text-[#b40202] transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
};

export default Metas;