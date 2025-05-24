import fs from "node:fs";
import path from "path";
import {siteFilePath} from "./constants.ts";

export function createSlug(input: string | undefined) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  if (!input) {
    return "";
  }

  return input
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getDateTimeString(date: string | Date) {
  const file = fs.readFileSync(path.resolve(siteFilePath), 'utf-8');
  const { language } = JSON.parse(file);
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) throw new Error("Invalid date format");

  const isSupported = Intl.DateTimeFormat.supportedLocalesOf(language).length > 0;
  const locale = isSupported ? language : "en";

  const result = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsedDate);

  //console.log({ language, locale, result });
  return result;
}