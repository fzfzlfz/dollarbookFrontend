import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Grid, Button, Box, Container, Stack, Typography, Avatar, Card, CardMedia, CardActions } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';



// ----------------------------------------------------------------------


export default function ProfilePage() {
  const [pic, setPic] = useState("/assets/images/avatars/avatar_default.jpg");
  const onChosePic = (link) => {
    setPic(link);
  }
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
          <Typography variant="h3" gutterBottom>
            Pick A Photo For You!
          </Typography>
        </Stack>
      <Box component="span" style={{justifyContent: "space-between"}}>
        <Box >  
            <Avatar src={pic} sx={{ width: 100, height: 100 }}/>
            <Button size="small">Change</Button>
        </Box>
      </Box>
      <div>
        <Grid display="flex">
          <BlogPostCard onChosePic={onChosePic}/>
        </Grid>
      </div>
      </Container>

    </>
  );
}
