import * as React from "react";
import * as Uppy from "@uppy/core";
import * as Tus from "@uppy/tus";
import * as URL from "@uppy/url";
import { DashboardModal, useUppy } from "@uppy/react";

// styles
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/url/dist/style.css";

const ImageUploaderPlugin = ({
  showImageUploadPlugin,
  setShowImageUploadPlugin,
}) => {
  // Creating Uppy instance
  const UppyConfig = useUppy(() => {
    return Uppy({
      id: "ImageUploaderPlugin",
      autoProceed: true, // immediately starts uploading after selecting the file.
      allowMultipleUploads: false,
      restrictions: {
        maxFileSize: 5242880, // 5 MB
        maxTotalFileSize: 5242880, // 5MB
        allowedFileTypes: [".jpg", ".png", ".webp", ".jpeg", ".gif"],
      },
      // store: new DefaultStore(),
      infoTimeout: 5000,
    })
      .use(Tus, { endpoint: "https://tusd.tusdemo.net/files" })
      .use(URL, { id: "urlInput", companionUrl: "https://companion.uppy.io/" });
  });

  const closeImageUploader = () => setShowImageUploadPlugin(false);

  return (
    <>
      <DashboardModal
        uppy={UppyConfig}
        open={showImageUploadPlugin}
        onRequestClose={closeImageUploader}
        closeModalOnClickOutside
        closeAfterFinish
        plugins={["urlInput"]}
      />
    </>
  );
};

export default ImageUploaderPlugin;
