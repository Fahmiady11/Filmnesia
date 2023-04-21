import { IconBookmark } from "@tabler/icons";

export default function QuickCard({
  imageUrl,
  title,
  genre,
  review_count,
  price,
  children,
}) {
  return (
    <div className="m-4 p-4 shadow-custom rounded-3xl whitespace-nowrap cursor-pointer bg-slate-200/70">
      <div
        className="relative aspect-[1/1.1] sm:aspect-[1.3/1] bg-center bg-cover rounded-3xl"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      >
        <div className="absolute top-2 right-2 p-2 rounded-full bg-yellow-400">
          <IconBookmark height={24} width={24} className="text-white" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="truncate font-heading3_mobile text-heading3 sm:font-heading3 sm:text-heading3 text-custom-black">
          {title}
        </p>
        <p className="font-caption_mobile text-caption_mobile sm:font-caption1 sm:text-xs text-red-700">
          {review_count !== null ? review_count : 0} Rating
        </p>
      </div>
      <div className="pt-1 font-caption_mobile text-caption_mobile sm:font-caption1 sm:text-caption1 text-[#615A56] flex gap-1">
        {genre &&
          genre?.map((v, i) => {
            return <p key={i}>{v}</p>;
          })}
      </div>
      {price && (
        <p className="pt-1 font-body1_mobile text-body1_mobile text-custom-primary_red">
          Rp {price}
          <span className="font-caption_mobile text-caption_mobile sm:font-caption2 sm:text-caption2 text-[#615A56]">
            /malam
          </span>
        </p>
      )}
      {children}
    </div>
  );
}
