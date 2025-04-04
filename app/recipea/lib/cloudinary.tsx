
export const main_logo_trans = "t_recipea-recipe-image"
export const main_step_trans = "t_recipea-step-image"

export const getTransfromationURL = (transformation: string, recipe_id: string, image_id: string) => {
  return `https://res.cloudinary.com/dtlqaleuw/image/upload/${transformation}/recipea/${recipe_id}/${image_id}`
}