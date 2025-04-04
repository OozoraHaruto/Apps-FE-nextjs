"use client"

import { v4 as uuidv4 } from 'uuid';

import { AuthDataProfile, COOKIE_NAME } from "@/lib/auth";
import { getCookie } from '@/lib/cookies';

import { apps_recipea_recipe } from '@/lib/urls';

export const UUID_REGEX_IN_DESC = /\{\{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\}\}/g


export declare interface RecipeSummary {
    id?: string;
    creator_id?: string;
    name: string;
    description?: string;
    image?: string;
    prepTime: number;
    cookTime: number;
    marinateTime: number;
    course: "main_course" | "appetizers" | "desert" | "drinks" | "snacks";
    crusine: string;
    created_at: string;
    modified_at: string;
    creator: AuthDataProfile;
}

export declare interface Recipe extends RecipeSummary {
    source?: string;
    video?: string;
    servings: number;
    privacy: "public" | "private" | "draft" | "share_with_link";
    ingredients_all: IngredientsAll[];
    steps_all: StepsAll[];
}

export declare interface Ingredient {
    name: string;
    quantity?: number;
    unit?: string;
    uuid: string;
    uiStepIngredientID?: string; // For UI only for quick search
}

function isIngredient(object: any): object is Ingredient {
    return 'quantity' in object && 'uuid' in object;
}

export declare interface IngredientsAll {
    name: string;
    sort?: number;
    uuid: string;
    ingredients: Ingredient[];
}

export declare interface StepIngredients {
    group_id: string;
    ingredient_id: string;
    percentage: number;
}

export declare interface Steps {
    description: string;
    images?: string[];
    ingredients?: { [ key: string ]: StepIngredients };
}

export declare interface StepsAll {
    name: string;
    sort?: number;
    steps: Steps[];
}

export const createEmptyIngredientsAllIngredient = () => {
    return { name: "", uuid: uuidv4(), uiStepIngredientID: uuidv4() }
}

export const createEmptyIngredientsAll = () => {
    return { name: "", uuid: uuidv4(), ingredients: [ createEmptyIngredientsAllIngredient() ] }
}

export const createEmptyStepsAll = () => {
    return { name: "", steps: [ createEmptyStepsAllStep() ] }
}

export const createEmptyStepsAllStep = () => {
    return { description: "", images: [], ingredients: {} }
}

export const ingredientAsText = (ing: Ingredient, percentage: number = 100) => {
    if (ing.name == "") {
        return ""
    }

    const emptyQuantity = ((ing.quantity ?? 0) == 0)
    const emptyUnit = ((ing.unit ?? "") == "")
    if (!emptyQuantity && !emptyUnit) {
        return `${ing.quantity! * (percentage / 100)} ${ing.unit} of ${ing.name}`
    } else if (!emptyQuantity && emptyUnit) {
        return `${ing.quantity! * (percentage / 100)} ${ing.name}`
    } else {
        return `${ing.name} as needed`
    }
}

export const find_group_ing = (group_id: string, ing_id: string, ingredientsAll: IngredientsAll[]): [ string, Ingredient | undefined ] => {
    let group = undefined as IngredientsAll | undefined
    let ingredient = undefined as Ingredient | undefined

    ingredientsAll.forEach((ia, i) => {
        if (group_id == ia.uuid) {
            group = ingredientsAll[ i ]
            return
        }
    })

    if (group) {
        group.ingredients.forEach((ing, i) => {
            if (ing.uuid == ing_id) {
                ingredient = group?.ingredients[ i ]
            }
        })

    }

    return [ group ? group.name : "", ingredient ]
}

export const createTextForStepDescription = (step: string, ingredients: { [ key: string ]: StepIngredients }, ingredientsAll: IngredientsAll[]) => {
    const all_uuids = [ ...step.matchAll(UUID_REGEX_IN_DESC) ]
    let step_replaced = step
    if (all_uuids) {
        all_uuids.forEach((matches) => {
            const uuid = matches[ 0 ]
            const uuid_only = uuid.substring(2, 38)
            const ingData = ingredients[ uuid_only ]
            const ing = find_group_ing(ingData.group_id, ingData.ingredient_id, ingredientsAll)[ 1 ]
            if (ing && isIngredient(ing)) {
                step_replaced = step_replaced.replace(uuid, ingredientAsText(ing, ingData.percentage))
            }
        })
    }

    return step_replaced
}

export const addRecipe = async (r: Recipe): Promise<string | undefined | null> => {
    const jwt = getCookie(COOKIE_NAME);
    if (!jwt) { // no jwt no need care
        return null;
    }

    const response = await fetch(apps_recipea_recipe, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify(r),
    })

    const rsp_json = await response.json();
    if (!rsp_json) {
        throw new Error(`Response status: ${response.status}`);
    }

    if (rsp_json.success === true && rsp_json.data) {
        return rsp_json.data;
    } else if (rsp_json.success === false && rsp_json.error) {
        throw new Error(`${rsp_json.error.code}: ${rsp_json.error.additionalInformation ?? rsp_json.error.description}`)
    }

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
}

export const getRecipes = async (): Promise<readonly RecipeSummary[] | null> => {
    const jwt = getCookie(COOKIE_NAME);
    const reqHeader: HeadersInit = { "Content-Type": "application/json" };
    if (jwt) {
        reqHeader[ "Authorization" ] = `Bearer ${jwt}`
    }

    const response = await fetch(apps_recipea_recipe, {
        method: "GET",
        headers: reqHeader,
    })

    const rsp_json = await response.json();
    if (!rsp_json) {
        throw new Error(`Response status: ${response.status}`);
    }

    if (rsp_json.success === true && rsp_json.data) {
        return rsp_json.data;
    } else if (rsp_json.success === false && rsp_json.error) {
        throw new Error(`${rsp_json.error.code}: ${rsp_json.error.additionalInformation ?? rsp_json.error.description}`)
    }

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    throw new Error("Failed to get any data");
}

export const getRecipe = async (recipeID: string): Promise<Recipe | null> => {
    const jwt = getCookie(COOKIE_NAME);
    const reqHeader: HeadersInit = { "Content-Type": "application/json" };
    if (jwt) {
        reqHeader[ "Authorization" ] = `Bearer ${jwt}`
    }

    const response = await fetch(`${apps_recipea_recipe}/${recipeID}`, {
        method: "GET",
        headers: reqHeader,
    })

    const rsp_json = await response.json();
    if (!rsp_json) {
        throw new Error(`Response status: ${response.status}`);
    }

    if (rsp_json.success === true && rsp_json.data) {
        return rsp_json.data;
    } else if (rsp_json.success === false && rsp_json.error) {
        throw new Error(`${rsp_json.error.code}: ${rsp_json.error.additionalInformation ?? rsp_json.error.description}`)
    }

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    throw new Error("Failed to get any data");
}



export const createTestIng = () => {
    return {
        "7b942e5c-be6b-4125-b1ca-d2be8846a35c": {
            "name": "chicken stock/broth",
            "group_id": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
            "ingredient_id": "e3dcb614-9e09-4e1b-90cc-56db61df8bd0",
            "percentage": 100
        },
        "4c77834a-90b6-485d-b6b4-96ea44a27e9b": {
            "name": "soy sause",
            "group_id": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
            "ingredient_id": "a75bcaba-9bc2-458a-874a-8d337755ca87",
            "percentage": 100
        },
        "b762b9f0-92fd-4777-a50f-0cad9c9ec642": {
            "name": "sugar",
            "group_id": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
            "ingredient_id": "23f97138-a9ab-400c-b96a-1e03a51c0c0e",
            "percentage": 100
        },
        "3673e135-d23e-44d2-8804-738b3cb871fe": {
            "name": "rice vinegar",
            "group_id": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
            "ingredient_id": "1ab78708-1ba1-4cc4-95b1-f9e2042ef93b",
            "percentage": 100
        },
        "9b65140a-7a50-4b22-b639-7ef37900455e": {
            "name": "sake",
            "group_id": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
            "ingredient_id": "b735f6a5-6cc0-43e8-bb31-f1ecb3d9daa9",
            "percentage": 100
        },
        "5142cf1c-0e16-49a0-bea0-2ff1d8da337d": {
            "name": "potato starch or cornstarch",
            "group_id": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
            "ingredient_id": "47583073-3c00-4da1-a828-f8d612f393ab",
            "percentage": 100
        },
        "af409772-ca17-4764-a7b0-cfce71186a18": {
            "name": "large eggs",
            "group_id": "9061bf2a-cc11-43c1-b1d3-998de3a29b69",
            "ingredient_id": "87c1dd9a-4beb-48b2-9356-ff9e6e1aa201",
            "percentage": 100
        },
        "cc10a8bd-e29f-49db-8671-056bd4c71970": {
            "name": "Diamond Crystal kosher salt",
            "group_id": "9061bf2a-cc11-43c1-b1d3-998de3a29b69",
            "ingredient_id": "9116010a-d6e2-43ee-a24f-37c45f9caafa",
            "percentage": 100
        },
        "b75fd9ce-42c6-454a-9ae3-fc7ea1a09924": {
            "name": "real or imitation crabmeat",
            "group_id": "9061bf2a-cc11-43c1-b1d3-998de3a29b69",
            "ingredient_id": "d9c719cb-5653-4ebc-a9b6-2f051e2278aa",
            "percentage": 100
        },
        "d6c9b001-6845-4079-9567-c7e61a6d7929": {
            "name": "natural oil",
            "group_id": "9061bf2a-cc11-43c1-b1d3-998de3a29b69",
            "ingredient_id": "6885620e-6162-43b0-baf9-a6a683deb0fd",
            "percentage": 100
        },
        "7dca8d87-a222-4b98-bb35-b7e3d15ea926": {
            "name": "toasted sesame oil",
            "group_id": "9061bf2a-cc11-43c1-b1d3-998de3a29b69",
            "ingredient_id": "254a508d-24e2-4f0b-b03a-d197cd2a3d61",
            "percentage": 100
        },
        "2275d337-7393-48fc-8a8e-8baba3cf2ebd": {
            "name": "cooked Japanese short-grain rice",
            "group_id": "06ad698e-cb22-4b58-9c3e-152993ab9853",
            "ingredient_id": "5a23e721-7110-4553-ae32-5f721a4413b2",
            "percentage": 100
        },
        "75827dcb-5b54-4984-996b-cf7fef3e3c0f": {
            "name": "frozen green peas",
            "group_id": "06ad698e-cb22-4b58-9c3e-152993ab9853",
            "ingredient_id": "566c2a1d-49a2-4290-b6b0-4515d4c7d035",
            "percentage": 100
        }
    }
}

export const createTestIngredientsAll = () => {
    return [ {
        "name": "For the Sweet and Sour Sauce",
        "uuid": "066fb1b3-8cc5-4af2-a8b9-d5a9cbba16f7",
        "ingredients": [ {
            "name": "chicken stock/broth",
            "quantity": 120,
            "unit": "ml",
            "uuid": "e3dcb614-9e09-4e1b-90cc-56db61df8bd0"
        }, {
            "name": "soy sause",
            "quantity": 1,
            "unit": "tbsp",
            "uuid": "a75bcaba-9bc2-458a-874a-8d337755ca87"
        }, {
            "name": "sugar",
            "quantity": 3,
            "unit": "tsp",
            "uuid": "23f97138-a9ab-400c-b96a-1e03a51c0c0e"
        }, {
            "name": "rice vinegar",
            "quantity": 1,
            "unit": "tsp",
            "uuid": "1ab78708-1ba1-4cc4-95b1-f9e2042ef93b"
        }, {
            "name": "sake",
            "quantity": 1,
            "unit": "tsp",
            "uuid": "b735f6a5-6cc0-43e8-bb31-f1ecb3d9daa9"
        }, {
            "name": "potato starch oor cornstarch",
            "quantity": 1.5,
            "unit": "tsp",
            "uuid": "47583073-3c00-4da1-a828-f8d612f393ab"
        } ]
    }, {
        "name": "For the Omelette",
        "uuid": "9061bf2a-cc11-43c1-b1d3-998de3a29b69",
        "ingredients": [ {
            "name": "large eggs",
            "quantity": 2,
            "unit": "",
            "uuid": "87c1dd9a-4beb-48b2-9356-ff9e6e1aa201"
        }, {
            "name": "Diamond Crystal kosher salt",
            "quantity": 0.25,
            "unit": "tsp",
            "uuid": "9116010a-d6e2-43ee-a24f-37c45f9caafa"
        }, {
            "name": "real or imitation crabmeat",
            "quantity": 2,
            "unit": "sticks",
            "uuid": "d9c719cb-5653-4ebc-a9b6-2f051e2278aa"
        }, {
            "name": "natural oil",
            "quantity": 2,
            "unit": "tbsp",
            "uuid": "6885620e-6162-43b0-baf9-a6a683deb0fd"
        }, {
            "name": "toasted sesame oil",
            "quantity": 1,
            "unit": "tsp",
            "uuid": "254a508d-24e2-4f0b-b03a-d197cd2a3d61"
        } ]
    }, {
        "name": "For Serving",
        "uuid": "06ad698e-cb22-4b58-9c3e-152993ab9853",
        "ingredients": [ {
            "name": "cooked Japanese short-grain rice",
            "quantity": 2,
            "unit": "servings",
            "uuid": "5a23e721-7110-4553-ae32-5f721a4413b2"
        }, {
            "name": "frozen green peas",
            "quantity": 1,
            "unit": "tbsp",
            "uuid": "566c2a1d-49a2-4290-b6b0-4515d4c7d035"
        } ]
    } ]
}

export const createTestStepsAll = () => {
    return [ {
        "name": "",
        "steps": [ {
            "description": "Gather all the ingredients",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-Ingredients-768x512.jpg" ],
            "ingredients": {}
        } ]
    }, {
        "name": "To make the sweet and Sour Sauce",
        "steps": [ {
            "description": "In a saucepan, combine all the ingredients for the sauce: {{7b942e5c-be6b-4125-b1ca-d2be8846a35c}}, {{4c77834a-90b6-485d-b6b4-96ea44a27e9b}}, {{b762b9f0-92fd-4777-a50f-0cad9c9ec642}}, {{3673e135-d23e-44d2-8804-738b3cb871fe}}, {{9b65140a-7a50-4b22-b639-7ef37900455e}}, and {{5142cf1c-0e16-49a0-bea0-2ff1d8da337d}}. Mix it all together.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-1-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "Place the saucepan on the stove and turn on the heat to medium. Once the sauce is boiling, lower the heat and let it simmer until thickened. The consistency should be similar to maple syrup.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-2-768x259.jpg" ],
            "ingredients": {}
        } ]
    }, {
        "name": "To make one omelette",
        "steps": [ {
            "description": "Cut {{b75fd9ce-42c6-454a-9ae3-fc7ea1a09924}}, into pieces 2.5 cm wide. You can decide if you'd like to cut the crabmeat into smaller pieces.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-3-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "In a small bowl, beat 1 large egg, Shred the pieces from 1 stick of crabmeat with your fingers and add it to the egg mixture.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-4-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "Season the egg mixture with 1/8 tsp Diamond Crystal kosher salt.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-5-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "You can prepare the other bowl of the egg mixture so you can cook the second batch immediately after the first batch. To prepare the individual serving plates, fill a regular rice bowl with 1 serving cooked Japanese short grain rice. Gently press it down so you can get a nice, clean dome shape. Invert the bowl onto an individual plate to make a mound of steamed rice. Repeat for the second plate.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-6-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "Heat a frying pan over medium heat. Once it's hot, add 1 tbsp neutral oil and evenly coat the pan.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-7-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "When the oil is hot, add the egg mixture. it will immediately float over the oil. Now, poke the egg mixture with your chopsticks or a silicone spatula to create holes. The uncooked egg mixture will fill in the holes. Tip: If the egg didn't float, either you didn't have enough oil or your oil wasn't hot enough.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-8-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "When there is no more uncooked egg mixture, stop poking (which could cause a tear or hole). When the surface of the omelette is just set, drizzle 1 tsp  roasted sesame oil around the edges",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-9-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "Transfer the omelette to the mound of steamed rice and cover it with the egg. Pour one portion of the piping hot sweet and sour sauce over the omelet. Garnish the omelette with 1 tbsp green peas.",
            "images": [ "https://www.justonecookbook.com/wp-content/uploads/2022/05/Tenshinhan-10-768x259.jpg" ],
            "ingredients": {}
        }, {
            "description": "Repeat this process for the second batch.",
            "image": [],
            "ingredients": {}
        } ]
    }, {
        "name": "To Store",
        "steps": [ {
            "description": "You can keep the leftovers in an airtight container and store them in the refrigerator for 2 days or 2 weeks in the freezer. I recommend keeping the sauce separately.",
            "image": [],
            "ingredients": {}
        } ]
    } ]
}