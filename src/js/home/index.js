$(function() {
	var main = {
		page: 1,
		init: function() {
			this.fetch();
		},
		fetch: function() {
			var that = this;
			$.ajax({
				url: '/api/home/index',
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
			$('.J_book-wrapper').html(html);

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
		}
	}
	main.init()
});