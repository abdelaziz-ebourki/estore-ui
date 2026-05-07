import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { HomePage } from "@/pages/index";
import { ProductsPage } from "@/pages/products";
import { ProductDetailPage } from "@/pages/products.$id";
import { CartPage } from "@/pages/cart";
import { CheckoutPage } from "@/pages/checkout";
import { LoginPage } from "@/pages/login";
import { ContactPage } from "@/pages/contact";
import { LivraisonPage } from "@/pages/livraison";
import { RetoursPage } from "@/pages/retours";
import { ProfilePage } from "@/pages/profile";

function Layout() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster />
    </CartProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "livraison",
        element: <LivraisonPage />,
      },
      {
        path: "retours",
        element: <RetoursPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
