import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";

const hookCode = `import type {
  UseViraAddressOptions, UseViraAddressReturn, GetSelectPropsOptions,
  AddressSelectFlavour, AddressSelectProps,
} from "@virastack/address"

interface UseViraAddressOptions<P extends string = string> {
  source?: AddressSource
  defaultValue?: {
    provinceCode?: string | number | null
    district?: string | null
    neighbourhood?: string | null
  }
  formatLabel?: (name: string, level: AddressLevel) => string
  onChange?: (value: AddressValue) => void
  form?: AddressForm<P>
  names?: AddressFieldNames<P>
  shouldValidate?: boolean
}

interface UseViraAddressReturn {
  value: AddressValue
  provinces: readonly AddressOption[]
  districts: readonly AddressOption[]
  neighbourhoods: readonly NeighbourhoodOption[]
  setProvince: (code: string | number | null) => void
  setDistrict: (name: string | null) => void
  setNeighbourhood: (name: string | null) => void
  reset: () => void
  loading: { neighbourhoods: boolean }
  error: Error | null
  getProvinceProps: (
    options?: GetSelectPropsOptions,
  ) => Record<string, unknown>
  getDistrictProps: (
    options?: GetSelectPropsOptions,
  ) => Record<string, unknown>
  getNeighbourhoodProps: (
    options?: GetSelectPropsOptions,
  ) => Record<string, unknown>
  getPostalCodeProps: () => Record<string, unknown>
}

type AddressSelectFlavour = "native" | "headless" | "shadcn" | "antd"

interface GetSelectPropsOptions {
  as?: AddressSelectFlavour // default: "native"
  disabled?: boolean
  placeholder?: string
  name?: string
  id?: string
}`;

const formCode = `import type {
  AddressForm,
  AddressFieldNames,
  AddressField,
  AddressFormWriteOptions,
} from "@virastack/address"

interface AddressForm<P extends string = string> {
  setValue(
    name: P,
    value: string,
    options?: AddressFormWriteOptions,
  ): void
  getValues?(name: P): unknown
}

type AddressField =
  | "province"
  | "district"
  | "neighbourhood"
  | "postalCode"
  | "provinceCode"

type AddressFieldNames<P extends string = string> =
  Partial<Record<AddressField, P>>

interface AddressFormWriteOptions {
  shouldDirty?: boolean
  shouldTouch?: boolean
  shouldValidate?: boolean
}`;

const valueCode = `import type {
  AddressValue, AddressOption, NeighbourhoodOption, AddressProvince,
  AddressNeighbourhood, AddressSource, AddressLevel,
} from "@virastack/address"

interface AddressValue {
  provinceCode: string | null
  province: string | null
  district: string | null
  neighbourhood: string | null
  postalCode: string | null
  postalCodes: readonly string[]
}

interface AddressOption { value: string; label: string }
interface NeighbourhoodOption extends AddressOption {
  postalCode: string
  postalCodes: readonly string[]
}

interface AddressSource {
  provinces: readonly AddressProvince[]
  neighbourhoods(
    provinceCode: number,
  ): Promise<ReadonlyMap<string, readonly AddressNeighbourhood[]>>
}

type AddressLevel = "province" | "district" | "neighbourhood"`;

const serverCode = `import type {
  AddressInput,
  AddressIssue,
  AddressResult,
} from "@virastack/address/server"

interface AddressInput {
  provinceCode?: string | number | null
  province?: string | null
  district?: string | null
  neighbourhood?: string | null
}

interface AddressResult {
  ok: boolean
  value: AddressValue
  issues: readonly AddressIssue[]
}`;

const dataCode = `import type {
  Province,
  Neighbourhood,
  Source,
  Loader,
} from "@virastack/address/data"

interface Province {
  code: number
  name: string
  districts: readonly string[]
}

interface Neighbourhood {
  name: string
  postalCode: string
  postalCodes: readonly string[]
}

interface Source {
  source: string
  date: string
  provinces: number
  districts: number
  neighbourhoods: number
}
type Loader = (provinceCode: number) => Promise<string>`;

export function AddressTypesDoc() {
  return (
    <>
      <DocsPageHeader title="Types" description="Exported TypeScript types." />
      <DocsProse>
        <h2 id="hook">Hook types</h2>
        <DocsCodeBlock code={hookCode} lang="ts" />

        <h2 id="form">Form types</h2>
        <p>
          <code>P</code>&#32;is the set of field paths in your form. Pass{" "}
          <code>useForm&lt;T&gt;()</code>&#32;and TypeScript infers it from the form, then checks
          every name in <code>names</code>.
        </p>
        <DocsCodeBlock code={formCode} lang="ts" />

        <h2 id="deger">Value types</h2>
        <DocsCodeBlock code={valueCode} lang="ts" />

        <h2 id="server">/server</h2>
        <DocsCodeBlock code={serverCode} lang="ts" />

        <h2 id="data">/data</h2>
        <DocsCodeBlock code={dataCode} lang="ts" />
      </DocsProse>
    </>
  );
}
