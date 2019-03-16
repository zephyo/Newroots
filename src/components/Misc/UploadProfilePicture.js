import React from 'react';
import Avatar from './Avatar';

class UploadProfilePicture extends React.Component {
  constructor(props) {
    super(props);
  }

  uploadPpf = (event) => {
    let firstFile = event.target.files[0] // upload the first file only
    let task = this.props.firebase.photos(this.props.uid).put(firstFile);

    task.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => { }, () => {
      // Handle successful uploads on complete
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {

        this.props.firebase
          .user(this.props.uid)
          .update({
            PpfURL: downloadURL
          });

        this.props.uploadPpf(downloadURL);
      });
    });
  }

  render() {
    return (
      <div>
        <input type="file" accept="image/*" id="ppf-upload" onChange={this.uploadPpf} />
        <label className="edit-pic" htmlFor="ppf-upload">
          <Avatar PpfURL={this.props.PpfURL}
            content={
              <div className="edit-pic-but">
                <span className="jam jam-pencil"></span>
              </div>
            }
          />
        </label>
      </div>
    );
  }
}

export default UploadProfilePicture;