'use client';

import { useState, useEffect } from 'react';
import Topo from "@/components/Topo/Topo";
import { buscarSaldo, buscarTransacoes, adicionarTransacao } from '@/firebase/dbCarteiraService';

interface Transacao {
    id: string;
    valor: number;
    tipo: 'entrada' | 'saida';
    descricao: string;
    dataCriacao: Date;
}

export default function Carteira() {
    const [saldo, setSaldo] = useState(0);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [novoValor, setNovoValor] = useState('');

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [saldoAtual, historicoTransacoes] = await Promise.all([
                buscarSaldo(),
                buscarTransacoes()
            ]);
            setSaldo(saldoAtual);
            setTransacoes(historicoTransacoes);
        } catch (error) {
            console.error('Erro ao carregar dados da carteira:', error);
            alert('Erro ao carregar dados da carteira');
        }
    };

    const adicionarValor = async (tipo: 'entrada' | 'saida') => {
        if (!novoValor) return;

        const valor = parseFloat(novoValor);
        if (isNaN(valor) || valor <= 0) {
            alert('Por favor, insira um valor válido');
            return;
        }

        try {
            await adicionarTransacao(
                valor,
                tipo,
                tipo === 'entrada' ? 'Depósito manual' : 'Retirada manual'
            );
            await carregarDados();
            setNovoValor('');
        } catch (error) {
            console.error('Erro ao adicionar transação:', error);
            alert('Erro ao adicionar transação');
        }
    };

    return (
        <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
            <Topo />
            <div className="container-carteira div-container flex flex-col align-center justify-center container mx-auto bg-[#D2EDEB]">
                <h1 className="text-[#02b4a4] text-center">
                    SALDO: <br /> {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h1>
                <div className="tarefas-input flex justify-center items-center">
                    <button 
                        onClick={() => adicionarValor('entrada')}
                        className="add-valor"
                    >
                        +
                    </button>
                    <input
                        type="number"
                        value={novoValor}
                        onChange={(e) => setNovoValor(e.target.value)}
                        placeholder="DIGITE UM VALOR..."
                        className="border-none focus:outline-none"
                    />
                    <button 
                        onClick={() => adicionarValor('saida')}
                        className="remove-valor"
                    >
                        -
                    </button>
                </div>

                    {/* Histórico de Transações */}
                <div className="div-historico">
                    <h2 className="text-[#175651]">HISTÓRICO DE TRANSAÇÕES</h2>
                    <div className='div-dados-hist rounded-[30px]'>
                    {transacoes.map((transacao) => (
                            <div 
                                key={transacao.id}
                                className={`py-4 px-8 mb-3 flex justify-between items-center rounded-[40px] ${
                                    transacao.tipo === 'entrada' ? 'bg-[#B8E8E4]' : 'bg-[#FFD1D1]'
                                }`}
                            >
                                <div>
                                    <p className="txt-hist1 text-[#175651]">{transacao.descricao}</p>
                                    <p className="txt-hist2 text-[#555]">
                                        {transacao.dataCriacao.toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <p className={`txt-hist1 ${
                                    transacao.tipo === 'entrada' ? 'text-[#02b4a4]' : 'text-[#b40202]'
                                }`}>
                                    {transacao.tipo === 'entrada' ? '+' : '-'}
                                    {transacao.valor.toLocaleString('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' 
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}