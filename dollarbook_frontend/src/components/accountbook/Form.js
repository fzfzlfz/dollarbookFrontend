import { useState } from "react";
import { Box, Button, TextField } from '@mui/material';
import * as TableAPI from '../../utils/TableAPI';
import Iconify from '../iconify';


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
            sx={{
                '& > :not(style)': { m: 0.5, width: '20ch' },
            }} 
            onSubmit={handleSubmit}
        >
                <TextField type="text" onChange={ (e) => { setCategory(e.target.value) } } label="category" name="category" value={category} />
                <TextField type="text" onChange={ (e) => { setDate(e.target.value) } } label="date" name="date" value={date} />
                <TextField type="text" onChange={ (e) => { setAmount(e.target.value) } } label="amount" name="amount" value={amount} />
                <TextField type="text" onChange={ (e) => { setComment(e.target.value) } } label="comment" name="comment" value={comment} />
                
                <Button type="submit" size="large" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} disabled={!isValid()} />
        </Box>
    );
}

export default TableForm;