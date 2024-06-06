import axios from "axios"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'



export async function POST(req: Request) {
    

    const { email, senha } = await req.json()

    try {

        let usuario = await axios.get(
            "http://localhost:3001/usuarios?email="
            + email
        )
    
        console.log(usuario)

        if (usuario.data.length === 1) {
            if (usuario.data[0].senha === senha) {
                
                let objUsuario = usuario.data[0]

                delete objUsuario.senha

                const token = jwt.sign(
                    objUsuario,
                    '123456',
                    {
                        expresIn: '1d'//dias
                        // expresIn: '1h' //horas
                        // expresIn: '1min' //minutos
                    }
                )

                return NextResponse.json({token: token})

            }
        }

        return NextResponse.json({
            message: "Dados incorretos"
        }, {status: 401})

    } catch (err) {
        return NextResponse.json(
            {
            message: 'Erro interno'
            },
            { status: 500 }
        )
    }
}