$(function() {
	var $loginDesc = $('.J_logup-desc');
	
	$('.J_logup-btn').on('click', function() {
		var username = $('.J_username').val(),
			password = $('.J_password').val(),
			email = $('.J_email').val(),
			tel = $('.J_tel').val(),
			address = $('.J_address').val(),
			truename = $('.J_truename').val();

		$.ajax({
			url: '/api/home/signUp',
			type: 'post',
			dataType: 'json',
			data: {
				username: username,
				password: password,
				email: email,
				tel: tel,
				address: address,
				truename: truename
			},
			success: function(result) {
				if (result.success) {
					alert(1)
				} else {
					$loginDesc.html(result.message)
				}
			},
			error: function() {

			}
		})
	})
});