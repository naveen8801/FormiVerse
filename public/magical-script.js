(function () {
  let BASE_URL = "https://formi-verse.vercel.app";

  function addPopupStyles() {
    // Check if styles already exist
    if (!document.getElementById("popup-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "popup-styles";
      styleElement.textContent = `
        .popup-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          justify-content: center;
          align-items: center;
        }
        
        .popup-overlay.show-popup {
          display: flex;
        }
        
        .popup-container {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 80%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          position: relative;
          margin-top: 3rem;
        }
        
        .popup-close {
          position: absolute;
          top: 17px;
          right: 15px;
          cursor: pointer;
          font-size: 23px;
        }

        .popup-header {
          margin: 0;
          padding: 0;
          font-size: 1.5em;
        }
        
        .popup-trigger {
          cursor: pointer;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }

  function getFormElement(targetId) {
    // Find the element with the specified ID
    const targetElement = document.getElementById(targetId);

    // If element not found, return early
    if (!targetElement) {
      console.error(`No element found with ID: ${targetId}`);
      return null;
    }

    return targetElement;
  }

  function createPopupForElement(elementId, formId, popupHeight, popupHeader) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");
    overlay.id = `overlay-${elementId}`;

    // Create popup
    const popup = document.createElement("div");
    popup.classList.add("popup-container");

    // Create close button
    // const closeButton = document.createElement("span");
    // closeButton.classList.add("popup-close");
    // closeButton.innerHTML = "&times;";

    // Create header
    let header = null;
    if (popupHeader) {
      header = document.createElement("h2");
      header.classList.add("popup-header");
      header.innerHTML = popupHeader;
    }

    // Create content
    const content = document.createElement("div");
    content.innerHTML = `
      <iframe
      width="100%" 
      height="${popupHeight}"
      src="${BASE_URL}/forms/${formId}"
      title="FormiVerse"
      ></iframe>
`;

    // Assemble popup
    if (header) popup.appendChild(header);
    // popup.appendChild(closeButton);
    popup.appendChild(content);
    overlay.appendChild(popup);

    // Add to document
    document.body.appendChild(overlay);

    // Add close events
    // closeButton.addEventListener("click", function () {
    //   overlay.classList.remove("show-popup");
    // });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.classList.remove("show-popup");
      }
    });

    return overlay;
  }

  function setupElementTrigger(element, elementId, overlay) {
    // Add click listener directly to the element
    element.style.cursor = "pointer";
    element.classList.add("popup-trigger"); // Add class for styling

    element.addEventListener("click", function (e) {
      overlay.classList.add("show-popup");

      // Prevent default behavior if it's a link or form button
      if (
        element.tagName.toLowerCase() === "a" ||
        element.tagName.toLowerCase() === "button" ||
        (element.tagName.toLowerCase() === "input" &&
          (element.type === "submit" || element.type === "button"))
      ) {
        e.preventDefault();
      }
    });
  }

  function init() {
    // Get current script element
    const currentScript = document.currentScript;

    // Get the trigger-element-id attribute from the script tag
    const targetId = currentScript.getAttribute("data-trigger-element-id");

    // Get the formId attribute from the script tag
    const formId = currentScript.getAttribute("data-form-id");

    // Header for popup
    const popupHeader = currentScript.getAttribute("data-popup-header") || "";

    // Height of popup
    const popupHeight = currentScript.getAttribute("data-popup-height") || 550;

    if (!formId) {
      console.error("No form-id attribute found on script tag");
      return;
    }

    if (!targetId) {
      console.error("No trigger-element-id attribute found on script tag");
      return;
    }

    const element = getFormElement(targetId);

    if (!element) return;

    // Add necessary CSS for overlays and popups
    addPopupStyles();

    // Create popup for the target element
    const overlay = createPopupForElement(
      targetId,
      formId,
      popupHeight,
      popupHeader
    );

    // Make the element itself trigger the popup
    setupElementTrigger(element, targetId, overlay);
  }

  // Run when DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
