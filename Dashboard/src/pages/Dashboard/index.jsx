// const Dashboard = () => {
//     return <div>Dashboard</div>;
// };

// export default Dashboard;

import { Box, Container, Grid } from '@mui/material';
import thongke from '~/assets/images/thongke.png';
import { Budget } from '~/components/dashboard/budget';
import { TasksProgress } from '~/components/dashboard/tasks-progress';
import { TotalCustomers } from '~/components/dashboard/total-customers';
import { TotalProfit } from '~/components/dashboard/total-profit';
import HeaderChild from '~/components/HeaderChild';

const Dashboard = () => (
    <>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 3,
                px: 2,
            }}
        >
            <Container maxWidth={false}>
                <HeaderChild title="Orders"></HeaderChild>
                <Grid container spacing={3}>
                    <Grid item lg={3} sm={6} xl={3} xs={12}>
                        <Budget />
                    </Grid>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <TotalCustomers />
                    </Grid>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <TasksProgress />
                    </Grid>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <TotalProfit sx={{ height: '100%' }} />
                    </Grid>
                </Grid>
            </Container>
            <div style={{margin: '24px'}}>
                <img style={{ width: '100%' }} src={thongke} alt="" />
            </div>
        </Box>
    </>
);

export default Dashboard;
