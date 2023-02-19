import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CurrencyContext } from "../context/CurrencyContext";
import eu from "../images/eu.png";
import ua from "../images/ua.png";
import us from "../images/us.png";

export interface SelectInputProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

interface Map {
  [key: string]: string | undefined;
}

const FLAGS_MAP: Map = {
  EUR: eu,
  USD: us,
  UAH: ua,
};

export default function SelectCurrency({ value, onChange }: SelectInputProps) {
  const { data } = React.useContext(CurrencyContext);
  const currencies = !!data
    ? [...data].map((item) => {
        return item.ccy;
      })
    : [];

  if (!currencies.length) return null;

  return (
    <Box sx={{ maxWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <img src={FLAGS_MAP[value]} alt="1" className="Currency-image" />
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Currency"
          onChange={onChange}
        >
          {currencies.length > 0 &&
            currencies.map((currency: string, index) => (
              <MenuItem value={currency} key={index}>
                {currency}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
