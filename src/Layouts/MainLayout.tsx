import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer.jsx";
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
            <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
