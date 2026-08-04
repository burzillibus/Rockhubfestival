const apiBase = import.meta.env.VITE_API_BASE_URL ?? 'https://api.rockhubfestival.it';
type Registration = 'users' | 'bands';

export function installRegistrationForms(root: ParentNode = document): void {
  root.querySelectorAll<HTMLFormElement>('form[data-registration]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const kind = form.dataset.registration as Registration;
      const status = form.querySelector<HTMLElement>('[role=status]')!;
      const data = Object.fromEntries(new FormData(form).entries());
      const payload = kind === 'users'
        ? { fullName: data.fullName, email: data.email, privacyAccepted: data.privacyAccepted === 'on', turnstileToken: data.turnstileToken ?? '' }
        : { bandName: data.bandName, contactName: data.contactName, contactEmail: data.contactEmail, genre: data.genre, biography: data.biography, privacyAccepted: data.privacyAccepted === 'on', turnstileToken: data.turnstileToken ?? '' };
      status.textContent = 'Invio in corso…';
      try {
        const response = await fetch(`${apiBase}/v1/registrations/${kind}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('request_failed');
        form.reset(); status.textContent = 'Registrazione ricevuta. Ti contatteremo presto.';
      } catch { status.textContent = 'Invio non riuscito. Riprova più tardi.'; }
    });
  });
}
if (typeof document !== 'undefined') installRegistrationForms();
