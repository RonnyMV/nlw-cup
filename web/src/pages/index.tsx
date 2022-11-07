import AppPreviewImg from '../assets/mobiles.png'
import LogoImg from '../assets/logo.svg'
import Image from 'next/image'
import UserAvatar from '../assets/usersavatarexample.png'
import IconCheck from '../assets/icon-check.svg'
import {FormEvent , useState } from 'react';
import { api } from '../lib/axios'

interface HomeProps {
  countGuesses: number
  countPools: number,
  countUsers: number,
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')
  async function createPool(e: FormEvent) {
    e.preventDefault() 

      try {
        const response = await api.post('pools', {
          title: poolTitle,
        })
        const { code } = response.data
        alert(`Bolão de código ${code} criado com sucesso`)
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente !')

    }
    setPoolTitle('')

  }


 
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center"> 
      <main>
        <Image src={LogoImg} alt="NLW logo"/>
        <h1 className="mx-14 text-white text-5xl font-bold leading-tight">Crie o seu  proprio bolão da copa e compartilhe com os seus amigos!</h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={UserAvatar} alt="avatar usuário" />
          <strong className="text-gray-100 text-xl">
          <span className="text-ignite-500">+ {props.countUsers}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool}className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-2 border-gray-600 text-sm text-white"
            type="text"
            required
            placeholder='Qual o nome do seu bolão?'
            onChange={e => setPoolTitle(e.target.value)}
            value={poolTitle}
          />
          <button 
            className="flex px-6 py-4 font-bold rounded uppercase bg-yellow-500 hover:bg-yellow-700"
            type='submit'
          > Criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-300 leading-relaxed drop-shadow-md">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">

          <div className="flex items-center gap-6">
            <Image src={IconCheck} alt='Icone verde check' />

            <div className="flex flex-col">
              <span className="text-2xl bold" >+{props.countPools}</span>
              <span>Bolões criados</span>
            </div>

          </div>

          <div className="w-px h-10 bg-gray-600"></div>

          <div className="flex items-center gap-6">
            <Image src={IconCheck} alt='Icone verde check' />

              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{props.countGuesses}</span>
                <span>Palpites enviados</span>

              </div> 
          </div>    
        </div>
      </main>

      <Image src={AppPreviewImg} alt="dois celulares exibindo um preview" quality={100} />
    </div>
  )
}

export const getServerSideProps = async() => {

  const [countPools, countGuesses, countUsers] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return{
    props: {
      countPools: countPools.data.count,
      countGuesses: countGuesses.data.count,
      countUsers: countUsers.data.count

    }
  }
}