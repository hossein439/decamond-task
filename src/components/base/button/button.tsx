'use clint';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';
import IconLoader from '@/components/base/icon-loader';
import buttonClass from './button.module.scss';

const baseClassName = 'base-button';
const getClassName = (elementClassName: string) => {
  return buttonClass[`${baseClassName}${elementClassName}`];
};

const buttonVariants = cva(buttonClass[baseClassName], {
  variants: {
    fullWidth: {
      true: getClassName('--full-width'),
      false: '',
    },
    variant: {
      filled: getClassName('__filled'),
      outlined: getClassName('__outlined'),
      text: getClassName('__text'),
      elevated: getClassName('__elevated'),
    },
    disabled: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      disabled: true,
      class: getClassName('__filled--disabled'),
    },
    {
      variant: 'outlined',
      disabled: true,
      class: getClassName('__outlined--disabled'),
    },
    {
      variant: 'text',
      disabled: true,
      class: getClassName('__text--disabled'),
    },
    {
      variant: 'elevated',
      disabled: true,
      class: getClassName('__elevated--disabled'),
    },
  ],
  defaultVariants: {
    variant: 'filled',
    disabled: false,
  },
});

function Button({
  isLoading = false,
  appendIcon,
  prependIcon,
  isDisabled = false,
  fullWidth = false,
  variant,
  color,
  size,
  iconSize,
  asChild = false,
  className,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    prependIcon?: string;
    appendIcon?: string;
    circularIcon?: string;
    fullWidth?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'warning';
    size?: 'large' | 'xLarge' | '2xLarge' | '3xLarge';
    variant?: 'filled' | 'outlined' | 'text' | 'elevated';
    iconSize?: string;
    ['data-class-prepend-icon']?: string;
    ['data-class-append-icon']?: string;
  }) {
  return (
    <button
      data-slot="button"
      disabled={isDisabled || isLoading}
      className={cn(
        buttonVariants({
          variant,
          disabled: isDisabled,
          fullWidth: fullWidth,
        }),
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className={getClassName('__loading')}></span>
      ) : (
        <>
          {prependIcon && <IconLoader name={prependIcon} size={iconSize} />}
          {props.children}
          {appendIcon && <IconLoader name={appendIcon} size={iconSize} />}
        </>
      )}
    </button>
  );
}

export default Button;
