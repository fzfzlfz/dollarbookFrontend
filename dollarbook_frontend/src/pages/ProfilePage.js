import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Grid, Button, Box, Container, Stack, Typography, Avatar, Card, CardContent, CardActions } from '@mui/material';
// components
import { BlogPostCard } from '../sections/@dashboard/blog';

// utils
import * as AuthAPI from '../utils/AuthAPI';
import { getCurrentUser } from '../utils/AuthUtils';
// ----------------------------------------------------------------------


export default function ProfilePage() {
  const navigate = useNavigate();
  const defaultpic = "/assets/images/avatars/avatar_default.jpg";

  useEffect(() => {
    setPic(getCurrentUser().photo)
  }, []);

  const [pic, setPic] = useState(defaultpic);

  const onChosePic = (link) => {
    setPic(link);
  }

  const changePic = async () => {
    await AuthAPI.changePic(getCurrentUser().id,pic).then(
      res => {
        // update current user info
        const token = getCurrentUser().accessToken;
        const user = res.data;
        user.accessToken = token;
        localStorage.setItem("user",JSON.stringify(user));
      }
    )
    console.log(getCurrentUser())
    navigate('/home/profile')
    
  }

  const getDefaultPic = () => {
    setPic(defaultpic);
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
        <Card style={{display:"flex"}}>
            <Avatar src={pic} sx={{ width: 200, height: 200 }} style={{display: "inline-block"}}/>
            <CardActions>
              <Button size="small" variant="outlined" onClick={changePic}>Submit</Button>
              <Button size="small" variant="contained" onClick={getDefaultPic}>Default</Button>
            </CardActions>  
            <CardContent />
        </Card>
        <Card>
          <BlogPostCard onChosePic={onChosePic}/>
        </Card>
      </Container>

    </>
  );
}
