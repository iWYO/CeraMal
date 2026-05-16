import { Container } from "@/components/Container";
import Image from "next/image";

const items = [
  {
    title: "Kézzel készült és egyedi",
    text: "A kézműves kerámiák egyedi darabok: az emberi érintés és a személyes munka nyomát viselik, mindegyik más karakterrel.",
    iconPath: "/hand.svg",
    iconAlt: "Kézzel készült ikon",
  },
  {
    title: "Fenntartható anyagok",
    text: "Olyan anyagokat és gyakorlatokat választunk, amelyek összhangban vannak a környezettel a művészet és a felelősség együtt.",
    iconPath: "/sustainable.svg",
    iconAlt: "Fenntarthatóság ikon",
  },
  {
    title: "Magas minőség és tartósság",
    text: "Aprólékos kidolgozás és megbízható alapanyagok: darabjaink hosszú távon is szépek és használhatók maradnak.",
    iconPath: "/quality.svg",
    iconAlt: "Minőség ikon",
  },
];

export function LandingValueProps() {
  return (
    <section className="w-full bg-[#fafafa] py-16 md:py-24">
      <Container>
        <div className="grid gap-14 md:grid-cols-3 md:gap-12">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-orange-100/90">
                <Image
                  src={item.iconPath}
                  alt={item.iconAlt}
                  width={56}
                  height={56}
                  className="h-14 w-14"
                  priority={true}
                />
              </div>
              <h3 className="mt-7 text-base font-semibold text-neutral-900 md:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
