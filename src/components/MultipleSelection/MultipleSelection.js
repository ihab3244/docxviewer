import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, useTheme } from "@mui/material";


const MultipleSelection = ({list, label, name, value, handleChange}) => {
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return       <FormControl fullWidth={true}>
    <InputLabel id="demo-multiple-chip-label" fullWidth>{label}</InputLabel>
    <Select

      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      name={name}
      value={value}
      onChange={handleChange}
      input={<OutlinedInput id="select-multiple-chip" label={label} />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((entry) => {
            const value = list.find(listEntry => listEntry.id == entry)
            if(value !== undefined){
              return (
                <Chip key={entry.id} label={value.name} />
              )
            }
          })}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {list.map((entry) => (
        <MenuItem
          key={entry.id}
          value={entry.id}
          style={getStyles(entry.name, value, theme)}
        >
          {entry.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
}

export default MultipleSelection
