import * as React from "react";
import { reducer } from "./reducer";
import { ConverterStateType, ConverterActions, ICurrency } from "../types";

interface CurrencyContextType extends ConverterStateType {
  dispatch: React.Dispatch<ConverterActions>;
  fromCurrency: string;
  toCurrency: string;
  firstAmount: number;
  secondAmout: number;
  data: ICurrency[];
}

const initialState: ConverterStateType = {
  fromCurrency: "USD",
  toCurrency: "UAH",
  firstAmount: 1,
  secondAmout: 1,
  data: [],
};

export const CurrencyContext = React.createContext<CurrencyContextType>(
  initialState as CurrencyContextType
);

export const CurrencyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [converter, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CurrencyContext.Provider
      value={{
        ...converter,
        dispatch,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
