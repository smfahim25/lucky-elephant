import data from "@/src/assets/data/particle/bannerV3Particle";
const Particle = () => {
  return (
    <>
      {data?.map((shape, i) => (
        <span key={i} className={`shape_${i + 1} rotated-style`}>
          <img src={shape.src} alt="bithu nft bg shape" />
        </span>
      ))}
    </>
  );
};

export default Particle;
