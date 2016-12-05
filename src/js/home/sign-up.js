$(function() {
	var $loginDesc = $('.J_logup-desc');
	
	var main = {
		init: function() {
			this.fetch();
			this.bindEvent();
		}, 
		fetch: function() {
			var that = this;
			$.ajax({
				url: '/api/home/get_all_school',
				type: 'get',
				dataType: 'json',
				success: function(result) {
					if (result.success) {
						that.render(result);
					}
				},
				error: function() {

				}
			})
		},
		render: function(data) {
			var tpl = $('#school-tpl').html();
			var html = juicer(tpl, data);
			$('.J_school').html(html);
		},
		bindEvent: function() {
			$('.J_logup-btn').on('click', function() {
				var username = $('.J_username').val().trim(),
					password = $('.J_password').val().trim(),
					email = $('.J_email').val().trim(),
					tel = $('.J_tel').val().trim(),
					school_id = $('.J_school').val(),
					truename = $('.J_truename').val().trim();

				if (validate(username, password, email, tel, school_id, truename)) {
					$loginDesc.html(validate(username, password, email, tel, school_id, truename))
					return;
				}

				$.ajax({
					url: '/api/home/signUp',
					type: 'post',
					dataType: 'json',
					data: {
						username: username,
						password: password,
						email: email,
						tel: tel,
						school_id: school_id,
						truename: truename
					},
					success: function(result) {
						if (result.success) {
							window.location = '/home/index.html';
						} else {
							$loginDesc.html(result.message)
						}
					},
					error: function() {

					}
				})
			})
		}
 	}

 	main.init()

 	function validate(username, password, email, tel, school_id, truename) {
 		var message = '';
 		if (!username) {
 			return message = '用户名不能为空'
 		}

 		if (username && username.length < 4 || username > 16) {
 			return message = '用户名的长度必须为4-16位'
 		}

 		if (!password) {
 			return message = '密码不能为空'
 		}

 		if (!email) {
 			return message = '邮箱不能为空'
 		}

 		if (email) {
			if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)) {
			    return message = '请输入正确的邮箱格式'
			}

 		}

 		if (!tel) {
 			return message = '手机号不能为空'
 		}

 		if (tel) {
 			if(!(/^1[34578]\d{9}$/.test(tel))) {
 				return message = '请输入正确的手机号'
 			}
 		}

 		if (!school_id) {
 			return message = '请选择学校'
 		}

 		if (!truename) {
 			return message = '请输入真实姓名'
 		}

 		return false;
 	}
});