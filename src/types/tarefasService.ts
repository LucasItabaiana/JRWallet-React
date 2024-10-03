// src/types/tarefasService.ts
import { Tarefa } from './tarefa'; // Corrija o caminho para a interface Tarefa

export const adicionarTarefa = (
    novaTarefa: Tarefa,
    listaTarefas: Tarefa[],
    setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>
) => {
    const novaTarefaComId = {
        ...novaTarefa,
        id: Date.now(), // Adiciona o campo id com o valor atual de tempo
    };
    setTarefas([...listaTarefas, novaTarefaComId]); // Atualiza a lista de tarefas
};

export const excluirTarefa = (
    id: number,
    listaTarefas: Tarefa[],
    setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>
) => {
    setTarefas(listaTarefas.filter(tarefa => tarefa.id !== id)); // Filtra as tarefas
};

export const alternarConcluida = (
    id: number,
    listaTarefas: Tarefa[],
    setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>
) => {
    const atualizadas = listaTarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(atualizadas); // Atualiza o estado com a lista de tarefas modificadas
};
