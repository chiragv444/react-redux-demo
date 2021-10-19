import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Table from '../components/dashboard/Table';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Test React-Redux with ag-grid</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Table />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
