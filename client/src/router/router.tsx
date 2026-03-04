
import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../layout/AppLayout"
import DashboardPage from "../pages/DashboardPage"
import InventoryPage from "../pages/InventoryPage"
import BrandPage from "../pages/BrandPage"
import SupplierPage from "../pages/SupplierPage"
import CustomerReportPage from "../pages/CustomerReportPage"
import OfferPage from "../pages/OfferPage"
import NotFoundPage from "../pages/NotFoundPage"
 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [
      { index: true, element: <DashboardPage /> },
    ]
  },
  {
    path: "/inventory",
    element: <AppLayout />, 
    children: [
      { index: true, element: <InventoryPage /> },
    ]
  },
  {
    path: "/customers",
    element: <AppLayout />, 
    children: [
      { index: true, element: <CustomerReportPage /> },
    ]
  },
  {
    path: "/suppliers",
    element: <AppLayout />, 
    children: [
      { index: true, element: <SupplierPage /> },
    ]
  },
  {
    path: "/brands",
    element: <AppLayout />, 
    children: [
      { index: true, element: <BrandPage /> },
    ]
  },
   {
    path: "/offers",
    element: <AppLayout />, 
    children: [
      { index: true, element: <OfferPage /> },
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
])
