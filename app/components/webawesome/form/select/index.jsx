"use client";

import { useEffect } from 'react';

import { logDebug } from '@/lib/helpers';

export default function WAComponentIcon({
  id,
  value,
  onChange,
  options,
  name="",
  size='inherit',
  placeholder="",
  multiple=false,
  maxOptionsVisible=3,
  disabled=false,
  clearable=false,
  open=false,
  hoist=false,
  appearance='outlined',
  pill=false,
  label="",
  placement="bottom",
  hint="",
  withLabel=false,
  withHint=false,
  required=false,
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
    <wa-select
      id={id}
      name={name}
      value={value}
      size={size}
      placeholder={placeholder}
      multiple={multiple}
      maxOptionsVisible={maxOptionsVisible}
      disabled={disabled}
      clearable={clearable}
      open={open}
      hoist={hoist}
      appearance={appearance}
      pill={pill}
      label={label}
      placement={placement}
      hint={hint}
      withLabel={withLabel}
      withHint={withHint}
      required={required}
    >
      <>
        {options.map((option, i) =>(
          <wa-option key={`option-${id}-${option.value}`} value={option.value}>
            {
              option.prefixIcon && <wa-icon {...option.prefixIcon} slot="start" ></wa-icon>
            }
            {option.label}
            {
              option.suffixIcon && <wa-icon {...option.suffixIcon} slot="end" ></wa-icon>
            }
          </wa-option>
        ))}
      </>
    </wa-select>
  )
}