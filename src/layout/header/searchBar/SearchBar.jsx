import { useTheme } from '@emotion/react'
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import { useSearchParams } from 'react-router-dom';

export default function SearchBar() {
    const theme = useTheme();
    const [searchParams, setSearch] = useSearchParams();
    const handleChange = ({ target }) => setSearch({ q: target.value });


    return (
        <Box>
            <FormControl>
                <OutlinedInput
                    sx={{ backgroundColor: theme.palette.mode === "dark" ? "black" : "white" }}
                    placeholder='search'
                    size='small'
                    value={searchParams.get("q") ?? ""}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton edge="end">
                                <SearchIcon sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }} />
                            </IconButton>
                        </InputAdornment >
                    }
                />
            </FormControl>
        </Box>
    )
}
