import Image from 'next/image'
import Link from 'next/link'

import { DownloadButtons } from './components/DownloadButtons'

async function getLatestReleaseDownloadUrl(): Promise<MacUrls | null> {
  try {
    const response = await fetch('https://api.github.com/repos/dtom90/PomoTrack/releases/latest');
    const data = await response.json();
    
    // Find the first asset that matches your pattern
    const matchingAssets = data.assets.filter((asset: { name: string; }) => 
      asset.name.match(new RegExp('Pomodash-.*\\.dmg$'))
    );
    
    if (matchingAssets.length > 0) {
      const urls = matchingAssets.map((asset: { browser_download_url: string; }) => asset.browser_download_url)
      const m1Url = urls.find((url: string) => url.includes('arm64'))
      const intelUrl = urls.find((url: string) => !url.includes('arm64'))
      return {
        m1Url,
        intelUrl
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching release:', error);
    return null;
  }
}

const urls = {
  browser: 'https://pomodash.app/',
  github: 'https://github.com/dtom90/PomoTrack',
}

interface MacUrls {
  m1Url: string
  intelUrl: string
}

export default async function Home() {
  const macUrls = await getLatestReleaseDownloadUrl();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="px-4 md:px-[14.5vw]">
        <div className="w-full md:w-[70%]">
          <div className="mt-10 md:mt-20">
            <h1 className="text-[32px] md:text-[56px] font-medium font-inter leading-[38px] md:leading-[62px] tracking-[-0.03em] text-[#08090A]">
              Timed focus sessions to help you achieve more, faster
            </h1>
            
            <p className="mt-4 md:mt-5 text-[16px] md:text-[20px] font-normal font-inter leading-[24px] md:leading-[28px] tracking-[-0.03em] text-[#08090A]">
              Discover the perfect tool for timed focus and productivity. Effortlessly manage tasks, track progress, and stay on target with structured work sessions.
            </p>

            <div className="mt-5">
              <DownloadButtons urls={urls} macUrls={macUrls || { m1Url: '', intelUrl: '' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Banner Image */}
      <div className="mt-[18px] w-full overflow-hidden">
        <Image
          src="/pomoTrackMainImage2.jpg"
          alt="Pomotrack Main Interface"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain md:translate-x-[20px]"
          priority
        />
      </div>

      {/* Features Section */}
      <div className="px-4 md:px-[14.5vw] pt-[32px] pb-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[62px]">
          {/* Tag Functionality */}
          <div>
            <h3 className="text-[18px] md:text-[21px] font-medium font-inter leading-[24px] md:leading-[28px] tracking-[-0.37px] text-[#08090A]">
              Tag functionality
            </h3>
            <p className="mt-1 text-[15px] md:text-[17px] font-normal font-inter leading-[22px] md:leading-[24.5px] text-[#333333]">
              Organize tasks effortlessly with customizable tags for better focus.
            </p>
            <div className="mt-6 md:mt-[32px]">
              <Image
                src="/TagsimgHQ.jpg"
                alt="Tag Functionality Feature"
                width={325}
                height={256}
                className="w-full md:w-[325px]"
              />
            </div>
          </div>

          {/* Intuitive Timer */}
          <div>
            <h3 className="text-[18px] md:text-[21px] font-medium font-inter leading-[24px] md:leading-[28px] tracking-[-0.37px] text-[#08090A]">
              Intuitive Timer
            </h3>
            <p className="mt-1 text-[15px] md:text-[17px] font-normal font-inter leading-[22px] md:leading-[24.5px] text-[#333333]">
              Set a timer and focus on your task with a clear, intuitive interface.
            </p>
            <div className="mt-6 md:mt-[32px]">
              <Image
                src="/TimerHQ.jpg"
                alt="Intuitive Timer Feature"
                width={325}
                height={256}
                className="w-full md:w-[325px]"
              />
            </div>
          </div>

          {/* Set long-term goals */}
          <div>
            <h3 className="text-[18px] md:text-[21px] font-medium font-inter leading-[24px] md:leading-[28px] tracking-[-0.37px] text-[#08090A]">
              Set long-term goals
            </h3>
            <p className="mt-1 text-[15px] md:text-[17px] font-normal font-inter leading-[22px] md:leading-[24.5px] text-[#333333]">
              Set time-based goals and monitor your daily productivity.
            </p>
            <div className="mt-6 md:mt-[32px]">
              <Image
                src="/GraphHQ.jpg"
                alt="Long Term Goals Feature"
                width={325}
                height={256}
                className="w-full md:w-[325px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Banner */}
      <div className="px-4 md:px-[14.5vw] py-[32px] pb-[48px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-[24px] md:text-[32px] font-medium font-inter leading-[32px] md:leading-[62px] tracking-[-0.03em] text-[#08090A] text-center md:text-left">
            Stay on task today
          </h2>
          <DownloadButtons urls={urls} macUrls={macUrls || { m1Url: '', intelUrl: '' }} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 md:px-[14.5vw] py-8 text-sm text-gray-600">
        <div className="flex justify-center items-center gap-4">
          <Link href="/privacy" className="hover:text-gray-800 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
