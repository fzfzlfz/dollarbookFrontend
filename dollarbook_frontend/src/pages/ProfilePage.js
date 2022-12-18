import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { ButtonGroup, TextField, Button, IconButton, Container,InputAdornment, Checkbox, Link, Stack, Typography, Avatar, Card, CardContent, CardActions } from '@mui/material';
// components
import { BlogPostCard } from '../sections/@dashboard/blog';

// utils
import * as AuthAPI from '../utils/AuthAPI';
import { getCurrentUser } from '../utils/AuthUtils';
// ----------------------------------------------------------------------


export default function ProfilePage() {
  const navigate = useNavigate();
  const defaultpic = "/assets/images/avatars/avatar_default.jpg";
  
  const [img, setImg] = useState("");
  const [pic, setPic] = useState(defaultpic);
  const [picMode, setPicMode] = useState(false);
  const [pwdMode, setPwdMode] = useState(false);
  const [opsw, setOpsw] = useState("");
  const [npsw, setNpsw] = useState("");

  useEffect(() => {
    setPic(getCurrentUser().photo)
  }, []);

  const onChosePic = (link) => {
    if(!img){
      setPic(link);
    }
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
    console.log(getCurrentUser());
    navigate('/home/profile');
    
  }

  const getDefaultPic = () => {
    setPic(defaultpic);
  }

  const ModeBtn = () => {
    return (<ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <Button onClick={() => setPicMode(true)}>Change Pic</Button>
      <Button onClick={() => setPwdMode(true)}>Change Password</Button>
    </ButtonGroup>
    )
  }

  const toHomeProfile = () => {
    setPicMode(false);
    setPwdMode(false);
  }

  const handleClick = () => {
   
  };

  const clickPic = (curlink, index) => {
    console.log('bugggg');
    if(!img){
      setImg(curlink);
      alert('choose');
    } else if(img === curlink) {
      setImg("");
      alert('cancel');
    }
    console.log('curlink',curlink);
    console.log('choosed',img);
  }

  const changePicModule = () => {
    return (<>
      <Button size="small" variant="outlined" onClick={toHomeProfile}>BACK</Button>
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
        <BlogPostCard onChosePic={onChosePic} clickPic={clickPic}/>
      </Card>
      </>)
  }

  const changePsw = async () => {
    AuthAPI.changePsw({id:getCurrentUser().id, opsw:opsw, npsw:npsw}).then(
      res => {
        if('err' in res.data) {
          const err = `ERROR ${res.data.err}`;
          alert(err);
        } else {
          alert('SUCCESS in Change Password');
          navigate('/home')
        }
      }
    )
    // AuthAPI.changePsw()
  }

  const changePswModule = () => {
    return (
    <>
    <Button size="small" variant="outlined" onClick={toHomeProfile}>BACK</Button>
    <div>
      <Stack spacing={3}>
      <TextField
          name="Opassword"
          label="Old Password"
          onChange={(e) => {setOpsw(e.target.value)}}
          value={opsw}
          type={'password'}
        />

        <TextField
          name="Npassword"
          label="New Password"
          onChange={(e) => {setNpsw(e.target.value)}}
          value={npsw}
          type={'password'}
        />
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained" onClick={changePsw}>
        Change Password
      </Button>
    </div>
    
    </>)
  }

  const Mode = () => {
    if(!picMode && !pwdMode){ 
      return ModeBtn();
    } else if(picMode) {
      return changePicModule()
    } else {
      return changePswModule();
    }
    
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
        {Mode()}
        
     
      </Container>

    </>
  );
}
