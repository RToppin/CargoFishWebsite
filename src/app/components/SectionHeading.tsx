type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverse = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto mb-12 max-w-3xl text-center" : "mb-10 max-w-3xl"}>
      {eyebrow ? (
        <p className={`mb-3 text-sm font-black uppercase tracking-wide ${inverse ? "text-red-300" : "text-[#C93A3A]"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`break-words text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl ${
          inverse ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      <div className={`mt-5 h-1 w-24 bg-[#C93A3A] ${isCenter ? "mx-auto" : ""}`} />
      {description ? (
        <p className={`mt-6 text-lg leading-8 ${inverse ? "text-zinc-300" : "text-zinc-700"}`}>{description}</p>
      ) : null}
    </div>
  );
}
