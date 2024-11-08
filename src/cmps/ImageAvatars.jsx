import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import profilePic from '../assets/styles/images/profile_pic.jpg'

export default function ImageAvatars({ img, avatarHeight, avatarWidth }) {

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Profile Picture" src={img}    
        sx={{
          width: avatarWidth,  // Directly pass the prop value
          height: avatarHeight  // Directly pass the prop value
        }} 
      />
    </Stack>
  );
}