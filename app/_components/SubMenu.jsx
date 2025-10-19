import { useNav } from "../_context/NavProvider";
import PartnersSubMenuItems from "./PartnersSubMenuItems";
import PortfolioSubMenuItems from "./PortfolioSubMenuItems";

export default function SubMenu() {
  const { mainNavActiveItem, categories, partners } = useNav();

  return (
    <ul className="flex flex-col items-start justify-start gap-4 pl-4 text-base text-white sm:pt-20 sm:text-3xl">
      {mainNavActiveItem === "portfolio" &&
        categories?.map((item) => (
          <PortfolioSubMenuItems key={item.id} item={item} />
        ))}

      {mainNavActiveItem === "partners" &&
        partners?.map((item) => (
          <PartnersSubMenuItems key={item.id} item={item} />
        ))}
    </ul>
  );
}
