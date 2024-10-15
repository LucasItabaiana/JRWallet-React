
// src/app/Tarefas.tsx
'use client'
import { useState } from 'react';
import Topo from '@/components/Topo/Topo';
import { adicionarTarefa, excluirTarefa, alternarConcluida } from '../../types/tarefasService';
import { Tarefa } from '../../types/tarefa'; // Importa a interface Tarefa

export default function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
    const [novaTarefa, setNovaTarefa] = useState<Tarefa>({ nome: '', recompensa: '', dificuldade: 'fácil', concluida: false, id: 0 });

    
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
                                    onChange={(e) => setNovaTarefa({ ...novaTarefa, dificuldade: e.target.value })}
                                    className="text-[25px] text-[#02b4a4] w-[290px] tracking-wider border-none rounded-[29px] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="fácil">Fácil</option>
                                    <option value="média">Média</option>
                                    <option value="difícil">Difícil</option>
                                </select>
                            </div>
                            <button
                                onClick={() => adicionarTarefa(novaTarefa, listaTarefas, setListaTarefas)}
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
                                    className='checkbox' 
                                    required>
                                </input>
                                <label 
                                    htmlFor={`customCheckbox-${tarefa.id}`} 
                                    onClick={() => alternarConcluida(tarefa.id, listaTarefas, setListaTarefas)}
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
                                onClick={() => excluirTarefa(tarefa.id, listaTarefas, setListaTarefas)}
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
