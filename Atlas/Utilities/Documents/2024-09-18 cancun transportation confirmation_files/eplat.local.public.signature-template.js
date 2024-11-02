var Template = new Vue({
    el: '#app',
    data: function () {
        return {
            transaction: window.location.href.split('=')[1],
            response: false,
            XhrRequest: null
        }
    },
    methods: {
        xhr: function () {
            $(document).ajaxStart(function () {
                $('.progress').show();
                var count = 10;
                setInterval(function () {
                    if (parseInt($('.progress-bar').attr('style').split(':')[1].trim().substr(0, $('.progress-bar').attr('style').split(':')[1].trim().length - 1)) < 95) {
                        $('.progress-bar').css({ 'width': count + '%' });
                        count += 5;
                    }
                    else {
                        clearInterval();
                    }
                }, 1000);
            }).ajaxComplete(function () {
                $('.progress-bar').css({ 'width': '100%' });
            }).ajaxStop(function () {
                $('.progress').hide();
            });
        },
        loadTemplate: function () {
            let self = this;
            if (this.XhrRequest && this.XhrRequest.readyState != 4) {
                this.XhrRequest.abort();
            }
            this.XhrRequest = $.ajax({
                url: '/Public/LoadTemplate',
                cache: false,
                data: { transactionID: this.transaction.replace('#', '') },
                success: function (data) {
                    var _data = $.parseJSON(data);
                    var _html = _data.Body;
                    var width = 0;
                    $('#template').html(_html);
                    const tableLink = $('#template').find('a[href*="SignatureTemplate"]');
                    tableLink.parent().parent().attr('id', "signNowContainer");
                    tableLink.parent().attr('id', "blackBoxSignature");
                    tableLink.remove();
                    $('#blackBoxSignature').remove();
                    $('#template').append('<div id="signature" style="background-color:white;padding-top:10pt;"></div>');
                    self.response = true;
                    var interval = setInterval(checkWidth, 100);
                    function checkWidth() {
                        width = $('#template').width();
                        if (width != 0) {
                            /*$('#signature').width($('#template').find('table:first').width());*/
                            $('#signature').vgSign();
                            clearInterval(interval);
                        }
                    }
                    //$('#template').append('<div id="signature" style="background-color:white;padding-top:10pt;width:' + width + 'px;"></div>');
                    //Vue.nextTick(function () {
                    //    $('#signature').vgSign();
                    //    self.response = true;
                    //})

                }
            });
        }
    },
    computed: {

    },
    mounted: function () {
        let self = this;
        self.xhr();
        self.loadTemplate();
    }
})