"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Divider,
  useTheme,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import * as MuiIcons from "@mui/icons-material"
import { ProductData } from "../../../types/dashboard-types"
import dynamic from "next/dynamic"
import Link from "next/link"


interface ProductListModalProps {
  open: boolean
  onClose: () => void
  products: ProductData[]
}

export default function ProductListModal({ open, onClose, products }: ProductListModalProps) {
  const theme = useTheme()

  // Dynamically get icon component from string name
  const getIcon = (iconName: string) => {
    // @ts-ignore - MuiIcons has dynamic keys
    const IconComponent = MuiIcons[iconName] || MuiIcons.Apps
    return <IconComponent />
  }

  // Function to handle product click with specific URLs
  const handleProductClick = (productId: string) => {
    onClose()
  
    // Debugging: Check if productId is valid
    console.log("Clicked Product ID:", productId)
  
    // Define specific URLs for each product
    const productUrls: Record<string, string> = {
      auditing: "https://auditing-remote.vercel.app",
      hr: "https://hr-remote1.vercel.app",
      recruitment: "https://recruitment-remotes1.vercel.app",
    }
  
    // // Get the URL for the product or fall back to a default
    // const url = productUrls[productId] || "https://recruitment-remotes1.vercel.app"
  
    // // Debugging: Check if the correct URL is being used
    // console.log("Redirecting to:", url)
  
    // // Open in new tab
    // window.open(url, "_blank", "noopener,noreferrer")
  }
  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div" fontWeight={600}>
          Our Products
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 0 }}>

        <List sx={{ pt: 0 }}>
          
          {products.map((product: any) => (
     <Link href={product.url} passHref target="_blank" rel="noopener noreferrer" >
            <ListItem

              key={product.id}
              component="div"
              alignItems="flex-start"
              sx={{
                py: 2,
                px: 3,
                "&:hover": {
                  bgcolor: "action.hover",
                },
                cursor: "pointer",
              }}
              // onClick={() => handleProductClick(product.id)}
            >
                     

              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {getIcon(product.icon)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
              
                primary={
                  <Typography variant="subtitle1" component="div" fontWeight={500}>
        <Typography component="a" sx={{ textDecoration: "none", color: "inherit" }}>
          {product.name}
        </Typography>
  
                   
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                }
              />
            </ListItem>
            </Link> 

          ))}
        </List>
      

        <Box sx={{ p: 2, bgcolor: "action.hover", textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Explore all our enterprise solutions
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}