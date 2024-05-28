import { DetailProps } from "../helper/models";

export default function RenderDetail(detail: Readonly<DetailProps>) {
  return (
    <>
      {detail.data ? (
        <div className=" p-3 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
          <div className="flex items-center">
            <span className="relative p-2 bg-purple-200 rounded-xl">
              <img
                className="w-4 aspect-auto"
                src={detail.imagePath}
                alt="Fast lap"
              />
            </span>
            <p className="ml-2 text-black dark:text-gray-100 text-xl ">
              {detail.title}
            </p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="my-3 text-3xl font-bold text-left text-gray-700 dark:text-gray-100">
              {detail.data}
              <span className="text-sm"> {detail.unit}</span>
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
