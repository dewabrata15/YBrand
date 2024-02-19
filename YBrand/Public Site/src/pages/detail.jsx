function DetailPages() {
  return (
    <>
      <section className="w-[90%] h-screen flex justify-center items-center mx-auto">
        <div className="w-full h-[470px] flex">
          {/* decoration */}
          <div className="w-[40%] h-full flex justify-center items-center">
            <div className="w-[60%] h-[85%] rounded-md relative group">
              <div className="img1 z-10 w-full h-full absolute rounded-md duration-300 ease-in-out transition-all bottom-0 group-hover:bottom-5 group-hover:scale-90"></div>
              <div className="img2 w-full h-full absolute rounded-md duration-300 ease-in-out transition-all bottom-0 right-0 group-hover:-rotate-6 group-hover:right-32 group-hover:scale-90"></div>
              <div className="img3 w-full h-full absolute rounded-md duration-300 ease-in-out transition-all bottom-0 left-0 group-hover:rotate-6 group-hover:left-32 group-hover:scale-90"></div>
            </div>
          </div>
          <div className="w-[60%] h-full p-20 flex justify-center items-center">
            <div className="">
              <h1 className="text-[50px] font-semibold">"Your Fashion Oasis</h1>
              <h1 className="mb-5 text-[15px]">
                Curate Your Fashion Journey with Y Brand's Exclusive Clothing
                Collections
              </h1>
              <p className="text-[12px] text-left">
                Step into the world of Y Brand, where fashion becomes an
                experience and your style takes center stage. We present an
                exclusive array of garments designed to elevate not just your
                wardrobe, but also your confidence and individuality. Y Brand is
                more than a fashion destination; it's your personal style
                sanctuary. Our carefully curated collections, ranging from
                timeless classics to cutting-edge trends, ensure that you'll
                always find the perfect piece to express your unique
                personality. Join us in celebrating the art of self-expression
                through fashion. Y Brand - Where Every Outfit Tells a Story, and
                Yours is Next.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailPages;
