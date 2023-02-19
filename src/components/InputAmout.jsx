import { Grid, TextField } from "@mui/material"

const InputAmout = ({onChange, value, label}) => {
  return (
    <Grid item xs={12} md>
      <TextField
        value={value+""}
        onChange={onChange}
        label={label}
        fullWidth
        InputProps={{
          type: "number",
        }}
      />
    </Grid>
  )
}

export default InputAmout