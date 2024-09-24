import { CardContent, Typography } from "@mui/material";
import React from "react";

export default function CardBody({ phone, address, description }) {
  return (
    <>
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', height: 70
      }}>
        <Typography variant="body2" color="text.secondary">
          <strong>description: </strong>
          {description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <strong>Phone: </strong>
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Address: </strong>
          {address.city} {address.street} {address.houseNumber}
        </Typography>
      </CardContent>
    </>
  );
}
