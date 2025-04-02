"use client";

import { useEffect } from 'react';

import { logDebug } from '@/lib/helpers';

export function WAFormInput({
  id,
  label,
  value,
  onChange,
  size = "inherit",
  placeholder = "",
  hint = "",
  type = "text",
  clearable = false,
  autofocus = false,
  required = false,
  passwordToggle = false,
  pill = false,
  style = {},
  children,
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
    <wa-textarea
      id={ id }
      label={ label }
      type={ type }
      value={ value }
      size={ size }
      placeholder={ placeholder }
      hint={ hint }
      autofocus={ autofocus }
      required={ required }
      clearable={ clearable }
      password-toggle={ passwordToggle }
      pill={ pill }
      style={ style }
    >
      { children }
    </wa-textarea>
  )
}

export default WAFormInput;