import Image from "next/image";
import { Quicksand } from "next/font/google";

import styles from "./heroDetails.module.scss";

import { spidermanFont } from "@/fonts";
import { IHeroData } from "@/interfaces/heroes";

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

interface IProps {
    data: IHeroData;
}

export default function HeroDetails({ data }: IProps) {
    const { id, name, universe, details } = data;

    return (
        <div className={ quicksand.className }>
            <h1 className={ `${spidermanFont.className} ${styles.title}` }>
                {name} (Universo - {universe})
            </h1>

            <div className={styles.details}>
                <h2 className={styles.subtitle}>Informações</h2>

                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th className={styles.label}>Nome Completo</th>
                            <td>{details.fullName}</td>
                        </tr>
                        <tr>
                            <th className={styles.label}>Data de Nascimento</th>
                            <td>{new Date(details.birthday).toLocaleDateString("pt-BR")}</td>
                        </tr>
                        <tr>
                            <th className={styles.label}>Terra Natal</th>
                            <td>{details.homeland}</td>
                        </tr>
                        <tr>
                            <th className={styles.label}>Altura</th>
                            <td>{details.height.toFixed(2)}m</td>
                        </tr>
                        <tr>
                            <th className={styles.label}>Peso</th>
                            <td>{details.weight.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={styles.details}>
                <h2 className={styles.subtitle}>Primeira Aparição</h2>
                <Image 
                    src={`/spiders/${id}-comic-book.png`}
                    alt={`Primeira aparição nos quadrinhos de ${name} no universo ${universe}`}
                    width={80}
                    height={122}
                />
            </div>

        </div>
    );
}