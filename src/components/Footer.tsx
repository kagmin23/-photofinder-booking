import _ from "lodash";
import { Link } from "react-router-dom";

const footerContents = [
  {
    title: "Contact us",
    links: [
      // { name: 'Company', href: '#' },
      // { name: 'Customers', href: '#' },
      // { name: 'Blog', href: '#' },
    ],
  },
  {
    title: "About us",
    links: [{ name: "What is Be Graphy", href: "#" }],
  },
  {
    title: "Style",
    links: [
      { name: "Studio", href: "#" },
      { name: "Outside", href: "#" },
      { name: "Landscape", href: "#" },
      { name: "Portrait", href: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative shrink-0 overflow-hidden bg-gradient-to-r from-[#0b9daa] to-[#66cc69]">
      <div className="flex pt-2 pb-16">
        {_.map(footerContents, (content, index) => (
          <div key={index} className="ml-6 p-3">
            <h3 className="text-center font-bold text-black uppercase">
              {content.title}
            </h3>
            <ul className="space-y-0.5 text-white">
              {_.map(content.links, (link, index) => (
                <li key={index}>
                  <Link target="_blank" to={link.href} className="text-black">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <img
        src="/images/home/camera-animated.png"
        alt="camera"
        className="absolute top-0 right-0 mt-4 max-w-1/8"
      />
    </footer>
  );
};
