"use client";
import  { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVendorSitePoliciesApi } from "@/api-endpoints/authendication";
import { useVendor } from "./VendorContext";

const VendorSiteDetailsContext = createContext<any | undefined>(undefined);

export function VendorSiteDetailsProvider({ children }: any) {
      const { vendorId } = useVendor();
  const { data, isLoading, error } = useQuery({
    queryKey: ["getVendorSitePoliciesApi",vendorId],
    queryFn: () => getVendorSitePoliciesApi(`${vendorId}`),
    enabled: !!vendorId
  });

  return (
    <VendorSiteDetailsContext.Provider
      value={{
        policy: data || [],
        isAuthenticated: !!data,
        isLoading,
        error,
      }}
    >
      {children}
    </VendorSiteDetailsContext.Provider>
  );
}

export function useVendorSiteDetails() {
  const context = useContext(VendorSiteDetailsContext);
  if (context === undefined) {
    throw new Error("usePolicy must be used within a VendorSiteDetailsProvider");
  }
  return context;
}

// VendorSiteDetails