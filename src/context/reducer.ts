import { ConverterStateType, ConverterActions, ICurrency } from "../types";

interface IRates {
  [key: string]: number;
}

function roundUp(num: number): number {
  return +num.toFixed(4);
}

function getRates(array: ICurrency[], code: string) {
  const saleByCode = array?.find((item) => item.ccy === code)?.sale || 1;
  return array.reduce((acc, cur) => {
    return { ...acc, [cur.ccy]: +cur.sale / +saleByCode }; // roundUp
  }, {});
}

const calculate = (
  array: ICurrency[],
  fromCurrency: string,
  toCurrency: string,
  firstAmount: number
) => {
  const rates = getRates(array, fromCurrency);
  return {
    fromCurrency,
    toCurrency,
    firstAmount,
    secondAmout: roundUp(
      (firstAmount * (rates as IRates)[fromCurrency]) /
        (rates as IRates)[toCurrency]
    ),
  };
};

const calculate2 = (
  array: ICurrency[],
  fromCurrency: string,
  toCurrency: string,
  secondAmout: number
) => {
  const rates = getRates(array, toCurrency);
  return {
    fromCurrency,
    toCurrency,
    secondAmout,
    firstAmount: roundUp(
      (secondAmout * (rates as IRates)[toCurrency]) /
        (rates as IRates)[fromCurrency]
    ),
  };
};

const calculate3 = (state: ConverterStateType, toCurrency: string) => {
  const rates = getRates(state.data, toCurrency);

  return roundUp(
    (state.firstAmount * (rates as IRates)[state.fromCurrency]) /
      (rates as IRates)[toCurrency]
  );
};

export const reducer = (
  state: ConverterStateType,
  action: ConverterActions
): ConverterStateType => {
  if (action.type === "UPDATE_FIRST_AMOUNT") {
    const result = calculate(
      state.data,
      state.fromCurrency,
      state.toCurrency,
      +action.payload
    );
    return {
      ...state,
      firstAmount: action.payload,
      secondAmout: result.secondAmout,
    };
  }

  if (action.type === "UPDATE_SECOND_AMOUNT") {
    const result = calculate2(
      state.data,
      state.fromCurrency,
      state.toCurrency,
      +action.payload
    );
    return {
      ...state,
      firstAmount: result.firstAmount,
      secondAmout: action.payload,
    };
  }

  if (action.type === "UPDATE_FROM_CURRENCY") {
    const result = calculate(
      state.data,
      action.payload,
      state.toCurrency,
      state.firstAmount
    );

    return {
      ...state,
      fromCurrency: action.payload,
      secondAmout: result.secondAmout,
    };
  }

  if (action.type === "UPDATE_TO_CURRENCY") {
    const result = calculate3(state, action.payload);

    return {
      ...state,
      toCurrency: action.payload,
      secondAmout: result,
    };
  }

  if (action.type === "SWITCH_CURRENCY") {
    const result = {
      fromCurrency: state.toCurrency,
      toCurrency: state.fromCurrency,
      firstAmount: state.secondAmout,
      secondAmout: state.firstAmount,
      data: state.data,
    };
    return { ...state, ...result };
  }

  if (action.type === "SET_DATA") {
    return { ...state, data: action.payload };
  }

  return state;
};
