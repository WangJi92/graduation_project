$(function() {
	var main = {
		init: function() {
			this.bindEvent();
			this.getCategory();
			this.getUserInfo();
		},
		getUserInfo: function() {
			$.ajax({
                url: '/api/home/getUserInfo',
                type: 'get',
                dataType: 'json',
                success: function(data) {
                	if (!data.success) {
                		window.location = '/home/sign-in.html'   
                	}        
                },
                error: function() {
                    console.log('error');
                }
            });
		},
		getCategory: function() {
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
                	}           
                },
                error: function() {
                    console.log('error');
                }
            });
		},
		bindEvent: function() {
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
                    status: $('.J_status').val(),
                    desc: $('.J_desc').val().trim(),
                    img: $('.J_preview').attr('src')
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
})