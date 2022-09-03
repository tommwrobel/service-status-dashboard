import { AppBar, Button, Checkbox, FormControlLabel, Switch, Toolbar, Typography } from "@mui/material";

type ApplicationBarProps = {
    onChangeTheme: () => void
}

const ApplicationBar = ({ onChangeTheme }: ApplicationBarProps) => {

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Services Status Dashboard
                </Typography>

                <FormControlLabel
                    control={<Switch defaultChecked onChange={onChangeTheme}/>}
                    label="Use dark mode"
                    labelPlacement="start"
                />
            </Toolbar>
        </AppBar>
    );
}

export default ApplicationBar;
