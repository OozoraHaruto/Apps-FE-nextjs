export default function WAComponentCard({
  size = "medium",
  withHeader = false,
  withImage = false,
  withFooter = false,
  className = "",
  overview = false,
  children,
}) {
  return (
    <wa-card className={ `${overview && "card-overview"} ${className}` }
      size={ size }
      withHeader={ withHeader }
      withImage={ withImage }
      withFooter={ withFooter }
    >
      { children }
    </wa-card>
  )
}