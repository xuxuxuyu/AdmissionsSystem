<template>
  <span @click="click">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: "app-file-base64",
  props: {
    accept: String,
    type: String
  },
  methods: {
    click() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = this.accept || "image/*";
      input.onchange = event => {
        const file = event.target.files[0];
        /*let reader = new FileReader();
        let src = ''
        // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
        reader.addEventListener("load", function () {
             src = reader.result
        }, false);*/
        const { name, type, size } = file;
        const r = new FileReader();
        if (this.type == "file") {
          if (size > 1024 * 1024 * 300) {
            return this.$message({
              message: "文件最大限制300M，请重新上传",
              type: "warning"
            });
          }
          let formData = new FormData();
          formData.append("file", file);
          formData.append("title", name);
          // this.$post("/FileItemApi/FileUpLoad", {
          //   data: formData,
          //   loadingEl: "all"
          // })
          //   .then(data => {
              r.onload = c => {
                this.$emit("change", {
                  fileName: name,
                  size,
                  type,
                  base64String: file,
                  src: file,
                  // filePath: data,
                  // base64Src: c.target.result
                });
              };
              r.readAsDataURL(file);
            // })
            // .catch(error => {
            //   this.$message({
            //     message: "上传失败，请重新上传",
            //     type: "error"
            //   });
            // });
        } else {
          r.onload = c => {
            this.$emit("change", {
              fileName: name,
              size,
              type,
              base64String: c.target.result,
              src: c.target.result
            });
          };
          r.readAsDataURL(file);
        }
      };
      input.click();
    }
  }
};
</script>
