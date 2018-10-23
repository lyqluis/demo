let app = new Vue({
    el: '#todolist',
    data: {
        list: [{
                checked: false,
                important: false,
                sth: 'read a book'
            },
            {
                checked: true,
                important: false,
                sth: 'finish a film'
            }
        ],
        value: '',
        hash: ''
    },
    created: function () { //钩子，在vue实例创建时就执行
        //存储数据
        this.list = JSON.parse(localStorage.getItem('data')) || this.list;
        //hash的改变
        this.hash = window.location.hash || '#all'; //初始化hash
        window.onhashchange = () => { //根据页面变化改变hash;若不使用箭头函数, this指向调用该函数的对象即window,会出错
            this.hash = window.location.hash; // ！！！使用箭头函数后，this指向申明时的对象，即vue实例
            console.log(this);
        }
    },
    computed: {
        allCount: function () {
            return this.list.length;
        },
        unfinishedCount: function () {
            return this.list.filter(value => !value.checked).length;
        },
        finished: function () {
            return this.list.filter(value => value.checked).length;
        },
        filteredList() { //根据data里的hash信息来筛选list数据, 不能改变list数据
            switch (this.hash) {
                case '#all':
                    return this.list;
                case '#finished':
                    return this.list.filter(value => value.checked);
                case '#unfinished':
                    return this.list.filter(value => !value.checked);
            }
        }
    },
    watch: {
        list: { //监视list数据变化，并存储在localstorage
            handler() {
                localStorage.setItem('data', JSON.stringify(this.list));
            },
            deep: true
        },

    },
    methods: {
        //添加sth
        add: function () {
            if (this.value) this.list.push({
                checked: false,
                important: false,
                sth: this.value
            });
            this.value = '';
        },
        del: function (item) { //不要使用delete命名, 会报错
            this.list = this.list.filter(value => value !== item);
            //item-当前del鍵对应的item, value为list中所有的每一个item
        },
        beImportant: function (item) {
            item.important = item.important ? false : true;
        }
    }
});