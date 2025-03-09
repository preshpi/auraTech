const Hero = () => {
  return (
    <div className="relative pt-6">
      <div className="w-full h-[30vh] md:h-[30vh] lg:h-[50vh] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dpokiomqq/image/upload/v1741461138/nmmm_wbvrhg.jpg"
          alt="hero-image"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
