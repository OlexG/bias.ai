import { useRef, useState } from "preact/hooks";

export default function Upload() {
  const dragArea = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const submitInput = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  function handleDragEnter(event: any) {
    event.preventDefault();
    setIsDragActive(true);
  }

  function handleDragLeave(event: any) {
    event.preventDefault();
    setIsDragActive(false);
  }

  function handleDrop(event: any) {
    event.preventDefault();
    setIsDragActive(false);
    if (fileInput.current === null) {
      return;
    }
    fileInput.current.files = event.dataTransfer.files;
  }

  return (
    <>
      <img
        className="-z-10 fixed inset-0 w-full h-full object-cover"
        src="bg1.png"
        alt="bg1"
      />
      <div
        className="flexible flex flex-col items-center justify-center min-h-screen py-2"
      >
        <div
          className={`mb-10 rounded-2xl flex relative text-center bg-white bg-opacity-80 shadow-2xl p-8 inline-block border border-cyan-500 ${
            isDragActive ? "border-blue-600" : ""
          }`}
        >
          <span className="text-sm">
            Note the responses are demo responses due to usage and price limits. Please refer to our Devpost youtube video.
          </span>
          <h1 className="text-6xl font-bold text-red-400 pb-8">
            <span className="text-blue-600">upload</span> your training data
          </h1>
          <p className="text-2xl text-red-800 mb-8">
            the default file type is .csv
          </p>
          <div 
            className="flex flex-col items-center justify-center border border-blue-600 p-8 rounded-2xl"
            ref={dragArea}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}
            onDrop={handleDrop}
          >
            <h1 className="text-xl text-blue-600 mb-8">
              {isDragActive ? "Drop your file here" : "Drag and drop your file here"}
            </h1>
            <p className="text-xl text-blue-600 mb-8">or</p>
            <div className="flex flex-row items-center justify-center">
              <form
                action="/api/upload"
                method="post"
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="mr-4 px-10 py-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-900 g-white bg-opacity-80 shadow-2xl hover:border-blue-900 z-10 transition duration-300 ease-in-out"
                  ref={fileInput}
                />
                <input
                  type="submit"
                  value="Upload"
                  className="px-10 py-4 bg-red-400 text-white rounded-full shadow-2xl hover:bg-blue-900 g-white bg-opacity-80 shadow-2xl hover:border-blue-900 z-10 transition duration-300 ease-in-out"
                  ref={submitInput}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
