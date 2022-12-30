import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DetailsProduct({ description, detailsProduct,specifications }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '6px',
                padding: 4,
                border: '1px solid #ccc',
                marginBottom: '12px'
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{'.MuiTab-root': {
                        fontSize: 15,
                        fontWeight: 400
                    }}}
                >
                    <Tab label="Mô tả" {...a11yProps(0)} />
                    <Tab label="Thông số kỹ thuật" {...a11yProps(1)} />
                    <Tab label="Chi tiết sản phẩm" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <p dangerouslySetInnerHTML={{ __html: specifications }}></p>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <p dangerouslySetInnerHTML={{ __html: detailsProduct }}></p>
            </TabPanel>
        </Box>
    );
}
