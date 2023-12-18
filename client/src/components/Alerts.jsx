import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

const Alerts = ({ visible }) => {
  return (
    <>
      {visible && (
        <Stack
          sx={{
            width: "50%",
            marginBottom: "10px",
            zIndex: 200,
            position: "fixed",
            top: "100px",     
          }}
          spacing={2}
        >
          <Alert severity="info" variant="filled">
          <AlertTitle>Info</AlertTitle>
            <Typography variant="h6">Please login to like the post</Typography>
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default Alerts;
