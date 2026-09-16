import { profileSchema, TODO, type Profile } from "./schema";

export const profile: Profile = profileSchema.parse({
  name: "Samuel Ortega",
  headline: { es: TODO, en: TODO },
  bio: { es: TODO, en: TODO },
  location: { es: "Madrid, España", en: "Madrid, Spain" },
  email: TODO,
  linkedin: TODO,
  github: "https://github.com/Samtho",
  cvPath: "/cv-samuel-ortega.pdf",
});
