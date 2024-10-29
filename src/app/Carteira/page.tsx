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
            <div className="div-container flex flex-col align-center justify-center h-[600px] container mx-auto bg-[#D2EDEB] mt-20 mb-52">
                <h1 className="text-[110px] tracking-[45px] text-[#02b4a4] text-center">
                    SALDO: {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </h1>
                <div className="tarefas-input flex justify-center items-center">
                    <button 
                        onClick={() => adicionarValor('entrada')}
                        className="px-[40px] text-[30px] text-[#02b4a4] hover:text-[#175651]"
                    >
                        +
                    </button>
                    <input
                        type="number"
                        value={novoValor}
                        onChange={(e) => setNovoValor(e.target.value)}
                        placeholder="DIGITE UM VALOR..."
                        className="text-[25px] w-[290px] px-3 py-1 tracking-wider border-none rounded-[29px] focus:outline-none"
                    />
                    <button 
                        onClick={() => adicionarValor('saida')}
                        className="px-[45px] text-[30px] text-[#b40202] hover:text-[#561717]"
                    >
                        -
                    </button>
                </div>

                {/* Histórico de Transações */}
                <div className="mt-8 px-4 overflow-y-auto max-h-[300px]">
                    <h2 className="text-[30px] text-[#175651] mb-4">HISTÓRICO DE TRANSAÇÕES</h2>
                    {transacoes.map((transacao) => (
                        <div 
                            key={transacao.id}
                            className={`flex justify-between items-center p-4 mb-2 rounded-[29px] ${
                                transacao.tipo === 'entrada' ? 'bg-[#B8E8E4]' : 'bg-[#FFD1D1]'
                            }`}
                        >
                            <div>
                                <p className="text-[20px] text-[#175651]">{transacao.descricao}</p>
                                <p className="text-[16px] text-[#555]">
                                    {transacao.dataCriacao.toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                            <p className={`text-[25px] ${
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
    );
}