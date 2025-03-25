import { WAButton } from "../.."

export default function WACustomSeeMore({
  seeMore,
  setSeeMore,
  showText = "See More",
  hideText = "Hide",
  buttonVariant = "brand",
  buttonSize = "small",
  buttonAppearance = "plain",
}) {
  return (
    <div className="SeeMoreContainer">
      <wa-divider></wa-divider>
      <WAButton
        variant={ buttonVariant }
        size={ buttonSize }
        appearance={ buttonAppearance }
        onClick={ () => { setSeeMore(!seeMore) } }
      >
        { seeMore ? hideText : showText }
      </WAButton>
      <wa-divider></wa-divider>
    </div>
  )
}