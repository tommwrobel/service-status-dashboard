import {
    Box,
    IconButton, Input, InputAdornment,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import { Clear, Menu as MenuIcon, SearchRounded, VisibilityOutlined } from "@mui/icons-material";
import classes from "./../AutoTable.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Nullable } from "../../../types/types";

type AutoTableBarProps = {
    title?: string,
    isMenuAvailable: boolean,
    isSearchingAvailable: boolean,
    onSearch: (value: string) => void,
    onShowAllColumns: () => void,
    startContent?: JSX.Element,
    endContent?: JSX.Element,
}

const AutoTableBar = ({
    title,
    isMenuAvailable,
    onSearch,
    isSearchingAvailable,
    onShowAllColumns,
    startContent,
    endContent
}: AutoTableBarProps): JSX.Element => {

    const [searchText, setSearchText] = useState<Nullable<string>>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOnSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchText(event.target.value);
        onSearch(event.target.value);
    }

    const handleClearInput = (): void => {
        setSearchText('');
        onSearch('');
    }

    return (
        <>
            <Toolbar className={classes.tableBarContainer}>
                <Box className={classes.tableBarItemGroup}>
                    <IconButton
                        onClick={handleMenuOpen}
                        disabled={!isMenuAvailable}
                    >
                        <MenuIcon />
                    </IconButton>
                    {title &&
                        <Typography variant="h6" className={classes.tableTitle}>
                            {title}
                        </Typography>
                    }
                    {startContent}
                </Box>

                <Box className={classes.tableBarItemGroup}>
                    {isSearchingAvailable &&
                        <Input
                            value={searchText || ''}
                            className={classes.searchInput}
                            size="small"
                            onChange={handleOnSearch}
                            placeholder="Search by name, status, build info..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchRounded/>
                                </InputAdornment>
                            }
                            endAdornment={
                                (searchText && searchText.length > 0) && <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={handleClearInput}
                                    >
                                        <Clear fontSize="inherit" />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    }
                    {endContent}
                </Box>

                <Menu
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={onShowAllColumns}>
                        <ListItemIcon>
                            <VisibilityOutlined />
                        </ListItemIcon>
                        <ListItemText>
                            Show all columns
                        </ListItemText>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </>
    );
}

export default AutoTableBar;
