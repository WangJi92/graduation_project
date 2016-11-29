$(function() {
	var main = {
		init: function() {
			this.fetch();
			this.getUserInfo();
			this.bindEvent();
		},
		getUserInfo: function() {
			$.ajax({
				url: '/api/home/getUserInfo',
				type: 'get',
				dataType: 'json',
				success: function(result) {
					if (result.success) {
						$('.J_logined').html('你好！' + result.uname).show();
						$('.J_not-login').hide();
					}
				}
			})
		},
		fetch: function() {
			var id = getQuery(window.location.href).id,
				that = this;
			$.ajax({
				url: '/api/home/getBookInfo',
				type: 'get',
				data: {id: id},
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