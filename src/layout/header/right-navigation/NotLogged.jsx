import React from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useMenu } from "../menu/MenuProvider";


export default function NotLogged() {
  const setOpen = useMenu();
  return (
    <div>
      <Tooltip title="login/signup" >
        <IconButton sx={{ p: 0, display: "inline-flex", marginLeft: 2 }} onClick={() => setOpen(true)}>
          <Avatar alt="avatar" src="/images/avatar.png" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
