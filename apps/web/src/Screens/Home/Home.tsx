import React, { useState, useEffect } from 'react';
import { ReactComponent as Love } from '../../assets/images/heart-filled.svg';
import { useDropzone } from 'react-dropzone';

function Home() {
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/json': [],
      'application/x-javascript': [],
      'text/javascript': [],
      'text/x-javascript': [],
      'text/x-json': [],
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

  const thumbs = files.map((file: any) => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          className="imgHome"
          alt="alt"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
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
    console.log('submit');
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
        <div className="home__input">
          <label htmlFor="email">email</label>
          <input
            className="navbar__input"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            value={email}
          />
        </div>
        <section className="home__container">
          <p className="home__info">import package.json</p>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
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
