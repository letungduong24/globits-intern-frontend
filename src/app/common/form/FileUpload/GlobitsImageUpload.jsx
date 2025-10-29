import React from "react";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import BlockIcon from "@material-ui/icons/Block";
import withStyles from "@material-ui/core/styles/withStyles";
import customImageInputStyle from "./CustomImageInputStyle";
import classnames from "classnames";
import { Button } from "@material-ui/core";

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  state = {
    file: undefined,
    imagePreviewUrl: undefined,
  };

  showFileUpload() {
    if (this.fileUpload) {
      this.fileUpload.current.click();
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
      this.props.setFieldValue(this.props.field.name, file);
    }
  }

  handleRemoveImage() {
    document.getElementsByClassName("img-input")[0].value = null;
  }

  showPreloadImage() {
    const { errorMessage, classes } = this.props;
    const { file, imagePreviewUrl } = this.state;

    let comp = null;

    if (errorMessage) {
      comp = <Icon style={{ fontSize: 200 }}>error_outline</Icon>;
    } else if (file) {
      comp = (
        <img className={classes.avatarThumb} src={imagePreviewUrl} alt="..." />
      );
    } else {
      comp = <Icon style={{ fontSize: 320 }}>account_circle</Icon>;
    }
    return comp;
  }

  render() {
    const { errorMessage, title, classes } = this.props;
    const { name } = this.props.field;

    const avatarStyle = classnames(
      classes.bigAvatar,
      this.state.file ? [classes.whiteBack] : [classes.primaryBack],
      { [classes.errorBack]: errorMessage }
    );

    return (
      <div className={classes.container}>
        <input
          className={`${classes.hidden} img-input`}
          id={name}
          name={name}
          type="file"
          onChange={this.handleImageChange}
          ref={this.fileUpload}
        />
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Avatar className={avatarStyle} onClick={this.showFileUpload}>
          {this.showPreloadImage()}
        </Avatar>

        <Button
          startIcon={<BlockIcon />}
          className="mr-0 btn btn-primary d-inline-flex"
          variant="contained"
          onClick={this.showFileUpload}
        >
          upload
        </Button>

        <Button
          startIcon={<BlockIcon />}
          className="mr-0 btn btn-secondary d-inline-flex"
          variant="contained"
          onClick={this.handleRemoveImage}
        >
          Remove
        </Button>

        {errorMessage ? (
          <Typography variant="caption" color="error">
            {errorMessage}
          </Typography>
        ) : null}
      </div>
    );
  }
}

export default withStyles(customImageInputStyle)(ImageInput);
