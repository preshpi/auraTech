import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../../sanity/sanity";
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { CategoryProp } from "../../../types/main/product";

interface ITopCategoriesProp {
  categoryData: CategoryProp[];
  isLoading: boolean;
}

const Categories: React.FC<ITopCategoriesProp> = React.memo(
  ({ categoryData }) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({
      align: "start",
      loop: false,
      skipSnaps: false,
      dragFree: true,
    });

    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
      if (!emblaApi) return;
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;

      onSelect();
      emblaApi.on("select", onSelect);
      emblaApi.on("reInit", onSelect);

      return () => {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <div className="relative w-full mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {categoryData.map((category) => (
              <div className="flex-shrink-0 w-[250px] mx-2" key={category._id}>
                <Link
                  to={`/shop?cat=${category.slug.current}`}
                  onMouseEnter={() => setHovered(category._id)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex flex-col group items-center justify-start bg-[#F9F9F9] rounded-md w-full p-4 h-[320px]"
                >
                  <img
                    src={urlFor(category.image)}
                    alt={category.name}
                    className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />

                  <div className="flex items-center justify-between w-full py-2">
                    <div className="space-y-2">
                      <p className="text-2xl font-medium heading reversed-link text-xl-3xl tracking-tighter leading-tight group-hover:underline">
                        {category.name}
                      </p>
                      <p className="leading-none text-xs xl:text-sm">
                        {category.description}
                      </p>
                    </div>
                    <span className="transform transition-transform duration-300 ease-in-out">
                      {hovered === category._id ? (
                        <ArrowDown size={20} />
                      ) : (
                        <ArrowRight size={20} />
                      )}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 ${
            !prevBtnEnabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 ${
            !nextBtnEnabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  }
);

export default Categories;
