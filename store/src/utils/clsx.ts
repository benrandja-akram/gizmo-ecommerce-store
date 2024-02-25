import { clsx as classnames, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx(...inputs: ClassValue[]) {
  return twMerge(classnames(inputs))
}
