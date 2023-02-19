import * as React from "react";

import {
  Box,
  CssBaseline,
  Container,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import Table from "./components/Table";
import useFetch from "./hooks/useFetch";
import { ICurrency } from "./types";
import ConverterForm from "./components/ConverterForm";
import { CurrencyContext } from "./context/CurrencyContext";

function App() {
  const url =
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
  const { data, error } = useFetch<ICurrency[]>(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  );

  const { dispatch } = React.useContext(CurrencyContext);

  React.useEffect(() => {
    if (data?.length) {
      dispatch({
        type: "SET_DATA",
        payload:
          [
            ...(data || []),
            { ccy: "UAH", base_ccy: "UAH", buy: "1", sale: "1" },
          ] || [],
      });

      dispatch({
        type: "UPDATE_FIRST_AMOUNT",
        payload: 1,
      });
    }
  }, [data]);

  // if (!data)
  //   return (
  //     <Box sx={{ display: "flex" }}>
  //       <CircularProgress />
  //     </Box>
  //   );

  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          )}
          {data ? (
            <>
              <Table data={data} />
              <ConverterForm />
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
