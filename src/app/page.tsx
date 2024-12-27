import HomeHeader from "@/components/HomeHeader"
import Landing from "@/components/Landing"

export default function Home() {
  return (
    <main className="bg-img1 dark:bg-img2">
      <HomeHeader/>
      <div className="mt-[65px]">
      <Landing/>
      </div>
    </main>
  )
}

