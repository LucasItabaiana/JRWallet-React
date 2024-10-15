import Image from 'next/image';
import Link from "next/link";


export default function Inicio() {
    return(
        <div className='flex flex-col items-center bg-[#175651]'>
            <div className='h-[135px] w-full'>
            </div>
            <div className='Topo fixed z-10 flex justify-around items-center gap-[30%] w-[99%] h-[95px] bg-[#d2edeb] rounded-[20px] my-[25px]'>
                <Image 
                    src="/logo.png" 
                    alt="LOGO" 
                    width={280}
                    height={240}
                />
                <Link href='/Login' className='koulen-regular text-[#02b4a4] text-[70px] py-[10px] px-[20px] transition-[2ms] hover:text-[#175651]'>ENTRAR →</Link>
            </div>


            <div className='info1 flex justify-between items-center bg-[#b8e8e4] rounded-[20px] mb-[20px] w-[99%] h-[650px]'>
                <div className='flex flex-col w-1/2 justify-center items-center'>
                    <div className='bebas-neue-regular absolute text-[3rem] text-[#175651] leading-none tracking-[3px]'>
                        <h1 className='koulen-regular text-[6.5rem] text-[#02b4a4] leading-normal'>
                            JR WALLET
                        </h1>
                        UMA MANEIRA DIVERTIDA, <br />
                        FUNCIONAL E DIDÁTICA DE <br />
                        ENSINAR EDUCAÇÃO <br />
                        FINANCEIRA AOS PEQUENOS.
                    </div>
                    <Image 
                        src="/logo.png" 
                        alt="LOGO" 
                        width={300}
                        height={250}
                        className='relative left-[50%]'
                    />
                </div>
                <div className='flex text-right justify-center items-center w-1/2 bg-[#dbfffc] rounded-[20px] h-[650px]'>
                    <h1 className='bebas-neue-regular text-shadow text-[90px] text-[#dbfffc] leading-none pb-3'>
                        METAS <br />
                        TAREFAS <br />
                        DIVERSÃO <br />
                        APRENDIZADO
                    </h1>
                </div>
            </div>
            <div className='info2 bg-[#b8e8e4] rounded-[20px] text-center mb-[20px] w-[99%] h-[660px] flex flex-col justify-center items-center'>
                <h1 className='koulen-regular text-[100px] text-[#02b4a4] leading-[1.2] pt-[20px]'>QUEM SOMOS?</h1>
                <p className='bebas-neue-regular text-[#175651] text-[2.5rem] tracking-[1px] leading-none pb-5'>
                    TRANSFORMAMOS O APRENDIZADO FINANCEIRO EM UMA EXPERIÊNCIA <br />
                    DIVERTIDA E EDUCATIVA PARA CRIANÇAS, ENVOLVENDO PAIS E FILHOS <br />
                    EM UM PROCESSO COM METAS E RECOMPENSAS. OFERECEMOS PERFIS <br />
                    PERSONALIZADOS, ATIVIDADES INTERATIVAS E FERRAMENTAS <br />
                    PRÁTICAS QUE ENSINAM CONCEITOS FINANCEIROS DESDE CEDO, <br />
                    FORTALECENDO OS LAÇOS FAMILIARES E PREPARANDO AS CRIANÇAS <br />
                    PARA UM FUTURO FINANCEIRAMENTE SAUDÁVEL.                     
                </p>

                <Link href='/Cadastro' className='koulen-regular inline-block leading-[1.1] text-[#02b4a4] text-[2.5rem] bg-[#9acfcb] w-[20%] rounded-[25px] no-underline transition-[2ms] hover:bg-[#02b4a4] hover:text-[#9acfcb]'>CRIAR CONTA →</Link>
                <Image 
                        src="/logo.png" 
                        alt="LOGO" 
                        width={180}
                        height={120}
                        className='transform scale-x-[-1] relative right-[12%] bottom-[3%]'
                    />
            </div>
            
            <div className='bg-[#02b4a4] p-5 w-full text-center'>
                <p className='bebas-neue-regular text-[#175651] text-4xl w-full'>JR WALLET - AMANDA NOGEIRA, ARTHUR MAGALHÃES, BRENO COSTA, LUCAS SOUZA, JÚLIA CÂMARA</p>
            </div> 

           
        </div>
    )
}