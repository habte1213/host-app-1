"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Search as SearchIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Email as EmailIcon,
} from "@mui/icons-material"

interface DashboardHeaderProps {
  handleDrawerToggle: () => void
}

export default function DashboardHeader({ handleDrawerToggle }: DashboardHeaderProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { md: `calc(100% - ${isMobile ? 0 : 260}px)` },
        ml: { md: `${isMobile ? 0 : 260}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{
            display: { xs: "none", sm: "block" },
            fontWeight: 500,
            color: "text.primary",
          }}
        >
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Search">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle theme">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Messages">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={4} color="error">
                <EmailIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={7} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

