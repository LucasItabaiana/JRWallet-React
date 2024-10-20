'use client';

import React, { useState, useEffect } from 'react';
import Topo from '@/components/Topo/Topo';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase/authentication"; 

interface Meta {
    id: string;
    descricao: string;
    valor: number;
    dificuldade: 'Fácil' | 'Média' | 'Difícil';
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

    // Função para carregar metas do Firestore
    useEffect(() => {
        const metasCollection = collection(db, 'metas'); // Referência à coleção 'metas'

        const unsubscribe = onSnapshot(metasCollection, (snapshot) => {
            const metasData: Meta[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Meta[];
            setMetas(metasData);
        });

        return () => unsubscribe();
    }, []);

    const adicionarMeta = async () => {
        const db = getFirestore();
        const metasCollection = collection(db, 'metas');

        const novaMeta: Omit<Meta, 'id'> = {
            descricao,
            valor: Number(valor),
            dificuldade,
        };

        const docRef = await addDoc(metasCollection, novaMeta);
        setMetas([...metas, { ...novaMeta, id: docRef.id }]);
        setDescricao('');
        setValor('');
        setDificuldade('Fácil');
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
        if (editando) {
            const db = getFirestore();
            const metaDoc = doc(db, 'metas', editando.id);

            const metaAtualizada: Partial<Meta> = {
                descricao: novaDescricao,
                valor: Number(novoValor),
                dificuldade: novaDificuldade,
            };

            await updateDoc(metaDoc, metaAtualizada);
            setMetas(metas.map(meta => (meta.id === editando.id ? { ...meta, ...metaAtualizada } : meta)));
            cancelarEdicao();
        }
    };

    const excluirMeta = async (id: string) => {
        const db = getFirestore();
        const metaDoc = doc(db, 'metas', id);
        await deleteDoc(metaDoc);
        setMetas(metas.filter(meta => meta.id !== id));
    };

    return (
        <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
          <Topo />
    
          <div className="div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52">
            <h1 className='text-[120px] leading-[1.2] tracking-[20px] text-[#02b4a4]'>METAS</h1>
    
            <div className="bg-[#B8E8E4] rounded-[30px] p-[1%] leading-none mb-6 shadow-sm">
              <h2 className='text-[#0E7E75] text-[72px] leading-none'>Adicionar Meta</h2>
              <div className="flex gap-3 justify-center items-center pt-6">
                <div>
                  <p className='text-[30px] text-[#175651] tracking-wider'>DESCRIÇÃO DA META:</p>
                  <input
                    type="text"
                    value={descricao}
                    placeholder="DESCREVA A META"
                    onChange={(e) => setDescricao(e.target.value)}
                    className="placeholder-[#A0F7EF] text-[25px] w-60 py-0 px-3 tracking-wider border-none rounded-[29px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                    required
                  />
                </div>
                <div>
                  <p className='text-[30px] text-[#175651] tracking-wider'>VALOR DA META:</p>
                  <input
                    type="text"
                    value={valor}
                    placeholder="DIGITE O VALOR"
                    onChange={(e) => setValor(e.target.value)}
                    className="placeholder-[#A0F7EF] text-[25px] w-52 tracking-wider border-none rounded-[29px] py-0 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                    required
                  />
                </div>
                <div>
                  <p className='text-[30px] text-[#175651] tracking-wider'>SELECIONE A DIFICULDADE:</p>
                  <select
                    value={dificuldade}
                    onChange={(e) => setDificuldade(e.target.value as 'Fácil' | 'Média' | 'Difícil')}
                    className="text-[25px] text-[#02b4a4] w-[290px] tracking-wider border-none rounded-[29px] py-0 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="fácil">Fácil</option>
                    <option value="média">Média</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
                <button
                  onClick={adicionarMeta}
                  className="text-[25px] tracking-wider rounded-[29px] bg-[#02b4a4] text-[#175651] px-8 py-2 hover:bg-[#175651] hover:text-[#02b4a4] transition"
                >
                  Adicionar Meta
                </button>
              </div>
            </div>
    
            {editando && (
              <div className="mb-6 p-6 bg-[#e1e8b8] rounded-[30px] shadow-sm">
                <h2 className="text-5xl mb-4 text-[#7e770e]">Editar Meta</h2>
                <div className="flex flex-col flex-wrap sm:flex-row gap-2 px-[17%]">
                  <p className='text-[30px] text-[#555617] text-3xl tracking-wider mt-5 ml-4 mr-8'>DESCRIÇÃO DA META:</p>
                  <p className='text-[30px] text-[#555617] text-3xl tracking-wider mt-5 mr-7'>VALOR DA META:</p>
                  <p className='text-[30px] text-[#555617] text-3xl tracking-wider mt-5 mr-[6px] h-[10px]'>SELECIONE A DIFICULDADE:</p>
                    <button
                      onClick={salvarEdicao}
                      className="text-[25px] w-[155px] tracking-wider rounded-[29px] bg-[#02b47f] text-[#17563e] pr-8 pl-8 hover:bg-[#17563e] hover:text-[#02b47f] transition"
                    >
                      Salvar
                    </button>
                  <input
                    type="text"
                    value={novaDescricao}
                    placeholder="DESCREVA A META"
                    onChange={(e) => setNovaDescricao(e.target.value)}
                    className="placeholder-[#e7f7a0] text-[25px] w-60 p-3 tracking-wider border-none rounded-[29px] text-[#b1b402] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  <input
                    type="text"
                    value={novoValor}
                    placeholder="DIGITE O VALOR"
                    onChange={(e) => setNovoValor(e.target.value)}
                    className="placeholder-[#e7f7a0] text-[25px] w-52 p-3 tracking-wider border-none rounded-[29px] text-[#b1b402] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  <select
                    value={novaDificuldade}
                    onChange={(e) => setNovaDificuldade(e.target.value as 'Fácil' | 'Média' | 'Difícil')}
                    className="text-[25px] w-[290px] p-3 tracking-wider border-none rounded-[29px] text-[#b1b402] focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="fácil">Fácil</option>
                    <option value="média">Média</option>
                    <option value="difícil">Difícil</option>
                  </select>
                  
                  <button
                    onClick={cancelarEdicao}
                    className="text-[25px] w-[155px] tracking-wider rounded-[29px] bg-[#b40202] text-[#561717] pr-8 pl-8 hover:bg-[#561717] hover:text-[#b40202] transition"
                  >
                    Cancelar
                  </button>                
                </div>
              </div>
            )}
    
            <ul className="list-none p-0">
              {metas.map((meta) => (
                <li key={meta.id} className="mb-4 p-4 bg-[#B8E8E4] rounded-[29px] shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className='w-[80%] flex justify-evenly'>
                      <strong className="text-[30px] tracking-widest text-[#175651]">{meta.descricao}</strong>
                      <p className='text-[30px] tracking-wider text-[#02b4a4]'>R${meta.valor}</p>
                      <p className='text-[30px] tracking-wider text-[#02b4a4]'>{meta.dificuldade}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => iniciarEdicao(meta)}
                        className="py-1 text-[30px] tracking-wider rounded-[29px] bg-[#b4a802] text-[#525617] pr-8 pl-8 hover:bg-[#525617] hover:text-[#b4a802] transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirMeta(meta.id)}
                        className="text-[30px] tracking-wider rounded-[29px] bg-[#b40202] text-[#561717] pr-8 pl-8 hover:bg-[#561717] hover:text-[#b40202] transition"
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