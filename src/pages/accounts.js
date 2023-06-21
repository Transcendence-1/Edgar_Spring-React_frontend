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
import { getAllUsers, addUser, updateUser, deleteUser } from './redux/reducers/usersRedecer';
import store from './redux/store';

// import { CustomersSearch } from 'src/sections/accounts/accounts-search';
// import { applyPagination } from 'src/utils/apply-pagination';


// const useAccounts = (page, rowsPerPage) => {
//   return useMemo(
//     () => {
//       return applyPagination(data, page, rowsPerPage);
//     },
//     [page, rowsPerPage]
//   );
// };

// const useAccountIds = (accounts) => {
//   return useMemo(
//     () => {
//       return accounts.map((account) => account.id);
//     },
//     [accounts]
//   );
// };

const Page = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  // const [userData, setUserData] = useState([]);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   UserService.getUsers().then((res) => {
  //     setUserData(res.data);
  //   });
  // },[userData]);
  // useMemo(()=>{    
  //   UserService.getUsers().then((res) => {
  //     setUserData(res.data);
  //   });
  // })
  // console.log(data);
  // console.log(data);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const accounts = useAccounts(page, rowsPerPage);
  // const accountsIds = useAccountIds(accounts);
  // const accountsSelection = useSelection(accountsIds);

  // const handlePageChange = useCallback(
  //   (event, value) => {
  //     setPage(value);
  //   },
  //   []
  // );

  // const handleRowsPerPageChange = useCallback(
  //   (event) => {
  //     setRowsPerPage(event.target.value);
  //   },
  //   []
  // );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  // console.log(users);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleToggleAddModal = () => {
    // console.log(users);
    setAddModalOpen(!isAddModalOpen);
  };

  // const handleDataChange = (newData) => {
  //   setUserData(newData);
  //   // handleToggleAddModal()
  // };

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
                  // onDataChange={handleDataChange}
                  isOpen={isAddModalOpen}
                  onClose={handleToggleAddModal} />}
              </div>
            </Stack>
            {/* <CustomersSearch /> */}
            <AccountsTable
              userData={users}
            // count={data.length}
            // items={accounts}
            // onDeselectAll={accountsSelection.handleDeselectAll}
            // onDeselectOne={accountsSelection.handleDeselectOne}
            // onPageChange={handlePageChange}
            // onRowsPerPageChange={handleRowsPerPageChange}
            // onSelectAll={accountsSelection.handleSelectAll}
            // onSelectOne={accountsSelection.handleSelectOne}
            // page={page}
            // rowsPerPage={rowsPerPage}
            // selected={accountsSelection.selected}
            />
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