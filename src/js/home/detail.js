$(function() {
	var main = {
		init: function() {
			this.fetch();
			this.bindEvent();
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
			var tpl = $('#book-tpl').html();
			var html = juicer(tpl, data);
			var that = this;
			$('.J_detail').html(html);
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