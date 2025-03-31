"use client";

// import { useRouter } from 'next/navigation';
import { useState, Fragment } from 'react';

import NavBar from '@/app/components/NavBar';
import { WAButton, WACard, WAInput, WAStyleStack, WAIcon, WASelect, WAStyleFlank, WAIconButton } from '@/app/components/webawesome';
import  * as recipeLib from "../lib/recipe";

const stepTitle = [
  "",
  "Recipe Information",
  "Ingredients",
  "Steps",
]

export default function Page() {
  // const router = useRouter();

  const [ step, setStep ] = useState(1);
  // const [ loading, setLoading ] = useState(false);

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('')
  const [ source, setSource ] = useState('')
  const [ image, setImage ] = useState('')
  const [ video, setVideo ] = useState('')
  const [ servings, setServings ] = useState('0')
  const [ prepTime, setPrepTime ] = useState('0')
  const [ cookTime, setCookTime ] = useState('0')
  const [ privacy, setPrivacy ] = useState<recipeLib.Recipe["privacy"]>('public')
  const [ course, setCourse ] = useState<recipeLib.Recipe["course"]>('main_course')
  const [ crusine, setCrusine ] = useState('')
  const [ ingredientsAll, setIngredientsAll ] = useState<recipeLib.IngredientsAll[]>([recipeLib.createEmptyIngredientsAll()]);
  // const [ steps, setStepsAll ] = useState<recipeLib.StepsAll[]>([recipeLib.createEmptyStepsAll()]);

  const editIngredient = (allIndex: number, ingIndex: number, name?: string, quantity?: string, unit?: string) => {
    const ingAll = ingredientsAll[allIndex]
    const ing = ingAll.ingredients[ingIndex]
    if (name) {
      ing.name = name
    }
    if (quantity) {
      ing.quantity = Number(quantity)
    }
    if (unit) {
      ing.unit = unit
    }

    ingredientsAll[allIndex] = ingAll
    setIngredientsAll([...ingredientsAll])
  }

  const addEmptyIngredient = (allIndex: number, ingIndex: number) => {
    ingredientsAll[allIndex].ingredients.splice(ingIndex+1, 0, recipeLib.createEmptyIngredientsAllIngredient());
    setIngredientsAll([...ingredientsAll])
  }

  const deleteIngredientAtIndex = (allIndex: number, ingIndex: number) => {
    ingredientsAll[allIndex].ingredients.splice(ingIndex, 1);
    setIngredientsAll([...ingredientsAll])
  }

  const addIngredientAll = () => {
    ingredientsAll.push(recipeLib.createEmptyIngredientsAll())
    setIngredientsAll([...ingredientsAll])
  }

//   const checkPassword = () => {
//     const pass = document.getElementById("password")
//     setLoading(true);
//     login(username, password).then((response) => {
//       setLoading(false);
//       if (response === true) {
//         pass.setCustomValidity("");
//         const redirect = getSearchParams('redirect')
//         router.push(redirect || '/');
//       }
//     }).catch((error) => {
//       setLoading(false);
//       pass.setCustomValidity(error.message);
//     });
//   };

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
                Step {step}: {stepTitle[step]}
              </div>
              <form className="input-validation-type input-validation-custom" onSubmit={ (event) => {
                event.preventDefault();
                // checkPassword();
              } }>
                <WAStyleStack>
                  { step === 1 ? <WAStyleStack>
                      <WAInput id="name" label="Name" value={ name } onChange={ setName } autofocus required />
                      <WAInput id="description" label="Description" value={ description } onChange={ setDescription } required />
                      <div className='evenlySpreadRow'>
                        <div><WAInput id="servings" label="Servings" value={ servings } onChange={ setServings } type='number' required /></div>
                        <div><WAInput id="prepTime" label="Prep Time" value={ prepTime } onChange={ setPrepTime } type='number' required /></div>
                        <div><WAInput id="cookTime" label="Cook Time" value={ cookTime } onChange={ setCookTime } type='number' required /></div>
                      </div>
                      <div className='evenlySpreadRow'>
                        <div>
                          <WASelect id="privacy" label="Privacy" value={ privacy } onChange={ setPrivacy } required options={[
                            {value: "public", label: "Public", prefixIcon: {name: "lock-open"}},
                            {value: "private", label: "Private", prefixIcon: {name: "lock"}},
                            {value: "draft", label: "Draft", prefixIcon: {name: "floppy-disk"}},
                            {value: "share_with_link", label: "Share with link", prefixIcon: {name: "link"}},
                          ]} />
                        </div>
                        <div>
                          <WASelect id="course" label="Course" value={ course } onChange={ setCourse } required options={[
                            {value: "main_course", label: "Main course", prefixIcon: {name: "bowl-food"}},
                            {value: "appetizers", label: "Appetizers", prefixIcon: {name: "cubes-stacked"}},
                            {value: "desert", label: "Desert", prefixIcon: {name: "ice-cream"}},
                            {value: "drinks", label: "Drinks", prefixIcon: {name: "wine-glass"}},
                            {value: "snacks", label: "Snacks", prefixIcon: {name: "cookie"}},
                          ]}/>
                        </div>
                      </div>
                      <WAInput id="crusine" label="Crusine" value={ crusine } onChange={ setCrusine } />
                      <WAInput id="source" label="Source" value={ source } onChange={ setSource } type='url' />
                      <WAInput id="image" label="Image" value={ image } onChange={ setImage } type='url' />
                      <WAInput id="video" label="Video" value={ video } onChange={ setVideo } type='url' />
                    </WAStyleStack> : step === 2 ? <WAStyleStack>
                      {
                        ingredientsAll.map((ingAll: recipeLib.IngredientsAll, i) => (
                          <fieldset key={`ingAll-${i}`}>
                            <legend>{ingAll.name == "" ? `Group ${i+1}` : ingAll.name}</legend>
                            <WAStyleStack>
                              <WAInput id={`Group_${i}_name`} value={ ingAll.name } placeholder="Group name" onChange={ (val: string) => { ingredientsAll[i].name = val; setIngredientsAll([...ingredientsAll])}} />
                              {
                                ingAll.ingredients.map((ing: recipeLib.Ingredient, j) => (
                                  <WAStyleFlank key={`ing-${i}-${j}`} end>
                                    <div className='evenlySpreadRow'>
                                      <div><WAInput id={`ingQuantity-${i}-${j}`} placeholder="Quantity" value={ `${ing.quantity}` } onChange={ (val: string) => editIngredient(i, j, undefined, val) } type='number' /></div>
                                      <div><WAInput id={`ingUnit-${i}-${j}`} placeholder="Unit" value={ `${ing.unit ?? ""}` } onChange={ (val: string) => editIngredient(i, j, undefined, undefined, val) } /></div>
                                      <div style={{flexGrow: 6}}><WAInput id={`ingName-${i}-${j}`} placeholder="Ingredient" value={ ing.name } onChange={ (val: string) => editIngredient(i, j, val) } /></div>
                                    </div>
                                    <div>
                                      <WAIconButton name='plus' onClick={() => addEmptyIngredient(i, j)} />
                                      <WAIconButton name='trash' onClick={() => deleteIngredientAtIndex(i,j)} disabled={j==0 && ingAll.ingredients.length == 1} />
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
                    </WAStyleStack> : <WAStyleStack><></>
                    </WAStyleStack>
                  }

                  <div className='evenlySpreadRow'>
                    {
                      step != 1 ? <WAButton type="button" variant="brand" onClick={ () => setStep(step - 1) }>
                        <WAIcon name="chevron-left" slot="prefix" />
                        Previous
                      </WAButton> : <div></div>
                    }
                    <div className='centersmallbox'><div style={{textAlign: "center"}}>{step}/3</div></div>
                    <WAButton type="button" variant="brand" onClick={ () => setStep(step + 1) }>
                      <WAIcon name="chevron-right" slot="suffix" />
                      Next
                    </WAButton>
                  </div>
                </WAStyleStack>

                {/* <WAButton type="submit" variant="brand" loading={ loading }>Submit</WAButton>
                <WAButton type="reset" variant="neutral" loading={ loading }>Reset</WAButton> */}
              </form>
            </WACard>
          </div>
        </div>
      </main >
    </>
  );
}