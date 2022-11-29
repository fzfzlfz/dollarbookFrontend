import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import TableCreate from './TableCreate';
import Form from './Form';
import * as TableAPI from '../../utils/TableAPI';
import AmountBox from './Box';
import { getCurrentUser } from '../../utils/AuthUtils';

const Table = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setLoad] = useState(false);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    TableAPI.getAll(getCurrentUser().id).then(
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

  let formret = "";
  if(!isLoaded) {
    formret = (
      <div>Loading...</div>
    )
  } else if (error) {
    formret = (
      <div>{error.message}</div>
    )
  } else {
    formret = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {tables.map((table) => (
              <TableCreate 
                key={table.id} 
                table={table} 
                handleUpdate={update}
                handleDelete={remove}
              />)
              )}
          </tbody>
        </table>
    );
  }

  return (
    <div>
      <h2>Table</h2>
      <div className="row mb-3">
        <AmountBox text="Income" type="success" amount={income()}/>
        <AmountBox text="Spending" type="danger" amount={spending()}/>
        <AmountBox text="Balance" type="info" amount={balance()}/>
      </div>

      <Form  addline={addLine}/>
      {formret}
    </div>
  ) 
   

}


Table.propTypes = {
  tables: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    amount: PropTypes.number,
    category: PropTypes.string,
    comment: PropTypes.string
  })
}
export default Table;
