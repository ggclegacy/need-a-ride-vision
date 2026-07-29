import Image from "next/image";

export function BrandMark() {
  return (
    <div className="brand-mark">
      <Image
        className="brand-mark__image"
        src="/icon.png"
        alt="Need A Ride — Service you can trust"
        width={1400}
        height={1400}
        sizes="(min-width: 928px) 432px, (min-height: 768px) 368px, 240px"
        priority
      />
    </div>
  );
}
