import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export interface ContactLink {
  id: "email" | "github" | "linkedin" | "instagram" | "leetcode";
  label: string;
  href: string;
  /** Short human-readable form of the link. */
  handle: string;
  icon: IconType;
}

export const contactLinks: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:meteunal46@hotmail.com",
    handle: "meteunal46@hotmail.com",
    icon: FaEnvelope,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/catlaqtr",
    handle: "github.com/catlaqtr",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mete-unal-b144b733b/",
    handle: "linkedin.com/meteunal",
    icon: FaLinkedin,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/meteunal4646",
    handle: "@meteunal4646",
    icon: FaInstagram,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/catlaqtr/",
    handle: "leetcode.com/u/catlaqtr",
    icon: SiLeetcode,
  },
];

export const resume = {
  label: "Resume",
  href: "/Mete_Unal_Coop_Resume_Updated.pdf",
};

/** mailto: links open in place; everything else opens in a new tab. */
export function isExternal(link: ContactLink): boolean {
  return !link.href.startsWith("mailto:");
}
