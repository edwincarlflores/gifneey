import React, { FC, useState } from "react";
import Renditions from "./Renditions";
import Thumbnail from "./Thumbnail";
import type { IGifData, IImages } from "../interfaces/giphy.interface";

type GalleryProps = {
  images: IGifData[];
};

const Gallery: FC<GalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [renditions, setRenditions] = useState<IImages>();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="box-border mx-auto md:masonry-md lg:masonry-lg 2xl:masonry-2xl before:box-inherit after:box-inherit">
      {images.map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          onClick={() => {
            setRenditions(image.images);
            setTitle(image.title);
            setUsername(image.user?.display_name || image.username);
            setOpen(true);
          }}
        >
          <Thumbnail image={image} index={index} />
        </div>
      ))}
      {open && (
        <Renditions
          renditions={renditions}
          open={open}
          setOpen={setOpen}
          title={title}
          username={username}
        />
      )}
    </div>
  );
};

export default Gallery;
