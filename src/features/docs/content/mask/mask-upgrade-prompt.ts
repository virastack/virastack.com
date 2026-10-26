/**
 * One prompt that upgrades a project from @virastack/mask v1 to v2 with an AI coding agent.
 * Kept in English so it works the same in every agent; the page around it is localized.
 */
export const MASK_UPGRADE_PROMPT = `Upgrade this project from @virastack/mask v1 to v2. Do the whole migration, then verify it.

## 1. Find every usage
Search the codebase for: "@virastack/mask", useViraMask, rawValue, MaskPreset, MaskOptions, PRESETS, applyMask, unmask, stripMask, cleanValue, formatCurrency, unformatCurrency, getCardType, mergeRefs, validateTCKN, validateVKN, validateLuhn, validateIBAN, validateEmail, validateURL, validateDate, validateExpiry, onCardTypeChange, resolveMask, errorMessage. List the files before editing.

## 2. Update dependencies
- Install @virastack/mask@^2 with the project's package manager.
- v2 needs react-hook-form >= 7.55 and react >= 18.2. Upgrade react-hook-form if it is older. react-dom is no longer a peer.

## 3. Hook signature
v1: const { phone } = useViraMask({ form, schema: { phone: "phone" } })
v2: const { phone } = useViraMask(form, { phone: { preset: "phone", country: "TR" } })
- phone, iban, currency and number take country: "TR" for the Turkish layout; without it they use global defaults.
- Schema keys must be form field paths. For a nested field quote the key ("address.zip") or keep any key and add name: "address.zip".
- The type of the form drives everything; do not add generics to useViraMask.

## 4. Returned fields
- v2 returns only valid input props: name, ref, defaultValue, onChange, onBlur, onCompositionEnd, type, inputMode, autoComplete, disabled?, aria-invalid?.
- Remove every "const { rawValue, ...inputProps } = field" and spread the field directly: <input {...phone} />.
- Remove value={field.value}. The input is uncontrolled now; passing value breaks it.
- Where code read field.rawValue, read form.watch("name") / useWatch / getValues("name") instead (it is the same raw value).
- Where code read field.value (the masked text) outside the input, use createMask(spec).format(form.watch("name")) or set output: "masked" on that field.
- If a component needs its own ref, call both: ref={(el) => { phone.ref(el); myRef.current = el }}. mergeRefs is removed.
- title and aria-describedby are no longer emitted; add them yourself if the UI relied on them.

## 5. Presets
| v1 | v2 |
| "phone" (US (999) 999-9999, raw 10 digits) | If the app is Turkish: { preset: "phone", country: "TR" } → (555) 123 45 67, raw 10 digits. If it wants international numbers: "phone" (E.164, raw "+905551234567"). To keep the exact US layout: { mask: "(999) 999-9999" }. |
| { preset: "phone", mask: "(999) 999 99 99" } | { preset: "phone", country: "TR" } |
| "iban" (TR only, raw = 24 digits WITHOUT "TR") | { preset: "iban", country: "TR" } (raw INCLUDES "TR": "TR33..."), or "iban" for any country |
| "card", "expiry", "cvv", "tckn" | same names. CVV must be linked explicitly: cvv: { preset: "cvv", from: "card" } (use the real card field name) |
| "taxNumber" | "vkn" (same 10 digits; the VKN checksum is enforced) |
| "numeric" | "number" (1,234; { preset: "number", country: "TR" } for 1.234), or { mask: "9999…" } for digit codes that may start with 0 |
| "date" (raw "01022020") | "date" (raw is ISO "2020-02-01" once complete) |
| "currency" (US: 1,234.56, no symbol) | "currency" (same output). With a symbol: { preset: "currency", currency: "USD" } |
| "zipCode" | { mask: "99999" } |
| "email", "url", "password", "text", "username", "alpha" | Removed. Use a plain register() input and validate in the form schema (z.string().email(), .url(), regex). For "username" keep any slugify logic in your own onChange or setValueAs. |

## 6. Options
| v1 | v2 |
| mask: "aaa-999" | same syntax: 9 digit, a letter, * letter or digit. New: \\ escape, [optional part], {fixed part kept in the value} |
| allowedChars / forbiddenChars | custom tokens: { mask: "hhhh", tokens: { h: /[0-9a-f]/i } } |
| transform | same |
| resolveMask: (value, allValues) => mask | mask: (value, ctx) => mask; ctx.from is the value of the field named in from |
| displayPrefix: "TR" | a fixed part in the pattern: "{TR}99 …" (kept in the value) |
| currency: { decimalSeparator: ",", thousandSeparator: ".", symbol: "₺" } | { preset: "currency", country: "TR" } (₺1.234,56) |
| currency: { decimalSeparator: ",", thousandSeparator: "." } (no symbol) | { preset: "number", country: "TR", number: { scale: 2 } } |
| currency: { …, symbol: "$" } | { currency: "USD" }; other separators: { currency: { code, locale } } |
| currency.precision | currency: { scale } / number: { scale } |
| dateFormat: "DMY" / "MDY" / "YMD" | date: { format: "DD/MM/YYYY" / "MM/DD/YYYY" / "YYYY-MM-DD" } |
| validate: true + validator: "luhn" / "tckn" / "iban" / "vkn" / "expiry" / "date" | built into the presets; delete these options |
| validator: (value) => boolean | validate: (value, ctx) => true \\| false \\| "my.key" |
| errorMessage: "…" | removed; errors are keys (see step 7) |
| onCardTypeChange: fn | delete it; compute getCardType(form.watch("card")) where the type is shown |
| placeholderChar, alphaFormat, usernameFormat | removed |
| inputMode, autoComplete, type | same (type is "text" or "tel") |
Never combine mask with number/currency/date in one entry (v2 makes it a type error).

## 7. Validation and messages
- v2 errors are keys, not messages: tckn.invalid, card.invalid, phone.incomplete, iban.invalid, date.min, date.max, date.minAge, date.beforeFrom, expiry.min, number.min, number.max. Error type is "mask".
- Wherever the UI printed errors.x.message for a masked field, add a small map from key to message text and render through it. Reuse the texts the user saw before: the old errorMessage strings, or the schema's messages if validation came from Zod/Valibot. Keep the project's i18n system if it has one. Add a message for every key the field's preset can return.
- If useForm has a resolver (zodResolver, valibotResolver, …), wrap it, otherwise mask validation is skipped:
  import { maskResolver } from "@virastack/mask"
  useForm({ resolver: maskResolver(masks, zodResolver(schema)) })
  To do that, move the schema object passed to useViraMask into a constant (const masks = {...} as const) and use it in both places.
  With maskResolver the base resolver's error wins for a field; the mask error shows once the base schema accepts the value.
- Behaviour change to report: in v1, mask validation silently did not run when a resolver was set. After wrapping with maskResolver the preset checks (Luhn, TCKN, VKN, IBAN mod-97, expiry, dates) really run, so values that passed before may now be rejected. Remove schema refinements that duplicate these checks (e.g. a Zod IBAN checksum refine) only if the mask now covers them.
- Pass React Hook Form rules through the entry: { preset: "tckn", rules: { required: "…" } }. v1 could not do this; if the code had workarounds (separate register calls for the same field, manual setValue in effects, manual setError for mask fields), remove them.

## 8. Helpers
| v1 | v2 |
| validateTCKN / validateVKN | isValidTCKN / isValidVKN |
| validateLuhn | isValidLuhn (or isValidCard: length + Luhn) |
| validateIBAN (TR only, digits without TR) | isValidIBAN("TR" + digits); it works for every country and checks the length for the country code (TR → 26) |
| validateEmail / validateURL | removed: use the schema library |
| validateDate / validateExpiry | createMask("date" / "expiry").validate(value) |
| applyMask / unmask / stripMask / cleanValue | createMask({ mask }).format(raw) / .parse(text) |
| formatCurrency / unformatCurrency | createMask({ currency: … }).format(raw) / .parse(text); for money math use toMinorUnits(value, "TRY") |
| PRESETS / MaskPreset | presets / PresetName |
| getCardType | same |

## 9. Server code
The root import is "use client". In Server Components, Server Actions, route handlers and shared schema files import from "@virastack/mask/server" (createMask, definePreset, validators, toMinorUnits, parseMasked). Put the shared masks constant in a file without "use client" and type it with MaskSchema from "@virastack/mask/server".
Wherever the server validates submitted values of masked fields (with a schema, by hand, or by unmasking strings), use parseMasked so the server runs the same mask checks as the browser:
const result = await parseMasked(masks, input, zodSchema) // input: FormData, URLSearchParams or a plain object; zodSchema optional (any Standard Schema)
if (!result.success) return { errors: result.errors } // { field: "key or schema message" }, dotted paths for nested fields
Keep the action's existing error response shape; map keys through the same message map as the client.

## 10. Data that changes shape — check every consumer
These raw values are different in v2. Update default values, reset() payloads, setValue() calls, fixtures, tests, API payloads and the backend contract (or convert at the boundary):
- date: "DDMMYYYY" digits → ISO "YYYY-MM-DD".
- Turkish IBAN: 24 digits → "TR" + 24 digits.
- phone: only if you switched from the US layout to E.164 ("+90…"); with { preset: "phone", country: "TR" } it stays 10 digits.
- currency without a symbol now formats with Intl; the raw "1234.56" format is unchanged.
List each of these changes in your final report so a human can confirm the backend side.

## 11. Verify
- Run the type checker and fix every error (v2 types catch wrong field names, wrong from targets and invalid option combinations).
- Run the linter and the test suite; update tests that asserted rawValue, masked values in form state or old error messages. Add one test that submits formatted input and checks the submitted values are raw.
- If the test runner reuses an already running dev server on the default port, make sure that server is this app (or run the tests on a free port).
- Start the app and, for every masked field, type a value, paste a formatted value, delete across a separator, submit, reset the form, and check that the form value (watch) is raw while the input shows the mask.
- Grep again for rawValue, "schema:", errorMessage, resolveMask, mergeRefs, applyMask, formatCurrency, and for the removed preset strings ("taxNumber", "numeric", "zipCode", "email", "url", "username", "alpha", "password", "text" used as a preset value, not as a field name): there should be no v1 leftovers.

## 12. Report
Finish with: the files changed, each preset/option mapping you applied, every data-shape change from step 10, anything you could not migrate automatically, and the commands you ran with their results.

Reference: https://virastack.com/mask/docs/upgrade · https://virastack.com/mask/llms-full.txt`;
