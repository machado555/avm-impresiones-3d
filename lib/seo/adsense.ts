export const adsenseConfig = {
  enabled: false,
  clientId: "",
  reservedSlots: {
    blogSidebar: "blog-sidebar",
    blogAfterContent: "blog-after-content",
    productBelowDescription: "product-below-description"
  }
} as const;

export function isAdsenseReady() {
  return Boolean(adsenseConfig.enabled && adsenseConfig.clientId);
}
