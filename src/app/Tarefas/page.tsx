// src/app/Tarefas.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Topo from '@/components/Topo/Topo';
import { db } from "@/firebase/authentication";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

interface Tarefa {
    id: string;
    nome: string;
    recompensa: string;
    dificuldade: 'Fácil' | 'Média' | 'Difícil';
    concluida: boolean;
}

export default function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
    const [novaTarefa, setNovaTarefa] = useState<Omit<Tarefa, 'id' | 'concluida'>>({ nome: '', recompensa: '', dificuldade: 'Fácil' });

    // Função para carregar tarefas do Firestore
    useEffect(() => {
        const tarefasCollection = collection(db, 'tarefas')

        const unsubscribe = onSnapshot(tarefasCollection, (snapshot) => {
            const tarefasData: Tarefa[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Tarefa[];
            setListaTarefas(tarefasData);
        });

        return () => unsubscribe();
    }, []);

    const adicionarTarefa = async () => {
        const tarefasCollection = collection(db, 'tarefas');
        const tarefaCompletada: Tarefa = {
            ...novaTarefa,
            id: '',
            concluida: false,
        };

        const docRef = await addDoc(tarefasCollection, tarefaCompletada);
        setListaTarefas([...listaTarefas, { ...tarefaCompletada, id: docRef.id }]);
        setNovaTarefa({ nome: '', recompensa: '', dificuldade: 'Fácil' });
    };

    const alternarConcluida = async (id: string) => {
        const tarefaRef = doc(db, 'tarefas', id);
        const tarefa = listaTarefas.find((t) => t.id === id);

        if (tarefa) {
            await updateDoc(tarefaRef, { concluida: !tarefa.concluida });
            setListaTarefas(listaTarefas.map((t) =>
                t.id === id ? { ...t, concluida: !t.concluida } : t
            ));
        }
    };

    const excluirTarefa = async (id: string) => {
        const tarefaRef = doc(db, 'tarefas', id);
        await deleteDoc(tarefaRef);
        setListaTarefas(listaTarefas.filter(tarefa => tarefa.id !== id));
    };

    return (
        <div className="bebas-neue-regular min-h-screen flex justify-center bg-[#9ACFCB]">

            <div className="div-task div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52">
                <div className='add-tarefa-div'>
                    <p className='bebas-neue-regular add-button shadow-md'>+</p>
                    <div className="add-tarefas add-tarefas-drop py-6 w-[30%] shadow-md">
                        <h2>Adicionar Tarefa</h2>
                        <div className="flex flex-col items-center flex-wrap gap-3">
                            <div className='text-center px-[16%]'>
                                <p className='text-[30px] text-[#175651] tracking-wider mt-4 '>NOME DA TAREFA:</p>
                                <input 
                                    type="text"
                                    value={novaTarefa.nome}
                                    onChange={(e) => setNovaTarefa({ ...novaTarefa, nome: e.target.value })}
                                    placeholder="ESCREVA O NOME DA TAREFA"
                                    className="placeholder-[#A0F7EF] text-[25px] w-[290px] px-3 py-1 tracking-wider border-none rounded-[29px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                                    required
                                />
                            </div>
                            <div className='text-center px-[16%]'>
                                <p className='text-[30px] text-[#175651] tracking-wider mt-1'>RECOMPENSA DA TAREFA:</p>
                                <input 
                                    type="text"
                                    value={novaTarefa.recompensa}
                                    onChange={(e) => setNovaTarefa({ ...novaTarefa, recompensa: e.target.value })}
                                    placeholder="ESCREVA O VALOR"
                                    className="placeholder-[#A0F7EF] text-[25px] w-[290px] px-3 py-1 tracking-wider border-none rounded-[29px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                                    required
                                />
                            </div>
                            <div className='text-center px-[16%]'>
                                <p className='text-[30px] text-[#175651] tracking-wider mt-1'>SELECIONE A DIFICULDADE:</p>
                                <select
                                    value={novaTarefa.dificuldade}
                                    onChange={(e) => setNovaTarefa({ ...novaTarefa, dificuldade: e.target.value as 'Fácil' | 'Média' | 'Difícil' })}
                                    className="text-[25px] text-[#02b4a4] w-[290px] tracking-wider border-none rounded-[29px] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Fácil">Fácil</option>
                                    <option value="Média">Média</option>
                                    <option value="Difícil">Difícil</option>
                                </select>
                            </div>
                            <button
                                onClick={adicionarTarefa}
                                className="text-[25px] w-[290px] h-10 tracking-wider rounded-[29px] bg-[#02b4a4] text-[#175651] hover:bg-[#175651] hover:text-[#02b4a4] transition"
                            >
                                Adicionar Tarefa
                            </button>
                        </div>
                    </div>
                </div>
                <h1 className="text-[30px] text-[#175651] mt-10">TAREFAS</h1>

                {/* Exibição das tarefas */}
                <div className="mt-6">
                    {listaTarefas.map(tarefa => (
                        <div key={tarefa.id} className={`flex justify-between items-center mb-4 p-4 ${tarefa.concluida ? 'bg-[#D4F8F5]' : 'bg-[#B8E8E4]'} rounded-[29px] shadow-md`}>
                            <div className="w-[80%] flex justify-between items-center">
                                <input 
                                    type='checkbox' 
                                    id={`customCheckbox-${tarefa.id}`} 
                                    checked={tarefa.concluida}
                                    onChange={() => alternarConcluida(tarefa.id)}
                                    className='checkbox'
                                    required
                                />
                                <label 
                                    htmlFor={`customCheckbox-${tarefa.id}`} 
                                    className={`checkboxLabel shadow-md ${tarefa.concluida ? 'bg-[#02b402]' : 'bg-[#B8E8E4]'}`}
                                >
                                </label>
                                <div className='flex flex-col'>
                                    <label className='text-[30px] leading-none pt-1 tracking-widest text-[#175651]'>Nome da Tarefa:</label>
                                    <span className={`text-[30px] leading-none pt-3 tracking-wider ${tarefa.concluida ? 'line-through text-[#b2b2b2]' : 'text-[#02b4a4]'}`}>{tarefa.nome}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-[30px] leading-none pt-1 tracking-widest text-[#175651]'>Recompensa da Tarefa:</label>
                                    <span className={`text-[30px] leading-none pt-3 tracking-wider ${tarefa.concluida ? 'line-through text-[#b2b2b2]' : 'text-[#02b4a4]'}`}>{tarefa.recompensa}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-[30px] leading-none pt-1 tracking-widest text-[#175651]'>Nível de Dificuldade:</label>
                                    <span className={`text-[30px] leading-none pt-3 tracking-wider ${tarefa.concluida ? 'line-through text-[#b2b2b2]' : 'text-[#02b4a4]'}`}>{tarefa.dificuldade}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => excluirTarefa(tarefa.id)}
                                className="text-[30px] tracking-wider rounded-[29px] bg-[#b40202] text-[#561717] pr-8 pl-8 hover:bg-[#561717] hover:text-[#b40202] transition"
                            >
                                EXCLUIR
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Topo />
        </div>
    );

}
