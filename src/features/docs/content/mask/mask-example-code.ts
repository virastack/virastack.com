/** Code shown next to the single-field example previews. */
export function buildExampleCode(preset: string, placeholder: string, country?: string): string {
  if (preset === "plate") {
    return `import { useForm } from "react-hook-form"
import { definePreset, useViraMask } from "@virastack/mask"

// 9 digit · a letter · [optional part]
const plateMask = definePreset("plate", { mask: "99 a[aa] 99[99]", transform: "uppercase" })

function Example() {
  const form = useForm<{ plate: string }>()
  const { plate } = useViraMask(form, { plate: plateMask })

  return <input {...plate} placeholder="${placeholder}" />
}`;
  }

  const spec = country ? `{ preset: "${preset}", country: "${country}" }` : `"${preset}"`;

  return `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function Example() {
  const form = useForm<{ ${preset}: string }>()
  const { ${preset} } = useViraMask(form, { ${preset}: ${spec} })

  return <input {...${preset}} placeholder="${placeholder}" />
}`;
}

export function buildCreditCardCode(): string {
  return `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"

function CreditCardForm() {
  const form = useForm({ defaultValues: { card: "", expiry: "", cvv: "" } })

  const { card, expiry, cvv } = useViraMask(form, {
    card: "card",
    expiry: "expiry",
    cvv: { preset: "cvv", from: "card" },
  })

  return (
    <>
      <input {...card} placeholder="0000 0000 0000 0000" />
      <input {...expiry} placeholder="12/28" />
      <input {...cvv} placeholder="123" />
    </>
  )
}`;
}

export function buildPasswordCode(): string {
  return `import { useForm } from "react-hook-form"
import { useViraMask } from "@virastack/mask"
import { useViraPassword } from "@virastack/password"

function SecurityFields() {
  const form = useForm<{ password: string; pin: string }>()

  // Mask: a 6-digit PIN; the form keeps the raw digits
  const { pin } = useViraMask(form, { pin: { mask: "999999" } })

  // Password: show/hide for both fields
  const password = useViraPassword()
  const pinPassword = useViraPassword()

  return (
    <>
      <div className="relative">
        <input {...form.register("password", { required: true })} {...password.inputProps} />
        <button {...password.btnProps} />
      </div>
      <div className="relative">
        {/* Mask handles input and caret, Password switches the type */}
        <input {...pin} {...pinPassword.inputProps} />
        <button {...pinPassword.btnProps} />
      </div>
    </>
  )
}`;
}
