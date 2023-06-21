import PropTypes from 'prop-types';
import { useDispatch, useSelector} from 'react-redux'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { deleteUser, getAllUsers } from 'src/pages/redux/reducers/usersRedecer';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { getInitials } from 'src/utils/get-initials';
import UserService from 'src/services/UserService';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import EditModal from 'src/pages/editModal'

export const AccountsTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(users);

  const useAccounts = (page, rowsPerPage, data) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage, data]
    );
  };

  const useAccountIds = (accounts) => {
    return useMemo(
      () => {
        return accounts.map((account) => account.id);
      },
      [accounts]
    );
  };

  const [page, setPage] = useState(0);
  const count = users.length;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(page, rowsPerPage, users);
  const accountsIds = useAccountIds(accounts);
  const accountsSelection = useSelection(accountsIds);
  const selected = accountsSelection.selected;
  const [selectedData, setSelectedData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const onDeselectAll = accountsSelection.handleDeselectAll;
  const onSelectAll = accountsSelection.handleSelectAll;
  const onDeselectOne = accountsSelection.handleDeselectOne;
  const onSelectOne = accountsSelection.handleSelectOne;

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    console.log("delete", id);  
  }


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleToggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };
  const handleEdit = (id) => {
    UserService.getUserById(id)
      .then((res) => {
        setSelectedData(res.data);
        handleToggleEditModal();
      })
      .catch((e) => console.error(e));
  }

  ///////////////////////////////////////////////////////////////////////

  const selectedSome = (selected.length > 0) && (selected.length < accounts.length);
  const selectedAll = (accounts.length > 0) && (selected.length === accounts.length);

  return (
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Role
                  </TableCell>
                  <TableCell>
                    Operation
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((account) => {
                  const isSelected = selected.includes(account.id);
                  // const createdAt = format(account.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={account.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(account.id);
                            } else {
                              onDeselectOne?.(account.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {account.username}
                      </TableCell>
                      <TableCell>
                        {account.email}
                      </TableCell>
                      <TableCell>
                        {account.role}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          color='success'
                          onClick={() => {
                            handleEdit(account.id)
                          }
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ marginLeft: '10px' }}
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color='error'
                          onClick={() => {
                            handleDelete(account.id)
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      {/* <TableCell>
                      {createdAt}
                    </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
        {isEditModalOpen && <EditModal isOpen={isEditModalOpen}
          onClose={handleToggleEditModal}
          data={selectedData} />}
      </Card>
  );
};
