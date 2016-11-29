$(function() {
	var main = {
		page: 1,
		searchPage: 1,
		init: function() {
			this.getUserInfo();
			this.fetch();
			this.bindEvent();
		},
		getUserInfo: function() {
			$.ajax({
				url: '/api/home/getUserInfo',
				type: 'get',
				dataType: 'json',
				success: function(result) {
					if (result.success) {
						$('.J_logined').html(
							'<a href="/home/user.html?uid=' + result.uid + '">你好！' + result.uname + '</a>' + 
							' · <span class="J_logout logout">注销</span>'
						).show();
						$('.J_not-login').hide();
					}
				}
			})
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
		},
		renderSearchData: function(data) {
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
						that.searchPage = num;
						that.fetch(num);
					}
				}
			});
		},
		fetchSearchData: function(content) {
			var that = this;
			$.ajax({
				url: '/api/home/search',
				type: 'get',
				dataType: 'json',
				data: {
					page: that.searchPage,
					content: content
				},
				success: function(result) {
					if (result.success) {
						that.renderSearchData(result)
					}
				},
				error: function() {

				}
			})
		},
		bindEvent: function() {
			var that = this;
			$('.J_search').on('keydown', function(e) {
				var content = $(this).val();
					
				if (e.keyCode === 13) {
					that.fetchSearchData(content);
				}
			})
			var $infoTab = $('.J_info-tab');
			$infoTab.on('click', function() {
				$infoTab.removeClass('active');
				$(this).addClass('active');
			});

			//注销
			$('.J_logined').on('click', '.J_logout', function() {
				$.ajax({
					url: '/api/home/logout',
					type: 'post',
					dataType: 'json',
					success: function(result) {
						if (result.success) {
							window.location.reload();
						}
					},
					error: function() {

					}
				})
			})
		}
	}
	main.init()
});