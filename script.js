// ----- LAMP TOGGLE (ONLY VIA USER CLICK) -----
const lamp = document.getElementById('lamp');
const body = document.body;

// state: lamp is initially OFF
let isOn = false;

// click handler: toggles lamp state on/off
function toggleLamp() {
  isOn = !isOn;

  if (isOn) {
    // turn lamp ON
    lamp.classList.add('on');
    body.classList.add('lamp-on');
  } else {
    // turn lamp OFF
    lamp.classList.remove('on');
    body.classList.remove('lamp-on');
  }
}

// add click listener to the lamp element
lamp.addEventListener('click', toggleLamp);

// (optional) keyboard accessibility: pressing Enter/Space on focused lamp
// but we keep it simple — still only user-triggered.
lamp.setAttribute('role', 'button');
lamp.setAttribute('tabindex', '0');
lamp.setAttribute('aria-pressed', 'false');

// update aria-pressed on toggle
const originalToggle = toggleLamp;
toggleLamp = function() {
  originalToggle();
  lamp.setAttribute('aria-pressed', isOn ? 'true' : 'false');
};

// reattach listener with updated function
lamp.removeEventListener('click', toggleLamp);
lamp.addEventListener('click', toggleLamp);

// also handle keydown (Enter / Space) to simulate click
lamp.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); // prevent page scroll on space
    toggleLamp();
  }
});

// ensure initial aria state is correct
lamp.setAttribute('aria-pressed', 'false');
