/**
 * Gets an element by ID with type safety
 * @param id The element ID
 * @returns The element or null if not found
 */
export const getElementById = <T extends HTMLElement>(id: string): T | null => {
  return document.getElementById(id) as T | null;
};

/**
 * Gets elements by class name with type safety
 * @param className The class name
 * @param parent The parent element (default: document)
 * @returns Array of elements
 */
export const getElementsByClassName = <T extends HTMLElement>(
  className: string,
  parent: Document | HTMLElement = document
): T[] => {
  return Array.from(parent.getElementsByClassName(className)) as T[];
};

/**
 * Gets elements by tag name with type safety
 * @param tagName The tag name
 * @param parent The parent element (default: document)
 * @returns Array of elements
 */
export const getElementsByTagName = <T extends HTMLElement>(
  tagName: string,
  parent: Document | HTMLElement = document
): T[] => {
  return Array.from(parent.getElementsByTagName(tagName)) as T[];
};

/**
 * Adds an event listener with automatic cleanup
 * @param element The element to attach the listener to
 * @param eventType The event type
 * @param handler The event handler
 * @param options Event listener options
 * @returns A function to remove the event listener
 */
export const addEventListenerWithCleanup = <
  K extends keyof HTMLElementEventMap
>(
  element: HTMLElement,
  eventType: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): (() => void) => {
  element.addEventListener(eventType, handler as EventListener, options);
  return () => {
    element.removeEventListener(eventType, handler as EventListener, options);
  };
};

/**
 * Creates an element with attributes and children
 * @param tag The tag name
 * @param attributes The element attributes
 * @param children The child elements or text
 * @returns The created element
 */
export const createElement = <T extends HTMLElement>(
  tag: string,
  attributes: Record<string, string> = {},
  children: (HTMLElement | string)[] = []
): T => {
  const element = document.createElement(tag) as T;

  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // Append children
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
};

/**
 * Checks if an element is visible in the viewport
 * @param element The element to check
 * @param partiallyVisible Whether to check if the element is partially visible (default: false)
 * @returns Whether the element is visible
 */
export const isElementInViewport = (
  element: HTMLElement,
  partiallyVisible = false
): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  if (partiallyVisible) {
    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
};

/**
 * Smoothly scrolls to an element
 * @param element The element to scroll to
 * @param offset Offset from the top (default: 0)
 * @param duration Duration in milliseconds (default: 500)
 */
export const scrollToElement = (
  element: HTMLElement,
  offset = 0,
  duration = 500
): void => {
  const targetPosition =
    element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easeInOutCubic);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
