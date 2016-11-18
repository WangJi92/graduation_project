;(function() {
	$('.J_login-btn').on('click', function() {
		var $loginDesc = $('.J_login-desc'),
			username = $('.J_username').val(),
			password = $('.J_password').val();
		
		$.ajax({
			url: '/api/admin/login',
			type: 'post',
			dataType: 'json',
			data: {
				username: username,
				password: password
			},
			success: function(result) {
				if (result.success) {
					window.location = '/admin/index.html'
				} else {
					$loginDesc.html(result.message)
				}
			},
			error: function() {

			}
		})
	});
}());