'use client';

import type { FC } from 'react';
import * as React from 'react';

interface BaseIconLoaderProps {
  name: string;
  size?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const IconLoader: FC<BaseIconLoaderProps> = ({ onClick, className, name, size = '24px', ...props }) => {
  return (
    <svg onClick={onClick} className={className} {...props} width={size} height={size}>
      <use width="100%" height="100%" href={`/svgs/${name}.svg#${name}`} />
    </svg>
  );
};

export default IconLoader;
