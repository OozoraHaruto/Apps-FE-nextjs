"use client";

import { useEffect } from 'react';

import { logDebug } from '@/lib/helpers';

export function WAFormCheckbox({
  id,
  onChange,
  value = "",
  size = "inherit",
  hint = "",
  style = {},
  children,
}) {
  useEffect(() => {
    const ui = document.getElementById(id)
    ui.addEventListener('input', e => {
      logDebug("input", e.target.value)
      onChange(e.target.value)
    });
    ui.addEventListener('change', e => {
      logDebug("change", e.target.value)
      onChange(e.target.value)
    });
  }, []);

  return (
    <wa-checkbox
      id={ id }
      value={ value }
      size={ size }
      hint={ hint }
      style={ style }
    >
      { children }
    </wa-checkbox>
  )
}

export default WAFormCheckbox;