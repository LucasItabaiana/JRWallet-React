import Image from 'next/image';
import Link from "next/link";


export default function Inicio() {
    return(
        <div className='flex flex-col items-center bg-[#175651]'>
            <div className='invdiv'></div>
            <div className='Topo fixed z-10 flex justify-around items-center bg-[#d2edeb]'>
                <Image 
                    src="/logo.png" 
                    alt="LOGO" 
                    width={280}
                    height={240}
                    className='logo-top-home'
                />
                <Link href='/Login' className='login koulen-regular text-[#02b4a4] transition-[2ms] hover:text-[#175651]'>ENTRAR →</Link>
            </div>


            <div className='info1 flex justify-between items-center bg-[#b8e8e4]'>
                <div className='cont1 flex flex-col justify-center items-center'>
                    <div className='half bebas-neue-regular absolute text-[#175651] leading-none'>
                        <h1 className='koulen-regular text-[#02b4a4]'>
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
                        className='logo-info1 relative left-[50%]'
                    />
                </div>
                <div className='half1 flex text-right justify-center items-center bg-[#dbfffc]'>
                    <h1 className='bebas-neue-regular text-shadow text-[#dbfffc] leading-none'>
                        METAS <br />
                        TAREFAS <br />
                        DIVERSÃO <br />
                        APRENDIZADO
                    </h1>
                </div>
            </div>
            <div className='info2 bg-[#b8e8e4] text-center flex flex-col justify-center items-center'>
                <h1 className='koulen-regular text-[#02b4a4]'>QUEM SOMOS?</h1>
                <p className='bebas-neue-regular text-[#175651] leading-none'>
                    TRANSFORMAMOS O APRENDIZADO FINANCEIRO EM UMA EXPERIÊNCIA <br />
                    DIVERTIDA E EDUCATIVA PARA CRIANÇAS, ENVOLVENDO PAIS E FILHOS <br />
                    EM UM PROCESSO COM METAS E RECOMPENSAS. OFERECEMOS PERFIS <br />
                    PERSONALIZADOS, ATIVIDADES INTERATIVAS E FERRAMENTAS <br />
                    PRÁTICAS QUE ENSINAM CONCEITOS FINANCEIROS DESDE CEDO, <br />
                    FORTALECENDO OS LAÇOS FAMILIARES E PREPARANDO AS CRIANÇAS <br />
                    PARA UM FUTURO FINANCEIRAMENTE SAUDÁVEL.                     
                </p>

                <Link href='/Cadastro' className='cad koulen-regular inline-block text-[#02b4a4] bg-[#9acfcb] no-underline transition-[2ms] hover:bg-[#02b4a4] hover:text-[#9acfcb]'>CRIAR CONTA →</Link>
                <Image 
                        src="/logo.png" 
                        alt="LOGO" 
                        width={180}
                        height={120}
                        className='logo-info2 transform scale-x-[-1]'
                    />
            </div>
            
            <div className='footer-home bg-[#02b4a4] text-center'>
                <p className='bebas-neue-regular text-[#175651]'>JR WALLET - AMANDA NOGEIRA, ARTHUR MAGALHÃES, BRENO COSTA, LUCAS SOUZA, JÚLIA CÂMARA</p>
            </div> 

           
        </div>
    )
}