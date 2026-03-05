import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { first_male } from "./names"
import parse from 'html-react-parser';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//  for random name generation for tests
export const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * first_male.length)
  const username = first_male[randomIndex]
  return username
}


export const ParsedElement = (str?: string) => {
  const newstr = str;
  let parsedHtml = null;
  if (newstr) {
    parsedHtml = parse(newstr);
  }
  return parsedHtml;
};