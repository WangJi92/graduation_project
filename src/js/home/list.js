$(function() {

    $('.J_pagination').jqPaginator({
        totalPages: 100,
        pageSize: 10,
        currentPage: 1,
        visiblePages: 5,
        onPageChange: function(num, type) {
            
        }
    });
    /**
     * 查询条件
     *
     * 学校 school={x}
     * 分类 category={x}
     * 用户 uid={x}
     * 新旧程度 degree={x}
     * 是否成交 deposit_status={x}
     * 
     * 按热度排序 heat=1
     */
    var main = {
        page: 1,
        init: function() {
            this.fetch();
            this.getAllCategory();
            this.bindEvent();
        },
        fetch: function(data) {
            console.log(data);
            if (data) {
                if (data.order && data.order==="1") {
                    var heat = 1;
                } else if (data.order && data.order==="2") {
                    var heat = 2;
                }
            }

            var that = this,
                query = {
                    page: this.page,
                    school: getQuery(window.location.href).school_id,
                    category: getQuery(window.location.href).category,
                    uid: getQuery(window.location.href).uid,
                    degree: data && data.degree || getQuery(window.location.href).degree,
                    deposit_status: data && data.status || getQuery(window.location.href).deposit_status,
                    heat: heat || getQuery(window.location.href).heat,
                    keyword: getQuery(window.location.href).keyword
                };   

            $.ajax({
                url: '/api/home/get_query_books',
                type: 'get',
                data: query,
                dataType: 'json',
                success: function(result) {
                    that.render(result);
                }
            })
        }, 
        render: function(result) {
            var tpl = $('#list-tpl').html(),
                html = juicer(tpl, result),
                that = this;
            $('.J_item-lists').html(html);

            $('.J_pagination').jqPaginator({
                totalPages: result.totalPage,
                pageSize: result.pageSize,
                currentPage: +result.page,
                visiblePages: 5,
                onPageChange: function(num, type) {
                    if (type === 'change'){
                        that.page = num;
                        that.fetch(num);
                    }
                }
            });
        },
        getAllCategory: function() {
            $.ajax({
                url: '/api/home/get_all_category',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        var tpl = $('#category-tpl').html();
                        var html = juicer(tpl, result);
                        $('.J_category-wrap').html(html);
                    }
                }
            })
        },
        bindEvent: function() {
            var $goSearch = $('.J_go-search'),
                that = this;
            $goSearch.on('click', function() {
                that.fetch({
                    order: $('.J_query-order:checked').val(),
                    degree: $('.J_query-degree:selected').val(),
                    status: $('.J_query-status:selected').val()
                })
            })
        }
    }
    main.init()
    function getQuery(str) {
        var search = '',
            params = {};
        if((matchArr = str.match(new RegExp('^(https?|beibei|beibeiapp|mizhe|mizheapp):[/]{2}' + //protocal
            '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
            '([^:/?#]+)' +                        //hostname
            '(?:[:]([0-9]+))?' +                  //port
            '([/][^?#;]*)?' +                     //pathname
            '(?:[?]([^?#]*))?' +                  //search
            '(#[^#]*)?$'                          //hash
        )))) {
            search = matchArr[7] || '';
        }
        if(typeof search === 'string') {
            if (search.indexOf('?') === 0) {
                search = search.substr(1);
            }
            var search = search.split('&');
            for(var p in params) {
                delete params[p];
            }
            for(var i = 0 ; i < search.length; i++) {
                var pair = search[i].split('=');
                if (pair[0]) {
                    try {
                        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
                    } catch(e) {
                        params[pair[0]] = pair[1] || '';
                    }
                }
            }
        }
        return params;
    }
})