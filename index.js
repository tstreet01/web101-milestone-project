*** Dark Mode ***
  
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
/*** Scroll Animations ***
  /*** Scroll Reveal ***/

// Select all revealable elements
/*** Reduce Motion Button ***/
/*** Reduce Motion Button (with delayed header reveal) ***/
const reduceBtn = document.getElementById('reduce-motion-btn');

reduceBtn.addEventListener('click', () => {
    document.body.classList.toggle('reduce-motion');

    if (document.body.classList.contains('reduce-motion')) {
        // Reduce Motion is ACTIVE
        reduceBtn.textContent = 'Reduce Motion OFF'; 
        // turn off extra motion, so no revealOther
        setTimeout(() => {
            document.body.classList.add('reveal-other');
        }, 1000);
    } else {
        // Reduce Motion is DISABLED
        reduceBtn.textContent = 'Reduce Motion ON';
        document.body.classList.remove('reveal-other');
    }
});



/*** Scroll Reveal Animations ***/
const revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    const windowHeight = window.innerHeight;
    revealableContainers.forEach(container => {
        const top = container.getBoundingClientRect().top;
        const revealDistance = parseInt(getComputedStyle(container).getPropertyValue('--reveal-distance'), 10) || 150;

        // For Reduce Motion, only reveal navbar when scrolled into view
        if (document.body.classList.contains('reduce-motion') && container.classList.contains('navbar')) {
            if (top > windowHeight - revealDistance) return; // skip until in view
        }

        if (top < windowHeight - revealDistance) {
            container.classList.add('active');
        } else {
            container.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', reveal);
reveal(); // initial check

/*** Add Participant Function ***/
function addParticipant(name, location) {
    const participantsDiv = document.getElementById("participants");
    const newParticipant = document.createElement("div");
    newParticipant.classList.add("participant");
    newParticipant.textContent = `🎟️ ${name} from ${location} has RSVP'd.`;
    participantsDiv.appendChild(newParticipant);
}


/*** Form Validation & Modal ***/
document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text');
    const modalImage = document.getElementById('modal-image');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    let rotateFactor = 0;

    function animateImage() {
        if (document.body.classList.contains('reduce-motion')) return;
        rotateFactor = rotateFactor === 0 ? -10 : 0;
        modalImage.style.transform = `rotate(${rotateFactor}deg)`;
    }

   
    // Function to show modal
    // Function to show modal (auto close + auto delete image)
// Function to show modal (auto close + manual close)
function toggleModal(person) {
    modalText.textContent = `Thanks for RSVPing, ${person.name}! See you at the event!`;

    // Show modal + reset image
    modal.style.display = 'flex';
    modalImage.style.display = "block";
    modalImage.style.transform = "none";

    let rotateFactor = 0;

    // Animate image unless reduce motion is ON
    const intervalId = setInterval(() => {
        if (!document.body.classList.contains('reduce-motion')) {
            rotateFactor = rotateFactor === 0 ? -10 : 0;
            modalImage.style.transform = `rotate(${rotateFactor}deg)`;
        }
    }, 500);

    // AUTO CLOSE after 5 seconds
    const autoClose = setTimeout(() => {
        closeModal();
    }, 5000);

    // Manual close button
    modalCloseBtn.onclick = () => {
        closeModal();
        clearTimeout(autoClose);
    };

    // The close function
    function closeModal() {
        modalImage.style.display = "none";  
        modalImage.style.transform = "none";
        modal.style.display = "none";
        clearInterval(intervalId);
    }
}




    // RSVP Form Handling
    const form = document.getElementById('rsvp-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const location = document.getElementById('location').value.trim();
        const email = document.getElementById('email').value.trim();

        let hasError = false;

        if (!name) { hasError = true; document.getElementById('name').classList.add('error'); }
        if (!location) { hasError = true; document.getElementById('location').classList.add('error'); }
        if (!email.includes('@')) { hasError = true; document.getElementById('email').classList.add('error'); }

        if (!hasError) {
            addParticipant(name, location);
            form.reset();
            toggleModal({ name });
        }
    });
});

