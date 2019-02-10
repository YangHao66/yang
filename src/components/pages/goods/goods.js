export default {
    data() {
        return {
            search: '',
            dataList: [],
            pagenum: 1,
            pagesize: 10,
            total: 0,
            loading: true
        }
    },
    methods: {
        async getDataList() {
            var res = await this.$http.get(`/goods?query=${this.search}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            var { data, meta } = res.data
            if (meta.status === 200) {
                this.dataList = data.goods
                this.total = data.total
                setTimeout(() => {
                    this.loading = false
                }, 1000)
            } else {
                this.$message.error(meta.msg)
            }

        },
        add() {
            this.$router.push('/goods/add')
        }
    },
    mounted() {
        this.getDataList()
    }
}