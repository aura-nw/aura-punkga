import React, { useState } from 'react';
import {
    FormControl,
    Popover,
    List,
    ListItem,
    Checkbox,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CheckboxDropdown = ({ options, selected, onChange, placeholder, multiple=true }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (key) => {
      if (multiple){
        const newSelected = selected.includes(key)
            ? selected.filter(item => item !== key)
            : [...selected, key];
        onChange && onChange(newSelected);
      } else {
        onChange && onChange(key);
      }
    };

    const open = Boolean(anchorEl);

    return (
        <FormControl className="w-full">
            <div onClick={handleClick} className='text-text-teriary text-sm font-medium leading-5 flex gap-[6px] cursor-pointer w-full items-center'>
                <div className='min-w-[70px]'>
                    {placeholder}</div>
                <KeyboardArrowDownIcon />
            </div>
            <Popover
                className='p-0 mt-2'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List className='top-0 left-0 absolute z-10 mt-1 max-h-[248px] w-fit max-w-[278px] whitespace-nowrap rounded-[4px] overflow-auto bg-white text-sm focus:outline-none border-[1px] border-[#E4E5F0] text-[#4E5056]'>
                    {options.map((option) => (
                        <ListItem
                            key={option.key}
                            onClick={() => handleChange(option.key)}
                            dense
                            sx={{
                                display: 'flex',
                                gap: 0,
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '0' }}>
                                <Checkbox
                                    edge="start"
                                    checked={multiple ? selected.includes(option.key) : selected == option.key}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{
                                        color: '#D1D1D1',
                                        '&.Mui-checked': {
                                            color: '#00E160',
                                        },
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={option.value} className='text-sm text-[#4E5056]' />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </FormControl>
    );
};

export default CheckboxDropdown;