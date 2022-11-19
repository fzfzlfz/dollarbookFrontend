import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> $BOOK | Main </title>
      </Helmet>

      <Container>
      <Typography variant="h1" sx={{ mb: 5 }}>
          Hi, Welcome back to $BOOK
      </Typography>
      <h3>
          Use $BOOK keep track of your daily spendings 🕶 
      </h3>
      <h3>
          See the analysis of your spending habits 😍
      </h3>
      <h3>
        Make Your Dollar Under Control!ヾ(=･ω･=)o
      </h3>
      </Container>
    </>
  );
}
