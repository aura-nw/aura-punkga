import React, { useState } from "react"
import classes from "./Header.module.scss"
import EN from "assets/images/en.png"
import Avatar from "assets/images/avatar.png"
import Logo from "assets/images/header-logo.svg"
import SearchIcon from "assets/images/icons/search.svg"
import Image from "next/image"
import TextField from "components/Input/TextField"
import FilledButton from "components/Button/FilledButton"
import Button from "components/Button"
declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    keplr: any
    getOfflineSigner: any
  }
}

export default function Header({}) {
  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between py-[16px] px-[140px] " aria-label="Global">
        <div>
          <a href="#" className="flex">
            <span className="sr-only">Your Company</span>
            <Image src={Logo} alt="header logo" />
          </a>
        </div>
        <div className="w-full max-w-[500px]">
          <TextField
            bgColor="bg-light-gray"
            size="lg"
            placeholder="Search by title"
            leadingComponent={<Image src={SearchIcon} alt="" />}
          />
        </div>
        <div className="flex gap-[40px] lg:justify-end">
          <Button size="lg">About Us</Button>
          <div className="flex gap-[20px] items-center cursor-pointer">
            <div className="flex gap-[4px] font-bold">
              <Image className="w-[24px] h-[24px]" src={EN} alt="" />
              EN
            </div>
            <FilledButton size="lg">
              <div className="flex items-center whitespace-nowrap w-max gap-[10px] h-[25px]">
                <Image src={Avatar} alt="" />
                Sunday
              </div>
            </FilledButton>
            <FilledButton size="lg">Connect Wallet</FilledButton>
          </div>
        </div>
      </nav>
    </header>
  )
}
