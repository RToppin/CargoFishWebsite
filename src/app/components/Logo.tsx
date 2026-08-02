import logoSrc from "../../assets/cargofish-logo.png";
import { siteContent } from "../../content/siteContent";

export function Logo() {
  return (
    <div className="flex min-w-0 items-center">
      <img
        src={logoSrc}
        alt={`${siteContent.brandName} logo`}
        className="h-12 w-auto max-w-[180px] object-contain sm:h-14"
      />
    </div>
  );
}
