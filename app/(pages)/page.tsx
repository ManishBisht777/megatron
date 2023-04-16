import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";
import hero from "../../public/images/hero2.svg";

export default function Home() {
  return (
    <div className="lg:w-[65rem] container mx-auto mt-6">
      <div className=" flex flex-col items-start gap-4 ">
        <Image src={hero} width={260} alt="Hero image" priority />
        <h1 className="text-3xl font-bold leading-[1.1] tracking-tighter sm:text-5xl md:text-6xl">
          What&apos;s going on here?
        </h1>
        <p className="max-w-[42rem] leading-normal text-slate-700 sm:text-xl sm:leading-8">
          I&apos;m building a web app with Next.js 13 and open sourcing
          everything. Follow along as we figure this out together.
        </p>
      </div>
      <div className="flex gap-4 mt-3">
        <Link href="/auth/login" className={cn(buttonVariants({ size: "lg" }))}>
          Get Started
        </Link>
        <Link
          href="https://github.com/ManishBisht777/megatron"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          GitHub
        </Link>
      </div>
    </div>
  );
}
