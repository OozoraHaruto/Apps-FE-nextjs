export default function WAComponentButton({
  variant = "inherit",
  appearance = "accent",
  size = "medium",
  caret = false,
  disabled = false,
  loading = false,
  pill = false,
  type = "button",
  name = null,
  value = null,
  href = "",
  target = "",
  rel = "",
  onClick,
  children,
}) {
  return (
    <wa-button
      variant={ variant }
      appearance={ appearance }
      size={ size }
      caret={ caret }
      disabled={ disabled }
      loading={ loading }
      pill={ pill }
      type={ type }
      name={ name }
      value={ value }
      href={ href }
      target={ target }
      rel={ rel }
      onClick={ onClick }
    >
      { children }
    </wa-button>
  )
}