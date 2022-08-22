import React, {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { IImages } from "../interfaces/giphy.interface";
import { toTitleCase } from "../utils/StringUtils";
import { download } from "../utils/FileUtils";

type RenditionsProps = {
  renditions: IImages | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  username: string;
};

type RenditionType =
  | "original"
  | "hd"
  | "fixed_height"
  | "fixed_width"
  | "downsized"
  | "preview_gif";

const renditionTypes: RenditionType[] = [
  "original",
  "preview_gif",
  "fixed_height",
  "fixed_width",
  "downsized",
  "hd"
];

const videoRenditions: RenditionType[] = ["hd"];

const Renditions: FC<RenditionsProps> = ({
  renditions,
  open,
  setOpen,
  title,
  username
}) => {
  const [openTab, setOpenTab] = useState<RenditionType>("original");
  const [tabKeys, setTabKeys] = useState<RenditionType[]>([]);

  useEffect(() => {
    const keys = renditions ? Object.keys(renditions) : [];
    const renditionTabKeys = renditionTypes.filter((type) =>
      keys.includes(type)
    );

    setTabKeys(renditionTabKeys);
  }, [renditions]);

  const RenditionTabs: FC = () => {
    return (
      <ul
        className="z-40 flex flex-row flex-wrap pt-3 pb-4 mx-4 list-none cursor-pointer rendition-tab"
        role="tablist"
        id="tabs-tab"
      >
        {tabKeys.map((tabKey) => (
          <li
            key={`${tabKey}-tab`}
            className="flex-auto mr-2 text-center last:mr-0"
          >
            <div
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (tabKey === openTab
                  ? "text-gray-900 bg-white"
                  : "text-white bg-black")
              }
              onClick={(event) => {
                event.preventDefault();
                setOpenTab(tabKey);
              }}
              data-toggle="tab"
              role="tablist"
            >
              {`${
                tabKey === "preview_gif"
                  ? toTitleCase("preview", "_")
                  : toTitleCase(tabKey, "_")
              }`}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={open ? "preview-modal open" : "preview-modal"}>
      <RenditionTabs />
      <svg
        className="z-50 w-8 h-8 close-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setOpen(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>

      {videoRenditions.includes(openTab) ? (
        <video
          src={renditions?.[openTab]?.mp4}
          autoPlay
          loop
          muted
          height={renditions?.[openTab]?.height}
          width={renditions?.[openTab]?.width}
          className="z-30"
        ></video>
      ) : (
        <img
          src={renditions?.[openTab]?.url}
          height={renditions?.[openTab]?.height}
          width={renditions?.[openTab]?.width}
          alt={title}
          className="z-30"
        />
      )}

      <div className="mt-2 z-40 fixed bottom-[160px]">
        <button
          className={
            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-gray-900 bg-white"
          }
          onClick={() => {
            const fileExtension = videoRenditions.includes(openTab)
              ? "mp4"
              : "gif";

            download(
              renditions?.[openTab]?.[
                `${fileExtension === "mp4" ? "mp4" : "url"}`
              ],
              `${title}_${openTab}.${fileExtension}`
            );
          }}
        >
          Download
        </button>
      </div>

      <div className="fixed bottom-0 z-40 w-full h-32 px-8 mx-12 bg-transparent sm:h-28">
        <div className="text-2xl font-bold text-white font-sm md:font-xl">
          {title}
        </div>
        {username && (
          <p className="mt-1 text-base leading-tight text-gray-400 ">
            {username}
          </p>
        )}
      </div>
    </div>
  );
};

export default Renditions;
