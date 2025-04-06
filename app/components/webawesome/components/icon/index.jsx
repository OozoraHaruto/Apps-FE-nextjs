export default function WAComponentIcon({
  name,
  slot,
  family,
  variant,
  src,
  fixedWidth=false,
  label = "",
  library = "default",
}) {
  return (
    <wa-icon
      name = {name}
      slot = {slot}
      family = {family}
      variant = {variant}
      fixedWidth = {fixedWidth}
      src = {src}
      label = {label}
      library = {library}
    ></wa-icon>
  )
}