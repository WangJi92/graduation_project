(function() {
	// menu每个tab的状态切换
	$('.J_index-btn').removeClass('active');
	$('.J_manage-btn').addClass('active');
	var $item = $('.J_item');
	$item.on('click', function() {
		$item.removeClass('active');
		$(this).addClass('active');
	})

	var main = {
		page: 1,
		init: function() {
			this.fetch(this.page);
			this.bindEvent();
		},
		fetch: function(page) {
			var that = this;
			$.ajax({
				url: '/api/admin/list',
				type: 'get',
				dataType: 'json',
				data: {
					page: that.page
				},
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
			var tpl = $('#tpl').html();
			var html = juicer(tpl, data);
			var that = this;
			$('.J_list').html(html);

			$('.J_pagination').jqPaginator({
				totalPages: data.totalPage,
				pageSize: data.pageSize,
				currentPage: +data.page,
				visiblePages: 5,
				onPageChange: function(num, type) {
					if (type === 'change'){
						that.page = num;
						that.fetch(num);
					}
				}
			});
		},
		bindEvent: function() {
			var that = this;
			// 新增书籍按钮跳转
			$('.J_add-btn').on('click', function() {
				window.location = 'edit.html'
			});

			// 删除
			$('.J_list').on('click', '.J_delete', function() {
				var bid = $(this).data('id');
				$.ajax({
					url: '/api/admin/destory',
					type: 'get',
					data: {
						bid: bid
					},
					dataType: 'json',
					success: function(result) {
						if (result.success) {
							that.fetch(that.page);
						}
					},
					error: function(error) {
						console.log(err)
					}
				})
			});

			// 修改
			$('.J_list').on('click', '.J_modify', function() {
				var bid = $(this).data('id');
				window.location = 'edit.html?bid=' + bid;
			})
		}
	}
	main.init();
})();