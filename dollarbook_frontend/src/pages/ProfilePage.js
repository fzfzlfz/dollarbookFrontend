import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Avatar } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';


// ----------------------------------------------------------------------


export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> $BOOK | Profile </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h2" gutterBottom>
            Profile
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Avatar src="/assets/images/avatars/avatar_default.jpg" sx={{ width: 100, height: 100 }}/>
        </Stack>

        <Grid container spacing={3} display="flex">
          <BlogPostCard />
        </Grid>
      </Container>
    </>
  );
}
