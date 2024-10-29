'use client'
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Topo(){
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useEffect(() => {
    const storedActive = localStorage.getItem("activeLink");
    setActiveColor(storedActive);
  }, []);

  const handleClick = (item: string) => {
    setActiveColor(item);
    localStorage.setItem("activeLink", item);
  }

    return(    
        <div className="divTopo fixed bottom-[5%] flex items-center justify-evenly h-[100px] w-[99%] bg-[#d2edeb] rounded-[30px]">
          <Link href={"/Metas"} onClick={() => handleClick("metas")}>
            <svg className="h-[60px] w-[60px] transition-[2ms] hover:fill-[#175651]" style={{fill: activeColor === "metas" ? "#175651" : "#02b4a4"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z"/></svg>
          </Link>
          <Link href={"/Tarefas"} onClick={() => handleClick("tarefas")}>
            <svg className="h-[60px] w-[60px] transition-[2ms] hover:fill-[#175651]" style={{fill: activeColor === "tarefas" ? "#175651" : "#02b4a4"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          </Link>
          
          <Link href={"/Home"}>
            <Image 
              src="/logo.png" 
              alt="LOGO"       
              width={300}
              height={250}
            />
          </Link>
          
          <Link href={"/Carteira"} onClick={() => handleClick("carteira")}>
            <svg className="h-[60px] w-[60px] transition-[2ms] hover:fill-[#175651]" style={{fill: activeColor === "carteira" ? "#175651" : "#02b4a4"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
          </Link>
          <Link href={"/Perfil"} onClick={() => handleClick("perfil")}>
            <svg className="h-[60px] w-[60px] transition-[2ms] hover:fill-[#175651]" style={{fill: activeColor === "perfil" ? "#175651" : "#02b4a4"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
          </Link>
        </div>
        
   
  )
}
    

