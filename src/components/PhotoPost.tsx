import { IoEye, IoThumbsUp } from "react-icons/io5";

type PhotoPostProps = {
  imgUrl: string;
  title: string;
  author: string;
  actionButtons?: boolean;
};

export const PhotoPost: React.FC<PhotoPostProps> = ({
  author,
  imgUrl,
  title,
  actionButtons,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <img
        src={imgUrl}
        alt={title}
        className="w-full rounded-4xl drop-shadow-lg"
      />
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex w-2/3 flex-col">
          <span className="text-lg font-semibold text-black">{title}</span>
          <span className="text-sm font-bold text-black">{author}</span>
        </div>
        {actionButtons && (
          <div className="flex w-1/3 items-center justify-end gap-8">
            <IoThumbsUp className="size-4 cursor-pointer text-indigo-500" />
            <IoEye className="size-4 cursor-pointer text-indigo-500" />
          </div>
        )}
      </div>
    </div>
  );
};
