export default function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}