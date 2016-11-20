$(function() {
	var $loginDesc = $('.J_logup-desc');
	
	$('.J_logup-btn').on('click', function() {
		var username = $('.J_username').val(),
			password = $('.J_password').val();

		$.ajax({
			url: '/api/home/signIn',
			type: 'post',
			dataType: 'json',
			data: {
				username: username,
				password: password
			},
			success: function(result) {
				if (result.success) {
					window.location.pathname = '/home/index.html'
				} else {
					$loginDesc.html(result.message)
				}
			},
			error: function() {

			}
		})
	})
});