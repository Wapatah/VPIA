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
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";


let config = {
  plugins: [ Essentials, Bold, Italic, Paragraph, Underline, Heading, HorizontalLine,  Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize ],
  toolbar: [ "bold", "italic", "underline", "heading", "horizontalLine", "imageTextAlternative", "|", "imageStyle:full", "imageStyle:side", "image"],
};

export default config;
