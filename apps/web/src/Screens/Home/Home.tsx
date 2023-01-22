import React, { useState, useEffect } from "react";
import { ReactComponent as Love } from "../../assets/images/heart-filled.svg";
import { useDropzone } from "react-dropzone";
import { useUploadPackageMutation } from "../../store/packageReducer";

function Home() {
  const [files, setFiles] = useState([]);

  const [upload] = useUploadPackageMutation();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/json": [],
      "application/x-javascript": [],
      "text/javascript": [],
      "text/x-javascript": [],
      "text/x-json": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any, index: number) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        {`${index + 1}. `}
        {file.name}
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    upload(files[0]);
  };

  return (
    <section className="home">
      <div className="home__header">
        <h1>
          Do you <Love /> your package
        </h1>
        <p className="home__text">
          Share your love or hatred by adding superlikes, yellow and red cards.
        </p>
      </div>
      <form className="home__actions" onSubmit={handleSubmit}>
        <h3>Send us your package</h3>
        <section className="home__container">
          <p className="home__info">import package.json</p>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p className="home__drag">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
          <aside className="thumbsContainer">{thumbs}</aside>
        </section>
        <button type="submit" className="home__btn">
          Send your package
        </button>
      </form>
    </section>
  );
}

export default Home;
