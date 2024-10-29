import { Meta } from './Meta'; // Certifique-se de que o caminho está correto

// Função para adicionar uma nova meta
export const adicionarMeta = (
    novaMeta: Meta,
    listaMetas: Meta[],
    setMetas: React.Dispatch<React.SetStateAction<Meta[]>>
) => {
    const novaMetaComId = {
        ...novaMeta,
        id: Date.now(), // `id` permanece como número
    };
    setMetas([...listaMetas, novaMetaComId]);
};

// Função para excluir uma meta pelo ID
export const excluirMeta = (
    id: number, // `id` é um número
    listaMetas: Meta[],
    setMetas: React.Dispatch<React.SetStateAction<Meta[]>>
) => {
    const atualizadas = listaMetas.filter(meta => meta.id !== id);
    setMetas(atualizadas);
};

// Função para alternar a dificuldade de uma meta
export const alternarDificuldade = (
    id: number, // `id` é um número
    listaMetas: Meta[],
    setMetas: React.Dispatch<React.SetStateAction<Meta[]>>
) => {
    const dificuldades: ('Fácil' | 'Média' | 'Difícil')[] = ['Fácil', 'Média', 'Difícil'];
    
    const atualizadas = listaMetas.map(meta => {
        if (meta.id === id) {
            const novaDificuldade = dificuldades[
                (dificuldades.indexOf(meta.dificuldade) + 1) % dificuldades.length
            ];
            return { ...meta, dificuldade: novaDificuldade };
        }
        return meta;
    });
    
    setMetas(atualizadas);
};
