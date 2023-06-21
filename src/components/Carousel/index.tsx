"use client";

import HeroDetails from "../HeroDetails";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./carousel.module.scss";

import { IHeroData } from "@/interfaces/heroes"
import HeroePicture from "../HeroPicture";


interface IProps{
    heroes: IHeroData[];
    activatedId: string;
}

enum Direction {
    FRONT = 0,
    MIDDLE = 1,
    BACK = 2
}

export default function Carousel({ heroes, activatedId }: IProps) {

    // Controla os itens visíveis no carrossel	
    const [selectedHeroes, setSelectedHeroes] = useState<IHeroData[] | null>(null);

    // Armazena o herói ativo no carrossel
    const [activeHero, setActiveHero] = useState(
        heroes.findIndex((hero) => hero.id === activatedId) - 1
    )

    // Atualiza o selectedHeroes ativo no carrossel sempre que o activeHero mudar
    useEffect(() => {
        // Itens que serão exibidos no carrossel
        const items = [...heroes];

        // Calcula o índice do array de acordo com o herói ativo
        // de forma que nunca saia do limite do array
        const indexInArrayScope = (( activeHero % items.length ) + items.length) % items.length;

        // Herois que estão visiveis no momento para o usuário
        // duplicamos o array para dar a impressão de um carrossel infinito
        const visibleHeroes = [...items, ...items].slice(indexInArrayScope, indexInArrayScope + 3);
        
        setSelectedHeroes(visibleHeroes);

    }, [heroes, activeHero]);

    // Altera o fundo da página de acordo com o herói ativo
    useEffect(() => {
        const htmlEl = document.querySelector("html");

        if(!htmlEl || !selectedHeroes) return;

        const currentHero = selectedHeroes[Direction.MIDDLE].id;
        // htmlEl.style.background = `url("/spiders/${currentHero}-background.png") no-repeat center center fixed`;
        htmlEl.style.background = `url("/spiders/${currentHero}-background.png")`;
        htmlEl.classList.add("hero-page");

        // Remove a classe hero-page do html quando o componente for desmontado
        return () => {
            htmlEl.classList.remove("hero-page");
        }
    }, [selectedHeroes]);

    
    // Altera herói ativo no carrossel
    // +1 rotaciona no sentido horário
    // -1 rotaciona no sentido anti-horário
    const handleChangeActiveHero = (direction: "left" | "right") => {
        if (direction === "left") {
            setActiveHero(activeHero - 1);
        } else {
            setActiveHero(activeHero + 1);
        }
    }
//   const handleChangeActiveHero = (newDirection: number) => {
//     setActiveHero((prevActiveIndex) => prevActiveIndex + newDirection);
//   };

//   if (!visibleItems) {
//     return null;
//   }
    if (!selectedHeroes) return null;

    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <div 
                    className={styles.wrapper}
                    onClick={() => handleChangeActiveHero("left")}
                >
                    <AnimatePresence mode="popLayout">
                        {selectedHeroes?.map((hero, index) => (
                            <motion.div
                                key={hero.id}
                                className={`${styles.hero} `}
                                transition={{ duration: 0.8 }}
                                initial={{ x: -1500, scale: 0.8 }}
                                animate={{ x: 0, ...getItemStyles(index) }}
                                exit={{ x: 0, left:"-20%", opacity: 0, scale: 1 }}
                            >
                                <HeroePicture hero={hero} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>            

            <motion.div 
                className={styles.details}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
            >
                <HeroDetails data={selectedHeroes[Direction.MIDDLE]} />
            </motion.div>
        </div>
    )
}

// Retorna o estilo de cada item do carrossel
const getItemStyles = (position: Direction) => {
    if(position === Direction.FRONT){ //Verificar se é o herói correto
        return {
            filter: "blur(10px)",
            scale: 1.2,
            zIndex: 3,
          };
    }

    if(position === Direction.MIDDLE){ //Verificar se é o herói correto
        return {
            left: 300,
            scale: 0.8,
            top: "-10%",
            zIndex: 2,
          };
    }

    return {
        filter: "blur(10px)",
        scale: 0.6,
        left: 160,
        opacity: 0.8,
        zIndex: 1,
        top: "-20%",
    };
}