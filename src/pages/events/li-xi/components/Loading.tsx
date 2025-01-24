import React from "react";
import { CircularProgress, Box } from "@mui/material";

const FullScreenLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Light overlay background
        zIndex: 9999, // High z-index to ensure it appears on top of other elements
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default FullScreenLoader;
