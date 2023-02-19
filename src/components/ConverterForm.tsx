import * as React from "react";
import { Box, Grid } from "@mui/material";
import InputAmout from "./InputAmout";
import SelectCurrency from "./SelectCurrency";
import SwitchCurrency from "./SwitchCurrency";
import { CurrencyContext } from "../context/CurrencyContext";
import { SelectChangeEvent } from "@mui/material/Select";

export default function ConverterForm() {
  const { fromCurrency, toCurrency, firstAmount, secondAmout, dispatch } =
    React.useContext(CurrencyContext);

  const changeFirstAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_FIRST_AMOUNT", payload: +event.target.value });
  };

  const changeSecondAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_SECOND_AMOUNT", payload: +event.target.value });
  };

  const changeFromCurrency = (event: SelectChangeEvent) => {
    dispatch({ type: "UPDATE_FROM_CURRENCY", payload: event.target.value });
  };

  const changeToCurrency = (event: SelectChangeEvent) => {
    dispatch({ type: "UPDATE_TO_CURRENCY", payload: event.target.value });
  };

  const toogleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SWITCH_CURRENCY" });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <InputAmout
            onChange={changeFirstAmount}
            value={firstAmount}
            label="From"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SelectCurrency value={fromCurrency} onChange={changeFromCurrency} />
        </Grid>
        <Grid item xs={12} md={2}>
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            flexDirection="row"
            padding="5%"
          >
            <SwitchCurrency onClick={toogleSwitch} />
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <InputAmout
            onChange={changeSecondAmount}
            value={secondAmout}
            label="To"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SelectCurrency value={toCurrency} onChange={changeToCurrency} />
        </Grid>
      </Grid>
    </>
  );
}
