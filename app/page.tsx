
import { Home } from "./components/home"
export default async function App() {
  return (
    <>
      <Home />
      <a 
        href={'https://beian.miit.gov.cn/'}
        target={'_blank'}
        style={{ textAlign: 'center', fontSize: 13, display: 'block', marginTop: 10 }}>
        备案号：粤ICP备2023047519号-1
      </a>
    </>
  )
}
