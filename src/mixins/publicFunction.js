import { getAppFileDownloadServer, getAppFileRemoveServer, appGreyFileUpload, appGreyFileSync } from '@/api/appversion'
export default {
  data () {
    return {
      pageNumber: 1, // 当前页数
      allListData: [], // 所有分页数据
      listData: [], // 当前页的文件列表
      deleteFileIdArray: [], // 编辑页面删除文件的id,点击保存统一发给后台
      bordered: false, // 是否展示a-list边框
      locale: {
        emptyText: ''
      },
      randomNumber: '_'
    }
  },
  watch: {
    allListData (newVal) {
      this.bordered = newVal.length !== 0
      this.pageChange()
    }
  },
  methods: {
    /**
     * 当前页码发生改变
     * */
    pageChange (current) {
      if (current) {
        this.pageNumber = current
      }
      this.listData = this.allListData.slice((this.pageNumber - 1) * 3, this.pageNumber * 3)
      if (this.listData.length === 0 && this.pageNumber !== 1) {
        this.pageNumber = this.pageNumber - 1 === 0 ? 1 : this.pageNumber - 1
        this.pageChange(this.pageNumber)
      }
    },
    /**
     * @author: puj
     * @function: 版本新增 and 修改的 灰度文件下载接口
     * @param item {object} 当前版本的文件 key
     * */
    getAppFileDownload (item) {
      getAppFileDownloadServer({
        fileKey: item
      }).then(res => {
        if (res.fileUrl) {
          window.open(res.fileUrl)
        }
      }).catch(error => {
        console.log('getAppFileDownloadServer=====error=====>', error)
      })
    },
    /**
     * @author: puj
     * @function: 版本新增 and 修改的 灰度文件移除接口
     * @param fileId {object} 当前版本的文件 key
     * */
    getAppFileRemove (fileId) {
      getAppFileRemoveServer({
        fileIdList: [fileId]
      }).then(() => {
        this.deleteFile(fileId)
      }).catch(error => {
        console.log('getAppFileRemoveServer=====error=====>', error)
      })
    },
    /**
     * 根据文件fileId删除this.allListData中的文件
     * @param fileId {String} 要删除的文件id
     * @param isEdit {Boolean} 是否是编辑页面
     * */
    deleteFile (fileId, isEdit = false) {
      let index = 0
      this.allListData.forEach((key, keyNum) => {
        if (key.fileId === fileId) {
          index = keyNum
        }
      })
      this.allListData.splice(index, 1)
      if (isEdit) {
        // 如果是编辑页面则需要保存fileId
        this.deleteFileIdArray.push(fileId)
      }
    },
    /*
    * 上传之前处理操作
    * */
    async beforeUpload (file) {
      let that = this
      let reader = new FileReader()
      reader.readAsBinaryString(file)

      let getResult = function () {
        return new Promise((resolve, reject) => {
          reader.onload = function () {
            that.OSSData.host = ''
            let XLSX = require('xlsx')
            let data = reader.result
            let wb = XLSX.read(data, { type: 'binary' })
            if (wb.Sheets[wb.SheetNames[0]].A1 && wb.Sheets[wb.SheetNames[0]].A1.v === '商户ID') {
              resolve('1')
            } else {
              that.$message.error('文件不能为空')
              reject(new Error('上传文件为空'))
            }
          }
        })
      }
      let result = await getResult()
      if (result === '1') {
        return appGreyFileUpload({ 'enableSsl': false }).then(res => {
          that.OSSData = res
          this.randomNumber = '_'
          for (let i = 0; i < 4; i++) {
            this.randomNumber += parseInt(Math.random() * 10)
          }
          that.uploadData = {
            policy: that.OSSData.policy,
            OSSAccessKeyId: that.OSSData.accessId,
            signature: that.OSSData.signature,
            key: that.OSSData.dir + this.separateFileName(file.name)
          }
        })
      }
    },
    /**
     * 文件上传change事件触发
     * */
    uploadChange (info) {
      if (info.file.status === 'done') {
        appGreyFileSync({
          fileKey: this.OSSData.dir + this.separateFileName(info.file.name)
        }).then((res) => {
          this.allListData.unshift(res)
          this.$message.success('文件上传成功')
        })
      } else if (info.file.status === 'error') {
        this.$message.error('文件上传失败')
      }
    },
    separateFileName (name) {
      name = name.split('.')
      name.splice(name.length - 2, 1, name[name.length - 2] + this.randomNumber)
      return name.join('.')
    }
  }
}
