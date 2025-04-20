import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import _ from "lodash";
import {
  IoFolderOutline,
  IoReorderTwo,
  IoShareSocialOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Album } from "../../types";

interface SortableAlbumProps {
  album: Album;
}

export default function SortableAlbum({ album }: SortableAlbumProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: album.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const navigate = useNavigate();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-2 flex items-center rounded-lg bg-[#93DDD4] p-5"
    >
      <div className="mr-3 cursor-grab" {...attributes} {...listeners}>
        <IoReorderTwo className="size-10 rotate-90 text-black" />
      </div>
      <div className="flex w-1/4 flex-col items-center px-4">
        <img
          src={album.mainImage}
          alt="picture"
          className="mb-2 w-full rounded-md shadow-sm"
        />
        <span className="font-semibold text-black">{album.style}</span>
        <span className="font-semibold text-black">{album.author}</span>
      </div>
      <div className="flex flex-1 items-center gap-4 px-4">
        {_.map(album.images, (img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`picture-${idx}`}
            className="w-1/4 rounded-md shadow-sm"
          />
        ))}
      </div>
      <div className="ml-4 flex flex-col gap-4">
        <IoFolderOutline
          onClick={() => navigate(`/album/${album.id}`)}
          className="size-8 cursor-pointer text-black hover:text-gray-700"
        />
        <IoShareSocialOutline className="size-8 cursor-pointer text-black hover:text-gray-700" />
      </div>
    </div>
  );
}
