"use client";

import HeroPicture  from "../HeroPicture";

import styles from "./heroesList.module.scss";

import { spidermanFont } from "@/fonts";
import { IHeroData } from "@/interfaces/heroes";
import { motion } from "framer-motion";
import Link from "next/link";

interface IProps {
    heroes: IHeroData[];
}

export default function HeroesList({ heroes }: IProps) {
    return(
        <>
            <motion.h1
                className={` ${spidermanFont.className} ${styles.title} `}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 2 }} //Testar tempos inferiores
            >
                Personagens
            </motion.h1>

            <motion.section 
                className={styles.heroes}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }} //Testar tempos inferiores
            >
                {heroes.map((hero) => (
                    <motion.div 
                        key={hero.id}
                        className={`${styles.imageContainer} ${styles[hero.id]}`}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href={`hero/${hero.id}`}>
                            <HeroPicture hero={hero} />
                        </Link>
                    </motion.div>
                ))}
            </motion.section>
        </>
    )
}