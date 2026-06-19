export type StoreSettings = {
  id: string;
  businessName: string;
  whatsappNumber: string;
  supportEmail: string;
  address: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  defaultCurrency: string;
  shippingEnabled: boolean;
  customRequestsEnabled: boolean;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  adsenseEnabled: boolean;
};
