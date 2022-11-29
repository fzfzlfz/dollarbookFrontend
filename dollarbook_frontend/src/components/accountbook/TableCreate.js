import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
    Stack,
    Avatar,
    Checkbox,
    TableRow,
    TableCell,
    MenuItem,
    Typography,
    TextField,
    IconButton
  } from '@mui/material';
  import Iconify from '../iconify';
import * as TableAPI from '../../utils/TableAPI';



const TableCreate = (props) => {

    const [edit, setEdit] = useState(false);
    const [date, setDate] = useState(props.table.date);
    const [amount, setAmount] = useState(props.table.amount);
    const [category, setCategory] = useState(props.table.category);
    const [comment, setComment] = useState(props.table.comment);

    const handleUpdate = (e) => {
        e.preventDefault();
        TableAPI.update(props.table._id, date, amount, category, comment).then(
            res => {
                setEdit(!edit);
                props.handleUpdate(props.table, res.data);
            }
        ).catch(
            err => console.log(err.message)
        );
    };
    
    const handleEdit = () => {
        return (
        <TableRow hover key={props.table._id} tabIndex={-1} role="checkbox" selected={handleSelect}>
                <TableCell padding="checkbox">
                    <Checkbox checked={props.selectedRow} onChange={(event) => props.handleClick(event, props.table.id)} />
                </TableCell>
                <TableCell align="left">
                    <TextField type="text" defaultValue={props.table.category}  onChange={(e) => {setCategory(e.target.value)}} />
                </TableCell>

                <TableCell align="left">
                    <TextField type="text" defaultValue={props.table.date} onChange={(e) => setDate(e.target.value)} />
                </TableCell>

                <TableCell align="left">
                    <TextField type="text" defaultValue={props.table.amount} onChange={(e) => setAmount(e.target.value)} />
                </TableCell>

                <TableCell align="left">
                    <TextField type="text" defaultValue={props.table.comment} onChange={(e) => setComment(e.target.value)} />
                </TableCell>

                <MenuItem onClick={handleUpdate}>
                    <Iconify icon={'eva:edit-fill'}/>
                        Update  
                </MenuItem>

                <MenuItem onClick={() => { setEdit(!edit)} } >
                    <Iconify icon={'eva:trash-2-outline'}  />
                    Cancel
                </MenuItem>
            </TableRow>
        )
    };

    const handleDelete = (e) => {
        e.preventDefault();
        TableAPI.remove(props.table._id).then(
            res => {
                console.log('a');
                props.handleDelete(props.table);
            }
        ).catch(
            err => console.log(err.message)
        );
    }

    const handleSelect = () => {
        props.table.selectedRow(props.table.category);
    }
    
    const categoryMap = {
        Food: "/assets/images/category/food.png",
        Shopping: "/assets/images/category/shopping.png",
        Transportation: "/assets/images/category/transportation.png",
        Entertainment: "/assets/images/category/entertainment.png",
        Rental: "/assets/images/category/rental.png",
        Travel: "/assets/images/category/travel.png",
        Car: "/assets/images/category/car.png",
    } 

    const findPhoto = (category) => {
        const link = categoryMap[category];
        alert(link);
        return link;
    }
    
      
    const handleView = () => {
        return (
            <TableRow hover key={props.table._id} tabIndex={-1} role="checkbox" selected={handleSelect}>
                <TableCell padding="checkbox">
                    <Checkbox checked={props.selectedRow} onChange={(event) => props.handleClick(event, props.table._id)} />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={props.table.category} src={categoryMap[props.table.category]} />
                    <Typography variant="subtitle2" noWrap>
                        {props.table.category}
                    </Typography>
                    </Stack>
                </TableCell>

                <TableCell align="left">{props.table.date}</TableCell>

                <TableCell align="left">{props.table.amount}</TableCell>

                <TableCell align="left">{props.table.comment}</TableCell>


                <MenuItem onClick={() => { setEdit(!edit)}} >
                    <Iconify icon={'eva:edit-fill'}/>
                        Edit
                    </MenuItem>

                <MenuItem onClick={ handleDelete }>
                    <Iconify icon={'eva:trash-2-outline'}  />
                    Delete
                </MenuItem>
            </TableRow>
        );
    }

    if(edit) {
        return handleEdit();
    } 
    return handleView();
}

TableCreate.propTypes = {
    table: PropTypes.shape({
      _id: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.number,
      category: PropTypes.string,
      comment: PropTypes.string
    })
  }
export default TableCreate;
