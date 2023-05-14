import { useState, useEffect, useRef } from "preact/hooks";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState<any>(null);
  const dragArea = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const submitInput = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [response]);

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

  function sendAnalyzeRequest() {
    if (file === null) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/analyze", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setResponse(data))
      .catch((error) => console.log(error));
  }

  function handleFileUpload(event: any) {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  }

  return (
      <>
        <img
          className="-z-10 fixed inset-0 w-full h-full object-cover"
          src="bg2.png"
          alt="bg2"
        />
        <div className="flexible flex flex-col items-center justify-center min-h-screen py-2">
          <div className="mb-10 rounded-2xl flex relative text-center bg-white bg-opacity-80 shadow-2xl p-8 inline-block border border-cyan-500">
            <span className="text-sm">
              Note the responses are demo responses due to usage and price limits. Please refer to our Devpost youtube video.
            </span>
            <h1 className="text-6xl font-bold text-red-400 pb-8">
              <span className="text-blue-600">analyze</span> your model
            </h1>
            <p className="text-2xl text-red-800 mb-8">
              upload your model's responses to analyze
              your model's bias
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
                <a href = "/prompts.csv" download = "prompts.csv" className="mr-4 px-10 py-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-900 g-white bg-opacity-80 shadow-2xl hover:border-blue-900 z-10">
                  download Prompts.csv
                </a>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="mr-4 px-10 py-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-900 g-white bg-opacity-80 shadow-2xl hover:border-blue-900 z-10"
                  onChange={handleFileUpload}
                  ref={fileInput}
                />
                <input
                  type="submit"
                  value="Upload"
                  className="px-10 py-4 bg-red-400 text-white rounded-full shadow-2xl hover:bg-blue-900 g-white bg-opacity-80 shadow-2xl hover:border-blue-900 z-10"
                  onClick={sendAnalyzeRequest}
                  ref={submitInput}
                />
              </div>
            </div>
          </div>
        </div>
      <div id="analysis">
        {
          response && (
            <div className="flexible flex flex-col items-center justify-center min-h-screen py-2">
            <div ref={elementRef}>
            <div className="mb-10 rounded-2xl flex relative text-center bg-white bg-opacity-80 shadow-2xl p-12 inline-block border border-cyan-500">
            <h1 className="text-6xl font-bold text-red-400 pb-8">
              Your model's score: <span className="text-blue-600">{response.biasScore[0]}{response.biasScore[1] != 0 ? response.biasScore[1] : ""}</span>
            </h1>
            <p className="text-2xl text-red-800">
              {response.biasScore[1] != 0 ? response.biasScore.substring(2) : response.biasScore.substring(1)}
            </p>
          </div>
            </div>
            </div>
          )
        }
      </div>
    </>
  );
}
