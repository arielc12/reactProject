import { CardHeader, CardMedia, Divider } from "@mui/material";
import React from "react";

export default function CardHeaderComponent({ image, alt, title, subtitle }) {
  const headerStyle = {
    height: 70,
    overflow: 'hidden',
    '& .MuiCardHeader-title': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'white-space 0.3s ease',
    },
    '&:hover .MuiCardHeader-title': {
      whiteSpace: 'normal',
    },
    '& .MuiCardHeader-subheader': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      transition: 'white-space 0.3s ease',
    },
    '&:hover .MuiCardHeader-subheader': {
      whiteSpace: 'normal',
    },
  };
  return (
    <>
      <CardMedia sx={{ height: 140 }} image={image} alt={alt} />
      <CardHeader sx={headerStyle} title={title} subheader={subtitle} titleTypographyProps={{ noWrap: true }}
        subheaderTypographyProps={{ noWrap: true }} />
      <Divider variant="middle" />
    </>
  );
}
