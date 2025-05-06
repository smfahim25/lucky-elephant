"use client";

export default function NFTCardComponent({
  imageUrl = "/assets/images/carousel_avatar1.png",
  onLunchBreakClick,
}) {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="css-only-border">
        <div className="w-[350px] overflow-hidden bg-[#17031d] shadow-[0_0_10px_rgba(138,43,226,0.5)]">
          <div className="p-3">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#a0d8ff] to-[#7ab8ff]">
              <div className="relative w-full aspect-square flex justify-center items-center">
                <img
                  src={imageUrl}
                  alt="Lil Elly Degen character"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-2 text-white">
            <h2 className="text-2xl font-bold tracking-wide font-['Open_Sans',_system-ui] leading-tight">
              Lil Elly Degen <span className="text-[#b64aff]">#1999</span>
            </h2>
          </div>

          <div className="px-4 py-2">
            <div className="flex justify-between items-center relative">
              <div className="absolute h-[10px] bg-[#320d3f] w-[270px] top-[29px] left-2"></div>
              {["1d", "31d", "60d", "120d", "365d"].map((period) => (
                <div key={period} className="flex flex-col items-center z-10">
                  <span className="text-white text-sm font-['Press_Start_2P',_system-ui] mb-1">
                    {period}
                  </span>
                  <img src="/Ellipse.png" alt="ellipse" />
                </div>
              ))}
            </div>
          </div>

          {/* Jar Values */}
          <div className="px-4 py-2 flex justify-between">
            {[10, 310, 600, 1200, 3650].map((value) => (
              <div key={value} className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center rounded-sm mr-1 ">
                  <JarIcon className="w-3 h-3 text-[#aa8800]" />
                </div>
                <span className="text-white text-sm font-['Open_Sans',_system-ui] ">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 flex justify-between text-white">
            <div>
              <div className="text-sm font-['Open_Sans',_system-ui] ">
                On the Clock
              </div>
              <div className="text-md text-center font-bold font-['Open_Sans',_system-ui]">
                200d
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-['Open_Sans',_system-ui] ">
                Jar Production
              </div>
              <div className="text-md font-bold flex items-center justify-end font-['Open_Sans',_system-ui]">
                <div className="w-6 h-6  flex items-center justify-center rounded-sm mr-2">
                  <JarIcon className="w-4 h-4 text-[#aa8800]" />
                </div>
                10/day
              </div>
            </div>
          </div>

          <div className="p-3">
            <button
              className="w-full text-3xl rounded-xl bg-[#1e0a25] px-2 py-3 font-bold text-white shadow-lg 
      transition-all duration-300 ease-in-out
hover:bg-[#4a1760] hover:text-[#ffcc00] hover:border-[#ff44cc] 
hover:shadow-[0_0_15px_#b44ecc] hover:scale-105 hover:translate-y-[-2px]
active:scale-95  
       border-t-2 border-[#833497] font-['lalezar'] buttonText"
              onClick={() =>
                onLunchBreakClick(
                  "Lunch Break",
                  "It's time for a break! Enjoy your lunch."
                )
              }
            >
              Take a Lunch Break
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JarIcon({ className }) {
  return <img src="/jar.png" alt="jar" />;
}
