import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import "./App.css";

// Admin Dashboard Components
import Sidebar from "./Components/AdminDashboard/Sidebar";
import Navbar from "./Components/AdminDashboard/Navbar";
import Card from "./Components/AdminDashboard/Card";
import Chart from "./Components/AdminDashboard/Chart";
import NewProperties from "./Components/AdminDashboard/NewProperties";
import VendorStatus from "./Components/AdminDashboard/VendorStatus";
import NewEnquiries from "./Components/AdminDashboard/NewEnquiries";

//newly added imports
import PropertiesPage from "./Components/AdminDashboard/PropertiesPage";
import LeadsPage from "./Components/AdminDashboard/LeadsPage";
import Calendar from "./Components/AdminDashboard/Calendar";
import Vendor from "./Components/AdminDashboard/Vendor";
import AgentPage from "./Components/AdminDashboard/AgentPage";
import SettingsPage from "./Components/AdminDashboard/SettingsPage";
import HelpPage from "./Components/AdminDashboard/HelpPage";



// Landing Page Components
// import Header from "./Components/HomePage/Header";
import PropertyHighlights from "./Components/HomePage/PropertyHighlights";
import Apartments from "./Components/HomePage/Apartments";
import Whoweare from "./Components/HomePage/Whoweare";
import TopAppartmentProject from "./Components/HomePage/TopAppartmentProject";
import FeatureProperties from "./Components/HomePage/FeatureProperties";
import FloorPlan from "./Components/HomePage/FloorPlan";
import Review from "./Components/HomePage/Review";
import Footer from "./Components/HomePage/Footer";
// import Task from "./Components/HomePage/Task";
// import Leads from "./Components/HomePage/Leads";


// Property Inner Page Components
import PropertyNavbar from "./Components/PropertyInnerPage/PropertyNavbar";
import Aboutus from "./Components/PropertyInnerPage/Aboutus";
import KeyAmenities from "./Components/PropertyInnerPage/KeyAmenities";
import Map from "./Components/PropertyInnerPage/Map";
import MoreProperties from "./Components/PropertyInnerPage/MoreProperties";
import PropertyFooter from "./Components/PropertyInnerPage/PropertyFooter";

// Booking Inner Page Components
import BookingNavbar from "./Components/BookingInnerPage/BookingNavbar";
import BookingDetails from "./Components/BookingInnerPage/BookingDetails";
import BookingFooter from "./Components/BookingInnerPage/BookingFooter";

// User Dashboard Components
import UserSidebar from "./Components/UserDashboard/UserSidebar";
import UserNavbar from "./Components/UserDashboard/UserNavbar";
import CardSection from "./Components/UserDashboard/CardSection";
import Bookings from "./Components/UserDashboard/Bookings";
import Enquiries from "./Components/UserDashboard/Enquiries";

// newly added imports
import SavedProperties from "./Components/UserDashboard/SavedProperties";
import ClientPage from "./Components/UserDashboard/ClientPage";
import UserCalendar from "./Components/UserDashboard/UserCalendar";
import UserProperties from "./Components/UserDashboard/UserProperties";
import Reports from "./Components/UserDashboard/Reports";

// Property Management Dashboard Components
import PropertySidebar from "./Components/PropertyManagementDashboard/PropertySidebar";
import PropertyManagementNavbar from "./Components/PropertyManagementDashboard/Navbar";
import PropertyCard from "./Components/PropertyManagementDashboard/PropertyCard";
import TotalIncome from "./Components/PropertyManagementDashboard/TotalIncome";
import Expenses from "./Components/PropertyManagementDashboard/Expenses";
import PropertStatus from "./Components/PropertyManagementDashboard/PropertStatus";
import RecentTransaction from "./Components/PropertyManagementDashboard/RecentTransaction";

// new

import ManagementProperties from "./Components/PropertyManagementDashboard/ManagementProperties";
import Tenants from "./Components/PropertyManagementDashboard/Tenants";
import PropertyCalendar from "./Components/PropertyManagementDashboard/PropertyCalendar";
import PropertyReport from "./Components/PropertyManagementDashboard/PropertyReport";
import Maintenance from "./Components/PropertyManagementDashboard/Maintenance";

// Builder Inner Page Components
// import BuilderNavbar from "./Components/BuilderInnerPage/BuilderNavbar";
import BuilderHighlights from "./Components/BuilderInnerPage/BuilderHighlights";
import BuilderProperty from "./Components/BuilderInnerPage/BuilderProperty";
import BuilderFooter from "./Components/BuilderInnerPage/BuilderFooter";

// client page components
import ClientNavbar from "./Components/ClientBookingPage/ClientNavbar";
// import ClientHighlights from "./Components/ClientBookingPage/ClientHighlights";
import MainContent from "./Components/ClientBookingPage/MainContent";
import ClientFooter from "./Components/ClientBookingPage/ClientFooter";
// import VendorPage from "./Components/HomePage/VendorPage";
// import AgentBrokersPage from "./Components/HomePage/AgentBrokersPage";

// Admin Dashboard Layout
function AdminDashboard() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Navbar />

          <div className="flex flex-col gap-2 lg:flex-row">
            <Card />
          </div>

          <div className="flex flex-col gap-2 mt-4 lg:flex-row">
            <Chart />
            <NewProperties />
          </div>

          <div className="flex flex-col gap-2 mt-4 lg:flex-row">
            <VendorStatus />
            <NewEnquiries />
          </div>
        </div>
      </div>
    </>
  );
}

// Builder Inner Page Layout
function BuilderInnerPage() {
  return (
    <>
      {/* <BuilderNavbar /> */}
      <BuilderHighlights />
      <BuilderProperty />
      <BuilderFooter />
    </>
  );
}

// client booking Layout
function ClientBookingPage() {
  return (
    <div className="h-screen overflow-auto scrollbar-hide bg-gray-100">
      <ClientNavbar />
      {/* <ClientHighlights /> */}
      <MainContent />
      <ClientFooter />
    </div>
  );
}

// User Dashboard Layout
function UserDashboard() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-4 bg-gray-100">
          {/* Navbar */}
          <UserNavbar />

          {/* Card Section */}
          <CardSection />

          {/* Content Layout (Bookings, Enquiries) */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4 h-full">
            <div className="w-full md:w-full lg:w-2/3 h-full">
              <Bookings />
            </div>
            <div className="w-full md:w-full lg:w-1/3 h-full">
              <Enquiries />
            </div>
          </div>
        </div>
      </div>

      {/* User Properties Section */}
      {/* <UserProperties/> */}
      {/* <Reports /> */}

      {/* <SavedProperties /> */}
      {/* <ClientPage /> */}
      {/* <UserCalendar/> */}
    </>
  );
}

// Main Landing Page Layout
function LandingPage() {
  return (
    <>
      {/* <Header /> */}
      <PropertyHighlights />
      <Apartments />
      <Whoweare />
      <TopAppartmentProject />
      <FeatureProperties />
      <FloorPlan />
      <Review />
      <Footer />
      {/* <Task /> */}
      {/* <Leads />
      <VendorPage />
      <AgentBrokersPage/> */}
    </>
  );
}

// Property Inner Page Layout
function PropertyPage() {
  return (
    <>
      <PropertyNavbar />
      <Aboutus />
      <KeyAmenities />
      <Map />
      <MoreProperties />
      <PropertyFooter />
    </>
  );
}

// Booking Inner Page Layout
function BookingPage() {
  return (
    <>
      <BookingNavbar />
      <BookingDetails />
      <BookingFooter />
    </>
  );
}

// Property Management Dashboard
function PropertyManagementDashboard() {
  return (
    <>
      <div className="flex">
        <PropertySidebar />
        <div className="flex-1 p-4">
          <PropertyManagementNavbar />
          <PropertyCard />
          <div className="flex flex-col md:flex-col gap-2 lg:flex-row">
            <TotalIncome />
            <Expenses />
            <PropertStatus />
          </div>
          <RecentTransaction />
        </div>
      </div>

      {/* <ManagementProperties/>
      <Tenants/>
      <PropertyCalendar />
      <PropertyReport />
      <Maintenance/> */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing page routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/builder" element={<BuilderInnerPage />} />
        <Route path="/clientbooking" element={<ClientBookingPage />} />
        <Route
          path="/propertymanagement"
          element={<PropertyManagementDashboard />}
          s
        />

        {/* landing page routes */}

        {/* Admin Dashboard Routes */}
        <Route path="/propertiespage" element={<PropertiesPage />} />
        <Route path="/leadspage" element={<LeadsPage />} />
        <Route path="/agentpage" element={<AgentPage />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/calender" element={<Calendar />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />

        {/* user dashboard routes */}
        <Route path="/userproperties" element={<UserProperties />} />
        <Route path="/savedproperties" element={<SavedProperties />} />
        <Route path="/clientpage" element={<ClientPage />} />
        <Route path="/usercalendar" element={<UserCalendar />} />
        <Route path="/reports" element={<Reports />} />

        {/* Property Management Dashboard Routes */}
        <Route
          path="/managementproperties"
          element={<ManagementProperties />}
        />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/propertycalendar" element={<PropertyCalendar />} />
        <Route path="/propertyreport" element={<PropertyReport />} />
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Client Booking Page Routes */}
      </Routes>
    </Router>
  );
}

export default App;
