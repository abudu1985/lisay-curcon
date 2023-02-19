import { Button, Grid } from "@mui/material"
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const SwitchCurrency = ({onClick}) => {
  return (
      <Button onClick={onClick} sx={{
        borderRadius: 1,
        height: "100%"
      }}>
        <CompareArrowsIcon sx={{ fontSize: 30 }} />
      </Button>
  )
}

export default SwitchCurrency