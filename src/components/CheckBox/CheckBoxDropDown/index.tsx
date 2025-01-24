import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Checkbox, FormControl, List, ListItem, ListItemIcon, ListItemText, Popover } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const CheckboxDropdown = ({ options, selected, onChange, allKey = null, multiple = true, optionClassName = '', arrowClassName = '' }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [internalSelected, setInternalSelected] = useState(selected)
  const { t } = useTranslation()

  useEffect(() => {
    if (multiple) {
      setInternalSelected(options)
      onChange && onChange(options)
    }
  }, [options?.length])

  useEffect(() => {
    setInternalSelected(selected)
  }, [selected])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const v = internalSelected?.map((selected) => {
      const newSelected = options.find((option) => option.key == selected.key)
      return newSelected
    })
    setInternalSelected([...v])
  }, [JSON.stringify(options)])

  const handleChange = (value) => {
    let newValue
    if (multiple) {
      if (value.key === allKey) {
        newValue = internalSelected.length === options.length ? [] : options
      } else {
        newValue = [...internalSelected]
        const existingIndex = newValue.findIndex((item) => item.key === value.key)
        if (existingIndex > -1) {
          newValue.splice(existingIndex, 1)
        } else {
          newValue.push(value)
        }
      }

      setInternalSelected(newValue)
      onChange && onChange(newValue)
    } else {
      onChange && onChange([value])
    }
  }

  const open = Boolean(anchorEl)
  return (
    <FormControl className='w-full'>
      <div
        onClick={handleClick}
        className='text-sm font-medium leading-5 flex gap-[6px] cursor-pointer w-full items-center'>
        <div className={`min-w-[70px] whitespace-nowrap ${optionClassName}`}>
          {multiple
            ? options.find((option) => option.key == allKey)?.value
            : internalSelected?.[0]?.value || internalSelected?.[0]?.key}
        </div>
        <KeyboardArrowDownIcon className={`${arrowClassName}`} />
      </div>
      <Popover
        className='p-0 mt-2'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <List className='top-0 left-0 absolute z-10 mt-1 max-h-[248px] w-[278px] whitespace-nowrap rounded-[4px] overflow-auto bg-neutral-black text-sm focus:outline-none border border-neutral-950'>
          {options.map((option) => (
            <ListItem
              key={option.key}
              onClick={() => handleChange(option)}
              dense
              className='cursor-pointer'
              sx={{
                display: 'flex',
                gap: 0,
              }}>
              <ListItemIcon sx={{ minWidth: '0' }}>
                <Checkbox
                  edge='start'
                  checked={
                    option.key == allKey
                      ? internalSelected?.length == options?.length
                      : internalSelected.some((s) => s.key === option.key)
                  }
                  tabIndex={-1}
                  disableRipple
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#10B970',
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={option.value} className='text-sm text-white' />
            </ListItem>
          ))}
        </List>
      </Popover>
    </FormControl>
  )
}

export default CheckboxDropdown
