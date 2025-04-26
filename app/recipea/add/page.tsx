"use client";

import { Cloudinary } from '@cloudinary/url-gen';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

import Uploader from '@/app/components/Cloudinary/Uploader';
import NavBar from '@/app/components/NavBar';
import { WAButton, WACard, WACopyButton, WAIcon, WAIconButton, WAInput, WASelect, WAStyleCluster, WAStyleFlank, WAStyleStack, WATextArea } from '@/app/components/webawesome';
import { logDebug } from '@/lib/helpers';
import * as recipeLib from "../lib/recipe";

const stepTitle = [
  "Recipe Information",
  "Ingredients",
  "Steps",
  "Finalize recipe",
]

// Cloudinary configuration
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

// https://cloudinary.com/documentation/upload_widget_reference#parameters
const uwConfigRecipeImage = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
  cropping: true,
  sources: [ 'local', 'url', 'google_drive', 'dropbox', 'camera' ],
  folder: "apps/recipea",
  resourceType: 'image',
  maxImageWidth: 1000,
  multiple: false,
  croppingAspectRatio: 1,
};

const uwConfigRecipeStepImage = {
  ...uwConfigRecipeImage,
  croppingAspectRatio: null,
}

const imageCSS: React.CSSProperties = {
  position: "relative",
  width: "100px",
  height: "100px",
}

export default function Page() {
  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  const [ step, setStep ] = useState(1);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('')
  const [ source, setSource ] = useState('')
  const [ image, setImage ] = useState('')
  const [ video, setVideo ] = useState('')
  const [ servings, setServings ] = useState('0')
  const [ prepTime, setPrepTime ] = useState('0')
  const [ cookTime, setCookTime ] = useState('0')
  const [ marinateTime, setMarinateTime ] = useState('0')
  const [ privacy, setPrivacy ] = useState<recipeLib.Recipe[ "privacy" ]>('public')
  const [ course, setCourse ] = useState<recipeLib.Recipe[ "course" ]>('main_course')
  const [ crusine, setCrusine ] = useState('')
  const [ ingredientsAll, setIngredientsAll ] = useState<recipeLib.IngredientsAll[]>([]);
  const [ stepsAll, setStepsAll ] = useState<recipeLib.StepsAll[]>([ recipeLib.createEmptyStepsAll() ]);
  const [ stepIng, setStepIng ] = useState<{ [ key: string ]: recipeLib.StepIngredients }>({})

  useEffect(() => {
    const i = recipeLib.createEmptyIngredientsAll()
    setIngredientsAll([ i ])

    // Add to stepIng
    const si: { [ key: string ]: recipeLib.StepIngredients } = {}
    si[ i.ingredients[ 0 ].uiStepIngredientID ] = {
      group_id: i.uuid,
      ingredient_id: i.ingredients[ 0 ].uuid,
      percentage: 100
    }
    setStepIng(si)
  }, []);

  const editIngredient = (allIndex: number, ingIndex: number, name?: string, quantity?: string, unit?: string) => {
    setIngredientsAll(prevIngAll => {
      const ingAll = prevIngAll
      const ing = ingAll[ allIndex ].ingredients[ ingIndex ]
      if (name) {
        ing.name = name
      }
      if (quantity) {
        ing.quantity = Number(quantity)
      }
      if (unit) {
        ing.unit = unit
      }
      console.log("length of ingAll editIngredient", ingAll.length)

      ingAll[ allIndex ].ingredients[ ingIndex ] = ing
      return ingAll
    })
  }

  const addEmptyIngredient = (allIndex: number, ingIndex: number) => {
    const ing = recipeLib.createEmptyIngredientsAllIngredient()
    ingredientsAll[ allIndex ].ingredients.splice(ingIndex + 1, 0, ing);
    setIngredientsAll([ ...ingredientsAll ])

    // Add to stepIng
    stepIng[ ing.uiStepIngredientID ] = {
      group_id: ingredientsAll[ allIndex ].uuid,
      ingredient_id: ing.uuid,
      percentage: 100
    }
    setStepIng({ ...stepIng })
  }

  const deleteIngredientAtIndex = (allIndex: number, ingIndex: number) => {
    const deleted = ingredientsAll[ allIndex ].ingredients.splice(ingIndex, 1);
    setIngredientsAll([ ...ingredientsAll ])

    // delete from stepIng
    const d = deleted[ 0 ]
    let uuid = d.uiStepIngredientID

    // if uiStepIngredientID is not set
    if (!uuid) {
      const group_id = ingredientsAll[ allIndex ].uuid
      const ing_id = d.uuid

      Object.keys(stepIng).forEach((k) => {
        const s = stepIng[ k ]
        if (s.group_id == group_id && s.ingredient_id == ing_id) {
          uuid = k
          return
        }
      });
    }

    if (uuid) {
      delete stepIng[ uuid ]
      setStepIng({ ...stepIng })
    }
  }

  const addIngredientAll = () => {
    const i = recipeLib.createEmptyIngredientsAll()
    ingredientsAll.push(i)
    setIngredientsAll([ ...ingredientsAll ])

    // Add to stepIng
    stepIng[ i.ingredients[ 0 ].uiStepIngredientID ] = {
      group_id: i.uuid,
      ingredient_id: i.ingredients[ 0 ].uuid,
      percentage: 100
    }
    setStepIng({ ...stepIng })
  }

  const editStep = (allIndex: number, idvIndex: number, description?: string, image?: string) => {
    setStepsAll(prevStepAll => {
      const sAll = prevStepAll
      const ingAll = sAll[ allIndex ]
      const step = ingAll.steps[ idvIndex ]
      if (description) {
        step.description = description
      }
      if (image) {
        console.log("Image", image)
        if (step.images) {
          step.images.push(image)
        } else {
          step.images = [ image ]
        }
      }

      sAll[ allIndex ] = ingAll

      return sAll
    })
  }

  const addEmptyStep = (allIndex: number, ingIndex: number) => {
    stepsAll[ allIndex ].steps.splice(ingIndex + 1, 0, recipeLib.createEmptyStepsAllStep());
    setStepsAll([ ...stepsAll ])
  }

  const deleteStepAtIndex = (allIndex: number, ingIndex: number) => {
    stepsAll[ allIndex ].steps.splice(ingIndex, 1);
    setStepsAll([ ...stepsAll ])
  }

  const addStepAll = () => {
    stepsAll.push(recipeLib.createEmptyStepsAll())
    setStepsAll([ ...stepsAll ])
  }

  const uploadRecipe = () => {
    setLoading(true);
    const sa = stepsAll.map((sas) => {
      sas.steps = sas.steps.map((step) => {
        const all_uuids = [ ...step.description.matchAll(recipeLib.UUID_REGEX_IN_DESC) ]
        const ingredients = {} as { [ key: string ]: recipeLib.StepIngredients }
        if (all_uuids) {
          all_uuids.forEach((matches) => {
            const uuid = matches[ 0 ].substring(2, 38)
            if (stepIng.hasOwnProperty(uuid)) {
              ingredients[ uuid ] = stepIng[ uuid ]
            } else {
              console.error(`failed to find ingredient key ${uuid}`)
            }
          })
        }
        step.ingredients = Object.keys(ingredients).length === 0 ? undefined : ingredients
        return step
      })
      return sas
    })

    const recipe = {} as recipeLib.Recipe
    recipe.name = name
    recipe.description = description
    recipe.source = source
    recipe.image = image
    recipe.video = video
    recipe.servings = Number(servings)
    recipe.prepTime = Number(prepTime)
    recipe.cookTime = Number(cookTime)
    recipe.marinateTime = Number(marinateTime)
    recipe.privacy = privacy
    recipe.course = course
    recipe.crusine = crusine
    recipe.ingredients_all = ingredientsAll
    recipe.steps_all = sa

    logDebug("recipe JSON", JSON.stringify(recipe))
    recipeLib.addRecipe(recipe).then((id) => {
      setLoading(false);
      if (id) {
        router.push(`/recipea/${id}`);
      }
    }).catch((error) => {
      setLoading(false);
      console.log(error.message)
    });
  };

  return (
    <>
      <title>Add Recipe | Recipea</title>
      <meta name="description" content="Add recipe" />
      <NavBar />
      <main>
        <div className='pageSectionMaxSizeContainer'>
          <div className='pageSectionMaxSize'>
            <WACard withHeader>
              <div slot="header">
                Step { step }: { stepTitle[ step - 1 ] }
              </div>
              <form className="input-validation-type input-validation-custom" onSubmit={ (event) => {
                event.preventDefault();
                uploadRecipe();
              } }>
                <WAStyleStack>
                  { step === 1 ? <WAStyleStack>
                    <WAInput id="name" label="Name" value={ name } onChange={ setName } autofocus required />
                    <WAInput id="description" label="Description" value={ description } onChange={ setDescription } required />
                    <div className='evenlySpreadRow'>
                      <div><WAInput id="servings" label="Servings" value={ servings } onChange={ setServings } type='number' required /></div>
                      <div><WAInput id="prepTime" label="Prep Time" value={ prepTime } onChange={ setPrepTime } type='number' required /></div>
                      <div><WAInput id="cookTime" label="Cook Time" value={ cookTime } onChange={ setCookTime } type='number' required /></div>
                      <div><WAInput id="marinateTime" label="Marinate Time" value={ marinateTime } onChange={ setMarinateTime } type='number' required /></div>
                    </div>
                    <div className='evenlySpreadRow'>
                      <div>
                        <WASelect id="privacy" label="Privacy" value={ privacy } onChange={ setPrivacy } required options={ [
                          { value: "public", label: "Public", prefixIcon: { name: "lock-open" } },
                          { value: "private", label: "Private", prefixIcon: { name: "lock" } },
                          { value: "draft", label: "Draft", prefixIcon: { name: "floppy-disk" } },
                          { value: "share_with_link", label: "Share with link", prefixIcon: { name: "link" } },
                        ] } />
                      </div>
                      <div>
                        <WASelect id="course" label="Course" value={ course } onChange={ setCourse } required options={ [
                          { value: "main_course", label: "Main course", prefixIcon: { name: "bowl-food" } },
                          { value: "appetizers", label: "Appetizers", prefixIcon: { name: "cubes-stacked" } },
                          { value: "desert", label: "Desert", prefixIcon: { name: "ice-cream" } },
                          { value: "drinks", label: "Drinks", prefixIcon: { name: "wine-glass" } },
                          { value: "snacks", label: "Snacks", prefixIcon: { name: "cookie" } },
                        ] } />
                      </div>
                    </div>
                    <WAInput id="crusine" label="Crusine" value={ crusine } onChange={ setCrusine } />
                    <WAInput id="source" label="Source" value={ source } onChange={ setSource } type='url' />
                    { image && <div style={ imageCSS }><Image
                      src={ cld.image(image).toURL() }
                      alt={ `Image of ${name}` }
                      objectFit='contain'
                      fill
                    /></div> }
                    <Uploader uwConfig={ uwConfigRecipeImage } setPublicId={ setImage } />
                    <WAInput id="video" label="Video" value={ video } onChange={ setVideo } type='url' />
                  </WAStyleStack> : step === 2 ? <WAStyleStack>
                    {
                      ingredientsAll.map((ingAll: recipeLib.IngredientsAll, i) => (
                        <fieldset key={ `ingAll-${i}` }>
                          <legend>{ ingAll.name == "" ? `Group ${i + 1}` : ingAll.name }</legend>
                          <WAStyleStack>
                            <WAInput id={ `ing_group_${i}_name` } value={ ingAll.name } hint={ ingAll.name == "" ? "Will not show group name when viewing recipe" : "" } placeholder="Group name" onChange={ (val: string) => { ingredientsAll[ i ].name = val; setIngredientsAll([ ...ingredientsAll ]) } } />
                            {
                              ingAll.ingredients.map((ing: recipeLib.Ingredient, j) => (
                                <WAStyleFlank key={ `ing-${i}-${j}` } end>
                                  <div className='evenlySpreadRow'>
                                    <div><WAInput id={ `ingQuantity-${i}-${j}` } placeholder="Quantity" value={ `${ing.quantity}` } onChange={ (val: string) => editIngredient(i, j, undefined, val, undefined) } type='number' /></div>
                                    <div><WAInput id={ `ingUnit-${i}-${j}` } placeholder="Unit" value={ `${ing.unit ?? ""}` } onChange={ (val: string) => editIngredient(i, j, undefined, undefined, val) } /></div>
                                    <div style={ { flexGrow: 6 } }><WAInput id={ `ingName-${i}-${j}` } placeholder="Ingredient" value={ ing.name } onChange={ (val: string) => editIngredient(i, j, val) } /></div>
                                  </div>
                                  <div>
                                    <WAIconButton name='plus' onClick={ () => addEmptyIngredient(i, j) } />
                                    <WAIconButton name='trash' onClick={ () => deleteIngredientAtIndex(i, j) } disabled={ j == 0 && ingAll.ingredients.length == 1 } />
                                  </div>
                                </WAStyleFlank>
                              ))
                            }
                          </WAStyleStack>
                        </fieldset>
                      ))
                    }
                    <WAButton type="button" variant="brand" onClick={ () => addIngredientAll() }>
                      <WAIcon name="plus" slot="prefix" />
                      Add Ingredient Group
                    </WAButton>
                  </WAStyleStack> : step == 3 ? <div className='evenlySpreadRow'>
                    <WAStyleStack>
                      {
                        stepIng && Object.keys(stepIng).map((k) => {
                          const item = stepIng[ k ]
                          const [ grp, ing ] = recipeLib.find_group_ing(item.group_id, item.ingredient_id, ingredientsAll)

                          return <WAStyleFlank key={ `ing-${k}` } end>
                            {/* <WAStyleFlank end style={ { "--flank-size": "100px" } }> */ }
                            <div className='evenlySpreadRow' style={ { alignItems: 'center' } }>
                              <div>
                                {
                                  ing && <div>
                                    <span>{ recipeLib.ingredientAsText(ing, item.percentage) }</span>
                                    { grp && <>
                                      <br />
                                      <span className='wa-body-s'>in { grp }</span>
                                    </> }
                                  </div>
                                }
                                <span className='wa-body-xs'>{ k }</span>
                              </div>
                              <div style={ { width: "100px", minWidth: "100px", maxWidth: "100px" } }>
                                <WAInput id={ `ing_quantity_${k}` } value={ `${item.percentage}` } placeholder="%" type="number" required onChange={ (val: string) => { stepIng[ k ].percentage = Number(val); setStepIng({ ...stepIng }) } } size='small'>
                                  <WAIcon name="percent" slot="suffix" />
                                </WAInput>
                              </div>
                            </div>
                            <WACopyButton value={ `{{${k}}}` } />
                          </WAStyleFlank>
                        })
                      }
                    </WAStyleStack>
                    <WAStyleStack style={ { flexGrow: 8 } }>
                      {
                        stepsAll.map((sa, i) => (
                          <fieldset key={ `sa-${i}` }>
                            <legend>{ sa.name == "" ? `Group ${i + 1}` : sa.name }</legend>
                            <WAStyleStack>
                              <WAInput id={ `sa_group_${i}_name` } value={ sa.name } placeholder="Group name" hint={ sa.name == "" ? "Will not show group name when viewing recipe" : "" } onChange={ (val: string) => { stepsAll[ i ].name = val; setStepsAll([ ...stepsAll ]) } } />
                              {
                                sa.steps.map((s, j) => (
                                  <WAStyleFlank key={ `step-${i}-${j}` } end>
                                    <WAStyleStack>
                                      <WATextArea id={ `step_${i}_${j}_description` } value={ s.description } placeholder="Step" onChange={ (val: string) => { editStep(i, j, val, undefined) } } />
                                      {
                                        s.images && <WAStyleCluster>{
                                          s.images.map((image, k) => (
                                            <div key={ `step_${i}_${j}_${k}_image` } style={ imageCSS }>
                                              <Image src={ cld.image(image).toURL() } alt={ `Image of ${name}` } objectFit='contain' fill />
                                            </div>
                                          )) }
                                        </WAStyleCluster>
                                      }
                                      <Uploader uwConfig={ uwConfigRecipeStepImage } setPublicId={ (val: string) => editStep(i, j, undefined, val) } />
                                    </WAStyleStack>
                                    <div>
                                      <WAIconButton name='plus' onClick={ () => addEmptyStep(i, j) } />
                                      <WAIconButton name='trash' onClick={ () => deleteStepAtIndex(i, j) } disabled={ j == 0 && sa.steps.length == 1 } />
                                    </div>
                                  </WAStyleFlank>
                                ))
                              }
                            </WAStyleStack>
                          </fieldset>
                        ))
                      }
                      <WAButton type="button" variant="brand" onClick={ () => addStepAll() }>
                        <WAIcon name="plus" slot="prefix" />
                        Add Step Group
                      </WAButton>
                    </WAStyleStack>
                  </div> : <WAStyleStack>
                    <small>Note: Images will not be loaded at this point</small>
                    <h1>{ name }</h1>
                    <p>{ description }</p>
                    <p>Servings: { servings }</p>
                    <div className='evenlySpreadRow' style={ { textAlign: 'center' } }>
                      { prepTime != "" && <div>{ prepTime }<br />Prep Time</div> }
                      { cookTime != "" && <div>{ cookTime }<br />Cook Time</div> }
                      { marinateTime != "" && <div>{ marinateTime }<br />Marinate Time</div> }
                    </div>
                    <h3>Ingredients</h3>
                    {
                      ingredientsAll.map((ingAll: recipeLib.IngredientsAll, i) => (
                        <Fragment key={ `preview_ingAll_${i}` }>
                          {
                            ingAll.name != "" && <h4>{ ingAll.name }</h4>
                          }
                          <ol>
                            {
                              ingAll.ingredients.map((ing, j) => <li key={ `preview_ingAll_${i}_${j}` }>{ recipeLib.ingredientAsText(ing) }</li>)
                            }
                          </ol>
                        </Fragment>
                      ))
                    }
                    <h3>Steps</h3>
                    {
                      stepsAll.map((sa: recipeLib.StepsAll, i) => (
                        <Fragment key={ `preview_stepAll_${i}` }>
                          {
                            sa.name != "" && <h4>{ sa.name }</h4>
                          }
                          <ol>
                            {
                              sa.steps.map((s, j) => <li key={ `preview_stepAll_${i}_${j}` }>{ recipeLib.createTextForStepDescription(s.description, stepIng, ingredientsAll) }</li>)
                            }
                          </ol>
                        </Fragment>

                      ))
                    }
                  </WAStyleStack>
                  }

                  <div className='evenlySpreadRow'>
                    {
                      step != 1 ? <WAButton type="button" variant="brand" loading={ loading } onClick={ () => setStep(step - 1) }>
                        <WAIcon name="chevron-left" slot="prefix" />
                        Previous
                      </WAButton> : <div></div>
                    }
                    <div className='centersmallbox'><div style={ { textAlign: "center" } }>{ step }/{ stepTitle.length }</div></div>
                    {
                      step != stepTitle.length ? <WAButton type="button" variant="brand" onClick={ () => setStep(step + 1) }>
                        <WAIcon name="chevron-right" slot="suffix" />
                        Next
                      </WAButton> : <WAButton type="submit" variant="brand" loading={ loading }>Save Recipe</WAButton>
                    }
                  </div>
                </WAStyleStack>

                {/* <WAButton type="submit" variant="brand" loading={ loading }>Submit</WAButton>
                <WAButton type="reset" variant="neutral" loading={ loading }>Reset</WAButton> */}
              </form>
            </WACard>
          </div>
        </div>
      </main>
    </>
  );
}