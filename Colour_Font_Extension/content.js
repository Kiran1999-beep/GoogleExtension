let lastElement = null;
let infoBox = null;

// Function to create the floating info box
function createInfoBox() {
  infoBox = document.createElement('div');
  infoBox.style.position = 'fixed';
  infoBox.style.padding = '10px';
  infoBox.style.backgroundColor = '#fff';
  infoBox.style.color = '#000';
  infoBox.style.border = '1px solid #ccc';
  infoBox.style.borderRadius = '5px';
  infoBox.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  infoBox.style.zIndex = '9999';
  infoBox.style.pointerEvents = 'none'; // Ensure it doesn't interfere with clicks
  infoBox.style.display = 'none'; // Hidden by default
  document.body.appendChild(infoBox);
}

// Function to update and show the info box
function showInfoBox(x, y, color, fontFamily) {
  infoBox.innerHTML = `
    <strong>Color:</strong> ${color} <br>
    <strong>Font:</strong> ${fontFamily}
  `;
  infoBox.style.left = `${x + 10}px`;
  infoBox.style.top = `${y + 10}px`;
  infoBox.style.display = 'block';
}

// Highlight hovered elements
function highlightElement(event) {
  if (lastElement) {
    lastElement.style.outline = '';
  }

  lastElement = event.target;
  event.target.style.outline = '2px solid red';
}

// Remove the highlight and display color and font details
function pickDetails(event) {
  event.preventDefault();
  if (!event.target) return;

  const computedStyle = window.getComputedStyle(event.target);
  const color = computedStyle.color;
  const fontFamily = computedStyle.fontFamily;

  showInfoBox(event.clientX, event.clientY, color, fontFamily);

  // Remove event listeners after picking
  event.target.style.outline = '';
  document.removeEventListener('mouseover', highlightElement);
  document.removeEventListener('click', pickDetails);
}

// Initialize the info box and event listeners
function initPicker() {
  if (!infoBox) {
    createInfoBox();
  }
  document.addEventListener('mouseover', highlightElement);
  document.addEventListener('click', pickDetails);
}

// Start the picker
initPicker();
