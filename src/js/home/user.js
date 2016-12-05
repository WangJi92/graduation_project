$(function() {
	var main = {
		init: function() {
			this.getUserInfo();
			this.bindEvent();
		},
		getUserInfo: function() {
			var that = this;
			$.ajax({
				url: '/api/home/getUserInfo',
				type: 'get',
				dataType: 'json',
				success: function(result) {
					if (result.success) {
						that.fetch(+result.uid);
					} else {
						window.location = '/home/sign-in.html'
					}
				}
			})
		},
		fetch: function(uid) {
			var that = this;
			$.ajax({
				url: '/api/home/getPublishInfo',
				type: 'get',
				data: {uid: uid},
				dataType: 'json',
				success: function(result) {
					if (result.success) {
						that.render(result);
					}
				}
			})
		},
		render: function(data) {
			var tpl = $('#tpl').html();
			var html = juicer(tpl, data);
			var that = this;
			$('.J_book-wrapper').html(html);
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

			var $mask = $('.J_mask'),
				$nameInput = $('.J_name-input'),
				$emailInput = $('.J_email-input'),
				$telInput = $('.J_tel-input'),
				$passwordInput = $('.J_password-input');
			// 弹出修改窗
			$('.J_book-wrapper').on('click', '.J_info-modify', function() {
				$nameInput.val($('.J_true-name').html());
				$emailInput.val($('.J_email').html());
				$telInput.val($('.J_tel').html());
				$passwordInput.val($('.J_password').html());
				$mask.removeClass('hidden');
			})

			//隐藏修改窗
			$('.J_cancel-btn').on('click', function() {
				$mask.addClass('hidden');
			});

			//确认修改
			$('.J_modify-brn').on('click', function() {
				var uid = getQuery(window.location.href).uid,
					that = this;
				$.ajax({
					url: '/api/home/modifyUserInfo',
					type: 'post',
					data: {
						uid: uid,
						password: $passwordInput.val(),
						email: $emailInput.val(),
						tel: $telInput.val(),
						truename: $nameInput.val()
					},
					dataType: 'json',
					success: function(result) {
						if (result.success) {
							$mask.addClass('hidden');
							window.location.reload();
						}
					}
				})
			});

			//确认完成
			$('.J_book-wrapper').on('click', '.J_update-status', function() {
				var bid = $(this).data('bid');
				$.ajax({
					url: '/api/home/updateStatus',
					type: 'post',
					data: {
						bid: bid
					},
					dataType: 'json',
					success: function(result) {
						if (result.success) {
							window.location.reload();
						}
					}
				})
			})
		}
	}
	main.init()
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
});