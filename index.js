/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById('theme-button');

// Step 2: Write the callback function
const toggleDarkMode = () => {
    // This section will run whenever the button is clicked
    document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***
  

Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/
/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Query for the submit RSVP button
// Select the RSVP button
// Make sure DOM is loaded first
/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Add Participant Function (Keep This!)
function addParticipant(name, location) {
  const participantsDiv = document.getElementById("participants");
  const newParticipant = document.createElement("div");
  newParticipant.classList.add("participant");
  newParticipant.textContent = `🎟️ ${name} from ${location} has RSVP'd.`;
  participantsDiv.appendChild(newParticipant);
}

// Validate form inputs
const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  const form = document.getElementById("rsvp-form");
  const inputs = form.elements;

  // Remove previous errors
  for (let input of inputs) {
    input.classList.remove("error");
  }

  // Get field values
  const name = document.getElementById("name").value.trim();
  const location = document.getElementById("location").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validate each field
  if (name === "") {
    document.getElementById("name").classList.add("error");
    containsErrors = true;
  }
  if (location === "") {
    document.getElementById("location").classList.add("error");
    containsErrors = true;
  }
  if (!email.includes("@") || email === "") {
    document.getElementById("email").classList.add("error");
    containsErrors = true;
  }

  // If no errors, add participant and clear form
  if (!containsErrors) {
    addParticipant(name, location);
    form.reset();
  }
};

// Replace default listener with validation
document
  .getElementById("rsvp-form")
  .addEventListener("submit", validateForm);

