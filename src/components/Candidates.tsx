import React, { useState, useRef } from 'react';
import { FiList, FiUpload, FiPause, FiPlay, FiX, FiFile } from 'react-icons/fi';

const Candidates: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      setIsPaused(false);
      setUploadProgress(0); // Reset progress
      simulateFileUpload();
    }
  };

  const simulateFileUpload = () => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setUploadProgress((prev) => {
          if (!isPaused) {
            const nextProgress = prev + 5;
            if (nextProgress >= 100) {
              clearInterval(intervalRef.current!);
              setUploadProgress(100);
              setIsUploading(false);
              intervalRef.current = null;
            }
            return nextProgress;
          }
          return prev;
        });
      }, 500);
    }
  };

  const pauseUpload = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeUpload = () => {
    setIsPaused(false);
    if (!isUploading && uploadProgress < 100) {
      setIsUploading(true);
      simulateFileUpload();
    }
  };

  const cancelUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop();
    if (extension === 'zip') {
      return <FiFile className="w-5 h-5 text-blue-500" />;
    }
    return <FiFile className="w-5 h-5 text-gray-400" />; // Default icon for unknown file types
  };

  const handlePost = () => {
    // Handle post action here (e.g., submit the file)
    console.log("File posted:", file);
  };

  return (
    <div className="p-6 flex justify-start items-start">
      <div className="w-1/3">
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold mb-2">CANDIDATES</h1>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer">
              <FiList className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">List</span>
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowUpload(!showUpload)}
            >
              <FiUpload className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Upload</span>
            </div>
          </div>
        </div>

        {showUpload && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Resume Or CV Upload</h2>
            <p className="text-sm text-gray-500">
              Add your documents here, and you can upload up to 5 files max
            </p>
            <div className="border-2 border-dashed border-blue-400 rounded-md p-4 mt-4">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2 text-blue-500">
                  <FiUpload size={30} />
                </div>
                <p>Drag your file(s) to start uploading</p>
                <span className="my-2">OR</span>
                <input
                  type="file"
                  accept=".zip"
                  id="fileUpload"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <label htmlFor="fileUpload" className="btn btn-blue cursor-pointer">
                  <span className="text-blue-600 border px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition">
                    Browse files
                  </span>
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Only support .jpg, .png, .svg and .zip files
            </p>

            {file && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file?.name || "")} {/* Use the function with a fallback */}
                    <span>{file?.name || "No file selected"}</span>
                  </div>
                  <span>{((file.size || 0) / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded mt-2">
                  <div
                    className="absolute h-full bg-blue-500 rounded"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">{uploadProgress}%</span>
                  <div className="flex space-x-2">
                    {isUploading && !isPaused ? (
                      <button
                        className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={pauseUpload}
                      >
                        <FiPause className="text-gray-700" />
                      </button>
                    ) : (
                      <button
                        className="p-1 rounded bg-green-500 hover:bg-green-600"
                        onClick={resumeUpload}
                      >
                        <FiPlay className="text-white" />
                      </button>
                    )}
                    <button
                      className="p-1 rounded bg-red-500 hover:bg-red-600"
                      onClick={cancelUpload}
                    >
                      <FiX className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="mt-4 border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getFileIcon(file?.name || "")} {/* Use the function with a fallback */}
                  <div>
                    <p className="font-semibold text-gray-800">{file?.name || "No file selected"}</p>
                    <p className="text-sm text-gray-500">
                      {((file?.size || 0) / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  className="p-1 rounded bg-red-500 hover:bg-red-600"
                  onClick={cancelUpload}
                >
                  <FiX className="text-white" />
                </button>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="mt-2">
                <button
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                  onClick={handlePost}
                >
                  Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
