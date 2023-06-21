import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps{  
    params: { 
        id: string;
    }
}

async function getData(): Promise<{data: IHeroData[]}> {
    const res = await fetch("http://localhost:3000/api/heroes");
    if (!res.ok) {
        throw new Error("Falha ao buscar herois");
    }

    return res.json();
}

export default async function Hero({ params: { id } }: IProps) {
    const res = await getData();
    console.log("res",res)
    return <Carousel heroes={res} activatedId={id} />;
}