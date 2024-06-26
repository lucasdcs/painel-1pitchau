"use client"
import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import style from './style.module.css'
import axios from 'axios';
import { Toast } from '@/componentes/Toast';
import { Loading } from '@/componentes/Loading';
import { useRouter } from 'next/navigation';

export default function Login() {

    const router = useRouter()

    const refForm =  useRef<any>();
    const [ toast, setToast] = useState(false)
    const [ loading, setLoading] = useState(false)

    const submitForm = useCallback((e: SyntheticEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true)

            const target = e.target as typeof e.target & {
                email: {value: string},
                senha: {value: string},
            }

            axios.post('/api/login',
                {
                    email: target.email.value,
                    senha: target.senha.value,
                }
            )
            .then((resposta) => {
                    console.log(resposta.data)
                    //SPA - React
                    // LocalStorage -> Navegador
                    // SessionStorage -> Navegador - X - perde os dados
                    
                    // Nextjs - SSR - Servidor
                    // Requisição -> Headers
                    // Coockies -> Navegador
                    router.push('/dashboard')    

                    setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setToast(true)
                setLoading(false)
            })

        }else {
            refForm.current.classList.add('was-validated')
        }
        
    },[])

    return(
        <>
            <Loading loading={loading}/>
            <Toast  
                    show={toast} 
                    message='Dados Inválidos' 
                    colors='danger' 
                    onClose={() => {setToast(false)}}
            />
            <div
            className={style.main}>
                <div className={style.border}>
                    <div className='d-flex flex-column align-items-center'>
                        <img className='mb-4'src='https://www.alfaumuarama.edu.br/fau/images/logo_novo.png?v=1715725731'/>
                        <h1 className='text-primary'>Login</h1>
                        <p className="text-secondary text2"> Preencha os campos para logar no sistema!</p>
                    </div>
                    <hr/>
                    <form className='need-validation align-items-center' noValidate onSubmit={submitForm} ref={refForm}>
                        <div className='col-md-12 mt-4'>
                            <label htmlFor='email' className='form-label m-2'>
                                Email:
                            </label>
                            <div className={style.inpute}>
                            <input type='email' className='form-control' placeholder='Digite seu email...' id='email' required style={{borderRadius:'32px'}}/>
                            </div>
                    <div className='invalid-feedback'>
                        Por favor digite seu email
                    </div>

                        </div>
                        <div className='col-md-12 mt-1'>
                            <label htmlFor='senha' className='form-label m-2'>
                                Senha:
                            </label>
                            <input type='password' className='form-control' placeholder='Digite seu email...' id='senha' required style={{borderRadius:'32px'}}/>
                    <div className='invalid-feedback'>
                        Por favor digite sua senha
                    </div>

                    <button className='btn btn-success mt-4 w-100' type='submit' id='botao'>
                        Enviar
                    </button>
                            
                        </div>
                    </form>
                </div>
                
            </div>
            <p className='text-center m-4'>© 2024 Unialfa Umuarama  |  Todos os direitos reservados</p>
                  
        </>
    )
}