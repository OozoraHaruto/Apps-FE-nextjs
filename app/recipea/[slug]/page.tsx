"use client"

import { Fragment, useEffect, useState } from 'react';

import NavBar from '@/app/components/NavBar';
import { WAStyleGrid, WAStyleStack } from '@/app/components/webawesome';
import { logDebug } from '@/lib/helpers';
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
        console.log("recipe", r)
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
            <div style={ { textAlign: "center" } }>
              <h2>{ recipe.name }</h2>
              { recipe.description && <p>{ recipe.description }</p> }
            </div>
            <WAStyleGrid>
              <WAStyleStack>
                {
                  recipe.ingredients_all.map((ia, i) => (
                    <Fragment key={ `ing_${i}` }>
                      { ia.name != "" && <h3>{ ia.name }</h3> }
                      {
                        ia.ingredients.map((ing, j) => (
                          <div key={ `ing_${i}_${j}` }>{ ingredientAsText(ing) }</div>
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
                      { sa.name != "" && <h3>{ sa.name }</h3> }
                      <ol>
                        {
                          sa.steps.map((s, j) => (
                            <li key={ `step_${i}_${j}` }>
                              { createTextForStepDescription(s.description, s.ingredients ?? {}, recipe.ingredients_all) }
                            </li>
                          ))
                        }
                      </ol>
                    </Fragment>
                  ))
                }
              </WAStyleStack>
            </WAStyleGrid>
          </main>
        </>
      }
      { error && <div>{ error }</div> }
    </>
  )
}