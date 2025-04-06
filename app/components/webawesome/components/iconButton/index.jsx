export default function WAComponentIconButton({
  name,
  family,
  variant,
  src,
  label = "",
  library = "default",
  disabled = false,
  href = "",
  target = "",
  onClick,
}) {
  return (
    <wa-icon-button
      name={ name }
      family={ family }
      variant={ variant }
      src={ src }
      label={ label }
      library={ library }
      disabled={ disabled }
      href={ href }
      target={ target }
      onClick={ onClick }
    ></wa-icon-button>
  )
}