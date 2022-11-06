import AppPreviewImg from '../assets/mobiles.png'
import LogoImg from '../assets/logo.svg'
import Image from 'next/image'
import UserAvatar from '../assets/usersavatarexample.png'
import IconCheck from '../assets/icon-check.svg' 
interface HomeProps {
  count: number
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <main>
        <Image src={LogoImg} alt="NLW logo" />
        <h1>Crie o seu  proprio bolão da copa e compartilhe com os seus amigos!</h1>
        <div>
          <Image src={UserAvatar} alt="avatar usuário" />
          <strong>
          <span>+ 12.9123</span> pessoas já estão usando
          </strong>
        </div>

        <form>
          <input type="text" required placeholder='Qual o nome do seu bolão?'/>
          <button type='submit'>Criar meu bolão</button>
        </form>
        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div>
          <div>
            <Image src={IconCheck} alt='Icone verde check' />
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={IconCheck} alt='Icone verde check' />
              <div>
                <span>+2.034</span>
                <span>Bolões criados</span>
              </div> </div>
        </div>
      </main>
      <Image src={AppPreviewImg} alt="dois celulares exibindo um preview" quality={100} />
    </div>
  )
}

// export const getServerSideProps = async() => {
//   const response = await fetch('http://localhost:3306/pools/count')
//   const data = await response.json()

//   return{
//     props: {
//       count: data.count,
//     }
//   }
// }