// import dynamic from "next/dynamic";
// //@ts-ignore
// const AuditingHome = dynamic(() => import("auditing-remote/Home"), { ssr: false });
// //@ts-ignore
// const HrHome = dynamic(() => import("hr-remote/Home"), { ssr: false });
// //@ts-ignore
// const RecruitmentHome = dynamic(() => import("recruitment-remote/RecruitmentHome"), { ssr: false });

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Host Application</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
//         <div className="bg-white p-4 shadow-md rounded-xl">
//           <h2 className="text-xl font-semibold mb-2">Auditing Module</h2>
//           <AuditingHome />
//         </div>

//         <div className="bg-white p-4 shadow-md rounded-xl">
//           <h2 className="text-xl font-semibold mb-2">HR Module</h2>
//           <HrHome />
//         </div>

//         <div className="bg-white p-4 shadow-md rounded-xl">
//           <h2 className="text-xl font-semibold mb-2">Recruitment Module</h2>
//           <RecruitmentHome />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client"

import { useState } from "react"
import { Box, Container, Typography } from "@mui/material"
import { AppData, ProductData } from "../../types/dashboard-types"
import DashboardHeader from "@/components/dashbord/dashboard-header"
import Sidebar from "@/components/dashbord/sidebar"
import AppGrid from "@/components/dashbord/app-grid"
import Footer from "@/components/dashbord/footer"
import ProductListModal from "@/components/dashbord/product-list-modal"


export default function Dashboard() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Sample data - replace with your actual data
  const apps: AppData[] = [
    { id: 1, name: "Analytics", icon: "BarChart", color: "#4285F4" },
    { id: 2, name: "Calendar", icon: "CalendarMonth", color: "#EA4335" },
    { id: 3, name: "Messages", icon: "Email", color: "#FBBC05" },
    { id: 4, name: "Tasks", icon: "CheckCircle", color: "#34A853" },
    { id: 5, name: "Documents", icon: "Description", color: "#673AB7" },
    { id: 6, name: "Projects", icon: "FolderOpen", color: "#FF9800" },
  
  ]

  const products: ProductData[] = [
    { 
      id: 1, 
      name: "Recruitment", 
      description: "End-to-end recruitment solution", 
      icon: "PeopleAlt",
      url: "https://recruitment-remotes1.vercel.app" 
    },
    { 
      id: 2, 
      name: "Audit", 
      description: "Comprehensive Audit management", 
      icon: "AttachMoney",
      url: "https://auditing-remote1.vercel.app" 
    },
    { 
      id: 3, 
      name: "HR", 
      description: "Human resources management system", 
      icon: "WorkOutline",
      url: "https://hr-remote1.vercel.app" 
    },
  ]
  const handleOpenProductModal = () => {
    setIsProductModalOpen(true)
  }

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <DashboardHeader handleDrawerToggle={handleDrawerToggle} />

      <Sidebar
        onOpenProductList={handleOpenProductModal}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 260px)` },
          ml: { md: "260px" },
          mt: "64px", // AppBar height
          bgcolor: (theme) => (theme.palette.mode === "light" ? "#f5f5f7" : "#121212"),
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)", // Full height minus AppBar
        }}
      >
        <Container maxWidth="xl" sx={{ mb: 4, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="500" color="text.primary">
            Applications Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Access all your applications from one central location
          </Typography>

          <AppGrid apps={apps} />
        </Container>

        <Footer />
      </Box>

      <ProductListModal open={isProductModalOpen} onClose={handleCloseProductModal} products={products} />
    </Box>
  )
}



