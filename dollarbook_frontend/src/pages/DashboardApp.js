import { Helmet } from 'react-helmet-async';
import { useState} from 'react';
// @mui
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

  const theme = createTheme({
    typography: {
      // Tell MUI what the font-size on the html element is.
      htmlFontSize: 5,
      fontFamily: 'Raleway, Arial',
    },
  });

  return (
    <>
      <Helmet>
        <title> $BOOK | Main </title>
      </Helmet>

      <Container>
        <ThemeProvider theme={theme}>
          <Typography>
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
        </ThemeProvider>
      </Container>
    </>
  );
}
