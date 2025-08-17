'use client';
import IconLoader from '@/components/ui/icon-loader';
import { cn } from '@/utils/utils';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { useMemo } from 'react';
import inputClass from './input.module.scss';

const baseClassName = 'base-input';

const getClassName = (elementClassName: string) => {
  return inputClass[`${baseClassName}${elementClassName}`];
};

const getTextFieldVariants = cva(inputClass[baseClassName], {
  variants: {
    disabled: {
      true: getClassName('--disabled'),
      false: '',
    },
    isError: {
      true: getClassName('--error'),
      false: '',
    },
  },
});

const getLabelVariants = cva(getClassName('__label'));

const getInputVariants = cva(getClassName('__input'), {
  variants: {
    disabled: {
      true: getClassName('__input--disabled'),
      false: '',
    },
    hasAppendIcon: {
      true: '',
      false: getClassName('__input--has-icon'),
    },
  },
  defaultVariants: {
    disabled: false,
    hasAppendIcon: false,
  },
});

const getIconVariants = cva(getClassName('__icon'), {
  variants: {
    disabled: {
      true: getClassName('__icon--disabled'),
      false: '',
    },
    isClickable: {
      true: getClassName('__icon--is-clickable'),
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const getCaptionContentClassName = cva(getClassName('__caption'), {
  variants: {
    isError: {
      true: getClassName('__caption--is-error'),
      false: '',
    },
  },
  defaultVariants: {
    isError: false,
  },
});

type BaseProps = {
  label?: string;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated';
  name: string;
  isDisabled?: boolean;
  hint?: string;
  error?: any;
  appendIcon?: string;
  prependIcon?: string;
  isAppendIconClickable?: boolean;
  isPrependIconClickable?: boolean;
  onAppendIconClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onPrependIconClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  className?: string;
  classNameContainer?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, BaseProps>(
  (
    {
      label,
      variant = 'outlined',
      name,
      isDisabled = false,
      hint,
      error,
      appendIcon,
      prependIcon,
      isAppendIconClickable = false,
      isPrependIconClickable = false,
      onAppendIconClick,
      onPrependIconClick,
      className,
      classNameContainer,
      ...props
    },
    ref,
  ) => {
    const captionContent = useMemo(() => {
      return error?.message ?? hint;
    }, [error, hint]);

    return (
      <div
        className={cn(
          getTextFieldVariants({
            disabled: isDisabled,
            isError: !!error?.message,
          }),
          classNameContainer,
        )}
      >
        <label htmlFor={name} className={cn(getLabelVariants())}>
          {label}
        </label>

        {appendIcon && (
          <IconLoader
            onClick={onAppendIconClick}
            className={cn(
              getIconVariants({
                disabled: isDisabled,
                isClickable: isAppendIconClickable,
              }),
            )}
            name={appendIcon}
          />
        )}

        <input
          ref={ref as React.Ref<HTMLInputElement>}
          name={name}
          disabled={isDisabled}
          id={name}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={cn(
            getInputVariants({
              disabled: isDisabled,
              hasAppendIcon: !!appendIcon,
            }),
            className,
          )}
        />

        {captionContent && (
          <span
            className={cn(
              getCaptionContentClassName({
                isError: !!error?.message,
              }),
            )}
          >
            {captionContent}
          </span>
        )}

        {prependIcon && (
          <IconLoader
            onClick={onPrependIconClick}
            className={cn(
              getIconVariants({
                disabled: isDisabled,
                isClickable: isPrependIconClickable,
              }),
            )}
            name={prependIcon}
          />
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
