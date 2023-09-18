import React, { useContext, useState } from 'react'
import useStyles from './styles'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import formatDate from '../../../utils/formatDate';

const initalState={
    amount:'',
    category:'',
    type:"Income",
    date:formatDate(new Date()),
}
const Form = () => {
    const classes=useStyles();
    const [formData,setFormData]=useState(initalState);
    const [open, setOpen] = React.useState(false);
    const { addTransaction } = useContext(ExpenseTrackerContext);

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
    
        if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
          setFormData({ ...formData, type: 'Income' });
        } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
          setFormData({ ...formData, type: 'Expense' });
        }
    
        setOpen(true);
        addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
        setFormData(initalState);
      };
      const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;
      
  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography align='center' variant='subtitle2' gutterBottom></Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
        <Grid item xs={6}>
            <TextField type='number' label='Amount' fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})}></TextField>
        </Grid>
        <Grid item xs={6}>
            <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value)  })} />
        </Grid>
        <Button className={classes.button} onClick={createTransaction} variant='outlined' color='primary' fullWidth>Create</Button>
    </Grid>
  )
}

export default Form