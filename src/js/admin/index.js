;(function(){
	$('.J_index-btn').addClass('active');
	$('.J_manage-btn').removeClass('active');

	$('.J_logout').on('click', function() {
		$.ajax({
			url: '/api/admin/logout',
			type: 'get',
			dataType: 'json',
			success: function(result) {
				window.location = '/admin/login.html';
			},
			error: function() {

			}
		})
	});

	var $item = $('.J_item');
	$item.on('click', function() {
		$item.removeClass('active');
		$(this).addClass('active');
		window.location = $(this).data('target');
	})
})();