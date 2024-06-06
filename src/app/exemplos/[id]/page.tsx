import { useState } from "react"

export default function Categoria(
    {params}: {params: {id: string } }
) {

    const [teste, setState] = useState("Teste")
    return(
        <h1>state: {params.id}</h1>
        <h1>Parametro: {params.id}</h1>
    )
}