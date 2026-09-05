interface Props {
  flip?: boolean;
  color?: string;
  className?: string;
}

export default function WaveDivider({
  flip = false,
  color = '#F5F5F0',
  className = '',
}: Props) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${className}`}
      style={{ transform: flip ? 'rotate(180deg)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-[40px] w-full md:h-[60px]"
        style={{ fill: color }}
      >
        <path d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}
