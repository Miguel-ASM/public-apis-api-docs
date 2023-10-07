import { sequence } from "astro/middleware";
import { i18nMiddleware, getLocale } from "astro-i18n-aut";
import i18next from "i18next";

async function setLangI18next(context, next) {
  const locale = getLocale(new URL(context.request.url));
  await i18next.changeLanguage(locale);
  return await next();
}

export const onRequest = sequence(i18nMiddleware, setLangI18next);
