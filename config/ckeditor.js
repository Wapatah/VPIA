/*
@Mordax
An easy to adjust configuration file for CKeditor. 
Drop in whatever plugins you need, remove things, etc.
*/

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";

import Undo from "@ckeditor/ckeditor5-undo/src/undo";

import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";

import Link from "@ckeditor/ckeditor5-link/src/link";

let config = {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Underline,
    Heading,
    HorizontalLine,
    Image,
    ImageToolbar,
    ImageStyle,
    ImageResize,
    ImageUpload,
    SimpleUploadAdapter,
    Link,
    Undo
  ],
  toolbar: [
    "bold",
    "italic",
    "underline",
    "|",
    "link",
    "heading",
    "horizontalLine",
    "ImageUpload",
    "undo"
  ],
  image: {
    toolbar: ["imageTextAlternative", "|", "imageStyle:full", "imageStyle:side"]
  },
  simpleUpload: {
    uploadUrl: "https://storage.localtunnel.me/upload"
  }
};

export default config;
