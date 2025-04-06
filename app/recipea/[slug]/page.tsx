"use client"

import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import NavBar from '@/app/components/NavBar';
import { WAAvatar, WAButton, WACheckbox, WAStyleCluster, WAStyleFlank, WAStyleGrid, WAStyleStack } from '@/app/components/webawesome';
import { logDebug } from '@/lib/helpers';
import Link from 'next/link';
import { getTransfromationURL, main_step_trans } from '../lib/cloudinary';
import { createTextForStepDescription, getRecipe, ingredientAsText, Recipe } from '../lib/recipe';


export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [ recipe, setRecipe ] = useState<Recipe | null>(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    params.then((p) => {
      const { slug } = p
      logDebug("slug", slug)

      getRecipe(slug).then((r) => {
        logDebug("recipe", r)
        setRecipe(r);
        setError(null);
        if (r) {
          document.title = `${r.name} | Recipea`
        }
      }).catch((error) => {
        setError(error);
      });
    })
  }, [ params ]);

  return (
    <>
      <NavBar />
      {
        recipe && <>
          <meta name="description" content={ `${recipe.description ?? `Recipe for ${recipe.name}`} | Recipea` } />
          <main>
            <WAStyleStack>
              <WAStyleStack style={ { textAlign: "center" } }>
                <h1>{ recipe.name }</h1>
                { recipe.description && <p>{ recipe.description }</p> }
                <div className='evenlySpreadRow'>
                  { recipe.prepTime != 0 && <div>{ recipe.prepTime }<br />Prep Time</div> }
                  { recipe.cookTime != 0 && <div>{ recipe.cookTime }<br />Cook Time</div> }
                  { recipe.marinateTime != 0 && <div>{ recipe.marinateTime }<br />Marinate Time</div> }
                  { recipe.prepTime + recipe.cookTime + recipe.marinateTime != 0 && <div>
                    { recipe.prepTime + recipe.cookTime + recipe.marinateTime }<br />Total Time
                  </div> }
                </div>
                <div>

                </div>
                <div className='evenlySpreadRow'>
                  <Link href={ `/recipea/cook/${recipe.id!}` }>
                    <WAButton>Cook Now!</WAButton>
                  </Link>
                </div>
              </WAStyleStack>
              <WAStyleGrid>
                <WAStyleStack>
                  {
                    recipe.ingredients_all.map((ia, i) => (
                      <Fragment key={ `ing_${i}` }>
                        { ia.name != "" && <h2>{ ia.name }</h2> }
                        {
                          ia.ingredients.map((ing, j) => (
                            <WACheckbox key={ `ing_${i}_${j}` } id={ `ing_${i}_${j}` } onChange={ () => null }>{ ingredientAsText(ing) }</WACheckbox>
                          ))
                        }
                      </Fragment>
                    ))
                  }
                </WAStyleStack>
                <WAStyleStack>
                  {
                    recipe.steps_all.map((sa, i) => (
                      <Fragment key={ `step_${i}` }>
                        { sa.name != "" && <h2>{ sa.name }</h2> }
                        {
                          sa.steps.map((s, j) => (
                            <WAStyleFlank key={ `step_${i}_${j}` } alignItems='wa-align-items-start'>
                              <div><WAAvatar initials={ `${j + 1}` } size="2rem" /></div>
                              <div>
                                <div>{ createTextForStepDescription(s.description, s.ingredients ?? {}, recipe.ingredients_all) }</div>
                                <WAStyleCluster>
                                  {
                                    s.images && s.images.length > 0 && s.images.map((img, k) => (
                                      <Image
                                        key={ `step_img_${i}_${j}_${k}` }
                                        src={ getTransfromationURL(main_step_trans, recipe.id!, img) }
                                        alt={ `Image no. ${k + 1} for ${s.description}` }
                                        sizes="100vw"
                                        width={ 300 }
                                        height={ 300 }
                                      />
                                    ))
                                  }
                                </WAStyleCluster>
                              </div>
                            </WAStyleFlank>
                          ))
                        }
                      </Fragment>
                    ))
                  }
                </WAStyleStack>
              </WAStyleGrid>
            </WAStyleStack>
          </main>
        </>
      }
      { error && <div>{ error }</div> }
    </>
  )
}