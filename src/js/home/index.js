$(function() {
    var main = {
        page: 1,
        searchPage: 1,
        init: function() {
            this.getUserInfo();
            this.getHeatBooks();
            this.getFinishBooks();
            this.getDxjcBooks();
            this.getJsjwlBooks();
            this.getCglzBooks();
            this.getAllCategory();
            this.bindEvent();
        },
        getUserInfo: function() {
            $.ajax({
                url: '/api/home/getUserInfo',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        $('.J_user-name').html(result.uname);
                        $('.J_login-wrap').removeClass('hidden');
                        $('.J_unlogin-wrap').addClass('hidden');
                    } else {
                        $('.J_login-wrap').addClass('hidden');
                        $('.J_unlogin-wrap').removeClass('hidden');
                    }
                }
            })
        },
        getHeatBooks: function() {
            $.ajax({
                url: '/api/home/get_heat_books',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        var tpl = $('#heat-tpl').html();
                        var html = juicer(tpl, result);
                        $('.J_heat-books').html(html);
                    }
                }
            })
        },
        getFinishBooks: function() {
            $.ajax({
                url: '/api/home/get_finish_books',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        var tpl = $('#finish-tpl').html();
                        var html = juicer(tpl, result);
                        var move = 0;
                        var $finishBooks = $('.J_finish-books');
                        var $finishBooksWrap = $('.J_finish-list-wrap');
                        $finishBooks.html(html);


                        var timer = setInterval(startmove, 50)

                        $finishBooks.on('mouseover', function() {
                            clearInterval(timer);
                        });

                        $finishBooks.on('mouseout', function() {
                            timer = setInterval(startmove, 50)
                        });

                        function startmove() {
                            if (move < -($finishBooks.height() - $finishBooksWrap.height())) {
                                move = 0;
                            }
                            $finishBooks.css({
                                'transform': 'translate(0, ' + (move--) + 'px)'
                            })
                        }
                    }
                }
            })
        },
        getDxjcBooks: function() {
            $.ajax({
                url: '/api/home/get_category_books?category=18',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        var tpl = $('#item-tpl').html();
                        var html = juicer(tpl, result);
                        $('.J_dxjc-books').html(html);
                    }
                }
            })
        },
        getJsjwlBooks: function() {
            $.ajax({
                url: '/api/home/get_category_books?category=5',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        var tpl = $('#item-tpl').html();
                        var html = juicer(tpl, result);
                        $('.J_jsjwl-books').html(html);
                    }
                }
            })
        },
        getCglzBooks: function() {
            $.ajax({
                url: '/api/home/get_category_books?category=1',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        var tpl = $('#item-tpl').html();
                        var html = juicer(tpl, result);
                        $('.J_cglz-books').html(html);
                    }
                }
            })
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
            //注销
            $('.J_logout').on('click', function() {
                $.ajax({
                    url: '/api/home/logout',
                    type: 'post',
                    dataType: 'json',
                    success: function(result) {
                        if (result.success) {
                            window.location.reload();
                        }
                    },
                    error: function() {

                    }
                })
            })
        }
    }
    main.init()
});