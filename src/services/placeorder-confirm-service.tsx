import { useMutation } from "@tanstack/react-query";
import { httpService } from "./http-service";
import { api } from "./apis";

// Response export type

export type PlaceOrderConfirm = {
  context: PlaceOrderConfirmContext;
  message: PlaceOrderConfirmMessage;
};
export type PlaceOrderConfirmMessage = {
  context: PlaceOrderConfirmContext;
  responses: Response[];
};
export type Response = {
  context: ResponseContext;
  message: Message;
};
export type Message = {
  order: Order;
};
export type Order = {
  id: string;
  state: string;
  provider: Provider;
  items: Item[];
  billing: Billing;
  fulfillments: Fulfillment[];
  quote: Quote;
  payment: Payment;
  created_at: string;
  updated_at: string;
  type: string;
  displayId: string;
};

// TODO: the swagger/postman example data does not show the data type, any for placeholder
export type Fulfillment = any;

export type Payment = {
  "@ondc/org/settlement_details": Ondcorgsettlementdetail[];
  "@ondc/org/buyer_app_finder_fee_type": string;
  "@ondc/org/buyer_app_finder_fee_amount": string;
};
export type Ondcorgsettlementdetail = {
  bank_name: string;
  branch_name: string;
  settlement_type: string;
  beneficiary_name: string;
  settlement_phase: string;
  settlement_ifsc_code: string;
  settlement_counterparty: string;
  settlement_bank_account_no: string;
};
export type Quote = {
  ttl: string;
  price: Price;
  breakup: Breakup[];
};
export type Breakup = {
  item?: BreakupItem;
  price: Price;
  title: string;
  "@ondc/org/item_id": string;
  "@ondc/org/title_type": string;
  "@ondc/org/item_quantity"?: Ondcorgitemquantity;
};
export type Ondcorgitemquantity = {
  count: number;
};
export type BreakupItem = {
  price: Price;
};
export type Billing = {
  tax_number: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
};
export type Item = {
  descriptor: Descriptor;
  price: Price;
  category_id: string;
  quantity: Quantity;
};
export type Quantity = {
  count: number;
  measure: Measure;
};
export type Measure = {
  unit: string;
  value: number;
};
export type Price = {
  currency: string;
  value: string;
};
export type Descriptor = {
  name: string;
};
export type Provider = {
  id: string;
};
export type ResponseContext = {
  domain: string;
  action: string;
  core_version: string;
  bpp_id: string;
  bpp_uri: string;
  country: string;
  city: string;
  bap_id: string;
  bap_uri: string;
  transaction_id: string;
  message_id: string;
  ttl: string;
  timestamp: string;
};
export type PlaceOrderConfirmContext = {
  ttl: string;
  action: string;
  timestamp: string;
  message_id: string;
  transaction_id: string;
  domain: string;
  version: string;
  bap_id: string;
  bap_uri: string;
  location: Location;
  bpp_id: string;
  bpp_uri: string;
};
export type Location = {
  country: City;
  city: City;
};

export type City = {
  name: string;
  code: string;
};

// body export type
export type QuoteMessageBodyItem = {
  id: string;
};

// TODO: the swagger/postman example data does not show the data type, any for placeholder
export type QuoteMessageBodyFulfillment = any;
export type QuoteMessageBodyBilling = {
  name: string;
  address: string;
  state: State;
  city: State;
  email: string;
  phone: string;
};
export type State = {
  name: string;
};

export const getData = (
  provider: Provider,
  items: QuoteMessageBodyItem[],
  billing: QuoteMessageBodyBilling,
  fulfillments: QuoteMessageBodyFulfillment[],
) => ({
  confirmRequestDto: [
    {
      context: {
        domain: "Software Assurance",
        location: {
          city: {
            name: "Bangalore",
            code: "std:080",
          },
          country: {
            name: "India",
            code: "IND",
          },
        },
        action: "confirm",
        version: "1.1.0",
        transaction_id: "ead489b8-81de-49a4-baf6-8d8de7eabf32",
        message_id: "1d07c819-695c-44ab-bd47-c21678a6ba4e",
        timestamp: "2023-10-09T04:46:28.012Z",
        bap_id: "bap.ossverse.com",
        bap_uri: "http://bap.ossverse.com",
        bpp_id: "openfort-oasp.ossverse.com",
        bpp_uri: "http://openfort-oasp.ossverse.com",
      },
      message: {
        order: {
          provider,
          items,
          fulfillments,
          billing,
        },
      },
    },
  ],
  "userId": "1235"
});

export const getPlaceOrderConfirm = async (
  provider: Provider,
  items: QuoteMessageBodyItem[],
  billing: QuoteMessageBodyBilling,
  fulfillments: QuoteMessageBodyFulfillment[],
) => {
  return await httpService.post<PlaceOrderConfirm[]>(
    api.placeorder.confirm,
    getData(provider, items, billing, fulfillments),
  );
};

export const usePlaceOrderConfirm = () => {
  return useMutation({
    mutationFn: (data: {
      provider: Provider;
      items: QuoteMessageBodyItem[];
      billing: QuoteMessageBodyBilling;
      fulfillments: QuoteMessageBodyFulfillment[];
    }) =>
      getPlaceOrderConfirm(
        data.provider,
        data.items,
        data.billing,
        data.fulfillments),
    mutationKey: [
      api.placeorder.confirm,
    ],
  });
};
