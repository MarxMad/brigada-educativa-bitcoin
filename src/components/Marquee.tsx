import { useT } from '@/i18n';

function Track({ reverse = false, items }: { reverse?: boolean; items: readonly string[] }) {
  return (
    <div className={`flex w-max ${reverse ? 'animate-marquee-slow' : 'animate-marquee'}`}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 ${copy === 1 ? 'marquee-clone' : ''}`}
          aria-hidden={copy === 1 ? true : undefined}
        >
          {items.map((item) => (
            <span
              key={item}
              className="flex items-center gap-6 sm:gap-10 px-6 sm:px-10 text-[13px] sm:text-[15px] font-[450] leading-none text-white/45 whitespace-nowrap"
            >
              {item}
              <span className="w-[5px] h-[5px] rounded-full bg-[#F7931A]/70" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const t = useT();
  return (
    <section className="relative bg-[#0A0806] border-y border-white/[0.06] py-5 sm:py-6 overflow-hidden">
      <div className="marquee-mask">
        <Track items={t.marquee} />
      </div>
    </section>
  );
}
