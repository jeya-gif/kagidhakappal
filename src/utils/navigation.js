/**
 * Navigation utility functions
 */

/**
 * Encodes a service name for URL parameter
 * @param {string} service - Service name to encode
 * @returns {string} Encoded service name
 */
export const encodeServiceForUrl = (service) => {
  return encodeURIComponent(service);
};

/**
 * Navigates to the order page with the specified service
 * @param {Function} navigate - React Router navigate function
 * @param {string} service - Service name to order
 */
export const navigateToOrder = (navigate, service) => {
  const encoded = encodeServiceForUrl(service);
  navigate(`/order?service=${encoded}`);
};

