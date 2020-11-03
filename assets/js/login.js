$(function() {
    // 点击注册按钮
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击登录按钮
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 密码注册校验
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '请输入6到12位密码'],

        repwd: function(value) {
            // console.log(1111, value);
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码输入不一致'
        }
    })

    // 注册校验表单
    $('#form_reg').on('submit', function(e) {

        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username').val(),
                password: $('.reg-box [name=password').val()
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('#link_login').click()
            }
        })
    })

    // 登录表单
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form_login').serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index'
            }
        })

    })
})