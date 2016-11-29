$(function() {
	var main = {
		uid: '',
		init: function() {
			this.bindEvent();
			this.getCategory();
			this.getUserInfo();
		},
		fetch: function() {
			var bid = getQuery(window.location.href).bid,
				that = this;
			if (bid) {
				$.ajax({
	                url: '/api/home/getBookInfo',
	                type: 'get',
	                data: {
	                	bid: bid
	                },
	                dataType: 'json',
	                success: function(data) {
	                	if (data.success) {
	                		var book = data.book;
	                		$('.J_bookname').val(book.bname);
	                		$('.J_count').val(book.count);
	                		$('.J_concern').val(book.book_concern);
	                		$('.J_author').val(book.author);
	                		$('.J_category').val(book.tid);
	                		$('.J_desc').val(book.book_desc);
	                		$('.J_preview').attr('src', book.cover_img);	           
	                	}        
	                },
	                error: function() {
	                    console.log('error');
	                }
	            });
			}	
		},
		getUserInfo: function() {
			var that = this;
			$.ajax({
                url: '/api/home/getUserInfo',
                type: 'get',
                dataType: 'json',
                success: function(data) {
                	if (!data.success) {
                		window.location = '/home/sign-in.html'   
                	} else {  
                		$('.J_logined').html('你好！' + data.uname).show();
						$('.J_not-login').hide();
						that.uid = data.uid;
                	}        
                },
                error: function() {
                    console.log('error');
                }
            });
		},
		getCategory: function() {
			var that = this;
			$.ajax({
                url: '/api/admin/categoryMap',
                type: 'get',
                dataType: 'json',
                success: function(data) {
                	if (data.success) {
                		var html = '<option value=""></option>';
                		data.category.forEach(function(v) {
                			html += '<option value="' + v.tid + '">' + v.tname + '</option>';
                		});
                		$('.J_category').html(html);  

						that.fetch();    
                	}           
                },
                error: function() {
                    console.log('error');
                }
            });
		},
		bindEvent: function() {
			var that = this;
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
			
			$('.J_btn').on('click', function() {
				var data = {
                    bookname: $('.J_bookname').val().trim(),
                    count: $('.J_count').val().trim(),
                    concern: $('.J_concern').val().trim(),
                    author: $('.J_author').val().trim(),
                    category: $('.J_category').val(),
                    desc: $('.J_desc').val().trim(),
                    img: $('.J_preview').attr('src'),
                    uid: that.uid
                };
				$.ajax({
	                url: '/api/home/publish',
	                type: 'post',
	                data: data,
	                dataType: 'json',
	                success: function(data) {
	                	if (data.success) {
	                		console.log(data)     
	                	}           
	                },
	                error: function() {
	                    console.log('error');
	                }
	            });
			});
		}
	}
	main.init();
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