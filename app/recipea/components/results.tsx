"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { WACard, WAStyleGrid } from '@/app/components/webawesome';
import * as cloudinaryHelper from "../lib/cloudinary";
import { getRecipes, RecipeSummary } from '../lib/recipe';


export default function Page() {
  const [ recipes, setRecipes ] = useState<readonly RecipeSummary[] | null>(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    getRecipes().then((r) => {
      console.log("recipe", r)
      setRecipes(r);
      setError(null);
    }).catch((error) => {
      setError(error);
    });
  }, []);

  return (
    <>
      { recipes && (recipes.length <= 0 ? <div>Failed to find any recipes</div> : <WAStyleGrid minColumnSize='300px'>
        {
          recipes.map((recipe, i) => (
            <Link key={ `recipe-${i}` } href={ `/recipea/${recipe.id}` }>
              <WACard>
                {
                  recipe.image && <Image
                    slot="image"
                    src={ cloudinaryHelper.getTransfromationURL(cloudinaryHelper.main_logo_trans, recipe.id ?? "", recipe.image) }
                    alt={ `Image of ${recipe.name}` }
                    sizes="100vw"
                    width={ 300 }
                    height={ 300 }
                  />
                }


                <h3>{ recipe.name }</h3>
                <small>{ recipe.modified_at }</small>
              </WACard>
            </Link>
          ))
        }
      </WAStyleGrid>)
      }
      { error && <div>{ error }</div> }
    </>
  );
}