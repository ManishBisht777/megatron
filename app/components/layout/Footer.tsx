import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.png";
type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="container mx-auto bg-white text-slate-600 flex gap-4 items-center">
      <div className="flex flex-col items-center w-full justify-between gap-4 border-t border-t-slate-300 py-10 md:h-16 px-4 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src={logo} width={50} alt="Logo image" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://twitter.com/manishbisht9711"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              manish bisht
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Illustrations by{" "}
            <a
              href="https://popsy.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Popsy
            </a>
            .
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
          <a
            href="https://github.com/ManishBisht777/megatron"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
