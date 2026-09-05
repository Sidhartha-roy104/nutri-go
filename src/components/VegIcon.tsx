interface Props {
  veg: 'veg' | 'non-veg';
  size?: number;
}

export default function VegIcon({ veg, size = 14 }: Props) {
  const color = veg === 'veg' ? '#2CD377' : '#E53935';
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[3px] border-2"
      style={{ width: size, height: size, borderColor: color }}
      aria-label={veg === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span
        className="rounded-full"
        style={{
          width: size * 0.45,
          height: size * 0.45,
          backgroundColor: color,
        }}
      />
    </span>
  );
}
