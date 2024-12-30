import WavyFooter from '@/components/Footer'
import HomeHeader from '@/components/HomeHeader'
import Storyboard from '@/components/Storyboard'
export default function page() {
  return (
    <div className='bg-img1 dark:bg-img2'>
      <HomeHeader/>
      <div><Storyboard/></div>
      <WavyFooter/>
    </div>
  )
}
