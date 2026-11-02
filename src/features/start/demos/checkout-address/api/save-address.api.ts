import {
  ADDRESSES_PATH,
  COUNTRY_CODE,
} from "@/features/start/demos/checkout-address/constants/addresses.constants";
import { savedAddressSchema } from "@/features/start/demos/checkout-address/schemas/address.schema";
import type {
  Address,
  AddressFormInput,
} from "@/features/start/demos/checkout-address/schemas/address.schema";
import { api } from "@/features/start/demos/users/lib/api";

/**
 * An address carries no shipping or billing type: it joins the address book, and the order later
 * says which one is which. The request is real, but DummyJSON keeps nothing and answers every new
 * user with the same id, so the result is built from the input. With your API, return its answer.
 */
export async function saveAddress(input: AddressFormInput, id?: number): Promise<Address> {
  const body = { ...input, countryCode: COUNTRY_CODE };

  await (id === undefined
    ? api.post(`${ADDRESSES_PATH}/add`, body, { schema: savedAddressSchema })
    : api.put(`${ADDRESSES_PATH}/1`, body, { schema: savedAddressSchema }));

  return { ...input, id: id ?? Date.now() };
}
