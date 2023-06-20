import Button from "components/Button"
import FilledButton from "components/Button/FilledButton"
import OutlineButton from "components/Button/OutlineButton"
import Header from "components/Header"
import TextField from "components/Input/TextField"
import AutoGrowingTextField from "components/Input/TextField/AutoGrowing"
import React from "react"

export default function Test() {
  return (
    <>
      <Header />
      <div className="p-3 flex flex-col gap-3 items-baseline bg-light-gray h-[100vh]">
        <Button size="lg">Large Button</Button>
        <FilledButton>Filled Button</FilledButton>
        <FilledButton size="lg">Large Filled Button</FilledButton>
        <OutlineButton>Outline Button</OutlineButton>
        <OutlineButton size="lg">Large Outline Button</OutlineButton>
        <TextField size="sm" placeholder="Small Text Field"/>
        <TextField placeholder="Text Field"/>
        <TextField size="lg" placeholder="Large Text Field" />
        <AutoGrowingTextField placeholder="Auto Growing Text Field"/>
      </div>
    </>
  )
}
