import PropTypes from 'prop-types';
import { useState, useMemo, useCallback, useEffect } from 'react'
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
import EditModal from './editModal'

export const AccountsTable = () => {

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
  const [data, setData] = useState([]);
  const count = data.length;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const accounts = useAccounts(page, rowsPerPage, data);
  const accountsIds = useAccountIds(accounts);
  const accountsSelection = useSelection(accountsIds);
  const selected = accountsSelection.selected;

  useEffect(() => {
    UserService.getUsers().then((res) => {
      setData(res.data);
    });
  }, []);

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
    console.log("delete", id);
    UserService.deleteUser(id).then(() => {
      console.log("ok");
      let updatedItems = [...data].filter(i => i.id !== id);
      setData(updatedItems);
    });
  }

  // const handleEdit = () => {
  //   console.log("sdfsd");
  // }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleToggleEditModal = (id) => {
    console.log(id);
    setIsEditModalOpen(!isEditModalOpen);
  };

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
                        onClick={handleToggleEditModal}
                      >
                        Edit
                      </Button>
                      <EditModal isOpen={isEditModalOpen} 
                      onClose={()=>handleToggleEditModal(account.id)} 
                      id={account.id} />
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
    </Card>
  );
};

// AccountsTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array
// };
