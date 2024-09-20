import Image from 'next/image';
import Link from "next/link";


export default function Inicio() {
    return(
        <div className='maindiv'>
            <div className='Topo'>
                <Image 
                    src="/logo.png" 
                    alt="LOGO" 
                    width={310}
                    height={270}
                />
                <Link href='/Login' className='pTopo koulen-regular'>ENTRAR →</Link>
                
            </div>


            <div className='info1'>
                <div className='divI'>
                    <h1 className='koulen-regular'>JR WALLET</h1>
                    <p className='bebas-neue-regular'>
                        UMA MANEIRA DIVERTIDA, <br />
                        FUNCIONAL E DIDÁTICA DE <br />
                        ENSINAR EDUCAÇÃO <br />
                        FINANCEIRA AOS PEQUENOS.
                    </p>
                </div>
                <div className='divII'>
                    <Image 
                        src="/logo.png" 
                        alt="LOGO" 
                        width={450}
                        height={400}
                        className='info1-img'
                    />
                    <h1 className='bebas-neue-regular'>
                        METAS <br />
                        TAREFAS <br />
                        DIVERSÃO <br />
                        APRENDIZADO
                    </h1>
                </div>
            </div>
            <div className='info2'>
                <h1 className='koulen-regular'>QUEM SOMOS?</h1>
                <p className='bebas-neue-regular'>
                    TRANSFORMAMOS O APRENDIZADO FINANCEIRO EM UMA EXPERIÊNCIA <br />
                    DIVERTIDA E EDUCATIVA PARA CRIANÇAS, ENVOLVENDO PAIS E FILHOS <br />
                    EM UM PROCESSO COM METAS E RECOMPENSAS. OFERECEMOS PERFIS <br />
                    PERSONALIZADOS, ATIVIDADES INTERATIVAS E FERRAMENTAS <br />
                    PRÁTICAS QUE ENSINAM CONCEITOS FINANCEIROS DESDE CEDO, <br />
                    FORTALECENDO OS LAÇOS FAMILIARES E PREPARANDO AS CRIANÇAS <br />
                    PARA UM FUTURO FINANCEIRAMENTE SAUDÁVEL.                     
                </p>

                <Link href='/Cadastro' className='btncriar koulen-regular'>CRIAR CONTA →</Link>
                <Image 
                        src="/logo.png" 
                        alt="LOGO" 
                        width={250}
                        height={200}
                        className='logoH'
                    />
                    
                <div className='Footer'>
                    <p className='bebas-neue-regular'>JR WALLET - AMANDA NOGEIRA, ARTHUR MAGALHÃES, BRENO COSTA, LUCAS SOUZA, JÚLIA CÂMARA</p>
                </div>    
            </div>


           
        </div>
    )
}