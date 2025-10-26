// utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import imageManifest from "@/generated/image-manifest.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = parseISO(date).getTime();
  let timeDifference = Math.abs(currentDate - targetDate);
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let fullDate = format(parseISO(date), "MMM d, yyyy");

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

/**
 * 根据文件夹名称动态导入public目录下对应文件夹中的所有图片
 * @param folderName - public目录下的文件夹名称
 * @returns 图片路径数组
 */
const IMAGE_MANIFEST = imageManifest as Record<string, string[]>;
const folderCache: Record<string, string[]> = {};

export function importImagesFromFolder(folderName: string): string[] {
  if (!folderName) return [];

  const cleanFolderName = folderName.trim().replace(/^\/+|\/+$/g, "");
  if (!cleanFolderName) return [];

  if (folderCache[cleanFolderName]) {
    return folderCache[cleanFolderName];
  }

  const directMatch = IMAGE_MANIFEST[cleanFolderName];
  if (directMatch) {
    folderCache[cleanFolderName] = [...directMatch];
    return folderCache[cleanFolderName];
  }

  // Case-insensitive fallback to avoid issues on case-insensitive filesystems
  const normalizedKey = Object.keys(IMAGE_MANIFEST).find(
    (key) => key.toLowerCase() === cleanFolderName.toLowerCase()
  );
  const result = normalizedKey ? [...IMAGE_MANIFEST[normalizedKey]] : [];
  folderCache[cleanFolderName] = result;
  return result;
}
