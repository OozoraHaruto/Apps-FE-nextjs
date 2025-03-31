import { v4 as uuidv4 } from 'uuid';

import { AuthDataProfile } from "@/lib/auth";

export declare interface Recipe {
    id?: string;
    creator_id?: string;
    name: string;
    description?: string;
    source?: string;
    image?: string;
    video?: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    privacy: "public" | "private" | "draft" | "share_with_link";
    course: "main_course" | "appetizers" | "desert" | "drinks" | "snacks";
    crusine: string;
    ingredients_all: IngredientsAll[];
    steps_all: StepsAll[];
    created_at: string;
    modified_at: string;
    creator: AuthDataProfile;
}

export declare interface Ingredient {
    name: string;
    quantity?: number;
    unit?: string;
    uuid: string;
}

export declare interface IngredientsAll {
    name: string;
    sort?: number;
    uuid: string;
    ingredients: Ingredient[];
}

export declare interface Steps {
    description: string;
    image?: string[];
}

export declare interface StepsAll {
    name: string;
    sort?: number;
    steps: Steps[];
}

export const createEmptyIngredientsAllIngredient = () => {
    return {name:"", uuid: uuidv4()}
}

export const createEmptyIngredientsAll = () => {
    return {name: "", uuid: uuidv4(), ingredients:[createEmptyIngredientsAllIngredient()]}
}

export const ingredientAsText = (ing: Ingredient, scale: number = 1) => {
    console.log("ingredient", ing)
    if (ing.name == "") {
        return ""
    }

    const emptyQuantity = ((ing.quantity ?? 0) == 0)
    const emptyUnit = ((ing.unit ?? "") == "")
    if (!emptyQuantity && !emptyUnit) {
        return `${ing.quantity! * scale} ${ing.unit} of ${ing.name}`
    }  else if (!emptyQuantity && emptyUnit) {
        return `${ing.quantity! * scale} ${ing.name}`
    } else {
        return `${ing.name} as needed`
    }
}

export const createEmptyStepsAll = () => {
    return {name: "", steps:[{description: ""}]}
}