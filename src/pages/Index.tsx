import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { UserRoleProvider, useUserRole } from '@/contexts/UserRoleContext';
import LoginPage from '@/components/LoginPage';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardHome from '@/components/DashboardHome';
import PoliciesManagement from '@/components/PoliciesManagement';
import ClientsManagement from '@/components/ClientsManagement';
import CarInsuranceManagement from '@/components/CarInsuranceManagement';
import TravelInsuranceManagement from '@/components/TravelInsuranceManagement';
import BikeInsuranceManagement from '@/components/BikeInsuranceManagement';
import LifeInsuranceManagement from '@/components/LifeInsuranceManagement';
import EmployeeHealthManagement from '@/components/EmployeeHealthManagement';
import CorporateInsuranceManagement from '@/components/CorporateInsuranceManagement';

// Service placeholder components for remaining services
const ServicePlaceholder = ({ serviceName, description, icon: Icon }: { 
  serviceName: string; 
  description: string; 
  icon: React.ComponentType<{ className?: string }> 
}) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 lg:p-8">
    <div className="bg-gradient-primary rounded-full p-4 lg:p-6 mb-4 lg:mb-6">
      <Icon className="h-8 w-8 lg:h-12 lg:w-12 text-white" />
    </div>
    <h2 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-4 text-center">{serviceName}</h2>
    <p className="text-base lg:text-lg text-muted-foreground text-center max-w-md mb-4 lg:mb-6 px-4">
      {description}
    </p>
    <div className="bg-accent p-4 lg:p-6 rounded-lg border-2 border-dashed border-border w-full max-w-md">
      <p className="text-sm text-muted-foreground text-center">
        This service management page is under development. 
        <br />
        Full functionality will be available soon.
      </p>
    </div>
  </div>
);

// User-specific components
const MyPoliciesView = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-gradient-primary p-4 lg:p-6 rounded-xl text-white">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100">Here are your personal insurance policies</p>
      </div>
      <ServicePlaceholder 
        serviceName="My Policies" 
        description="View and manage your personal insurance policies and coverage details."
        icon={() => <div className="text-2xl lg:text-4xl">📋</div>}
      />
    </div>
  );
};

const ClaimsView = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-gradient-secondary p-4 lg:p-6 rounded-xl text-white">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">Claims Management</h2>
        <p className="text-green-100">File and track your insurance claims</p>
      </div>
      <ServicePlaceholder 
        serviceName="Claims Management" 
        description="File new insurance claims and track the status of your existing claims."
        icon={() => <div className="text-2xl lg:text-4xl">🛡️</div>}
      />
    </div>
  );
};

const ProfileView = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-purple-600 p-4 lg:p-6 rounded-xl text-white">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">Profile Settings</h2>
        <p className="text-purple-100">Manage your personal information and preferences</p>
      </div>
      <ServicePlaceholder 
        serviceName="Profile Settings" 
        description="Manage your personal information, contact details, and account preferences."
        icon={() => <div className="text-2xl lg:text-4xl">👤</div>}
      />
    </div>
  );
};

// Import icons for placeholders
import { 
  Car, 
  UserCheck
} from 'lucide-react';

const DashboardApp = () => {
  const { isAuthenticated, user } = useAuth();
  const { canAccessService, currentRole, setUserRole } = useUserRole();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sync user role when user changes
  useEffect(() => {
    if (user && user.role !== currentRole) {
      setUserRole(user.role);
    }
  }, [user, currentRole, setUserRole]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleTabChange = (tab: string) => {
    console.log(`Attempting to navigate to: ${tab}`);
    console.log(`User role: ${user?.role}`);
    console.log(`Current role: ${currentRole}`);
    console.log(`Can access service: ${canAccessService(tab)}`);
    
    // Always allow navigation, but show appropriate content based on permissions
    setActiveTab(tab);
  };

  const renderContent = () => {
    console.log(`Rendering content for tab: ${activeTab}`);
    console.log(`User role: ${user?.role}`);
    console.log(`Current role: ${currentRole}`);
    
    // Check access before rendering
    if (!canAccessService(activeTab)) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 lg:p-8">
          <div className="bg-red-100 rounded-full p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="h-8 w-8 lg:h-12 lg:w-12 text-red-600 text-2xl lg:text-4xl flex items-center justify-center">🔒</div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-red-700 text-center">Access Restricted</h2>
          <p className="text-base lg:text-lg text-muted-foreground text-center max-w-md mb-4 lg:mb-6 px-4">
            You don't have permission to access this service with your current role: <strong>{currentRole}</strong>
          </p>
          <p className="text-sm text-muted-foreground text-center px-4">
            Please contact your administrator or switch to an appropriate role.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'policies':
        return <PoliciesManagement />;
      case 'my-policies':
        return <MyPoliciesView />;
      case 'clients':
        return <ClientsManagement />;
      case 'car-insurance':
        return <CarInsuranceManagement />;
      case 'car-tracker':
        return <ServicePlaceholder 
          serviceName="Car Tracker Service" 
          description="Vehicle tracking and monitoring system for enhanced security and fleet management."
          icon={Car}
        />;
      case 'bike-insurance':
        return <BikeInsuranceManagement />;
      case 'life-insurance':
        return <LifeInsuranceManagement />;
      case 'employee-life':
        return <ServicePlaceholder 
          serviceName="Employee Life Insurance" 
          description="Group life insurance plans for employees with comprehensive coverage options."
          icon={UserCheck}
        />;
      case 'corporate-insurance':
        return <CorporateInsuranceManagement />;
      case 'travel-insurance':
        return <TravelInsuranceManagement />;
      case 'employee-health':
        return <EmployeeHealthManagement />;
      case 'claims':
        return <ClaimsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={handleTabChange}>
      {renderContent()}
    </DashboardLayout>
  );
};

const AuthWrapper = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Don't render UserRoleProvider until we have a user
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }
  
  return (
    <UserRoleProvider initialRole={user.role}>
      <DashboardApp />
    </UserRoleProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

export default Index;
