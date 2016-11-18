(function() {
    var main = {
        init: function() {
            this.fetch();
            this.bindEvent();
        },
        fetch: function() {
            var that = this;
            var bid = getQuery(window.location.href).bid;
            $.ajax({
                url: '/api/admin/categoryMap',
                type: 'get',
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        that.render(result);
                    }
                },
                error: function(err) {
                    console.log(err)
                }
            })

            if (bid) {
                $.ajax({
                    url: '/api/admin/book',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        bid: bid
                    },
                    success: function(result) {
                        if (result.success) {
                            $('.J_bookname').val(result.book.bname);
                            $('.J_count').val(result.book.count);
                            $('.J_concern').val(result.book.book_concern);
                            $('.J_author').val(result.book.author);
                            $('.J_category').val(result.book.tid);
                            $('.J_user').val(result.book.true_name);
                            $('.J_status').val(result.book.deposit_status);
                            $('.J_desc').val(result.book.book_desc);
                            $('.J_preview').attr('src', result.book.cover_img);
                        }
                    },
                    error: function(err) {
                        console.log(err)
                    }
                })
            }
        },  
        render: function(result) {
            var html = '';
            result.category.forEach(function(v, i) {
                html += '<option value="' + v.tid + '">' + v.tname + '</option>'
            })
            $('.J_category').append(html)
        },
        bindEvent: function() {
            // 图片上传
            $('.fileupload').change(function(event) {
                if ($('.fileupload').val().length) {
                    var fileName = $('.fileupload').val();
                    var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
                    if (extension == ".jpg" || extension == ".png") {
                            var data = new FormData();
                            data.append('upload', $('#fileToUpload')[0].files[0]);
                            $.ajax({
                                url: '/upload',
                                type: 'POST',
                                data: data,
                                cache: false,
                                contentType: false, //不可缺参数
                                processData: false, //不可缺参数
                                success: function(data) {
                                    $('.J_preview').attr('src', data.msg);
                                },
                                error: function() {
                                    console.log('error');
                                }
                            });
                    }
                }
            });
            // 提交
            $('.J_btn').on('click', function() {
                var bid = getQuery(window.location.href).bid;
                var data = {
                    bid: bid,
                    bookname: $('.J_bookname').val().trim(),
                    count: $('.J_count').val().trim(),
                    concern: $('.J_concern').val().trim(),
                    author: $('.J_author').val().trim(),
                    category: $('.J_category').val(),
                    user: $('.J_user').val().trim(),
                    status: $('.J_status').val(),
                    desc: $('.J_desc').val().trim(),
                    img: $('.J_preview').attr('src')
                };

                var url = bid ? '/api/admin/update' : '/api/admin/add';
                $.ajax({
                    url: url,
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function(result) {
                        if (result.success) {
                            window.location = 'book_manage.html'
                        }
                    },
                    error: function(err) {
                        console.log(err)
                    }
                })
            });
        }

    }
    main.init();
    

    function Verification(str) {
        this.str = str;
    }
    Verification.prototype.isNumber = function() {
        return this.str.match(/\d*/i) == this.str ? true : false;
    }
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
})();