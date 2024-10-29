import { doc, setDoc, collection, getDocs, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./authentication";
import { getAuth } from "firebase/auth";

interface Transacao {
    id: string;
    valor: number;
    tipo: 'entrada' | 'saida';
    descricao: string;
    dataCriacao: Date;
}

interface Carteira {
    saldo: number;
    ultimaAtualizacao: Date;
}

// Inicializa ou busca a carteira do usuário
export const inicializarCarteira = async (): Promise<Carteira> => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error('Usuário não está autenticado');
    }

    try {
        const carteiraRef = doc(db, "usuarios", currentUser.uid, "carteira", "principal");
        const carteiraDoc = await getDoc(carteiraRef);

        if (!carteiraDoc.exists()) {
            const novaCarteira: Carteira = {
                saldo: 0,
                ultimaAtualizacao: new Date()
            };
            await setDoc(carteiraRef, novaCarteira);
            return novaCarteira;
        }

        return carteiraDoc.data() as Carteira;
    } catch (error) {
        console.error('Erro ao inicializar carteira:', error);
        throw error;
    }
};

// Adiciona uma nova transação e atualiza o saldo
export const adicionarTransacao = async (
    valor: number,
    tipo: 'entrada' | 'saida',
    descricao: string
) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error('Usuário não está autenticado');
    }

    try {
        // Primeiro, garantimos que a carteira existe
        let carteira = await inicializarCarteira();
        
        // Referência para a carteira principal
        const carteiraRef = doc(db, "usuarios", currentUser.uid, "carteira", "principal");
        
        // Calcular novo saldo
        const novoSaldo = tipo === 'entrada' 
            ? carteira.saldo + valor 
            : carteira.saldo - valor;

        // Atualizar saldo da carteira
        await setDoc(carteiraRef, {
            saldo: novoSaldo,
            ultimaAtualizacao: new Date()
        }, { merge: true });

        // Criar nova transação
        const novaTransacao: Omit<Transacao, 'id'> = {
            valor,
            tipo,
            descricao,
            dataCriacao: new Date()
        };

        // Adicionar à subcoleção de transações
        const transacoesCollection = collection(carteiraRef, "transacoes");
        const transacaoDoc = await addDoc(transacoesCollection, novaTransacao);

        return {
            id: transacaoDoc.id,
            ...novaTransacao
        };
    } catch (error) {
        console.error('Erro ao adicionar transação:', error);
        throw error;
    }
};

// Função para adicionar recompensa da tarefa à carteira
export const adicionarRecompensaTarefa = async (
    valor: number,
    nomeTarefa: string
) => {
    return adicionarTransacao(
        valor,
        'entrada',
        `Recompensa da tarefa: ${nomeTarefa}`
    );
};

// Busca todas as transações
export const buscarTransacoes = async (): Promise<Transacao[]> => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
        throw new Error('Usuário não está autenticado');
    }

    try {
        const carteiraRef = doc(db, "usuarios", currentUser.uid, "carteira", "principal");
        const transacoesCollection = collection(carteiraRef, "transacoes");
        const transacoesSnapshot = await getDocs(transacoesCollection);

        const transacoes = transacoesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            dataCriacao: doc.data().dataCriacao?.toDate() || new Date()
        })) as Transacao[];

        return transacoes.sort((a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime());
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        throw error;
    }
};

// Busca o saldo atual
export const buscarSaldo = async (): Promise<number> => {
    try {
        const carteira = await inicializarCarteira();
        return carteira.saldo;
    } catch (error) {
        console.error('Erro ao buscar saldo:', error);
        throw error;
    }
};