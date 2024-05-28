import { DetailProps } from "../helper/models";

export default function RenderDetail(detail: Readonly<DetailProps>) {
  return (
    <>
      {detail.data ? (
        <div className=" p-3 bg-gray-30 shadow-lg rounded-2xl dark:bg-gray-900">
          <div className="flex items-center justify-center">
            <span className="relative p-2 bg-green-50 dark:bg-green-300 rounded-xl">
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
          <div className="flex justify-center">
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
