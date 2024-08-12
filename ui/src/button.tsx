import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from '@headlessui/react'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { clsx } from './clsx'

const buttonVariants = cva(
  [
    // Base
    'relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border font-semibold transition-opacity',
    // Sizing
    'px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-sm/6',
    // Focus
    'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    // Disabled
    'data-[disabled]:opacity-50',
    // Icon
    '[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText]',
  ],

  {
    variants: {
      variant: {
        solid: [
          // Optical border, implemented as the button background to avoid corner artifacts
          'border-transparent bg-[--btn-border]',
          // Button background, implemented as foreground layer to stack on top of pseudo-border layer
          'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg]',
          // Drop shadow, applied to the inset `before` layer so it blends with the border
          'before:shadow',
          // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
          'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)]',
          // Inner highlight shadow
          'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]',
          // White overlay on hover
          'after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]',
          // Disabled
          'before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none',
        ].join('\n'),
        outline: [
          // Base
          'border-zinc-950/10 text-zinc-950 data-[active]:bg-zinc-950/[2.5%] data-[hover]:bg-zinc-950/[2.5%]',
          // Icon
          '[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)]',
        ].join('\n'),
        plain: [
          // Base
          'border-transparent text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5',
          // Icon
          '[--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)]',
        ].join('\n'),
      },
      color: {
        'dark/zinc': [
          'text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]',
          '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)]',
        ],
        'dark/white': [
          'text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)]',
          'dark:text-zinc-950 dark:[--btn-bg:white] dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]',
          '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)] data-[hover]:[--btn-icon:theme(colors.zinc.300)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)]',
        ],
        white: [
          'text-zinc-950 [--btn-bg:white] [--btn-border:theme(colors.zinc.950/10%)] [--btn-hover-overlay:theme(colors.zinc.950/2.5%)] data-[active]:[--btn-border:theme(colors.zinc.950/15%)] data-[hover]:[--btn-border:theme(colors.zinc.950/15%)]',
          'dark:[--btn-hover-overlay:theme(colors.zinc.950/5%)]',
          '[--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.500)] data-[hover]:[--btn-icon:theme(colors.zinc.500)]',
        ],
        indigo: [
          'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.indigo.500)] [--btn-border:theme(colors.indigo.600/90%)]',
          '[--btn-icon:theme(colors.indigo.300)] data-[active]:[--btn-icon:theme(colors.indigo.200)] data-[hover]:[--btn-icon:theme(colors.indigo.200)]',
        ],
        red: [
          'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.red.600)] [--btn-border:theme(colors.red.700/90%)]',
          '[--btn-icon:theme(colors.red.300)] data-[active]:[--btn-icon:theme(colors.red.200)] data-[hover]:[--btn-icon:theme(colors.red.200)]',
        ],
        green: [
          'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.green.600)] [--btn-border:theme(colors.green.700/90%)]',
          '[--btn-icon:theme(colors.white/60%)] data-[active]:[--btn-icon:theme(colors.white/80%)] data-[hover]:[--btn-icon:theme(colors.white/80%)]',
        ],
        blue: [
          'text-white [--btn-hover-overlay:theme(colors.white/10%)] [--btn-bg:theme(colors.blue.600)] [--btn-border:theme(colors.blue.700/90%)]',
          '[--btn-icon:theme(colors.blue.400)] data-[active]:[--btn-icon:theme(colors.blue.300)] data-[hover]:[--btn-icon:theme(colors.blue.300)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'solid',
      color: 'dark/zinc',
    },
  },
)

export type ButtonProps = HeadlessButtonProps &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', color, ...props }, ref) => {
    return (
      <HeadlessButton
        className={clsx(
          buttonVariants({
            variant,
            color: variant === 'solid' ? color : 'white',
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
