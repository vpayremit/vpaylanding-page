"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { useTranslations } from "next-intl";

import type { ServiceItem } from "@/types";

import Badge from "../ui/Badge";
import Container from "../ui/Container";

export default function Services() {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const items = t.raw("items") as ServiceItem[];

  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const renderServiceTitle = (item: ServiceItem) => {
    const prefix = `${item.tag} `;

    if (item.title.startsWith(prefix)) {
      return (
        <>
          <span className="text-cta">{item.tag}</span>
          <span className="text-[#1C1C1E]">
            {item.title.slice(item.tag.length)}
          </span>
        </>
      );
    }

    return <span className="text-[#1C1C1E]">{item.title}</span>;
  };

  useEffect(() => {
    const updateTranslate = () => {
      const activeSlide = slideRefs.current[activeIndex];
      setTranslateX(activeSlide?.offsetLeft ?? 0);
    };

    updateTranslate();

    const resizeObserver = new ResizeObserver(() => {
      updateTranslate();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    slideRefs.current.forEach((slide) => {
      if (slide) {
        resizeObserver.observe(slide);
      }
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeIndex, items.length]);

  return (
    <section className="bg-white pb-10 pt-20" id="services">
      <Container>
        <div className="flex flex-col gap-10 desktop:flex-row desktop:items-center">
          <div className="flex justify-center desktop:flex-1 desktop:justify-center">
            <div className="flex flex-col text-left">
              <p
                className="bg-transparent text-[32px] font-bold leading-[100%] text-primary md:text-[48px] desktop:text-[64px] font-noto"
              >
                {t("sectionTitle")}
              </p>

              <p
                className="mt-6 text-[16px] leading-[24px] font-medium text-text-muted md:mt-8 md:text-[20px] md:leading-[28px] desktop:mt-12 desktop:text-[28px] desktop:leading-[36px] font-noto"
              >
                {t("sectionSubtitle")}
              </p>

              <div className="mt-8 flex items-center gap-3 desktop:mt-10">
                <button
                  aria-label={tCommon("previous")}
                  className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-[38.19px] border-[1.02px] border-transparent bg-black/10 text-primary transition-all duration-200 hover:rounded-[509.26px] hover:border-[#FFD500] hover:bg-[#FF7A21] hover:text-white hover:shadow-[inset_0_0_24.44px_#FFD600] md:h-14 md:w-14 desktop:h-[70px] desktop:w-[70px]"
                  onClick={goPrev}
                  type="button"
                >
                  <ArrowLeft className="h-5 w-5 desktop:h-[33px] desktop:w-[33px]" />
                </button>
                <button
                  aria-label={tCommon("next")}
                  className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-[38.19px] border-[1.02px] border-transparent bg-black/10 text-primary transition-all duration-200 hover:rounded-[509.26px] hover:border-[#FFD500] hover:bg-[#FF7A21] hover:text-white hover:shadow-[inset_0_0_24.44px_#FFD600] md:h-14 md:w-14 desktop:h-[70px] desktop:w-[70px]"
                  onClick={goNext}
                  type="button"
                >
                  <ArrowRight className="h-5 w-5 desktop:h-[33px] desktop:w-[33px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden desktop:flex-1">
            <div
              ref={trackRef}
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {items.map((item, index) => (
                <article
                  key={`${item.tag}-${index}`}
                  className="w-[78%] max-w-[320px] flex-shrink-0 sm:max-w-[360px] md:w-[68%] md:max-w-[520px] desktop:h-[799px] desktop:w-[708px] desktop:max-w-none"
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                >
                  <div
                    className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-[28px] px-5 pt-5 pb-0 sm:min-h-[460px] sm:px-6 sm:pt-6 sm:pb-0 md:min-h-[580px] md:px-8 md:pt-8 md:pb-0 desktop:h-[799px] desktop:rounded-[32px] desktop:px-8 desktop:pt-8 desktop:pb-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(253,123,42,0.15) 0%, rgba(255,213,0,0.15) 100%)",
                    }}
                  >
                    <div className="relative z-10 text-center desktop:absolute desktop:left-[35px] desktop:top-[83px] desktop:flex desktop:h-[83px] desktop:w-[638px] desktop:flex-col desktop:gap-4">
                      <p
                        className="text-[18px] font-bold leading-[130%] md:text-[22px] desktop:text-[28px] desktop:leading-[100%] font-noto"
                      >
                        {renderServiceTitle(item)}
                      </p>

                      <p
                        className="mt-2 text-[13px] leading-[150%] md:text-[15px] desktop:mt-0 desktop:text-[24px] desktop:leading-[100%] font-noto"
                        style={{
                          color: "#666563",
                          fontWeight: 400,
                        }}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="relative mt-auto aspect-[423/856] w-full self-center max-w-[220px] sm:max-w-[245px] md:max-w-[320px] desktop:max-w-[423px]">
                      <Image
                        src="/images/hero-phone-mockup.png"
                        alt={item.title}
                        fill
                        sizes="(max-width: 639px) 220px, (max-width: 767px) 245px, (max-width: 1199px) 320px, 423px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
