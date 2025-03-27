"use client"

import { Box, Container, Typography, Link, Divider, Grid, useTheme } from "@mui/material"

export default function Footer() {
  const theme = useTheme()
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: theme.palette.mode === "light" ? "background.paper" : "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
    


        <Typography variant="body2" color="text.secondary" align="center">
          © {year} HST. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

