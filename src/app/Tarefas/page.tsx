'use client';

import React, { useState, useEffect } from 'react';
import Topo from '@/components/Topo/Topo';
import { getAuth } from 'firebase/auth';
import { cadastrarTarefa, atualizarTarefa, excluirTarefa, buscarTarefasDoUsuario } from '@/firebase/dbTarefaService';
import { adicionarRecompensaTarefa, inicializarCarteira } from '@/firebase/dbCarteiraService';

interface Tarefa {
    id: string;
    nome: string;
    recompensa: string;
    dificuldade: 'Fácil' | 'Média' | 'Difícil';
    concluida: boolean;
    dataCriacao: Date;
}

export default function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
    const [novaTarefa, setNovaTarefa] = useState<Omit<Tarefa, 'id' | 'concluida' | 'dataCriacao'>>({ 
        nome: '', 
        recompensa: '', 
        dificuldade: 'Fácil' 
    });
    const auth = getAuth();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const inicializar = async () => {
            // Inicializa a carteira ao carregar o componente
            try {
                await inicializarCarteira();
            } catch (error) {
                console.error('Erro ao inicializar carteira:', error);
            }
        };

        const loadTasks = async () => {
            try {
                const tarefas = await buscarTarefasDoUsuario();
                setListaTarefas(tarefas);
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
                alert('Erro ao carregar tarefas. Por favor, recarregue a página.');
            }
        };

        inicializar();
        loadTasks();
    }, []);

    const adicionarTarefa = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert('Você precisa estar logado para adicionar tarefas.');
            return;
        }

        // Validação dos campos
        if (!novaTarefa.nome.trim() || !novaTarefa.recompensa.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validação do valor da recompensa
        const valorRecompensa = parseFloat(novaTarefa.recompensa.replace(/[^\d.,]/g, '').replace(',', '.'));
        if (isNaN(valorRecompensa)) {
            alert('Por favor, insira um valor válido para a recompensa.');
            return;
        }

        try {
            const novaTarefaCriada = await cadastrarTarefa(
                novaTarefa.nome,
                novaTarefa.recompensa,
                novaTarefa.dificuldade
            );
            setListaTarefas([...listaTarefas, novaTarefaCriada as Tarefa]);
            setNovaTarefa({ nome: '', recompensa: '', dificuldade: 'Fácil' });
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            alert('Erro ao adicionar tarefa. Por favor, tente novamente.');
        }
    };

    const alternarConcluida = async (id: string) => {
        const tarefa = listaTarefas.find((t) => t.id === id);
        if (tarefa) {
            try {
                const sucesso = await atualizarTarefa(id, !tarefa.concluida);
                if (sucesso && !tarefa.concluida) {  // Se está marcando como concluída
                    // Limpa o valor da recompensa e converte para número
                    const valorString = tarefa.recompensa.replace(/[^\d.,]/g, '').replace(',', '.');
                    const valorRecompensa = parseFloat(valorString);
                    
                    if (!isNaN(valorRecompensa) && valorRecompensa > 0) {
                        try {
                            await adicionarRecompensaTarefa(valorRecompensa, tarefa.nome);
                        } catch (error) {
                            console.error('Erro ao adicionar recompensa à carteira:', error);
                            alert('A tarefa foi concluída, mas houve um erro ao adicionar a recompensa à carteira.');
                        }
                    } else {
                        console.error('Valor de recompensa inválido:', tarefa.recompensa);
                        alert('A tarefa foi concluída, mas o valor da recompensa é inválido.');
                    }
                }
                
                setListaTarefas(listaTarefas.map((t) =>
                    t.id === id ? { ...t, concluida: !t.concluida } : t
                ));
            } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
                alert('Erro ao atualizar tarefa. Por favor, tente novamente.');
            }
        }
    };

    const removerTarefa = async (id: string) => {
        try {
            const sucesso = await excluirTarefa(id);
            if (sucesso) {
                setListaTarefas(listaTarefas.filter(tarefa => tarefa.id !== id));
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
            alert('Erro ao excluir tarefa. Por favor, tente novamente.');
        }
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
                                onClick={() => removerTarefa(tarefa.id)}
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