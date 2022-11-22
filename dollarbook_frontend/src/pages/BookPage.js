import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Card,
  Table,
  Grid,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Alert,
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import AmountBox from '../components/accountbook/Box';
import TableCreate from '../components/accountbook/TableCreate';
import TableForm from '../components/accountbook/Form';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
// utils
import * as TableAPI from '../utils/TableAPI';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Category', label: 'Category', alignRight: false },
  { id: 'Date', label: 'Date', alignRight: false },
  { id: 'Amount', label: 'Amount', alignRight: false },
  { id: 'Comment', label: 'Comment', alignRight: false },
  { id: 'Actions', label: 'Actions', alignRight: false },
  { id: '' },

];

// ----------------------------------------------------------------------

function applySortFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BookPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [error, setError] = useState(null);

  const [isLoaded, setLoad] = useState(false);

  const [tables, setTables] = useState([]);


  useEffect(() => {
    TableAPI.getAll().then(
      res => {
        setTables(res.data);
        setLoad(true);
      }
    ).catch(
      err => {
        setError(err);
        setLoad(true);
      }
  )}, []);
  
  const addLine = (newline) => {
    console.log("addLine");
    alert("addline");
    setError(null);
    setLoad(true);
    setTables([...tables, newline]);
  }

  const update = (oldLine, newLine) => {
    // redux code : https://redux.js.org/usage/structuring-reducers/immutable-update-patterns#updating-an-item-in-an-array
    const lineIndex = tables.indexOf(oldLine);
    const newtables = tables.map((item, index) => {
      if (index !== lineIndex) {
          return item
      }
      return {
        ...item,
        ...newLine
      }
    })
    setTables(newtables);
  }

  const remove = (oldLine) => {
    const lineIndex = tables.indexOf(oldLine);
    const newtables = tables.filter((item, index) => index !== lineIndex);
    setTables(newtables);
  }
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tables.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log(selectedIndex);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const income = () => {
    const incomeVal = tables.filter((line) => line.amount >= 0).reduce((prev, curr) => {
      prev += Number.parseInt(curr.amount, 10);
      return prev;
    },0);
    return incomeVal;
  }

  const spending = () => { 
    const spendingVal = tables.filter((line) => line.amount < 0).reduce((prev, curr) => {
      prev += Number.parseInt(curr.amount, 10);
      return prev;
    },0);
    return spendingVal;
  }

  const balance = () => {
    const balanceVal = income() + spending();
    return balanceVal;
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tables.length) : 0;

  const filteredUsers = applySortFilter(tables, filterName);
  
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> $BOOK | BOOK </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Your Transaction
          </Typography>
          
        </Stack>

        <Grid container spacing={2}>

          <Grid item xs>
            <AppWidgetSummary title="Income" total={income()} color="info" />
          </Grid>

          <Grid item xs={3}>
            <AppWidgetSummary title="Spending" total={spending()} color="warning" />
          </Grid>

          <Grid item xs>
            <AppWidgetSummary title="Balance" total={balance()} color="error" />
          </Grid>

        </Grid>

        <TableForm addLine={addLine}/>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={tables.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const {id, category, amount, date, comment, avatarUrl} = row;
                    const id = row._id;
                    const selectedRow = selected.indexOf(id) !== -1;

                    return (
                        <TableCreate 
                          table={row} 
                          selectedRow={selectedRow}
                          handleUpdate={update}
                          handleDelete={remove}
                          handleClick={handleClick}
                        />)
                    //   <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedRow} sx>
                    //     <TableCell padding="checkbox">
                    //       <Checkbox checked={selectedRow} onChange={(event) => handleClick(event, id)} />
                    //     </TableCell>

                    //     <TableCell component="th" scope="row" padding="none">
                    //       <Stack direction="row" alignItems="center" spacing={2}>
                    //         <Avatar alt={category} src={avatarUrl} />
                    //         <Typography variant="subtitle2" noWrap>
                    //           {category}
                    //         </Typography>
                    //       </Stack>
                    //     </TableCell>

                    //     <TableCell align="left">{date}</TableCell>

                    //     <TableCell align="left">{amount}</TableCell>

                    //     <TableCell align="left">{comment}</TableCell>

                    //     <TableCell align="left">

                    //       <MenuItem>
                    //         <Iconify icon={'eva:edit-fill'} />
                    //         Edit
                    //       </MenuItem>

                    //       <MenuItem sx={{ color: 'error.main' }}>
                    //         <Iconify icon={'eva:trash-2-outline'}  />
                    //         Delete
                    //       </MenuItem>

                    //     </TableCell>
                    //   </TableRow>
                    // );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* for search bar */}
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* for paging */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tables.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

BookPage.propTypes = {
  tables: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    category: PropTypes.string,
    comment: PropTypes.string
  })
}