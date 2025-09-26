
/**
 * Utility functions for accessibility testing and validation
 */

/**
 * Check if an element has proper ARIA labels
 */
export const hasProperLabels = (element: HTMLElement): boolean => {
  const hasAriaLabel = element.hasAttribute('aria-label');
  const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
  const hasTitle = element.hasAttribute('title');
  const isLabeled = element.tagName === 'LABEL';
  
  return hasAriaLabel || hasAriaLabelledBy || hasTitle || isLabeled;
};

/**
 * Check if interactive elements have proper focus indicators
 */
export const hasFocusIndicator = (element: HTMLElement): boolean => {
  const computedStyle = window.getComputedStyle(element, ':focus');
  const hasOutline = computedStyle.outline !== 'none';
  const hasBoxShadow = computedStyle.boxShadow !== 'none';
  const hasBackground = computedStyle.backgroundColor !== 'transparent';
  
  return hasOutline || hasBoxShadow || hasBackground;
};

/**
 * Check color contrast ratio (simplified)
 */
export const checkContrast = (foreground: string, background: string): number => {
  // This is a simplified version - in production you'd use a proper contrast checking library
  const getLuminance = (color: string): number => {
    // Convert hex to RGB and calculate luminance
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Validate RTL support for an element
 */
export const validateRTLSupport = (element: HTMLElement): boolean => {
  const isRTL = document.documentElement.getAttribute('data-rtl') === 'true';
  const hasProperDirection = element.style.direction === (isRTL ? 'rtl' : 'ltr');
  const hasProperTextAlign = !element.classList.contains('text-left') || isRTL;
  
  return hasProperDirection && hasProperTextAlign;
};

/**
 * Check if element is keyboard accessible
 */
export const isKeyboardAccessible = (element: HTMLElement): boolean => {
  const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
  const hasTabIndex = element.hasAttribute('tabindex');
  const tabIndex = parseInt(element.getAttribute('tabindex') || '0');
  
  return isInteractive || (hasTabIndex && tabIndex >= 0);
};

export default {
  hasProperLabels,
  hasFocusIndicator,
  checkContrast,
  validateRTLSupport,
  isKeyboardAccessible
};
