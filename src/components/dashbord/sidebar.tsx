"use client"

import { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Collapse,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  BarChart as AnalyticsIcon,
  Assessment as ReportsIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Inbox as InboxIcon,
  ExpandLess,
  ExpandMore,
  Apps as AppsIcon,
  ChevronLeft,
} from "@mui/icons-material"

interface SidebarProps {
  onOpenProductList: () => void
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

// Drawer width
const drawerWidth = 260

export default function Sidebar({ onOpenProductList, mobileOpen, handleDrawerToggle }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = useState(true)
  const [reportsOpen, setReportsOpen] = useState(false)

  const handleReportsClick = () => {
    setReportsOpen(!reportsOpen)
  }

  // Sidebar content
  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          Admin
          <Box component="span" sx={{ color: "text.primary" }}>
            Dashboard
          </Box>
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={onOpenProductList}
          sx={{
            borderRadius: 1,
            mb: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Our Products" />
        </ListItemButton>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, px: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton sx={{ borderRadius: 1 }} onClick={handleReportsClick}>
            <ListItemIcon>
              <ReportsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {reportsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Sales Reports" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="User Reports" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
              <ListItemText primary="Performance" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1 }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Admin Dashboard v1.0
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © 2023 Your Company
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.paper",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

