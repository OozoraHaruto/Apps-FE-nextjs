export default function WAComponentCarousel({
  loop = false,
  navigation = false,
  pagination = false,
  autoplay = false,
  autoplayInterval = 3000,
  slidesPerPage = 1,
  slidesPerMove = 1,
  orientation = "horizontal",
  mouseDragging = false,
  aspectRatio = "16/9",
  children,
}) {
  const style = {
    "--aspect-ratio": aspectRatio,
  }

  return (
    <wa-carousel {
      ...{
        loop,
        navigation,
        pagination,
        autoplay,
        autoplayInterval,
        slidesPerPage,
        slidesPerMove,
        orientation,
        mouseDragging,
        style,
      }
    }>
      { children }
    </wa-carousel>
  )
}