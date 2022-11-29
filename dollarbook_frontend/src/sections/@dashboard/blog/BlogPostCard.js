import PropTypes from 'prop-types';
// @mui
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
// utils


// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard() {
  const handleChange = () => {

  }
  const photosId = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  const photoslink = photosId.map(curr => `/assets/images/avatars/avatar_${curr}.jpg`)
  const photos = photoslink.map(link => <Avatar src={link} sx={{ width: 100, height: 100 }} onClick={handleChange}/>)
  return (
    <Stack direction="row" spacing={4} alignItems="center">
      {photos}
    </Stack>
  );
}
