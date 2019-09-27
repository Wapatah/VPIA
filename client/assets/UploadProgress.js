// Progress bar for the attachments in Trix

Trix.config.attachments.preview.caption.name = true;
Trix.config.attachments.preview.caption.size = false;

document.addEventListener("trix-initialize", function(event) {
  Trix.Inspector.install(event.target);
});

document.addEventListener("trix-attachment-add", function(event) {
  var attachment = event.attachment;
  if (attachment.file) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/attachments", true);

    xhr.upload.onprogress = function(event) {
      var progress = (event.loaded / event.total) * 100;
      attachment.setUploadProgress(progress);
    };

    xhr.onload = function() {
      if (xhr.status === 201) {
        setTimeout(function() {
          var url = xhr.responseText;
          attachment.setAttributes({ url: url, href: url });
        }, 30);
      }
    };

    attachment.setUploadProgress(10);

    setTimeout(function() {
      xhr.send(attachment.file);
    }, 30);
  }
});
