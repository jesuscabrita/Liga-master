import { Box, Grid } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <Grid
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{ overflow: 'hidden', overflowX: 'auto' }}
        >
            {value === index && (<Box>{children}</Box>)}
        </Grid>
    );
}