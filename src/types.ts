export interface ICurrency {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export type ConverterStateType = {
  fromCurrency: string;
  toCurrency: string;
  firstAmount: number;
  secondAmout: number;
  data: ICurrency[];
};

export type ConverterActions =
  | { type: "UPDATE_FIRST_AMOUNT"; payload: number }
  | { type: "UPDATE_SECOND_AMOUNT"; payload: number }
  | { type: "UPDATE_FROM_CURRENCY"; payload: string }
  | { type: "UPDATE_TO_CURRENCY"; payload: string }
  | { type: "SWITCH_CURRENCY" }
  | { type: "SET_DATA"; payload: ICurrency[] };
