import { SvgProps } from '../../types';

export default function DragHandle({ width, height, fill, className }: SvgProps) {
  const scaledWidth = width ?? (height ? (height * 448) / 512 : 448);
  const scaledHeight = height ?? (width ? (width * 512) / 448 : 512);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={scaledWidth}
      height={scaledHeight}
      className={className}
    >
      <path
        fill={fill}
        d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"
      />
    </svg>
  );
}
