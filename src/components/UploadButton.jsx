import React from 'react';

export default function UploadButton() {
    return(
        <label htmlFor="upload-photo">
        <input
          style={{ display: 'none' }}
          id="upload-photo"
          name="upload-photo"
          type="file"
        />

        <Button color="secondary" variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    );
}