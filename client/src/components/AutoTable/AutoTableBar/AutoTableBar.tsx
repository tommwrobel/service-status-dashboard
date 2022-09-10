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
import { Menu as MenuIcon, SearchRounded, VisibilityOutlined } from "@mui/icons-material";
import "./AutoTableBar.css";
import { ChangeEvent, MouseEvent, useState } from "react";

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOnSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        onSearch(event.target.value);
    }

    return (
        <>
            <Toolbar className="tableBarContainer">
                <Box className="tableBarItemGroup">
                    <IconButton
                        onClick={handleMenuOpen}
                        disabled={!isMenuAvailable}
                    >
                        <MenuIcon />
                    </IconButton>
                    {title &&
                        <Typography variant="h6" className="tableTitle">
                            {title}
                        </Typography>
                    }
                    {startContent}
                </Box>

                <Box className="tableBarItemGroup">
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
