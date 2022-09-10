import {
    Box,
    IconButton, Input, InputAdornment,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import { Menu as MenuIcon, SearchRounded, VisibilityOutlined } from "@mui/icons-material";
import "./AutoTableBar.css";
import { ChangeEvent, MouseEvent, useState } from "react";

type AutoTableBarProps = {
    title: string,
    isMenuAvailable: boolean,
    isSearchingAvailable: boolean,
    onSearch: (value: string) => void;
    onShowAllColumns: () => void;
    endContent?: JSX.Element
}

const AutoTableBar = ({title, isMenuAvailable, onSearch, isSearchingAvailable, onShowAllColumns, endContent}: AutoTableBarProps): JSX.Element => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOnSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        onSearch(event.target.value);
    }

    return (
        <>
            <Toolbar className="TableBarContainer">
                <Box className="TableBarItemGroup">
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Box>

                <Box className="TableBarItemGroup">
                    {endContent}
                    {isSearchingAvailable &&
                        <Input
                            size="small"
                            className="searchInput"
                            onChange={handleOnSearch}
                            placeholder="Search by name, status, build info..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchRounded/>
                                </InputAdornment>
                            }
                        />
                    }
                    <IconButton
                        onClick={handleMenuOpen}
                        disabled={!isMenuAvailable}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Menu
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
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
