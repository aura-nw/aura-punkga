import React, { useState, useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';

const CheckboxDropdown = ({ options, selected, onChange, placeholder, allKey, label }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [internalSelected, setInternalSelected] = useState(selected);
    const { t } = useTranslation();

    useEffect(() => {
        setInternalSelected(selected);
    }, [selected]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (value) => {
        let newValue;
        if (value.key === allKey) {
            newValue = internalSelected.length === options.length - 1 ? [] : options.filter(s => s.key !== allKey);
        } else {
            newValue = [...internalSelected];
            const existingIndex = newValue.findIndex(item => item.key === value.key);
            if (existingIndex > -1) {
                newValue.splice(existingIndex, 1);
            } else {
                newValue.push(value);
            }
        }

        setInternalSelected(newValue);
        onChange && onChange(newValue);
    };

    const open = Boolean(anchorEl);

    const allChecked = internalSelected.length === options.length - 1;
    const someChecked = internalSelected.length > 0 && !allChecked;


    return (
        <FormControl className="w-full">
            <div onClick={handleClick} className='text-text-teriary text-sm font-medium leading-5 flex gap-[6px] cursor-pointer w-full items-center'>
                <div className='min-w-[70px]'>
                    {allKey}
                </div>
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
                <List className='top-0 left-0 absolute z-10 mt-1 max-h-[248px] w-[278px] whitespace-nowrap rounded-[4px] overflow-auto bg-white text-sm focus:outline-none border-[1px] border-[#E4E5F0] text-[#4E5056]'>
                    <ListItem
                        onClick={() => handleChange(options.find(s => s.key === allKey))}
                        dense
                        sx={{
                            display: 'flex',
                            gap: 0,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '0' }}>
                            <Checkbox
                                edge="start"
                                checked={allChecked}
                                indeterminate={someChecked}
                                tabIndex={-1}
                                disableRipple
                                sx={{
                                    color: '#10B970',
                                    '&.Mui-checked': {
                                        color: '#10B970',
                                    },
                                    '&.MuiCheckbox-indeterminate': {
                                        color: '#10B970',
                                    },
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText primary={options.find(s => s.key === allKey).value} className='text-sm text-[#4E5056]' />
                    </ListItem>
                    {options.filter(option => option.key !== allKey).map((option) => (
                        <ListItem
                            key={option.key}
                            onClick={() => handleChange(option)}
                            dense
                            sx={{
                                display: 'flex',
                                gap: 0,
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '0' }}>
                                <Checkbox
                                    edge="start"
                                    checked={internalSelected.some(s => s.key === option.key)}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{
                                        color: '#10B970',
                                        '&.Mui-checked': {
                                            color: '#10B970',
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