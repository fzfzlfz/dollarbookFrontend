import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, getAccordionDetailsUtilityClass } from '@mui/material';

// sections
import {
  AppCurrentVisits,
  AppConversionRates,
} from '../sections/@dashboard/app';

// utils
import * as TableAPI from '../utils/TableAPI';
import { getCurrentUser } from '../utils/AuthUtils';
// ----------------------------------------------------------------------

export default function AnalysisPage() {
  const theme = useTheme();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    TableAPI.getAll(getCurrentUser().id).then(
      res => {
        setTables(res.data);
      }
    ).catch(
      err => {
      }
  )}, []);

  const getFood = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Food') total += curr.amount;
      return total;
    },0)
    return amount;
  }

  const getShopping = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Shopping') total += curr.amount;
      return total;
    },0)
    return amount;
  }

  const getTransportation = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Transportation') total += curr.amount;
      return total;
    },0)
    return amount;
  }
  
  const getEntertainment = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Entertainment') total += curr.amount;
      return total;
    },0)
    return amount;
  }

  const getRental = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Rental') total += curr.amount;
      return total;
    },0)
    return amount;
  }

  const getTravel = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Travel') total += curr.amount;
      return total;
    },0)
    return amount;
  }

  const getCar = () => {
    const amount = tables.reduce((total, curr) => { 
      if(curr.category === 'Car') total += curr.amount;
      return total;
    },0)
    return amount;
  }

  return (
    <>
      <Helmet>
        <title> $BOOK | Analysis </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back to $BOOK
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Pie Chart"
              chartData={[
                { label: 'Food', value: getFood() },
                { label: 'Shopping', value: getShopping() },
                { label: 'Transportation', value: getTransportation() },
                { label: 'Entertainment', value: getEntertainment() },
                { label: 'Rental', value: getRental() },
                { label: 'Travel', value: getTravel() },
                { label: 'Car', value: getCar() },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Bar Chart"
              subheader="see the amount you spend on!"
              chartData={[
                { label: 'Food', value: getFood() },
                { label: 'Shopping', value: getShopping() },
                { label: 'Transportation', value: getTransportation() },
                { label: 'Entertainment', value: getEntertainment() },
                { label: 'Rental', value: getRental() },
                { label: 'Travel', value: getTravel() },
                { label: 'Car', value: getCar() },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
