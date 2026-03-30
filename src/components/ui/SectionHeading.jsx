export default function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-sky-300/70">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight theme-text-primary md:text-4xl">
        {title}
      </h2>
      {text && (
        <p className="mt-4 text-base leading-7 theme-text-secondary md:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}