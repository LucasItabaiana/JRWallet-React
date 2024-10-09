

'use client'; 

import React, { useState } from 'react';
import Topo from '@/components/Topo/Topo';

interface Meta {
    id: number;
    descricao: string;
    valor: number;
    dificuldade: 'fácil' | 'média' | 'difícil';
  }
  
  const Metas: React.FC = () => {
    const [metas, setMetas] = useState<Meta[]>([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<string>('');
    const [dificuldade, setDificuldade] = useState<'fácil' | 'média' | 'difícil'>('fácil');
    const [editando, setEditando] = useState<Meta | null>(null);
    const [novaDescricao, setNovaDescricao] = useState('');
    const [novoValor, setNovoValor] = useState<string>('');
    const [novaDificuldade, setNovaDificuldade] = useState<'fácil' | 'média' | 'difícil'>('fácil');
  
    
  
    const adicionarMeta = () => {
      const novaMeta: Meta = {
        id: metas.length ? metas[metas.length - 1].id + 1 : 1,
        descricao,
        valor: Number(valor),
        dificuldade,
      };
      setMetas([...metas, novaMeta]);
      setDescricao('');
      setValor('');
      setDificuldade('fácil');
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
  
    const salvarEdicao = () => {
      if (editando) {
        const metaAtualizada: Meta = {
          ...editando,
          descricao: novaDescricao,
          valor: Number(novoValor),
          dificuldade: novaDificuldade,
        };
        setMetas(metas.map(meta => meta.id === editando.id ? metaAtualizada : meta));
        cancelarEdicao();
      }
    };
  
    const excluirMeta = (id: number) => {
      setMetas(metas.filter(meta => meta.id !== id));
    };
  
    return (
      <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
        <Topo />
  
        <div className="div-metas div-container container mx-auto bg-[#D2EDEB] mt-20 mb-52">
          <h1>METAS</h1>
  
          <div className="add-meta mb-6 shadow-sm">
            <h2>Adicionar Meta</h2>
            <div className="flex flex-col flex-wrap sm:flex-row gap-3">
              <p className='text-[30px] text-[#175651] tracking-wider mt-5 ml-3 mr-8'>DESCRIÇÃO DA META:</p>
              <p className='text-[30px] text-[#175651] tracking-wider mt-5 mr-8'>VALOR DA META:</p>
              <p className='text-[30px] text-[#175651] tracking-wider mt-5'>SELECIONE A DIFICULDADE:</p>
              <input
                type="text"
                value={descricao}
                placeholder="DESCREVA A META"
                onChange={(e) => setDescricao(e.target.value)}
                className="placeholder-[#A0F7EF] text-[25px] w-60 p-3 tracking-wider border-none rounded-[29px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                required
              />
              <input
                type="text"
                value={valor}
                placeholder="DIGITE O VALOR"
                onChange={(e) => setValor(e.target.value)}
                className="placeholder-[#A0F7EF] text-[25px] w-52 tracking-wider border-none rounded-[29px] p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#02b4a4]"
                required
              />
              <select
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as 'fácil' | 'média' | 'difícil')}
                className="text-[25px] text-[#02b4a4] w-[290px] tracking-wider border-none rounded-[29px] p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fácil">Fácil</option>
                <option value="média">Média</option>
                <option value="difícil">Difícil</option>
              </select>
              <button
                onClick={adicionarMeta}
                className="text-[25px] tracking-wider rounded-[29px] bg-[#02b4a4] text-[#175651] pr-8 pl-8 hover:bg-[#175651] hover:text-[#02b4a4] transition"
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
                  onChange={(e) => setNovaDificuldade(e.target.value as 'fácil' | 'média' | 'difícil')}
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