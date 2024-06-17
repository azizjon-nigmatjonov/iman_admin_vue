const imageUpload = {
    data () {
        return {
            fileList: [],
            previewImage: '',
            previewVisible: false,
            uploadingImage: false
        }
    },
    methods: {
        async uploadImage (data) {
            this.uploadingImage = true
            const formData = new FormData()
            formData.append('file', data.file)
            console.log('File', data)
            const url = await this.$getBase64(data.file)
            this.$store.dispatch('uploadImage', formData).then(res => {
              console.log(res)
              this.fileList.push({
                uid: res.filename,
                name: res.filename,
                status: 'done',
                url: url
              })
              console.log(this.fileList)
            }).catch(err => console.log(err))
            .finally(() => {
              this.uploadingImage = false
            })
        },
        handleChange ({ fileList }) {
            if (fileList.length === 0) { this.fileList = fileList }
        },
        async handlePreview (file) {
            if (!file.url && !file.preview) {
              file.preview = await this.$getBase64(file.originFileObj)
            }
            this.previewImage = file.url || file.preview
            this.previewVisible = true
        }
    }
}

export default imageUpload
