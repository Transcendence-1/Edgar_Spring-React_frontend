import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountsTable } from 'src/sections/accounts/accounts-table';
import AddModal from './addModal';
import UserService from 'src/services/UserService';

import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';

const Page = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleToggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };


  return (
    <>
      <Head>
        <title>
          Accounts
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Accounts
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleToggleAddModal}
                >
                  Add
                </Button>
                {isAddModalOpen && <AddModal
                  isOpen={isAddModalOpen}
                  onClose={handleToggleAddModal} />}
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
            <AccountsTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <Provider store={store}>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </Provider>
);

export default Page;