import { IHeroData } from "@/interfaces/heroes";

import HeroesList from "@/components/HeroesList";

import styles from "./page.module.css";

async function getData(): Promise<{ data: IHeroData[] }> {
    const response = await fetch("http://localhost:3000/api/heroes");

    if (!response) {
        throw new Error("Falha ao buscar heróis.");
    }

    return response.json();
}

export default async function Home(){
  const res = await getData();

  return(
    <main className={ styles.main }>
      <HeroesList
        heroes={res}
      />
    </main>
  )
}