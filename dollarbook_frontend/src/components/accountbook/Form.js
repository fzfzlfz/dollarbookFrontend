import { useState } from "react";
import { Box, Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import * as TableAPI from '../../utils/TableAPI';
import Iconify from '../iconify';
import { getCurrentUser } from '../../utils/AuthUtils';

const TableForm = (props) => {

    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [comment, setComment] = useState("");


    const isValid = () => {
        const flag = date && amount && category && comment;
        return flag;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "date": date,
            "amount": Number.parseInt(amount, 10),
            "category": category,
            "comment": comment,
            "userid": getCurrentUser().id
        };
        TableAPI.create(data).then(
            res => {
                props.addLine(data);
                setDate("");
                setAmount("");
                setCategory("");
                setComment("");
            }
        ).catch(
            err => console.log(err.message)
        );
    }


    return (
        <Box component="form"
            sx={{ margin: 2 }}
            onSubmit={handleSubmit}
        >
            <div>
                <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="demo-simple-select-label">category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="category"
                    onChange={(e) => { setCategory(e.target.value) }}
                >
                    <MenuItem value={'Food'}>Food</MenuItem>
                    <MenuItem value={'Shopping'}>Shopping</MenuItem>
                    <MenuItem value={'Transportation'}>Transportation</MenuItem>
                    <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                    <MenuItem value={'Rental'}>Rental</MenuItem>
                    <MenuItem value={'Travel'}>Travel</MenuItem>
                    <MenuItem value={'Car'}>Car</MenuItem>
                </Select>
                </FormControl>
                <TextField type="text" onChange={ (e) => { setDate(e.target.value) } } label="date" name="date" value={date} />
                <TextField type="text" onChange={ (e) => { setAmount(e.target.value) } } label="amount" name="amount" value={amount} />
                <TextField type="text" onChange={ (e) => { setComment(e.target.value) } } label="comment" name="comment" value={comment} />
                
                <Button type="submit" size="large" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} disabled={!isValid()} />
            </div>
        </Box>
    );
}

export default TableForm;