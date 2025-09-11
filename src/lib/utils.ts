import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

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
export function importImagesFromFolder(folderName: string): string[] {
  // 移除开头和结尾的斜杠（如果有的话）
  const cleanFolderName = folderName.replace(/^\/|\/$/g, '');
  
  // 预定义的文件夹与图片映射关系
  // 在实际项目中，这应该根据你的实际文件夹结构进行调整
  const folderImageMap: Record<string, string[]> = {
    'MorpheOS': [
      '/MorpheOS/MorpheOS.png',
      '/MorpheOS/MorpheOSQemu.png'
    ],
    'OAOfirmware': [
      '/OAOfirmware/OAOfirmware.png'
    ]
  };
  
  // 如果在映射中找到对应文件夹，返回预定义的图片路径数组
  if (folderImageMap[cleanFolderName]) {
    return folderImageMap[cleanFolderName];
  }
  
  // 默认返回空数组
  return [];
}