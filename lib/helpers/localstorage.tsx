"use client"

export const setStr = (key: string, val: string) => {
  localStorage.setItem(key, val)
}

export const setNonStr = (key: string, val: any) => {
  localStorage.setItem(key, JSON.stringify(val))
}

export const getStr = (key: string, fallback: string = "") => {
  const data = localStorage.getItem(key)
  if (!data) {
    return fallback
  }

  return data
}

export const getBool = (key: string, fallback: boolean = true) => {
  const data = localStorage.getItem(key)
  if (!data) {
    return fallback
  }

  const jsonData = JSON.parse(data)
  return jsonData === true
}