import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Client, Policy, mockClients, mockPolicies } from '@/data/mockData';

// Extended interfaces for additional insurance types
export interface CarInsurancePolicy {
  id: string;
  policyNo: string;
  clientName: string;
  registrationNo: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  engineCapacity: string;
  coverageType: string;
  ncdPercentage: number;
  premium: number;
  sumAssured: number;
  startDate: string;
  expiryDate: string;
  status: string;
  createdAt: string;
}

export interface BikeInsurancePolicy {
  id: string;
  policyNo: string;
  clientName: string;
  registrationNo: string;
  bikeMake: string;
  bikeModel: string;
  bikeYear: string;
  engineCapacity: string;
  coverageType: string;
  premium: number;
  sumAssured: number;
  startDate: string;
  expiryDate: string;
  status: string;
  createdAt: string;
}

export interface LifeInsurancePolicy {
  id: string;
  policyNo: string;
  clientName: string;
  planType: string;
  term: string;
  premium: number;
  sumAssured: number;
  startDate: string;
  maturityDate: string;
  status: string;
  beneficiaryName: string;
  beneficiaryRelation: string;
  createdAt: string;
}

export interface TravelInsurancePolicy {
  id: string;
  policyNo: string;
  clientName: string;
  destination: string;
  tripType: string;
  coverage: string;
  travelDates: {
    departure: string;
    return: string;
  };
  premium: number;
  sumAssured: number;
  status: string;
  createdAt: string;
}

export interface EmployeeHealthPolicy {
  id: string;
  policyNo: string;
  companyName: string;
  planType: string;
  employees: number;
  coverage: string;
  premium: number;
  sumAssured: number;
  startDate: string;
  expiryDate: string;
  status: string;
  createdAt: string;
}

export interface CorporateInsurancePolicy {
  id: string;
  policyNo: string;
  companyName: string;
  businessType: string;
  coverage: string[];
  premium: number;
  sumAssured: number;
  startDate: string;
  expiryDate: string;
  status: string;
  createdAt: string;
}

// Quote/Lead interface
export interface QuoteLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
  createdAt: string;
  assignedAgent?: string;
}

interface DataContextType {
  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Policies
  policies: Policy[];
  addPolicy: (policy: Omit<Policy, 'id' | 'createdAt'>) => void;
  updatePolicy: (id: string, policy: Partial<Policy>) => void;
  deletePolicy: (id: string) => void;
  
  // Car Insurance
  carPolicies: CarInsurancePolicy[];
  addCarPolicy: (policy: Omit<CarInsurancePolicy, 'id' | 'createdAt'>) => void;
  updateCarPolicy: (id: string, policy: Partial<CarInsurancePolicy>) => void;
  deleteCarPolicy: (id: string) => void;
  
  // Bike Insurance
  bikePolicies: BikeInsurancePolicy[];
  addBikePolicy: (policy: Omit<BikeInsurancePolicy, 'id' | 'createdAt'>) => void;
  updateBikePolicy: (id: string, policy: Partial<BikeInsurancePolicy>) => void;
  deleteBikePolicy: (id: string) => void;
  
  // Life Insurance
  lifePolicies: LifeInsurancePolicy[];
  addLifePolicy: (policy: Omit<LifeInsurancePolicy, 'id' | 'createdAt'>) => void;
  updateLifePolicy: (id: string, policy: Partial<LifeInsurancePolicy>) => void;
  deleteLifePolicy: (id: string) => void;
  
  // Travel Insurance
  travelPolicies: TravelInsurancePolicy[];
  addTravelPolicy: (policy: Omit<TravelInsurancePolicy, 'id' | 'createdAt'>) => void;
  updateTravelPolicy: (id: string, policy: Partial<TravelInsurancePolicy>) => void;
  deleteTravelPolicy: (id: string) => void;
  
  // Employee Health
  employeeHealthPolicies: EmployeeHealthPolicy[];
  addEmployeeHealthPolicy: (policy: Omit<EmployeeHealthPolicy, 'id' | 'createdAt'>) => void;
  updateEmployeeHealthPolicy: (id: string, policy: Partial<EmployeeHealthPolicy>) => void;
  deleteEmployeeHealthPolicy: (id: string) => void;
  
  // Corporate Insurance
  corporatePolicies: CorporateInsurancePolicy[];
  addCorporatePolicy: (policy: Omit<CorporateInsurancePolicy, 'id' | 'createdAt'>) => void;
  updateCorporatePolicy: (id: string, policy: Partial<CorporateInsurancePolicy>) => void;
  deleteCorporatePolicy: (id: string) => void;
  
  // Quote Leads
  quoteLeads: QuoteLead[];
  addQuoteLead: (lead: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => void;
  updateQuoteLead: (id: string, lead: Partial<QuoteLead>) => void;
  deleteQuoteLead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

// Storage helpers
function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store data:', error);
  }
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initialize data states
  const [clients, setClients] = useState<Client[]>(() => 
    getStoredData('igilife_clients', mockClients)
  );
  
  const [policies, setPolicies] = useState<Policy[]>(() => 
    getStoredData('igilife_policies', mockPolicies)
  );
  
  const [carPolicies, setCarPolicies] = useState<CarInsurancePolicy[]>(() => 
    getStoredData('igilife_car_policies', [])
  );
  
  const [bikePolicies, setBikePolicies] = useState<BikeInsurancePolicy[]>(() => 
    getStoredData('igilife_bike_policies', [])
  );
  
  const [lifePolicies, setLifePolicies] = useState<LifeInsurancePolicy[]>(() => 
    getStoredData('igilife_life_policies', [])
  );
  
  const [travelPolicies, setTravelPolicies] = useState<TravelInsurancePolicy[]>(() => 
    getStoredData('igilife_travel_policies', [])
  );
  
  const [employeeHealthPolicies, setEmployeeHealthPolicies] = useState<EmployeeHealthPolicy[]>(() => 
    getStoredData('igilife_employee_health_policies', [])
  );
  
  const [corporatePolicies, setCorporatePolicies] = useState<CorporateInsurancePolicy[]>(() => 
    getStoredData('igilife_corporate_policies', [])
  );
  
  const [quoteLeads, setQuoteLeads] = useState<QuoteLead[]>(() => 
    getStoredData('igilife_quote_leads', [])
  );

  // Persist data changes
  useEffect(() => setStoredData('igilife_clients', clients), [clients]);
  useEffect(() => setStoredData('igilife_policies', policies), [policies]);
  useEffect(() => setStoredData('igilife_car_policies', carPolicies), [carPolicies]);
  useEffect(() => setStoredData('igilife_bike_policies', bikePolicies), [bikePolicies]);
  useEffect(() => setStoredData('igilife_life_policies', lifePolicies), [lifePolicies]);
  useEffect(() => setStoredData('igilife_travel_policies', travelPolicies), [travelPolicies]);
  useEffect(() => setStoredData('igilife_employee_health_policies', employeeHealthPolicies), [employeeHealthPolicies]);
  useEffect(() => setStoredData('igilife_corporate_policies', corporatePolicies), [corporatePolicies]);
  useEffect(() => setStoredData('igilife_quote_leads', quoteLeads), [quoteLeads]);

  // Generic helper functions
  const generateId = () => Date.now().toString();
  const getCurrentDate = () => new Date().toISOString().split('T')[0];

  // Client functions
  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updates } : client
    ));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  // Policy functions
  const addPolicy = (policyData: Omit<Policy, 'id' | 'createdAt'>) => {
    const newPolicy: Policy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setPolicies(prev => [...prev, newPolicy]);
  };

  const updatePolicy = (id: string, updates: Partial<Policy>) => {
    setPolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deletePolicy = (id: string) => {
    setPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Car Insurance functions
  const addCarPolicy = (policyData: Omit<CarInsurancePolicy, 'id' | 'createdAt'>) => {
    const newPolicy: CarInsurancePolicy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setCarPolicies(prev => [...prev, newPolicy]);
  };

  const updateCarPolicy = (id: string, updates: Partial<CarInsurancePolicy>) => {
    setCarPolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deleteCarPolicy = (id: string) => {
    setCarPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Bike Insurance functions
  const addBikePolicy = (policyData: Omit<BikeInsurancePolicy, 'id' | 'createdAt'>) => {
    const newPolicy: BikeInsurancePolicy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setBikePolicies(prev => [...prev, newPolicy]);
  };

  const updateBikePolicy = (id: string, updates: Partial<BikeInsurancePolicy>) => {
    setBikePolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deleteBikePolicy = (id: string) => {
    setBikePolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Life Insurance functions
  const addLifePolicy = (policyData: Omit<LifeInsurancePolicy, 'id' | 'createdAt'>) => {
    const newPolicy: LifeInsurancePolicy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setLifePolicies(prev => [...prev, newPolicy]);
  };

  const updateLifePolicy = (id: string, updates: Partial<LifeInsurancePolicy>) => {
    setLifePolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deleteLifePolicy = (id: string) => {
    setLifePolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Travel Insurance functions
  const addTravelPolicy = (policyData: Omit<TravelInsurancePolicy, 'id' | 'createdAt'>) => {
    const newPolicy: TravelInsurancePolicy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setTravelPolicies(prev => [...prev, newPolicy]);
  };

  const updateTravelPolicy = (id: string, updates: Partial<TravelInsurancePolicy>) => {
    setTravelPolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deleteTravelPolicy = (id: string) => {
    setTravelPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Employee Health functions
  const addEmployeeHealthPolicy = (policyData: Omit<EmployeeHealthPolicy, 'id' | 'createdAt'>) => {
    const newPolicy: EmployeeHealthPolicy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setEmployeeHealthPolicies(prev => [...prev, newPolicy]);
  };

  const updateEmployeeHealthPolicy = (id: string, updates: Partial<EmployeeHealthPolicy>) => {
    setEmployeeHealthPolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deleteEmployeeHealthPolicy = (id: string) => {
    setEmployeeHealthPolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Corporate Insurance functions
  const addCorporatePolicy = (policyData: Omit<CorporateInsurancePolicy, 'id' | 'createdAt'>) => {
    const newPolicy: CorporateInsurancePolicy = {
      ...policyData,
      id: generateId(),
      createdAt: getCurrentDate(),
    };
    setCorporatePolicies(prev => [...prev, newPolicy]);
  };

  const updateCorporatePolicy = (id: string, updates: Partial<CorporateInsurancePolicy>) => {
    setCorporatePolicies(prev => prev.map(policy => 
      policy.id === id ? { ...policy, ...updates } : policy
    ));
  };

  const deleteCorporatePolicy = (id: string) => {
    setCorporatePolicies(prev => prev.filter(policy => policy.id !== id));
  };

  // Quote Lead functions
  const addQuoteLead = (leadData: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: QuoteLead = {
      ...leadData,
      id: generateId(),
      createdAt: getCurrentDate(),
      status: 'new',
    };
    setQuoteLeads(prev => [...prev, newLead]);
  };

  const updateQuoteLead = (id: string, updates: Partial<QuoteLead>) => {
    setQuoteLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const deleteQuoteLead = (id: string) => {
    setQuoteLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const value: DataContextType = {
    clients,
    addClient,
    updateClient,
    deleteClient,
    policies,
    addPolicy,
    updatePolicy,
    deletePolicy,
    carPolicies,
    addCarPolicy,
    updateCarPolicy,
    deleteCarPolicy,
    bikePolicies,
    addBikePolicy,
    updateBikePolicy,
    deleteBikePolicy,
    lifePolicies,
    addLifePolicy,
    updateLifePolicy,
    deleteLifePolicy,
    travelPolicies,
    addTravelPolicy,
    updateTravelPolicy,
    deleteTravelPolicy,
    employeeHealthPolicies,
    addEmployeeHealthPolicy,
    updateEmployeeHealthPolicy,
    deleteEmployeeHealthPolicy,
    corporatePolicies,
    addCorporatePolicy,
    updateCorporatePolicy,
    deleteCorporatePolicy,
    quoteLeads,
    addQuoteLead,
    updateQuoteLead,
    deleteQuoteLead,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
