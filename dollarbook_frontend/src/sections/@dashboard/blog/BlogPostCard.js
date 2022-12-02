import PropTypes from 'prop-types';
// @mui
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
// utils


// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard(props) {
  
  const photosId = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  const photoslink = photosId.map(curr => `/assets/images/avatars/avatar_${curr}.jpg`)
  const photos = photoslink.map(link => 
      <Avatar src={link} sx={{ width: 100, height: 100 }} onMouseOver={() => props.onChosePic(link)}/>
    )
  return (
    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {photos}
    </Grid>
  );
}
