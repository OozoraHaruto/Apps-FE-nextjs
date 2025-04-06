export default function WAComponentCopyButton({
  value,
  copyLabel = "",
  successLabel = "",
  errorLabel = "",
  disabled = false,
  tooltipPlacement = "top",
  children,
}) {
  return (
    <wa-copy-button
      value={ value }
      copyLabel={ copyLabel }
      successLabel={ successLabel }
      errorLabel={ errorLabel }
      disabled={ disabled }
      tooltipPlacement={ tooltipPlacement }
    >
      { children }
    </wa-copy-button>

  )
}