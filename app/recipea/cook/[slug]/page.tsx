"use client"

import Image from 'next/image';
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';

import NavBar from '@/app/components/NavBar';
import { WAAvatar, WACarousel, WACarouselItem, WACheckbox, WAStyleCluster, WAStyleFlank, WAStyleStack } from '@/app/components/webawesome';
import { logDebug } from '@/lib/helpers';
import { getTransfromationURL, main_step_trans } from '../../lib/cloudinary';
import { createTextForStepDescription, getRecipe, ingredientAsText, Recipe } from '../../lib/recipe';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [ recipe, setRecipe ] = useState<Recipe | null>(null);
  const [ error, setError ] = useState(null);
  const [ aspectRatio, setAspectRatio ] = useState("16/9");

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

  useLayoutEffect(() => {
    const gcd = (a: number, b: number): number => {
      return (b == 0) ? a : gcd(b, a % b);
    }

    function updateSize() {
      const mainElement = document.getElementById("main")
      if (mainElement) {
        const computedStyle = getComputedStyle(mainElement);
        const w = mainElement.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingLeft)
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - mainElement.getBoundingClientRect().top
        h -= (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom))
        h -= 20
        logDebug("windows size", w, "x", h)
        const r = gcd(w, h)
        setAspectRatio(`${Math.floor(w / r)}/${Math.floor(h / r)}`)
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  })

  return (
    <>
      <NavBar />
      {
        recipe && <>
          <meta name="description" content={ `${recipe.description ?? `Recipe for ${recipe.name}`} | Recipea` } />
          <main id="main">
            <WACarousel orientation='vertical' aspectRatio={ aspectRatio } pagination>
              {
                recipe.ingredients_all.map((ia, i) => (
                  <WACarouselItem key={ `ing_${i}` }>
                    <WAStyleStack>
                      { ia.name != "" && <h2>{ ia.name }</h2> }
                      {
                        ia.ingredients.map((ing, j) => (
                          <WACheckbox key={ `ing_${i}_${j}` } id={ `ing_${i}_${j}` } onChange={ () => null }>{ ingredientAsText(ing) }</WACheckbox>
                        ))
                      }
                    </WAStyleStack>
                  </WACarouselItem>
                ))
              }
              {
                recipe.steps_all.map((sa, i) => (
                  <Fragment key={ `step_${i}` }>
                    {
                      sa.steps.map((s, j) => (
                        <WACarouselItem key={ `step_${i}_${j}` }>
                          <WAStyleStack>
                            { sa.name != "" && <h2>{ sa.name }</h2> }
                            <WAStyleFlank alignItems='wa-align-items-start'>
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
                                        width={ 500 }
                                        height={ 500 }
                                      />
                                    ))
                                  }
                                </WAStyleCluster>
                              </div>
                            </WAStyleFlank>
                          </WAStyleStack>
                        </WACarouselItem>
                      ))
                    }
                  </Fragment>
                ))
              }
              <WACarouselItem>
                <h2>We are done!</h2>
                <p>Hope you have a nice meal!</p>
              </WACarouselItem>
            </WACarousel>

            {/* <WAStyleGrid>
              <WAStyleStack>

              </WAStyleStack>
            </WAStyleGrid> */}
          </main>
        </>
      }
      { error && <div>{ error }</div> }
    </>
  )
}