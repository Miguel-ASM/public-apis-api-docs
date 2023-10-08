import { sequence, defineMiddleware } from "astro/middleware";
import { i18nMiddleware, getLocale } from "astro-i18n-aut";
import i18next from "i18next";

const setLangI18next = defineMiddleware(async (context, next) => {
  const pathName = new URL(context.url).pathname;
  const [pathNameWithoutExtension] = pathName.split(".");
  const locale = getLocale(pathNameWithoutExtension);
  await i18next.changeLanguage(locale);
  return await next();
});

export const onRequest = sequence(i18nMiddleware, setLangI18next);
