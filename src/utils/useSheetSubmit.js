import { useRef, useState } from 'react';
import { postToSheet, makeReferenceId, normalisePhone, isValidEmail, SUBMIT_ERRORS } from './sheetClient';

/**
 * Shared submit logic for the site's enquiry and newsletter forms.
 *
 *   const enquiry = useSheetSubmit('enquiry', 'Contact Page');
 *   await enquiry.submit({ name, phone, email, interest, message });
 *
 * - kind: 'enquiry' | 'newsletter' (selects the Sheet tab)
 * - formName: shown in the Sheet's "Form" column
 *
 * Validates name/phone (or email for newsletter), keeps one reference ID
 * per attempt so a retry after an error is never stored twice, and
 * exposes props for the hidden honeypot field that catches bots.
 */
export function useSheetSubmit(kind, formName) {
  const [status, setStatus] = useState('idle');   // idle | sending | sent | error
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const referenceRef = useRef(null);

  const validate = (fields) => {
    if (kind === 'newsletter') return isValidEmail(fields.email) ? '' : 'Please enter a valid email address.';
    if (!fields.name || fields.name.trim().length < 2) return 'Please enter your name.';
    if (!normalisePhone(fields.phone)) return 'Please enter a valid 10-digit mobile number.';
    if (fields.email && !isValidEmail(fields.email)) return 'Please check your email address, or leave it empty.';
    return '';
  };

  /** @returns {Promise<boolean>} true when the submission was stored */
  const submit = async (fields) => {
    if (status === 'sending') return false;
    const invalid = validate(fields);
    if (invalid) {
      setError(invalid);
      setStatus('error');
      return false;
    }
    referenceRef.current ??= makeReferenceId(kind === 'newsletter' ? 'NL' : 'EQ');
    setStatus('sending');
    setError('');
    const res = await postToSheet({
      kind,
      form: formName,
      referenceId: referenceRef.current,
      website: honeypot,
      name: (fields.name || '').trim(),
      phone: fields.phone ? normalisePhone(fields.phone) : '',
      email: (fields.email || '').trim(),
      interest: fields.interest || '',
      message: fields.message || '',
    });
    if (res.ok) {
      referenceRef.current = null;
      setStatus('sent');
      return true;
    }
    setError(SUBMIT_ERRORS[res.reason] || SUBMIT_ERRORS.default);
    setStatus('error');
    return false;
  };

  const reset = () => {
    setStatus('idle');
    setError('');
  };

  // Spread onto a visually hidden <input>; real visitors never see or fill it.
  const honeypotProps = {
    type: 'text',
    name: 'website',
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true,
    value: honeypot,
    onChange: e => setHoneypot(e.target.value),
    style: { position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0, pointerEvents: 'none' },
  };

  return { status, sending: status === 'sending', sent: status === 'sent', error, submit, reset, honeypotProps };
}
