import WavyFooter from "@/components/Footer"
import HomeHeader from "@/components/HomeHeader"
import Landing from "@/components/Landing"

export default function Home() {
  return (
   <>
   <div className="bg-img1 dark:bg-img2 ">
     <main className=" w-full bg-[radial-gradient(#966493_0.2px,transparent_1px)] [background-size:30px_30px]">
      <HomeHeader/>
      <div className="mt-[59px] md:mt-[78px] max-w-7xl mx-auto bg-img1 dark:bg-img2 pb-56 md:pb-44">
      <Landing/>
      </div>
    </main>
   </div>
   <div className="-mt-48">
    <WavyFooter/>
   </div>
   </>
  )
}

