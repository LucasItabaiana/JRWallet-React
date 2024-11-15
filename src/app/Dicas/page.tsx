import Link from "next/link";
import Image from 'next/image';
import Topo from "@/components/Topo/Topo";


export default function Dicas() {
    return(
        <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
            <Topo />
            <div className="div-container text-center container mx-auto bg-[#D2EDEB] mt-20 mb-52">
            <div className="title w-full flex flex-col justify-center items-center">
            <div className="flex text-[#02b4a4]">
                <h1>DICAS</h1>
                <Image 
                    src="/logo.png" 
                    alt="LOGO"       
                    width={300}
                    height={200}
                    className="logo-dicas"
                />
            </div>
            <h2 className="text-[#175651]">PARA OS PEQUENOS LIDAREM COM O DINDIN</h2>
            </div>

            <section className="dicas-sec flex flex-wrap">
                <div className="dicas box-shadow">
                    <h2>O Dinheiro e Você: <br /> Seu Superpoder!</h2>
                    <p>Sabia que o dinheiro é como um superpoder? Ele
                       pode te ajudar a fazer muitas coisas, mas, assim
                       como todo super-herói, você precisa saber usá-lo
                       com responsabilidade! O dinheiro vem do trabalho
                       (não debaixo do travesseiro!). Quando a gente
                       trabalha e faz coisas legais, ganhamos dinheiro 
                       para comprar o que queremos.</p>
                </div>
                <div className="dicas box-shadow">
                    <h2>COMO GASTAR O SEU DINHEIRO!</h2>
                    <p>Parte 1: Gastar — Esse é para as coisas que você quer agora, tipo um sorvete ou um brinquedo! <br />
                       Parte 2: Economizar — Esse vai para um 'cofre secreto' para algo grandioso no futuro, como aquele brinquedo que custa mais dinheiro! <br />
                       Parte 3: Doar — Esse é para ajudar alguém, como um super-herói! ‍</p>
                </div>
                <div className="dicas box-shadow">
                    <h2>Desafio da Economia:
                        Superpoder do Cofrinho!</h2>
                    <p>Vamos fazer um desafio? Você vai juntar dinheiro 
                       no seu cofrinho para comprar algo bem legal, tipo
                       um jogo novo ou uma fantasia. Mas aqui está o 
                       truque: quanto mais você poupar, mais rápido vai 
                       alcançar o seu objetivo! Se economizar metade da 
                       mesada toda semana, você vai conseguir mais 
                       rápido e pode até ter um prêmio no final!"</p>
                </div>
                <div className="dicas dicas-premium box-shadow">
                    <Link className="btn-premium absolute m-auto" href={'/Premium'}>ASSINAR</Link>
                    <h2>Missão Doar: <br />
                        Seja um Herói!</h2>
                    <p>Sabe aquele sentimento bom de ajudar alguém? 
                       Que tal usar um pouquinho do seu dinheiro para 
                       ajudar quem precisa? Pode ser um brinquedo, roupas 
                       que você não usa mais, ou até dinheiro para uma 
                       boa causa! Isso é ser um herói, e a sua missão é 
                       muito importante!</p>
                </div>
                <div className="dicas dicas-premium box-shadow">
                    <Link className="btn-premium absolute m-auto" href={'/Premium'}>ASSINAR</Link>
                    <h2>Ganhar Dinheiro: <br />
                        O Poder das Tarefas</h2>
                    <p>Quer ganhar um pouco mais de dinheiro? Que tal 
                       fazer algumas tarefas extras? Pode ser arrumar o 
                       seu quarto, ajudar a cuidar do jardim ou alimentar 
                       os animais de estimação. Cada tarefa é uma 
                       oportunidade para ganhar um pouco mais do seu 
                       superpoder financeiro!</p>
                </div>
                <div className="dicas dicas-premium box-shadow">
                    <Link className="btn-premium absolute m-auto" href={'/Premium'}>ASSINAR</Link>  
                    <h2>O Segredo do Cofrinho: Poupar e Esperar</h2>
                    <p>Imagina que você quer um super brinquedo que custa 
                       R$ 50, mas você tem só R$ 10. O que fazer? O segredo 
                       é esperar e ir guardando um pouquinho de cada vez. 
                       Isso é como juntar peças de um quebra-cabeça! Quando 
                       juntar tudo, você terá o valor completo para a sua 
                       grande conquista!</p>
                </div>

            </section>
            </div>
        </div>
    )
}