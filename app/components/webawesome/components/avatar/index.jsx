export default function WAComponentButton({
  image = "",
  label = "",
  initials = "",
  loading = "eager",
  shape = "circle",
  size = "",
  textColor = "",
  backgroundColor = "",
  children,
}) {
  const style = {}
  if (size != "") {
    style[ "--size" ] = size
  }
  if (textColor != "") {
    style[ "--text-color" ] = textColor
  }
  if (backgroundColor != "") {
    style[ "--background-color" ] = backgroundColor
  }

  return (
    <wa-avatar {
      ...{
        image,
        label,
        initials,
        loading,
        shape,
        style,
      }
    }>
      { children }
    </wa-avatar>
  )
}