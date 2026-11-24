import logo from '@/public/images/logo.png';
import Image from 'next/image';



export default function Logo({ light = false }: { light?: boolean }) {
  const main = light ? 'text-white' : 'text-ink';
  return (
    <span className="flex items-center gap-3">
      <Image src={logo} alt="Protege Schools" width={30} height={30} className="" />  
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] font-extrabold tracking-tight ${main}`}>Protege</span>
        <span className={`mt-1 block text-[.8rem] font-medium ${light ? 'text-white/70' : 'text-indigo'}`}>Schools</span>
      </span>
    </span>
  );
}
