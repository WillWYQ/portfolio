import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, importImagesFromFolder } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  images?: readonly string[];
  imageFolder?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  onClick?: () => void;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  images,
  imageFolder,
  video,
  links,
  className,
  onClick,
}: Props) {
  // 优先使用images数组，然后是imageFolder，最后是单个image
  let imageSources: string[] = [];
  if (images && images.length > 0) {
    imageSources = [...images];
  } else if (imageFolder) {
    // 使用工具函数从文件夹导入图片
    imageSources = importImagesFromFolder(imageFolder);
  } else if (image) {
    imageSources = [image];
  }
  
  const displayImage = imageSources.length > 0 ? imageSources[0] : null;

  return (
    <Card
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "flex flex-col overflow-hidden border transition-all duration-300 ease-out h-full",
        onClick ? "hover:shadow-lg cursor-pointer" : "hover:shadow-lg",
        className
      )}
      aria-label={onClick ? `Open details for ${title}` : undefined}
    >
      {onClick ? (
        <div className="block">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-contain bg-muted"
            />
          )}
          {displayImage && (
            <Image
              src={displayImage}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full object-contain bg-muted"
            />
          )}
        </div>
      ) : (
        <Link href={href || "#"} className={cn("block cursor-pointer")}> 
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-contain bg-muted"
            />
          )}
          {displayImage && (
            <Image
              src={displayImage}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full object-contain bg-muted"
            />
          )}
        </Link>
      )}
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert line-clamp-3">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link
                href={link?.href}
                key={idx}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
