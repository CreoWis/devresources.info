"use client";
import React from "react";
import PrimaryBtn from "../primaryBtn";
import Image from "next/image";
import logo_sign from "@/assets/logo_sign.svg";
import { menu } from "@/data/commonData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "../mobileNavbar";

const Navbar = () => {
  let pathname = usePathname();

  return (
    <header className="fixed w-full m-auto z-20 bg-neutral-base text-white px-[10px] xl:px-[80px]">
      <nav className="max-w-[1400px] m-auto flex justify-between sm:items-center">
        <div className="flex gap-[10px] sm:items-center">
          <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] m-2 sm:m-0 lg:w-[40px] lg:h-[40px] xl:w-[48px] xl:h-[48px]">
            <Link href="/conferences">
              <Image src={logo_sign} alt="logo sign" />
            </Link>
          </div>
          <h1 className="text-[16px] lg:text-[23px] xl:text-[28px] hidden lg:block">
            <a href="/conferences" className="text-[#ffffffb8]">
              Dev<span className="font-bold text-white">Resources</span>
            </a>
          </h1>
        </div>
        <div className="hidden sm:flex gap-[10px] lg:gap-[20px] xl:gap-[32px] items-center py-[7px] sm:py-0">
          <ul className="hidden sm:flex gap-[10px] lg:gap-[20px] xl:gap-[32px]">
            {menu?.map((item) => {
              const isActive =
                pathname === item.url
                  ? "border-b-4 gradient-border-bottom font-[700]"
                  : "text-neutral-200 font-[400]";

              return (
                <Link
                  key={item.text}
                  className={`inline-block text-[12px] sm:text-[13px] xl:text-[16px] leading-[60px] lg:leading-[80px] no-underline hover:text-white ${isActive}`}
                  href={item.url}
                >
                  {item.text}
                </Link>
              );
            })}
          </ul>
          <PrimaryBtn text="Submit New" />
        </div>
        <MobileNavbar menu={menu} pathname={pathname} />
      </nav>
    </header>
  );
};

export default Navbar;
