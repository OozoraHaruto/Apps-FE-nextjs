"use client";

import { useEffect } from 'react';

import { logDebug } from '@/lib/helpers';

export function WAFormInput({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  hint = "",
  type = "text",
  clearable = false,
  autofocus = false,
  required = false,
  passwordToggle = false,
  pill = false,
  children
}) {
  useEffect(() => {
    const ui = document.getElementById(id)
    ui.addEventListener('input', e => {
      ui.setCustomValidity("");
      logDebug("input", e.target.value)
      onChange(e.target.value)
    });
    ui.addEventListener('change', e => {
      ui.setCustomValidity("");
      logDebug("change", e.target.value)
      onChange(e.target.value)
    });
  }, []);

  return (
    <wa-input
      id={ id }
      label={ label }
      type={ type }
      value={ value }
      placeholder={ placeholder }
      hint={ hint }
      autofocus={ autofocus }
      required={ required }
      clearable={ clearable }
      password-toggle={ passwordToggle }
      pill={ pill }
    >
      { children }
    </wa-input>
  )
}

export default WAFormInput;