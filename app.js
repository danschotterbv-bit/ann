'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Menu openen');
}

menuToggle.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', opening);
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Menu sluiten' : 'Menu openen');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
matchMedia('(min-width: 1201px)').addEventListener('change', closeMenu);

const dialog = document.getElementById('info-dialog');
const dialogContent = document.getElementById('dialog-content');
let dialogTrigger;

document.querySelectorAll('[data-service]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const template = document.getElementById(`content-${trigger.dataset.service}`);
    if (!template) return;
    dialogTrigger = trigger;
    dialogContent.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  });
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  const contactLink = event.target.closest('.dialog-contact');
  if (contactLink) {
    if (document.getElementById('zorgvraag')) document.getElementById('zorgvraag').value = contactLink.dataset.topic;
    dialog.close();
  }
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus({ preventScroll: true });
});

document.getElementById('year').textContent = String(new Date().getFullYear());

const form = document.getElementById('contact-form');
if (form) {
form.querySelector('.form-submit').disabled = false;
const selectedCare = new URLSearchParams(window.location.search).get('zorg');
const careSelect = document.getElementById('zorgvraag');
if ([...careSelect.options].some(option => option.value === selectedCare)) careSelect.value = selectedCare;
const formStatus = document.getElementById('form-status');
const emailFallback = document.getElementById('email-fallback');
const preparedMessage = document.getElementById('prepared-message');
let emailText = '';

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const get = name => form.elements.namedItem(name).value.trim();
  // Native required fields accept spaces. Reject these before preparing an email.
  for (const name of ['voornaam', 'naam', 'bericht']) {
    const input = form.elements.namedItem(name);
    if (!get(name)) {
      input.setCustomValidity('Vul dit veld alstublieft in.');
      input.reportValidity();
      input.addEventListener('input', () => input.setCustomValidity(''), { once: true });
      return;
    }
  }
  const subject = `${get('zorgvraag')} — ${get('voornaam')} ${get('naam')}`;
  const body = `Dag Ann,\n\n${get('bericht')}\n\nMet vriendelijke groeten,\n${get('voornaam')} ${get('naam')}\n\nE-mail: ${get('email')}\nTelefoon: ${get('telefoon') || 'Niet ingevuld'}\nOnderwerp: ${get('zorgvraag')}`;
  emailText = `Aan: ann.thuisverpleging@telenet.be\nOnderwerp: ${subject}\n\n${body}`;
  preparedMessage.value = emailText;
  emailFallback.hidden = false;
  formStatus.hidden = false;
  formStatus.textContent = 'Uw e-mail staat klaar. Open uw e-mailprogramma met de knop hieronder, controleer het bericht en klik daar op Verzenden. Er is nog niets verstuurd.';
  document.getElementById('open-email').href = `mailto:ann.thuisverpleging@telenet.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

form.addEventListener('input', () => {
  if (!emailText) return;
  emailText = '';
  preparedMessage.value = '';
  preparedMessage.hidden = true;
  emailFallback.hidden = true;
  formStatus.textContent = 'Uw bericht is aangepast. Klik opnieuw op E-mail voorbereiden om de laatste versie te gebruiken.';
});

document.getElementById('copy-message').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(emailText);
    formStatus.textContent = 'Uw bericht is gekopieerd. Plak het in een nieuwe e-mail en verstuur het naar Ann.';
  } catch {
    preparedMessage.hidden = false;
    preparedMessage.focus();
    preparedMessage.select();
    formStatus.textContent = 'Automatisch kopiëren is hier niet beschikbaar. Uw bericht is geselecteerd: kopieer het zelf en plak het in uw e-mailprogramma.';
  }
});

}

// Keep contact details in view while the form scrolls, without trapping long
// text on a short screen or creating a second scroll area on phones.
const contactColumns = document.querySelectorAll('.contact-grid > .contact-copy');
if (contactColumns.length) {
  const stickyHeader = document.querySelector('.site-header');
  const updateContactColumns = () => {
    const wideScreen = window.matchMedia('(min-width: 801px)').matches;
    contactColumns.forEach(column => {
      const top = Math.min(stickyHeader.offsetHeight + 24, window.innerHeight - column.offsetHeight - 24);
      column.style.setProperty('--contact-sticky-top', `${top}px`);
      column.classList.toggle('contact-sticky', wideScreen);
    });
  };
  updateContactColumns();
  window.addEventListener('resize', updateContactColumns, { passive: true });
  document.fonts?.ready.then(updateContactColumns);
  if ('ResizeObserver' in window) {
    const contactObserver = new ResizeObserver(updateContactColumns);
    contactColumns.forEach(column => contactObserver.observe(column));
    contactObserver.observe(stickyHeader);
  }
}
